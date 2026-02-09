"use client";

import { Sidebar } from "@/components/molecules/Sidebar";
import PlaylistHeader from "@/components/molecules/PlaylistHeader";
import PlaylistTable from "@/components/molecules/PlaylistTable";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { songs } from "@/const/mock";

export default function Home() {
  const [currentPlaylistId, setCurrentPlaylistId] = useState<string | null>(
    null,
  );
  const [currentPlayingSongId, setCurrentPlayingSongId] = useState<
    string | null
  >(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongIds, setLikedSongIds] = useState<string[]>([]);
  const [likedPlaylistIds, setLikedPlaylistIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [queue, setQueue] = useState<string[]>([]);

  // const currentPlaylist = playlists.find((p) => p.id === currentPlaylistId);

  // const filteredSongs = useMemo(() => {
  //   if (!searchQuery) return playlistSongs;
  //   const query = searchQuery.toLowerCase();
  //   return playlistSongs.filter(
  //     (song) =>
  //       song.title.toLowerCase().includes(query) ||
  //       song.artist.toLowerCase().includes(query) ||
  //       song.album.toLowerCase().includes(query)
  //   );
  // }, [playlistSongs, searchQuery]);

  // const totalDuration = useMemo(() => {
  //   const totalSeconds = playlistSongs.reduce((acc, song) => acc + song.duration, 0);
  //   const hours = Math.floor(totalSeconds / 3600);
  //   const mins = Math.floor((totalSeconds % 3600) / 60);
  //   if (hours > 0) {
  //     return `${hours} hr ${mins} min`;
  //   }
  //   return `${mins} min`;
  // }, [playlistSongs]);

  // const coverImages = useMemo(() => {
  //   return playlistSongs.slice(0, 4).map((song) => song.coverUrl);
  // }, [playlistSongs]);

  // Playlist Actions
  // const handleCreatePlaylist = async () => {
  //   const playlistNumbers = playlists
  //     .map((p) => {
  //       const match = p.name.match(/^My Playlist #(\d+)$/);
  //       return match ? parseInt(match[1]) : 0;
  //     })
  //     .filter((n) => n > 0);

  //   const nextNumber =
  //     playlistNumbers.length > 0 ? Math.max(...playlistNumbers) + 1 : 1;
  //   const playlistName = `My Playlist #${nextNumber}`;

  //   const newPlaylist = await createPlaylist(playlistName);
  //   if (newPlaylist) {
  //     setCurrentPlaylistId(newPlaylist.id);
  //     toast.success(`Playlist "${playlistName}" created!`);
  //   }
  // };

  // const handlePlay = () => {
  //   if (playlistSongs.length > 0) {
  //     setCurrentPlayingSongId(playlistSongs[0].id);
  //     setIsPlaying(true);
  //     toast.success(`Playing ${currentPlaylist?.name}`);
  //   }
  // };

  // const handleShuffle = () => {
  //   if (playlistSongs.length > 0) {
  //     const randomIndex = Math.floor(Math.random() * playlistSongs.length);
  //     setCurrentPlayingSongId(playlistSongs[randomIndex].id);
  //     setIsPlaying(true);
  //     toast.success("Shuffle enabled");
  //   }
  // };

  // const handleLikePlaylist = () => {
  //   if (!currentPlaylistId) return;
  //   if (likedPlaylistIds.includes(currentPlaylistId)) {
  //     setLikedPlaylistIds(likedPlaylistIds.filter((id) => id !== currentPlaylistId));
  //     toast.success("Removed from Your Library");
  //   } else {
  //     setLikedPlaylistIds([...likedPlaylistIds, currentPlaylistId]);
  //     toast.success("Added to Your Library");
  //   }
  // };

  // const handleAddPlaylistToQueue = () => {
  //   if (currentPlaylist) {
  //     setQueue([...queue, ...currentPlaylist.songIds]);
  //     toast.success(`Added ${currentPlaylist.name} to queue`);
  //   }
  // };

  const handleDownload = () => {
    toast.success("Download started");
  };

  const handleShare = () => {
    toast.success("Link copied to clipboard");
  };

  const handleEditPlaylist = () => {
    toast.info("Edit playlist dialog would open here");
  };

  // const handleDeletePlaylist = async () => {
  //   if (!currentPlaylistId) return;
  //   const playlistName = currentPlaylist?.name;
  //   const success = await deletePlaylist(currentPlaylistId);
  //   if (success) {
  //     setCurrentPlaylistId(null);
  //     toast.success(`Deleted "${playlistName}"`);
  //   }
  // };

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery("");
    }
  };

  // Song Actions
  // const handlePlaySong = (songId: string) => {
  //   setCurrentPlayingSongId(songId);
  //   setIsPlaying(true);
  //   const song = songs.find((s) => s.id === songId);
  //   if (song) {
  //     toast.success(`Now playing: ${song.title}`);
  //   }
  // };

  const handlePauseSong = () => {
    setIsPlaying(false);
  };

  const handleLikeSong = (songId: string) => {
    setLikedSongIds([...likedSongIds, songId]);
    toast.success("Added to Liked Songs");
  };

  const handleUnlikeSong = (songId: string) => {
    setLikedSongIds(likedSongIds.filter((id) => id !== songId));
    toast.success("Removed from Liked Songs");
  };

  const handleAddSongToQueue = (songId: string) => {
    setQueue([...queue, songId]);
    const song = songs.find((s) => s.id === songId);
    toast.success(`Added "${song?.title}" to queue`);
  };

  // const handleAddToPlaylist = async (songId: string, playlistId: string) => {
  //   const playlist = playlists.find((p) => p.id === playlistId);
  //   if (playlist && !playlist.songIds.includes(songId)) {
  //     await updatePlaylist(playlistId, {
  //       songIds: [...playlist.songIds, songId],
  //     });
  //     const song = songs.find((s) => s.id === songId);
  //     toast.success(`Added "${song?.title}" to ${playlist.name}`);
  //   } else {
  //     toast.error("Song already in playlist");
  //   }
  // };

  // const handleRemoveFromPlaylist = async (songId: string) => {
  //   if (!currentPlaylist) return;
  //   await updatePlaylist(currentPlaylist.id, {
  //     songIds: currentPlaylist.songIds.filter((id) => id !== songId),
  //   });
  //   const song = songs.find((s) => s.id === songId);
  //   toast.success(`Removed "${song?.title}" from playlist`);
  // };

  const handleGoToArtist = (artist: string) => {
    toast.info(`Navigate to artist: ${artist}`);
  };

  const handleGoToAlbum = (album: string) => {
    toast.info(`Navigate to album: ${album}`);
  };

  const handleStartRadio = (songId: string) => {
    const song = songs.find((s) => s.id === songId);
    toast.success(`Starting radio based on "${song?.title}"`);
  };

  const handleShareSong = (songId: string) => {
    toast.success("Song link copied to clipboard");
  };

  const currentPlaylist = false;

  return (
    <div className="flex h-screen bg-black">
      <Sidebar
        playlists={[]}
        currentPlaylistId={currentPlaylistId}
        onSelectPlaylist={setCurrentPlaylistId}
        onCreatePlaylist={() => {}}
        loading={false}
      />

      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#535353] to-[#121212]">
        {currentPlaylist ? (
          <>
            <PlaylistHeader
              name={currentPlaylist.name}
              description={currentPlaylist.description}
              coverImages={coverImages}
              songCount={playlistSongs.length}
              totalDuration={totalDuration}
              isLiked={likedPlaylistIds.includes(currentPlaylist.id)}
              onPlay={handlePlay}
              onShuffle={handleShuffle}
              onLike={handleLikePlaylist}
              // onAddToQueue={handleAddPlaylistToQueue}
              onDownload={handleDownload}
              onShare={handleShare}
              onEdit={handleEditPlaylist}
              // onDelete={handleDeletePlaylist}
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
              songs={filteredSongs}
              playlists={playlists.map((p) => ({ id: p.id, name: p.name }))}
              currentPlayingSongId={currentPlayingSongId}
              isPlaying={isPlaying}
              likedSongIds={likedSongIds}
              // onPlaySong={handlePlaySong}
              onPauseSong={handlePauseSong}
              onLikeSong={handleLikeSong}
              onUnlikeSong={handleUnlikeSong}
              onAddToQueue={handleAddSongToQueue}
              // onAddToPlaylist={handleAddToPlaylist}
              // onRemoveFromPlaylist={handleRemoveFromPlaylist}
              onGoToArtist={handleGoToArtist}
              onGoToAlbum={handleGoToAlbum}
              onStartRadio={handleStartRadio}
              onShare={handleShareSong}
            />
          </>
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
