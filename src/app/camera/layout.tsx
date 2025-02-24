import React from 'react'

function CameraLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-background ">
      {children}
    </div>
  )
}

export default CameraLayout