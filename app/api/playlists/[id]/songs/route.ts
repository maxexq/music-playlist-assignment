import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: playlistId } = await params;
  const { songId } = await request.json();

  const existing = await prisma.playlistSong.findUnique({
    where: { playlistId_songId: { playlistId, songId } },
  });

  if (existing) {
    return NextResponse.json({ error: "already_exists" }, { status: 409 });
  }

  const playlistSong = await prisma.playlistSong.create({
    data: { playlistId, songId },
  });

  return NextResponse.json(playlistSong);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: playlistId } = await params;
  const { songId } = await request.json();

  await prisma.playlistSong.delete({
    where: {
      playlistId_songId: { playlistId, songId },
    },
  });

  return NextResponse.json({ message: "Song removed from playlist" });
}
