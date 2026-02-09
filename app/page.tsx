"use client";

import { Sidebar } from "@/components/molecules/Sidebar";
import PlaylistHeader from "@/components/molecules/PlaylistHeader";
import PlaylistTable from "@/components/molecules/PlaylistTable";
import FindSongs from "@/components/molecules/FindSongs";
import { useState, useMemo, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  fetchPlaylists,
  fetchPlaylist,
  createPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  updatePlaylist,
  deletePlaylist,
} from "@/services/playlists";
import EditPlaylistModal from "@/components/molecules/EditPlaylistModal";
import { toast } from "sonner";

export default function Home() {
  const queryClient = useQueryClient();
  const [currentPlaylistId, setCurrentPlaylistId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showFindSongs, setShowFindSongs] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSelectPlaylist = useCallback((id: string) => {
    setCurrentPlaylistId(id);
    setShowSidebar(false);
  }, []);

  const { data: playlistsData = [], isLoading: loadingPlaylists } = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchPlaylists,
  });

  const activePlaylistId = useMemo(() => {
    if (currentPlaylistId) return currentPlaylistId;
    return playlistsData.length > 0 ? playlistsData[0].id : null;
  }, [currentPlaylistId, playlistsData]);

  const { data: currentPlaylist, isLoading: loadingPlaylist } = useQuery({
    queryKey: ["playlist", activePlaylistId],
    queryFn: () => fetchPlaylist(activePlaylistId!),
    enabled: !!activePlaylistId,
  });

  const createPlaylistMutation = useMutation({
    mutationFn: (name: string) => createPlaylist(name),
    onSuccess: (newPlaylist) => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      setCurrentPlaylistId(newPlaylist.id);
      toast.success("Playlist created");
    },
    onError: () => toast.error("Failed to create playlist"),
  });

  const addSongMutation = useMutation({
    mutationFn: (songId: string) =>
      addSongToPlaylist(activePlaylistId!, songId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlist", activePlaylistId],
      });
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      toast.success("Song added to playlist");
    },
    onError: (error: Error) =>
      toast.error(
        error.message === "ALREADY_EXISTS"
          ? "Already in your playlist"
          : "Failed to add song",
      ),
  });

  const addSongToOtherPlaylistMutation = useMutation({
    mutationFn: ({
      songId,
      playlistId,
    }: {
      songId: string;
      playlistId: string;
    }) => addSongToPlaylist(playlistId, songId),
    onSuccess: (_data, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: ["playlist", playlistId] });
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      const playlistName = playlistsData.find((p) => p.id === playlistId)?.name;
      toast.success(`Added to ${playlistName ?? "playlist"}`);
    },
    onError: (error: Error, { playlistId }) => {
      const playlistName = playlistsData.find((p) => p.id === playlistId)?.name;
      toast.error(
        error.message === "ALREADY_EXISTS"
          ? `Already in ${playlistName ?? "playlist"}`
          : "Failed to add song",
      );
    },
  });

  const removeSongMutation = useMutation({
    mutationFn: (songId: string) =>
      removeSongFromPlaylist(activePlaylistId!, songId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlist", activePlaylistId],
      });
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      toast.success("Song removed from playlist");
    },
    onError: () => toast.error("Failed to remove song"),
  });

  const updatePlaylistMutation = useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      isPublic: boolean;
    }) => updatePlaylist(activePlaylistId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlist", activePlaylistId],
      });
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      toast.success("Playlist updated");
    },
    onError: () => toast.error("Failed to update playlist"),
  });

  const deletePlaylistMutation = useMutation({
    mutationFn: () => deletePlaylist(activePlaylistId!),
    onSuccess: () => {
      const remaining = playlistsData.filter((p) => p.id !== activePlaylistId);
      setCurrentPlaylistId(remaining.length > 0 ? remaining[0].id : null);
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      toast.success("Playlist deleted");
    },
    onError: () => toast.error("Failed to delete playlist"),
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
    coverImages: p.coverImages,
    songCount: p._count.songs,
  }));

  const tableSongs = (currentPlaylist?.songs ?? [])
    .map((entry) => ({
      id: entry.song.id,
      title: entry.song.title,
      artist: entry.song.artist,
      album: entry.song.album ?? "",
      duration: Math.floor(entry.song.durationMs / 1000),
      coverUrl: entry.song.coverUrl ?? "",
      dateAdded: entry.dateAdded,
    }))
    .filter((song) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        song.title.toLowerCase().includes(q) ||
        song.artist.toLowerCase().includes(q) ||
        song.album.toLowerCase().includes(q)
      );
    });

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
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          playlists={sidebarPlaylists}
          currentPlaylistId={activePlaylistId}
          onSelectPlaylist={handleSelectPlaylist}
          onCreatePlaylist={() =>
            createPlaylistMutation.mutate(
              `My Playlist #${playlistsData.length + 1}`,
            )
          }
          loading={loadingPlaylists}
        />
      </div>

      <main className="flex-1 overflow-y-auto bg-linear-to-b from-[#535353] to-[#121212]">
        <div className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 md:hidden bg-[#535353]/90 backdrop-blur-sm">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-full bg-black/40 text-white hover:bg-black/60"
            onClick={() => setShowSidebar(true)}
          >
            <Menu className="size-5" />
          </Button>
          {currentPlaylist && (
            <h2 className="text-sm font-bold text-white truncate">
              {currentPlaylist.name}
            </h2>
          )}
        </div>
        {activePlaylistId ? (
          loadingPlaylist ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
            </div>
          ) : currentPlaylist ? (
            <>
              <PlaylistHeader
                name={currentPlaylist.name}
                description={currentPlaylist.description ?? undefined}
                coverImages={coverImages}
                songCount={currentPlaylist.songs.length}
                durationInMilliSeconds={totalDurationMs}
                isPublic={currentPlaylist.isPublic}
                onSearch={handleToggleSearch}
                showSearch={showSearch}
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
                onDelete={() => deletePlaylistMutation.mutate()}
                onEditDetails={() => setShowEditModal(true)}
                onTogglePublic={() =>
                  updatePlaylistMutation.mutate({
                    name: currentPlaylist.name,
                    description: currentPlaylist.description ?? "",
                    isPublic: !currentPlaylist.isPublic,
                  })
                }
              />

              <EditPlaylistModal
                open={showEditModal}
                onOpenChange={setShowEditModal}
                name={currentPlaylist.name}
                description={currentPlaylist.description ?? ""}
                isPublic={currentPlaylist.isPublic}
                coverImages={coverImages}
                onSave={(name, description, isPublic) =>
                  updatePlaylistMutation.mutate({ name, description, isPublic })
                }
              />

              <PlaylistTable
                songs={tableSongs}
                playlists={playlistsData.map((p) => ({
                  id: p.id,
                  name: p.name,
                }))}
                onAddToPlaylist={(songId, playlistId) =>
                  addSongToOtherPlaylistMutation.mutate({ songId, playlistId })
                }
                onRemoveFromPlaylist={(songId) =>
                  removeSongMutation.mutate(songId)
                }
              />

              {showFindSongs ? (
                <FindSongs
                  onClose={() => setShowFindSongs(false)}
                  onAddSong={(songId) => addSongMutation.mutate(songId)}
                />
              ) : (
                <div className="flex justify-end px-3 sm:px-6 py-4 sm:py-6">
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
