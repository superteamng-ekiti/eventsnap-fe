"use client";
import React from "react";
import { useQRCode } from "next-qrcode";

export const QRCodeGenerator = () => {
  const { Canvas } = useQRCode();
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="rounded-2xl mt-4 overflow-hidden">
        <Canvas
          text={"https://github.com/bunlong/next-qrcode"}
          options={{
            errorCorrectionLevel: "M",
            margin: 3,
            scale: 4,
            width: 250,
            color: {
              dark: "#1B1B1B",
              light: "#FDF2EC",
            },
          }}
        />
      </div>
    </div>
  );
};
