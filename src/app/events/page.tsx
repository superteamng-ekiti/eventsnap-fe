"use client";
import React, { useState } from 'react'
import { recoletaMedium } from '../font'
import { Input } from '@/components/ui/input';
import EventList from './_components/event-list';
import { CreateEventsModal } from './_components/create-events-modal';

const EventsPage = () => {
    const [eventType, setEventType] = useState<'active' | 'ended'>('active')
  return (
    <div className='w-full h-full'>
        <div className="container mx-auto px-4 2xl:px-0">
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <span onClick={() => setEventType('active')} className={`text-sm ${recoletaMedium.className} px-4 py-2 rounded-full ${eventType === 'active' ? 'bg-primary/40' : 'bg-white'} border-2 border-black/40 cursor-pointer`}>
                        Active Events
                        <span className='text-xs bg-primary px-2 py-1 rounded-full ml-2'>{4}</span>
                    </span>
                    <span onClick={() => setEventType('ended')} className={`text-sm ${recoletaMedium.className} px-4 py-2 rounded-full ${eventType === 'ended' ? 'bg-primary/40' : 'bg-white'} border-2 border-black/40 cursor-pointer`}>
                        Ended Events
                        <span className='text-xs bg-primary px-2 py-1 rounded-full ml-2'>{2}</span>
                    </span>
                </div>
                <div className='flex items-center gap-2'>
                    <Input type="text" placeholder='Search Events...' className='w-full px-4 py-2 rounded-full border-2 border-black/40' />
                </div>

                <div className='flex items-center gap-2'>
                    <CreateEventsModal />
                </div>
            </div>
            <EventList />
        </div>
    </div>
  )
}

export default EventsPage