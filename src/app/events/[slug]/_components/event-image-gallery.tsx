'use client'

import Image from "next/image";
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const images = [
  {
    src: "/images/image-1.jpg",
    alt: "Image 1",
  },
  {
    src: "/images/image-2.jpg",
    alt: "Image 2",
  },
  {
    src: "/images/image-3.jpg",
    alt: "Image 3",
  },
  {
    src: "/images/image-4.jpg",
    alt: "Image 4",
  },
];

export const EventImageGallery = () => {
  return (
    <div className="w-full mt-4">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}>
        <Masonry gutter={"12px"}>
          {images.map((image) => (
            <div
              key={image.alt}
              className="relative h-[300px] w-full rounded-xl overflow-hidden"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};
