"use client";

import React from "react";
import Image from "next/image";
import { Download, Share2, Trash } from "lucide-react";

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

  // For the layout:
  // - Left Column: galleryImages[0]
  // - Middle Column: galleryImages[1] and galleryImages[2] (stacked vertically)
  // - Right Column: galleryImages[3]
  const img1 = galleryImages[0];
  const img2 = galleryImages[1];
  const img3 = galleryImages[2];
  const img4 = galleryImages[3];

  return (
    <div className="w-full mt-4">
      <div className="grid grid-cols-3 gap-4">
        {/* Left Column: Image 1 */}
        {img1 && (
          <div className="relative h-[300px] rounded-xl overflow-hidden group">
            <Image
              src={img1.src}
              alt={img1.alt}
              fill
              style={{ objectFit: "cover" }}
            />
            {/* Vertical Icons on the right */}
            <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => downloadImage(img1.src)}
                className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
              >
                <Download size={10} />
              </button>
              <button
                onClick={() => shareImage(img1.src)}
                className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
              >
                <Share2 size={10} />
              </button>
              <button
                onClick={() => deleteImage(img1.alt)}
                className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
              >
                <Trash size={10} />
              </button>
            </div>
          </div>
        )}

        {/* Middle Column: Images 2 and 3 stacked vertically */}
        <div className="flex flex-col gap-4">
          {img2 && (
            <div className="relative h-[150px] rounded-xl overflow-hidden group">
              <Image
                src={img2.src}
                alt={img2.alt}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => downloadImage(img2.src)}
                  className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
                >
                  <Download size={10} />
                </button>
                <button
                  onClick={() => shareImage(img2.src)}
                  className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
                >
                  <Share2 size={10} />
                </button>
                <button
                  onClick={() => deleteImage(img2.alt)}
                  className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
                >
                  <Trash size={10} />
                </button>
              </div>
            </div>
          )}
          {img3 && (
            <div className="relative h-[150px] rounded-xl overflow-hidden group">
              <Image
                src={img3.src}
                alt={img3.alt}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => downloadImage(img3.src)}
                  className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
                >
                  <Download size={10} />
                </button>
                <button
                  onClick={() => shareImage(img3.src)}
                  className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
                >
                  <Share2 size={10} />
                </button>
                <button
                  onClick={() => deleteImage(img3.alt)}
                  className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
                >
                  <Trash size={10} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Image 4 */}
        {img4 && (
          <div className="relative h-[300px] rounded-xl overflow-hidden group">
            <Image
              src={img4.src}
              alt={img4.alt}
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => downloadImage(img4.src)}
                className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
              >
                <Download size={10} />
              </button>
              <button
                onClick={() => shareImage(img4.src)}
                className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
              >
                <Share2 size={10} />
              </button>
              <button
                onClick={() => deleteImage(img4.alt)}
                className="bg-white p-2 rounded-xl text-black hover:bg-gray-200"
              >
                <Trash size={10} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
