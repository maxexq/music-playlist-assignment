import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { songId } = await request.json();
  const playlistId = params.id;

  const updatedPlaylist = await prisma.playlist.update({
    where: { id: playlistId },
    data: {
      songs: {
        connect: { id: songId },
      },
    },
  });

  return NextResponse.json(updatedPlaylist);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { songId } = await request.json();
  const playlistId = params.id;

  await prisma.playlist.update({
    where: { id: playlistId },
    data: {
      songs: {
        disconnect: { id: songId },
      },
    },
  });

  return NextResponse.json({ message: "Song removed from playlist" });
}
