import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getRemainingGenerations } from "@/lib/rateLimit";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ remaining: 0 });
    }

    const remaining = await getRemainingGenerations(session.user.id);
    return NextResponse.json({ remaining });
  } catch (error) {
    console.error("Remaining error:", error);
    return NextResponse.json({ remaining: 5 });
  }
}
