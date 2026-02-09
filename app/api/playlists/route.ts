import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { name } = await request.json();
  const playlist = await prisma.playlist.create({
    data: { name },
  });
  return NextResponse.json(playlist, { status: 201 });
}

export async function GET() {
  const playlists = await prisma.playlist.findMany({
    include: { _count: { select: { songs: true } } },
  });
  return NextResponse.json(playlists);
}
