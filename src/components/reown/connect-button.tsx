"use client";

import React from "react";
import { Button } from "../ui/button";
import { useAppKit, useAppKitAccount, useDisconnect } from "@reown/appkit/react";
import { truncateAddress } from "@/lib/utils";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DropdownMenu } from "../ui/dropdown-menu";

interface ConnectButtonProps {
  size?: "sm" | "lg";
}

export const ConnectButton = ({ size = "lg" }: ConnectButtonProps) => {
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAppKitAccount();
  return (
    <>
      {isConnected ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={size} variant="outline" onClick={() => open()}>
              {truncateAddress(address ?? "")}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => disconnect()}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button size={size} disabled={isConnected} onClick={() => open()}>
          {isConnected ? truncateAddress(address ?? "") : "Connect Wallet"}
        </Button>
      )}
    </>
  );
};
