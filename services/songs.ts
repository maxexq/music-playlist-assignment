export interface SearchResult {
  id: string;
  title: string;
  artist: string;
  album: string | null;
  durationMs: number;
  coverUrl: string | null;
}

export async function searchSongs(query: string): Promise<SearchResult[]> {
  const res = await fetch(
    `/api/songs/search?query=${encodeURIComponent(query)}`,
  );
  if (!res.ok) throw new Error("Failed to search songs");
  return res.json();
}
