"use client";

import React, { useState } from "react";
import { Music, Lock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface EditPlaylistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  description: string;
  isPublic: boolean;
  onSave: (name: string, description: string, isPublic: boolean) => void;
}

interface EditPlaylistFormProps {
  name: string;
  description: string;
  isPublic: boolean;
  onSave: (name: string, description: string, isPublic: boolean) => void;
  onClose: () => void;
}

function EditPlaylistForm(props: EditPlaylistFormProps) {
  const { name, description, isPublic, onSave, onClose } = props;
  const [editName, setEditName] = useState(name);
  const [editDescription, setEditDescription] = useState(description);
  const [editIsPublic, setEditIsPublic] = useState(isPublic);

  const handleSave = () => {
    onSave(editName, editDescription, editIsPublic);
    onClose();
  };

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

      <div className="flex gap-4 mb-4">
        <div className="size-45 shrink-0 rounded bg-[#3e3e3e] flex items-center justify-center shadow-lg">
          <Music className="size-16 text-[#7f7f7f]" />
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <div>
            <label className="text-xs text-[#b3b3b3] mb-1 block">Name</label>
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="bg-[#3e3e3e] border-none text-white text-sm placeholder:text-[#b3b3b3] focus-visible:ring-1 focus-visible:ring-white h-10"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-[#b3b3b3] mb-1 block">
              Description
            </label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Add an optional description"
              className="w-full h-25 bg-[#3e3e3e] text-white text-sm placeholder:text-[#b3b3b3] rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          className="rounded-full border-white/30 text-white bg-transparent hover:bg-transparent hover:border-white hover:scale-105 transition-all text-sm gap-2"
          onClick={() => setEditIsPublic(!editIsPublic)}
        >
          <Lock className="size-4" />
          {editIsPublic ? "Make private" : "Make public"}
        </Button>

        <Button
          className="rounded-full bg-white text-black hover:bg-white/90 hover:scale-105 transition-all font-bold px-8"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>

      <p className="text-[11px] text-[#b3b3b3] mt-4 font-bold">
        By proceeding, you agree to give Spotify access to the image you choose
        to upload. Please make sure you have the right to upload the image.
      </p>
    </>
  );
}

const EditPlaylistModal = (props: EditPlaylistModalProps) => {
  const { open, onOpenChange, name, description, isPublic, onSave } = props;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#282828] border-none text-white max-w-[524px] p-6 gap-0 [&>button]:hidden">
        {open && (
          <EditPlaylistForm
            key={`${name}-${description}-${isPublic}`}
            name={name}
            description={description}
            isPublic={isPublic}
            onSave={onSave}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(EditPlaylistModal);
