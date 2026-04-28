import { NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";
import { uploadBase64Image } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { checkRateLimit } from "@/lib/rateLimit";

const client = new InferenceClient(process.env.HF_API_KEY);

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be signed in to generate images" },
        { status: 401 },
      );
    }

    const { allowed, remaining } = await checkRateLimit(session.user.id);
    if (!allowed) {
      return NextResponse.json(
        {
          error: `Daily limit reached. You get ${5} generations per day. Come back tomorrow!`,
          remaining: 0,
        },
        { status: 429 },
      );
    }

    const { prompt, style } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    const stylePrompts: Record<string, string> = {
      realistic:
        "photorealistic, highly detailed, 8k, sharp focus, professional photography",
      anime: "anime style, cel shading, vibrant colors, Studio Ghibli",
      cyberpunk:
        "cyberpunk, neon lights, futuristic, blade runner style, dark atmosphere",
      "oil-paint": "oil painting, classical art, thick brushstrokes, painterly",
      watercolor: "watercolor painting, soft edges, pastel tones, flowing",
      sketch: "pencil sketch, black and white, detailed linework, artistic",
    };

    const styleModifier = stylePrompts[style] ?? stylePrompts.realistic;
    const fullPrompt = `${prompt}, ${styleModifier}`;

    console.log("Generating:", fullPrompt);
    console.log("Remaining after this:", remaining);

    const imageBlob = (await client.textToImage({
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: fullPrompt,
      parameters: { num_inference_steps: 4 },
    })) as unknown as Blob;

    const arrayBuffer = await imageBlob.arrayBuffer();
    const base64Image = `data:image/jpeg;base64,${Buffer.from(arrayBuffer).toString("base64")}`;

    console.log("Image generated — uploading to Cloudinary...");

    const { imageUrl, publicId } = await uploadBase64Image(
      base64Image,
      session.user.id,
    );

    console.log("Uploaded to Cloudinary:", imageUrl);

    const generation = await prisma.generation.create({
      data: {
        userId: session.user.id,
        prompt,
        imageUrl,
        publicId,
        style: style ?? "realistic",
        width: 512,
        height: 512,
        isPublic: false,
      },
    });

    console.log("Saved to DB:", generation.id);

    return NextResponse.json({
      image: imageUrl,
      id: generation.id,
      remaining,
    });
  } catch (error: unknown) {
    console.error("SERVER ERROR:", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
