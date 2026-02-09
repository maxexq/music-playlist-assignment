import type { SearchResult } from "./songs";

export interface PlaylistSummary {
  id: string;
  name: string;
  createdAt: string;
  isPublic: boolean;
  _count: { songs: number };
  coverImages: string[];
}

export interface PlaylistSongEntry {
  songId: string;
  playlistId: string;
  dateAdded: string;
  song: SearchResult;
}

export interface PlaylistDetail {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  isPublic: boolean;
  songs: PlaylistSongEntry[];
}

export interface UpdatePlaylistData {
  name?: string;
  description?: string;
  isPublic?: boolean;
}

export async function fetchPlaylists(): Promise<PlaylistSummary[]> {
  const res = await fetch("/api/playlists");
  if (!res.ok) throw new Error("Failed to fetch playlists");
  return res.json();
}

export async function fetchPlaylist(id: string): Promise<PlaylistDetail> {
  const res = await fetch(`/api/playlists/${id}`);
  if (!res.ok) throw new Error("Failed to fetch playlist");
  return res.json();
}

export async function createPlaylist(name: string): Promise<PlaylistSummary> {
  const res = await fetch("/api/playlists", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to create playlist");
  return res.json();
}

export async function addSongToPlaylist(
  playlistId: string,
  songId: string,
): Promise<void> {
  const res = await fetch(`/api/playlists/${playlistId}/songs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ songId }),
  });
  if (res.status === 409) throw new Error("ALREADY_EXISTS");
  if (!res.ok) throw new Error("Failed to add song to playlist");
}

export async function updatePlaylist(
  id: string,
  data: UpdatePlaylistData,
): Promise<PlaylistDetail> {
  const res = await fetch(`/api/playlists/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update playlist");
  return res.json();
}

export async function deletePlaylist(id: string): Promise<void> {
  const res = await fetch(`/api/playlists/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete playlist");
}

export async function removeSongFromPlaylist(
  playlistId: string,
  songId: string,
): Promise<void> {
  const res = await fetch(`/api/playlists/${playlistId}/songs`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ songId }),
  });
  if (!res.ok) throw new Error("Failed to remove song from playlist");
}
