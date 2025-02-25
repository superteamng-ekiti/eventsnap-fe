"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import { QRCodeGenerator } from "./qr-code-generator";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export function ShareInviteLink() {
  //   const inviteUrl = window.location.href

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText("https://www.google.com");
      toast.success("Link copied to clipboard");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to copy link");
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Image src="/images/share.svg" alt="share" width={18} height={18} />
          Share Invite Link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Invite Link</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <QRCodeGenerator />
          <p className="text-sm text-center">
            Scan the QR code to join the event
          </p>
          <div className="flex items-center space-x-2">
            <Input
              readOnly
              value="https://www.google.com"
              className="flex-1 bg-[#FDF2EC]"
            />
            <Button variant="outline" size="icon" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
