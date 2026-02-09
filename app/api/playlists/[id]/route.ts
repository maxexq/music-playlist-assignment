import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const playlist = await prisma.playlist.findUnique({
    where: { id },
    include: {
      songs: {
        include: { song: true },
        orderBy: { dateAdded: "desc" },
      },
    },
  });

  if (!playlist) {
    return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
  }

  return NextResponse.json(playlist);
}
