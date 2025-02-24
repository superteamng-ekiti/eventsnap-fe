import { recoletaBold } from '@/app/font'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { ShareInviteLink } from './share-invite-link'

export const EventHeaderImage = () => {
  return (
    <div className='w-full h-[180px] relative rounded-xl overflow-hidden'>
        <Image src="/images/event-header-image.jpg" alt="event header image" fill className='object-cover' />

        <div className='absolute top-0 left-0 w-full h-full bg-black/25' />

        <div className='absolute top-0 left-0 w-full h-full flex items-end justify-between px-10 pb-4'>
            <div className='flex flex-col gap-0'>
                <h3 className={`text-white text-2xl ${recoletaBold.className}`}>Youth Hangout</h3>
                <div className='flex items-center gap-2'>
                    <Image src="/images/location-white.svg" alt="location" width={24} height={24} />
                    <p className='text-[#B1B1B1] text-sm'>Lagos, Nigeria</p>
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <ShareInviteLink />
                <Button size="sm">
                    Upload Image
                </Button>
            </div>
        </div>
    </div>
  )
}
