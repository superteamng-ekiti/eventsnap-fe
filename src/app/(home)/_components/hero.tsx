import { recoletaBlack } from "@/app/font";
import { ConnectButton } from "@/components/reown/connect-button";
import Image from "next/image";
import React from "react";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-12 relative z-10">
      <h1
        className={`text-5xl font-bold ${recoletaBlack.className} max-w-[900px] text-center leading-tight`}
      >
        Because Every Event{" "}
        <span className="inline-block animate-shake">
          <Image
            className="inline-block"
            src="/images/memory.png"
            alt="memory"
            width={195}
            height={72}
          />
        </span>
        {" "}
        Deserves to Be Remembered.
      </h1>
      <p className="text-lg text-center mt-1 max-w-[700px]">
        From the first selfie to the last dance, keep every photo from your
        event safe, shared, and unforgettable.
      </p>

      <div className="flex items-center justify-center mt-6">
        <ConnectButton size="lg" />
      </div>
    </div>
  );
};
