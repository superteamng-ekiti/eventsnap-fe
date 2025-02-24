import Image from 'next/image'
import React from 'react'

export const HeroImage = () => {
  return (
    <div className="relative w-full h-[500px] -mt-[130px] 2xl:-mt-[70px]">
      <Image
        src="/images/timeline-image.png"
        alt="hero-image"
        fill
        className="object-contain pointer-events-none select-none"
        priority
      />
    </div>
  )
}
