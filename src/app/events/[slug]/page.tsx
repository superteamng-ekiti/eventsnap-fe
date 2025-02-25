import React from "react";
import { EventHeaderImage } from "./_components/event-header-image";
import { EventImageGallery } from "./_components/event-image-gallery";

const SingleEventPage = () => {
  return (
    <div className="w-full h-full">
      <div className="container mx-auto px-4 2xl:px-0">
        <div className="flex flex-col items-center justify-between">
          <EventHeaderImage />
          <EventImageGallery />
        </div>
      </div>
    </div>
  );
};

export default SingleEventPage;
