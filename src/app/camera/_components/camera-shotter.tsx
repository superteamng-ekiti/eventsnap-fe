"use client";
import Webcam from "react-webcam";
import React, { useCallback, useRef } from "react";
import { RefreshCcw } from "lucide-react";

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
  const [facingMode, setFacingMode] = React.useState<"user" | "environment">("user");

  const capture = useCallback(() => {
    const image = webcamRef.current?.getScreenshot();
    setCapturedImage(image || null);
  }, [setCapturedImage]);

  const handleCameraSwitch = useCallback(() => {
    setFacingMode(prevMode => prevMode === "user" ? "environment" : "user");
  }, []);

  return (
    <div className="relative h-[100svh] w-screen flex flex-col items-center">
      <div className="relative w-full h-full">
        <Webcam
          ref={webcamRef}
          mirrored={type === "landscape" && facingMode === "user"}
          screenshotFormat="image/jpeg"
          screenshotQuality={2}
          videoConstraints={{
            facingMode,
            ...aspectRatio[type],
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center justify-between w-full px-8">
        <div />
        <div className="rounded-full border-4 border-white hover:scale-90 transition-all duration-300">
          <div
            className="w-14 h-14 bg-white rounded-full border-2 border-black"
            onClick={capture}
          />
        </div>
        <div
          onClick={handleCameraSwitch}
          className="w-12 h-12 rounded-full bg-black/70 hover:bg-black/80 transition-all duration-300 flex items-center justify-center"
        >
          <RefreshCcw className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
};
