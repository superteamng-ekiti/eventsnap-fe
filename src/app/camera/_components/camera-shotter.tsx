"use client";
import Webcam from "react-webcam";
import React, { useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";

const aspectRatio = {
  landscape: {
    width: 1920,
    height: 1080,
  },
  portrait: {
    width: 1080,
    height: 1920,
  },
} as const;

interface CameraShotterProps {
  type: "landscape" | "portrait";
  setCapturedImage: (image: string | null) => void;
}

export const CameraShotter = ({
  type = "portrait",
  setCapturedImage,
}: CameraShotterProps) => {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const image = webcamRef.current?.getScreenshot();
    setCapturedImage(image || null);
  }, [setCapturedImage]);

  return (
    <div className="relative h-[100svh] w-screen flex flex-col items-center">
      <div className="relative w-full h-full">
        <Webcam
          ref={webcamRef}
          mirrored={type === "landscape"}
          screenshotFormat="image/jpeg"
          screenshotQuality={1}
          videoConstraints={{
            facingMode: "user",
            ...aspectRatio[type],
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center justify-between">
        <Button onClick={capture}>Capture</Button>
      </div>
    </div>
  );
};
