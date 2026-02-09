"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface SearchResult {
  id: string;
  title: string;
  artist: string;
  album: string | null;
  durationMs: number;
  coverUrl: string | null;
}

interface FindSongsProps {
  onClose: () => void;
  onAddSong: (songId: string) => void;
}

const FindSongs = ({ onClose, onAddSong }: FindSongsProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/songs/search?query=${encodeURIComponent(query.trim())}`,
        );
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="px-6 py-6 border-t border-[#ffffff1a]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-white">
          Let&apos;s find something for your playlist
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="text-[#b3b3b3] hover:text-white hover:bg-transparent"
          onClick={onClose}
        >
          <X className="size-6" />
        </Button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-sm mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#b3b3b3]" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for songs or episodes"
          className="pl-10 pr-10 bg-[#2a2a2a] border-none text-white text-sm placeholder:text-[#b3b3b3] focus-visible:ring-1 focus-visible:ring-white h-10 rounded-full"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 size-7 hover:bg-transparent text-[#b3b3b3] hover:text-white"
            onClick={() => setQuery("")}
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      {/* Results */}
      {loading && (
        <div className="py-4 text-[#b3b3b3] text-sm">Searching...</div>
      )}

      {!loading && results.length > 0 && (
        <div className="flex flex-col">
          {results.map((song) => (
            <div
              key={song.id}
              className="flex items-center justify-between py-2 px-2 rounded-md hover:bg-[#ffffff1a] group"
            >
              {/* Left: Cover + Title/Artist */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="relative size-10 rounded overflow-hidden shrink-0 bg-[#282828]">
                  {song.coverUrl ? (
                    <Image
                      src={song.coverUrl}
                      alt={song.title}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  ) : (
                    <div className="size-full bg-[#282828]" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-base text-white truncate">{song.title}</p>
                  <p className="text-sm text-[#b3b3b3] truncate">
                    {song.artist}
                  </p>
                </div>
              </div>

              {/* Middle: Album */}
              <div className="flex-1 min-w-0 px-4 hidden md:block">
                {song.album && (
                  <span className="text-sm text-[#b3b3b3] truncate">
                    {song.album}
                  </span>
                )}
              </div>

              {/* Right: Add Button */}
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 rounded-full border-[#b3b3b3] text-white hover:border-white hover:bg-transparent bg-transparent hover:scale-105 transition-transform"
                onClick={() => onAddSong(song.id)}
              >
                Add
              </Button>
            </div>
          ))}
        </div>
      )}

      {!loading && query.trim() && results.length === 0 && (
        <div className="py-4 text-[#b3b3b3] text-sm">
          No results found for &quot;{query}&quot;
        </div>
      )}
    </div>
  );
};

export default React.memo(FindSongs);
