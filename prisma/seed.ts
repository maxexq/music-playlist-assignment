import { prisma } from "@/lib/prisma";

async function main() {
  await prisma.playlistSong.deleteMany();
  await prisma.playlist.deleteMany();
  await prisma.song.deleteMany();

  const songs = await Promise.all([
    prisma.song.create({
      data: {
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        durationMs: 200040,
        coverUrl:
          "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
      },
    }),
    prisma.song.create({
      data: {
        title: "Shape of You",
        artist: "Ed Sheeran",
        album: "÷ (Divide)",
        durationMs: 233713,
        coverUrl:
          "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
      },
    }),
    prisma.song.create({
      data: {
        title: "Dance Monkey",
        artist: "Tones and I",
        album: "The Kids Are Coming",
        durationMs: 209438,
        coverUrl:
          "https://i.scdn.co/image/ab67616d0000b2732e02117d76426a08ac7c174f",
      },
    }),
    prisma.song.create({
      data: {
        title: "Someone You Loved",
        artist: "Lewis Capaldi",
        album: "Divinely Uninspired to a Hellish Extent",
        durationMs: 182161,
        coverUrl:
          "https://i.scdn.co/image/ab67616d0000b273fc2101e6889d6ce9025f85f2",
      },
    }),
    prisma.song.create({
      data: {
        title: "Watermelon Sugar",
        artist: "Harry Styles",
        album: "Fine Line",
        durationMs: 174000,
        coverUrl:
          "https://i.scdn.co/image/ab67616d0000b27377fdcfda6535601aff081b6a",
      },
    }),
    prisma.song.create({
      data: {
        title: "Bad Guy",
        artist: "Billie Eilish",
        album: "When We All Fall Asleep, Where Do We Go?",
        durationMs: 194088,
        coverUrl:
          "https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce",
      },
    }),
    prisma.song.create({
      data: {
        title: "Uptown Funk",
        artist: "Mark Ronson ft. Bruno Mars",
        album: "Uptown Special",
        durationMs: 269667,
        coverUrl:
          "https://i.scdn.co/image/ab67616d0000b2737b1b6f41c1645af9757d5616",
      },
    }),
    prisma.song.create({
      data: {
        title: "Levitating",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        durationMs: 203064,
        coverUrl:
          "https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946",
      },
    }),
    prisma.song.create({
      data: {
        title: "Stay",
        artist: "The Kid LAROI & Justin Bieber",
        album: "F*CK LOVE 3: OVER YOU",
        durationMs: 141806,
        coverUrl:
          "https://i.scdn.co/image/ab67616d0000b2738e6551a2944764bc8e33a960",
      },
    }),
    prisma.song.create({
      data: {
        title: "As It Was",
        artist: "Harry Styles",
        album: "Harry's House",
        durationMs: 167303,
        coverUrl:
          "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f0",
      },
    }),
  ]);

  await prisma.playlist.create({
    data: {
      name: "Top Hits",
      isPublic: true,
      songs: {
        create: songs.slice(0, 5).map((s) => ({ songId: s.id })),
      },
    },
  });

  await prisma.playlist.create({
    data: {
      name: "Chill Vibes",
      isPublic: true,
      songs: {
        create: [songs[3], songs[4], songs[7], songs[9]].map((s) => ({
          songId: s.id,
        })),
      },
    },
  });

  await prisma.playlist.create({
    data: {
      name: "Party Mix",
      isPublic: false,
      songs: {
        create: [songs[0], songs[2], songs[5], songs[6], songs[8]].map((s) => ({
          songId: s.id,
        })),
      },
    },
  });

  console.log("Seeded 10 songs and 3 playlists.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
