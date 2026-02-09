"use client";

import { Sidebar } from "@/components/molecules/Sidebar";
import PlaylistHeader from "@/components/molecules/PlaylistHeader";
import PlaylistTable from "@/components/molecules/PlaylistTable";
import FindSongs from "@/components/molecules/FindSongs";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  fetchPlaylists,
  fetchPlaylist,
  createPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} from "@/services/playlists";

export default function Home() {
  const queryClient = useQueryClient();
  const [currentPlaylistId, setCurrentPlaylistId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showFindSongs, setShowFindSongs] = useState(false);

  const { data: playlistsData = [], isLoading: loadingPlaylists } = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchPlaylists,
  });

  const { data: currentPlaylist, isLoading: loadingPlaylist } = useQuery({
    queryKey: ["playlist", currentPlaylistId],
    queryFn: () => fetchPlaylist(currentPlaylistId!),
    enabled: !!currentPlaylistId,
  });

  const createPlaylistMutation = useMutation({
    mutationFn: (name: string) => createPlaylist(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
  });

  const addSongMutation = useMutation({
    mutationFn: (songId: string) =>
      addSongToPlaylist(currentPlaylistId!, songId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlist", currentPlaylistId],
      });
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
  });

  const removeSongMutation = useMutation({
    mutationFn: (songId: string) =>
      removeSongFromPlaylist(currentPlaylistId!, songId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlist", currentPlaylistId],
      });
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
  });

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery("");
    }
  };

  const sidebarPlaylists = playlistsData.map((p) => ({
    id: p.id,
    name: p.name,
    description: `${p._count.songs} song${p._count.songs === 1 ? "" : "s"}`,
    coverUrl: "",
    songIds: Array(p._count.songs).fill(""),
  }));

  const tableSongs = (currentPlaylist?.songs ?? []).map((entry) => ({
    id: entry.song.id,
    title: entry.song.title,
    artist: entry.song.artist,
    album: entry.song.album ?? "",
    duration: Math.floor(entry.song.durationMs / 1000),
    coverUrl: entry.song.coverUrl ?? "",
    dateAdded: entry.dateAdded,
  }));

  const coverImages = (currentPlaylist?.songs ?? [])
    .map((entry) => entry.song.coverUrl)
    .filter((url): url is string => !!url)
    .slice(0, 4);

  const totalDurationMs = (currentPlaylist?.songs ?? []).reduce(
    (sum, entry) => sum + entry.song.durationMs,
    0,
  );

  return (
    <div className="flex h-screen bg-black">
      <Sidebar
        playlists={sidebarPlaylists}
        currentPlaylistId={currentPlaylistId}
        onSelectPlaylist={setCurrentPlaylistId}
        onCreatePlaylist={() => createPlaylistMutation.mutate("New Playlist")}
        loading={loadingPlaylists}
      />

      <main className="flex-1 overflow-y-auto bg-linear-to-b from-[#535353] to-[#121212]">
        {currentPlaylistId ? (
          loadingPlaylist ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
            </div>
          ) : currentPlaylist ? (
            <>
              <PlaylistHeader
                name={currentPlaylist.name}
                coverImages={coverImages}
                songCount={currentPlaylist.songs.length}
                durationInMilliSeconds={totalDurationMs}
                onSearch={handleToggleSearch}
                showSearch={showSearch}
              />

              {/* Search Bar */}
              {showSearch && (
                <div className="px-6 mb-4">
                  <div className="relative max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#b3b3b3]" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search in playlist"
                      className="pl-10 pr-10 bg-[#ffffff1a] border-none text-white placeholder:text-[#b3b3b3] focus-visible:ring-1 focus-visible:ring-white"
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 size-6 hover:bg-transparent text-[#b3b3b3] hover:text-white"
                        onClick={() => setSearchQuery("")}
                      >
                        <X className="size-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <PlaylistTable
                songs={tableSongs}
                playlists={playlistsData.map((p) => ({
                  id: p.id,
                  name: p.name,
                }))}
                onPlaySong={() => {}}
                onPauseSong={() => {}}
                onLikeSong={() => {}}
                onUnlikeSong={() => {}}
                onAddToQueue={() => {}}
                onAddToPlaylist={(songId, playlistId) =>
                  addSongToPlaylist(playlistId, songId)
                }
                onRemoveFromPlaylist={(songId) =>
                  removeSongMutation.mutate(songId)
                }
                onGoToArtist={() => {}}
                onGoToAlbum={() => {}}
                onStartRadio={() => {}}
                onShare={() => {}}
              />

              {showFindSongs ? (
                <FindSongs
                  onClose={() => setShowFindSongs(false)}
                  onAddSong={(songId) => addSongMutation.mutate(songId)}
                />
              ) : (
                <div className="flex justify-end px-6 py-6">
                  <button
                    className="text-sm font-bold text-white transition-colors cursor-pointer"
                    onClick={() => setShowFindSongs(true)}
                  >
                    Find more
                  </button>
                </div>
              )}
            </>
          ) : null
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                Select a playlist
              </h2>
              <p className="text-[#b3b3b3]">
                Choose a playlist from the sidebar to view its contents
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
