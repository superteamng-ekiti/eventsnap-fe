"use client";

import React, { useState } from 'react'
import { CameraShotter } from './camera-shotter';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export const CameraWrapper = () => {
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    return (
        <div className='w-full flex flex-col items-center justify-center'>
            {
                capturedImage ? (
                    <div className='w-full h-full min-h-[100svh] relative'>
                        <Image src={capturedImage} alt="captured" fill className='object-cover' />
                        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center justify-between w-full px-4'>
                            <Button variant="outline" onClick={() => setCapturedImage(null)}>
                                Retake Photo
                            </Button>
                            <Button>
                                Upload Photo
                            </Button>
                        </div>
                    </div>
                ) : (
                    <CameraShotter type="portrait" setCapturedImage={setCapturedImage} />
                )
            }
        </div>
    )
}
