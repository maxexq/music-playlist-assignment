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
  try {
    const playlists = await prisma.playlist.findMany({
      include: {
        songs: {
          include: { song: true },
        },
      },
    });

    const result = playlists.map((p) => ({
      id: p.id,
      name: p.name,
      createdAt: p.createdAt,
      isPublic: p.isPublic,
      _count: { songs: p.songs.length },
    }));

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
