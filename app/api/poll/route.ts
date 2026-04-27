import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const res = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
    },
  });

  const data = await res.json();

  return NextResponse.json(data);
}
