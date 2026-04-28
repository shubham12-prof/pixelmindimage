import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Not authenticated", generations: [] },
        { status: 401 },
      );
    }

    const generations = await prisma.generation.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        prompt: true,
        style: true,
        imageUrl: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ generations });
  } catch (error) {
    console.error("Gallery error:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery", generations: [] },
      { status: 500 },
    );
  }
}
