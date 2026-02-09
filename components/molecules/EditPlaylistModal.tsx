"use client";

import React, { useEffect, useRef, useState } from "react";
import { Lock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import PlaylistCover from "@/components/atoms/PlaylistCover";

interface EditPlaylistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  description: string;
  isPublic: boolean;
  coverImages?: string[];
  onSave: (name: string, description: string, isPublic: boolean) => void;
}

interface EditPlaylistFormProps {
  name: string;
  description: string;
  isPublic: boolean;
  coverImages: string[];
  onSave: (name: string, description: string, isPublic: boolean) => void;
  onClose: () => void;
}

function EditPlaylistForm(props: EditPlaylistFormProps) {
  const { name, description, isPublic, coverImages, onSave, onClose } = props;
  const [editName, setEditName] = useState(name);
  const [editDescription, setEditDescription] = useState(description);
  const [editIsPublic, setEditIsPublic] = useState(isPublic);

  const inputNamRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onSave(editName, editDescription, editIsPublic);
    onClose();
  };

  useEffect(() => {
    inputNamRef.current?.focus();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <DialogTitle className="text-xl font-bold">Edit details</DialogTitle>
        <Button
          variant="ghost"
          size="icon"
          className="text-[#b3b3b3] hover:text-white hover:bg-transparent size-8"
          onClick={onClose}
        >
          <X className="size-5" />
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="self-center sm:self-start shrink-0">
          <PlaylistCover
            images={coverImages}
            size={180}
            className="shadow-lg"
          />
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <div>
            <label className="text-xs text-[#b3b3b3] mb-1 block">Name</label>
            <Input
              ref={inputNamRef}
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="bg-[#3e3e3e] border-none text-white text-sm placeholder:text-[#b3b3b3] focus-visible:ring-1 focus-visible:ring-white h-10"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-xs text-[#b3b3b3] mb-1 block">
              Description
            </label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Add an optional description"
              className="w-full flex-1 min-h-20 bg-[#3e3e3e] text-white text-sm placeholder:text-[#b3b3b3] rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
        <Button
          variant="outline"
          className="cursor-pointer rounded-full border-white/30 text-white! bg-transparent hover:bg-transparent hover:border-white hover:scale-105 transition-all text-sm gap-2 w-full sm:w-auto"
          onClick={() => setEditIsPublic(!editIsPublic)}
        >
          <Lock className="size-4" />
          {editIsPublic ? "Make private" : "Make public"}
        </Button>

        <Button
          className="cursor-pointer rounded-full bg-white text-black hover:bg-white/90 hover:scale-105 transition-all font-bold px-8 w-full sm:w-auto"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </>
  );
}

const EditPlaylistModal = (props: EditPlaylistModalProps) => {
  const {
    open,
    onOpenChange,
    name,
    description,
    isPublic,
    coverImages = [],
    onSave,
  } = props;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#282828] border-none text-white max-w-[calc(100vw-2rem)] sm:max-w-131 p-4 sm:p-6 gap-0 [&>button]:hidden">
        {open && (
          <EditPlaylistForm
            key={`${name}-${description}-${isPublic}`}
            name={name}
            description={description}
            isPublic={isPublic}
            coverImages={coverImages}
            onSave={onSave}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(EditPlaylistModal);
