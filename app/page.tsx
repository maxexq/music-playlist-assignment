"use client";

import { Sidebar } from "@/components/molecules/Sidebar";
import PlaylistHeader from "@/components/molecules/PlaylistHeader";
import PlaylistTable from "@/components/molecules/PlaylistTable";
import FindSongs from "@/components/molecules/FindSongs";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [currentPlaylistId, setCurrentPlaylistId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showFindSongs, setShowFindSongs] = useState(false);

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery("");
    }
  };

  const currentPlaylist = {
    name: "My Playlist",
    description: "My favorite songs",
    coverImages: ["https://example.com/cover.jpg"],
    songIds: ["song1", "song2", "song3"],
    id: "playlist1",
    coverImage: [
      "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
      "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
      "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
    ],
  };

  return (
    <div className="flex h-screen bg-black">
      <Sidebar
        playlists={[]}
        currentPlaylistId={currentPlaylistId}
        onSelectPlaylist={setCurrentPlaylistId}
        onCreatePlaylist={() => {}}
        loading={false}
      />

      <main className="flex-1 overflow-y-auto bg-linear-to-b from-[#535353] to-[#121212]">
        {currentPlaylist ? (
          <>
            <PlaylistHeader
              name={currentPlaylist.name}
              description={currentPlaylist.description}
              coverImages={currentPlaylist.coverImage}
              songCount={10}
              durationInMilliSeconds={1834325}
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

            {/*<PlaylistTable
              songs={songs}
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
            />*/}

            {/* Find more button / Find Songs section */}
            {showFindSongs ? (
              <FindSongs
                onClose={() => setShowFindSongs(false)}
                onAddSong={(songId) => {
                  console.log("Add song:", songId);
                }}
              />
            ) : (
              <div className="px-6 py-6">
                <button
                  className="text-sm font-bold text-[#b3b3b3] hover:text-white transition-colors cursor-pointer"
                  onClick={() => setShowFindSongs(true)}
                >
                  Find more
                </button>
              </div>
            )}
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
