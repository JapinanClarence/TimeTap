import React from 'react'

export default function GradientBg( {children}: {children: React.ReactNode}) {
  return (
     <div className="z-[-2] w-full bg-background bg-[radial-gradient(50%_100%_at_100%_40%,rgba(0,163,255,0.13)_80%,rgba(0,163,255,0)_100%,rgba(0,163,255,0)_100%)]">
        {children}
     </div>
  )
}
