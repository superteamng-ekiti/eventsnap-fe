import { recoletaBold } from '@/app/font'
import Image from 'next/image'
import React from 'react'
import AvatarGroup from './avatar-group'

const EventCard = () => {
  return (
    <div className='w-full rounded-3xl border-2 border-b-8 border-black p-3 cursor-pointer'>
        <div className='w-full h-[230px] relative rounded-2xl overflow-hidden'>
            <Image src='/images/event-image.png' alt='event' fill className='object-cover' />
        </div>
        <div className="w-full flex flex-col gap-2 mt-3 relative">
            <p className='text-xs font-medium text-primary'>12th Sept, 2025</p>
            <div className='w-full flex flex-col gap-1'>
                <h3 className={`text-xl font-bold ${recoletaBold.className}`}>Youth Hangout</h3>
                <div className='w-full flex items-center gap-1'>
                    <Image src='/images/location.svg' alt='location' width={20} height={20} />
                    <p className='text-sm font-medium text-gray-500'>Jakarta, Indonesia</p>
                </div>
            </div>
            <div className='absolute bottom-0 right-0'>
                <AvatarGroup />
            </div>
        </div>
    </div>
  )
}

export default EventCard