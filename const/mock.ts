export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
}

// Mock data
export const songs: Song[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 200,
    coverUrl:
      "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
  },
  {
    id: "2",
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    duration: 233,
    coverUrl:
      "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
  },
  {
    id: "3",
    title: "Dance Monkey",
    artist: "Tones and I",
    album: "The Kids Are Coming",
    duration: 209,
    coverUrl:
      "https://i.scdn.co/image/ab67616d0000b2732e02117d76426a08ac7c174f",
  },
  {
    id: "4",
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    album: "Divinely Uninspired to a Hellish Extent",
    duration: 182,
    coverUrl:
      "https://i.scdn.co/image/ab67616d0000b273fc2101e6889d6ce9025f85f2",
  },
  {
    id: "5",
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    duration: 174,
    coverUrl:
      "https://i.scdn.co/image/ab67616d0000b27377fdcfda6535601aff081b6a",
  },
  {
    id: "6",
    title: "Bad Guy",
    artist: "Billie Eilish",
    album: "When We All Fall Asleep, Where Do We Go?",
    duration: 194,
    coverUrl:
      "https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce",
  },
  {
    id: "7",
    title: "Uptown Funk",
    artist: "Mark Ronson ft. Bruno Mars",
    album: "Uptown Special",
    duration: 269,
    coverUrl:
      "https://i.scdn.co/image/ab67616d0000b2737b1b6f41c1645af9757d5616",
  },
  {
    id: "8",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: 203,
    coverUrl:
      "https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946",
  },
  {
    id: "9",
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    album: "F*CK LOVE 3: OVER YOU",
    duration: 141,
    coverUrl:
      "https://i.scdn.co/image/ab67616d0000b2738e6551a2944764bc8e33a960",
  },
  {
    id: "10",
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    duration: 167,
    coverUrl:
      "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f0",
  },
];
