import { useState } from "react";
import { api } from "@/lib/axios";

interface UploadImageResponse {
  response: {
    file_hash: string;
    file_id: string;
  }[];
}

export function useUploadImage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadImage = async (files: File[]) => {
    if (!files.length) throw new Error("No files provided");

    try {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      files.forEach((file) => {
        if (!file.type.startsWith("image/"))
          throw new Error(`File ${file.name} is not an image`);
        formData.append("image", file, file.name);
      });

      // Make sure to set the correct headers
      const { response } = await api.post<UploadImageResponse>(
        "/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to upload image")
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadImage, isLoading, error };
}
