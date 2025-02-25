"use client";

import React from "react";
import Image from "next/image";
import { Download, Share2, Trash } from "lucide-react";
import { recoletaBold } from "@/app/font";

interface GalleryImage {
  src: string;
  alt: string;
}

export const EventImageGallery = () => {
  const [galleryImages, setGalleryImages] = React.useState<GalleryImage[]>([
    { src: "/images/image-1.jpg", alt: "Image 1" },
    { src: "/images/image-2.jpg", alt: "Image 2" },
    { src: "/images/image-3.jpg", alt: "Image 3" },
    { src: "/images/image-4.jpg", alt: "Image 4" },
  ]);

  // Download the image by creating an anchor element and triggering a click
  const downloadImage = (src: string) => {
    const link = document.createElement("a");
    link.href = src;
    const fileName = src.split("/").pop() || "downloaded-image.jpg";
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Remove the image from the gallery state
  const deleteImage = (alt: string) => {
    setGalleryImages((prev) => prev.filter((img) => img.alt !== alt));
  };

  // Open a Twitter share intent with a preset message and the image URL
  const shareImage = (src: string) => {
    const tweetText = "Check out this image!";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}&url=${encodeURIComponent(src)}`;
    window.open(twitterUrl, "_blank");
  };

  // Destructure images for easier use
  const img1 = galleryImages[0];
  const img2 = galleryImages[1];
  const img3 = galleryImages[2];
  const img4 = galleryImages[3];

  return (
    <div className="w-full">
      {/* Event Header Section */}
      <div className="relative h-[180px] rounded-xl overflow-hidden">
        <Image
          src="/images/event-header-image.jpg"
          alt="event header image"
          fill
          className="object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/25" />
        <div className="absolute bottom-4 left-10">
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
      </div>

      {/* Gallery Images Section */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {/* Left Column: Gallery Image 1 */}
        {img1 && (
          <div className="relative h-48 rounded-xl overflow-hidden group">
            <Image
              src={img1.src}
              alt={img1.alt}
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => downloadImage(img1.src)}
                className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
              >
                <Download size={16} />
              </button>
              <button
                onClick={() => shareImage(img1.src)}
                className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
              >
                <Share2 size={16} />
              </button>
              <button
                onClick={() => deleteImage(img1.alt)}
                className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Middle Column: Gallery Images 2 (top) and 3 (bottom) */}
        <div className="flex flex-col gap-2">
          {img2 && (
            <div className="relative h-24 rounded-xl overflow-hidden group">
              <Image
                src={img2.src}
                alt={img2.alt}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => downloadImage(img2.src)}
                  className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
                >
                  <Download size={16} />
                </button>
                <button
                  onClick={() => shareImage(img2.src)}
                  className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
                >
                  <Share2 size={16} />
                </button>
                <button
                  onClick={() => deleteImage(img2.alt)}
                  className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          )}
          {img3 && (
            <div className="relative h-24 rounded-xl overflow-hidden group">
              <Image
                src={img3.src}
                alt={img3.alt}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => downloadImage(img3.src)}
                  className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
                >
                  <Download size={16} />
                </button>
                <button
                  onClick={() => shareImage(img3.src)}
                  className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
                >
                  <Share2 size={16} />
                </button>
                <button
                  onClick={() => deleteImage(img3.alt)}
                  className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Gallery Image 4 */}
        {img4 && (
          <div className="relative h-48 rounded-xl overflow-hidden group">
            <Image
              src={img4.src}
              alt={img4.alt}
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => downloadImage(img4.src)}
                className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
              >
                <Download size={16} />
              </button>
              <button
                onClick={() => shareImage(img4.src)}
                className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
              >
                <Share2 size={16} />
              </button>
              <button
                onClick={() => deleteImage(img4.alt)}
                className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
