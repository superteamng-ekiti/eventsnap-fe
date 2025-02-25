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
import { recoletaBlack } from "@/app/font";

export function ShareInviteLink() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Image src="/images/share.svg" alt="share" width={18} height={18} />
            Share Invite Link
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={`${recoletaBlack.className}`}>
              Share code
            </DialogTitle>
          </DialogHeader>

          <div
            className="flex flex-col gap-4 border-2 border-dashed pt-3 pb-3 ml-8 mr-8
      border-[#C79800]"
          >
            <div className="flex justify-center text-center">
              <Image
                src="/images/logo.svg"
                alt="eventsnap logo"
                width={80}
                height={20}
                className="w-16 h-auto md:w-[80px]"
              />
            </div>
            <QRCodeGenerator />
            <div
              className={`text-3x1 text-center ${recoletaBlack.className} font-bold`}
            >
              Youth Hangout
            </div>
            <p className="text-xs flex justify-center text-center">
              Event ID: 6DITL4MM45MN
            </p>
            <div className="flex justify-center items-center gap-3">
              <div className="text-sm font-medium pt-[5px] pb-[5px] pl-6 pr-6 rounded-xl bg-[#FBC00233] cursor-pointer">
                Download
              </div>
              <div className="text-sm font-medium pt-[5px] pb-[5px] pl-8 pr-8 rounded-xl bg-[#FBC002] cursor-pointer">
                share
              </div>
            </div>
            <div className="flex items-center space-x-2"></div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
