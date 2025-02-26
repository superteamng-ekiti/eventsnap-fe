import { recoletaBold, recoletaMedium } from "@/app/font";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { ShareInviteLink } from "./share-invite-link";
import { ListFilter, ChevronLeft } from "lucide-react";
import { recoletaBlack } from "@/app/font";

const images = [
  { src: "/images/Ellipse-1.png", alt: "Image 1" },
  { src: "/images/Ellipse-2.png", alt: "Image 2" },
  { src: "/images/Ellipse.png", alt: "Image 3" },
];

export const EventHeaderImage = () => {
  return (
    <>
      {/* Header Image */}
      <div className='flex gap-3 align-center item-center mb-2'>
        <div className='p-1 rounded-full bg-[#D9D9D9]'>
          <ChevronLeft />
        </div>
        <div className={`text-3x1 text-center ${recoletaBlack.className} font-bold`}>
          Youth Hangout
        </div>
      </div>
      <div className="w-full h-[180px] relative rounded-xl overflow-hidden">
        <Image
          src="/images/event-header-image.jpg"
          alt="event header image"
          fill 
          className="object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/25" />
        <div className="absolute top-0 left-0 w-full h-full flex items-end justify-between px-10 pb-4">
          <div className="flex flex-col gap-0">
            <h3 className={`text-white text-2xl ${recoletaBold.className}`}>
              Youth Hangout
            </h3>
            <div className="flex items-center gap-2">
              <Image
                src="/images/location-white.svg"
                alt="location"
                width={24}
                height={24}
              />
              <p className="text-[#B1B1B1] text-sm">Lagos, Nigeria</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShareInviteLink />
            <Button size="sm">Upload Image</Button>
          </div>
        </div>
      </div>

      {/* Photos Section */}
      <div className="mt-4 flex justify-between">
        <div className="mb-2 text-[10px]">
          <span className="font-bold mr-2">51</span>Total Photos uploaded
        </div>
        <div className="flex items-center ">
          {images.map((img) => (
            <div
              key={img.alt}
              className="relative w-5 h-5 rounded-full overflow-hidden"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover h-5 w-5"
              />
            </div>
          ))}
          <ListFilter className="w-5 h-5 ml-4" />
        </div>
      </div>

      {/* Retrived side */}
      <div className="flex justify-between mt-2">
        <div className={` ${recoletaMedium.className}`}>Retrieve Image</div>
        <div className='gap-3'>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="checkboxOptions"
              className="form-checkbox text-blue-600"
            />
          </label>
          <span className='ml-2'>Select all</span>
        </div>
      </div>
    </>
  );
};
