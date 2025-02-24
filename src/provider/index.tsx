'use client';

import { createAppKitMethod } from '@/config';
import React, { type ReactNode } from 'react'


createAppKitMethod();

function ReownProvider({ children }: { children: ReactNode; }) {
  return (
    <div className='w-full h-full'>
      {children}
    </div>
  )
}

export default ReownProvider