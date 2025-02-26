"use client";

import ImageUploader from "@/components/global/image-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUploadImage } from "@/hooks/api/use-upload-image";
import { useEventSnap } from "@/services/event-program";
import { Plus } from "lucide-react";
import React, { useState } from "react";

import { v4 as uuidv4 } from 'uuid';


export const CreateEventsModal = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { createEvent } = useEventSnap();

  const { uploadImage: mutateUploadImage, isLoading: isUploading } = useUploadImage();

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoading(true);
    if (files.length === 0) {
      alert("Please upload an image");
      return;
    }

    const image = files[0];

    const { file_hash } = await mutateUploadImage([image]);

    await createEvent(
      uuidv4(),
      name,
      file_hash
    )

    setLoading(false);

    // TODO: CALL THE CREATE EVENTS FUNCTION
    // TODO: CLOSE THE MODAL
    // TODO: REFRESH THE EVENTS LIST
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>
            Create a new event here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label>What’s the name of your event?</Label>
            <Input
              placeholder="Event Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <ImageUploader
            multiple={false}
            allowedTypes={["image/jpeg", "image/png"]}
            files={files}
            onFilesChange={setFiles}
          />
        </div>
        <DialogFooter>
          <Button
            size="sm"
            disabled={!name || files.length === 0 || loading || isUploading}
            onClick={handleSave}
          >
            {loading || isUploading ? "Creating..." : "Create Event"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
