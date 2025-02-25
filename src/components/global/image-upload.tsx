import React, { useCallback, useState, ChangeEvent, DragEvent } from "react";
import { X, ImagePlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageUploaderProps {
  multiple?: boolean;
  maxSize?: number;
  allowedTypes?: string[];
  files: File[];
  onFilesChange: (files: File[]) => void;
  onUpload?: (files: File[]) => Promise<void>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  multiple = false,
  maxSize = 5,
  allowedTypes = ["image/jpeg", "image/png"],
  files,
  onFilesChange
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const validateFile = useCallback(
    (file: File): boolean => {
      if (!allowedTypes.includes(file.type)) {
        alert("File type not supported. Please upload images only.");
        return false;
      }
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size should not exceed ${maxSize}MB`);
        return false;
      }
      return true;
    },
    [allowedTypes, maxSize]
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      const validFiles = droppedFiles.filter(validateFile);

      if (multiple) {
        onFilesChange([...files, ...validFiles]);
      } else {
        onFilesChange(validFiles.slice(0, 1));
      }
    },
    [validateFile, multiple, onFilesChange, files]
  );

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(validateFile);

    if (multiple) {
      onFilesChange([...files, ...validFiles]);
    } else {
      onFilesChange(validFiles.slice(0, 1));
    }
  };

  const removeFile = (index: number): void => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  const getFileSize = (size: number): string => {
    return (size / (1024 * 1024)).toFixed(2);
  };

  return (
    <div className="w-full">
      <Card className="border-2 border-dashed border-[#C79800] bg-[#FBC00214]">
        <CardContent className="p-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              flex flex-col items-center justify-center p-6 rounded-lg
              transition-colors duration-200
              ${isDragging ? "bg-[#FBC00214]" : "bg-transparent"}
              ${files.length === 0 ? "min-h-[100px]" : ""}
            `}
          >
            {files.length === 0 ? (
              <>
                <ImagePlus className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 text-center mb-2">
                  Drag and Drop file here or Choose file
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Supported formats: JPG, PNG (Max {maxSize}MB)
                </p>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  accept={allowedTypes.join(",")}
                  multiple={multiple}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  Choose File
                </Button>
              </>
            ) : (
              <div className="w-full space-y-4">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 relative">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium truncate max-w-[200px]">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {getFileSize(file.size)}MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  {multiple && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        document.getElementById("file-upload")?.click()
                      }
                    >
                      Add More
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageUploader;
