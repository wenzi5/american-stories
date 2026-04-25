'use client'

import dynamic from 'next/dynamic'

const StudioComponent = dynamic(
  async () => {
    const { NextStudio } = await import('next-sanity/studio')
    const config = (await import('../../../../sanity.config')).default
    function Studio() {
      return <NextStudio config={config} />
    }
    return Studio
  },
  { ssr: false }
)

export default function StudioClientWrapper() {
  return <StudioComponent />
}
