import { NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_API_KEY);

export async function POST(req: Request) {
  try {
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

    const imageBlob = (await client.textToImage({
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: fullPrompt,
      parameters: {
        num_inference_steps: 4,
      },
    })) as unknown as Blob;

    console.log("Image blob type:", imageBlob.type, "size:", imageBlob.size);

    const arrayBuffer = await imageBlob.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");
    const mimeType = imageBlob.type || "image/jpeg";

    return NextResponse.json({
      image: `data:${mimeType};base64,${base64Image}`,
    });
  } catch (error: unknown) {
    console.error("SERVER ERROR:", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
