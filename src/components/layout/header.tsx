"use client";
import Image from "next/image";
import React from "react";
import { ConnectButton } from "../reown/connect-button";
import { useAppKitAccount } from "@reown/appkit/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const { isConnected } = useAppKitAccount();
  const pathname = usePathname();
  return (
    <div className="w-full container mx-auto px-4 2xl:px-0 flex justify-between items-center py-2 md:py-8 z-[500] sticky top-0 bg-[#FDF2EC]">
      <Link href="/">
        <Image
          src="/images/logo.svg"
          alt="eventsnap logo"
          width={165}
          height={40}
          className="w-24 h-auto md:w-[165px]"
        />
      </Link>

      {isConnected && (
        <div className="flex items-center gap-2">
          <Link
            href="/events"
            className={`text-base ${
              pathname === "/events"
                ? "text-primary font-semibold"
                : "text-foreground/60 hover:text-foreground font-medium"
            }`}
          >
            Events
          </Link>
        </div>
      )}

      <ConnectButton size="sm" />
    </div>
  );
};
