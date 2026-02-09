import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";

  const songs = await prisma.song.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { artist: { contains: query, mode: "insensitive" } },
      ],
    },
  });

  return NextResponse.json(songs);
}
