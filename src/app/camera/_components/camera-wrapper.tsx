"use client";

import React, { useState } from 'react'
import { CameraShotter } from './camera-shotter';

export const CameraWrapper = () => {
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <CameraShotter type="portrait" setCapturedImage={setCapturedImage} />
        </div>
    )
}
