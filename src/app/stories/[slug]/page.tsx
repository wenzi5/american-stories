import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getInterviewBySlug } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import type { PortableTextBlock } from '@/lib/sanity/types'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function renderBody(blocks: PortableTextBlock[]) {
  return blocks.map((block) => {
    if (block._type !== 'block') return null
    const text = block.children?.map((c) => c.text).join('') ?? ''
    if (block.style === 'h2') {
      return <h2 key={block._key} className="text-2xl font-bold mt-10 mb-4 text-stone-900">{text}</h2>
    }
    if (block.style === 'h3') {
      return <h3 key={block._key} className="text-xl font-bold mt-8 mb-3 text-stone-900">{text}</h3>
    }
    if (!text) return null
    return (
      <p key={block._key} className="text-stone-800 leading-relaxed text-lg">
        {text}
      </p>
    )
  })
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const interview = await getInterviewBySlug(slug)

  if (!interview) notFound()

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top nav */}
      <nav className="bg-stone-900 px-6 py-3 md:px-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="text-stone-400 hover:text-stone-50 text-sm transition-colors"
          >
            ← American Stories
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-12 md:px-12 md:py-16">
        {/* Header */}
        <header className="mb-10 border-t-2 border-stone-900 pt-8 flex flex-col gap-4">
          {interview.tags?.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {interview.tags.map((tag) => (
                <li
                  key={tag}
                  className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider border border-stone-400 text-stone-600"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <h1 className="text-4xl font-bold leading-tight text-stone-900 md:text-5xl">
            {interview.title}
          </h1>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold text-stone-700">
              {interview.intervieweeName}
            </p>
            {interview.intervieweeOrigin && (
              <p className="text-stone-500">{interview.intervieweeOrigin}</p>
            )}
            {interview.publishedAt && (
              <p className="text-sm text-stone-400">{formatDate(interview.publishedAt)}</p>
            )}
          </div>
        </header>

        {/* Main image */}
        {interview.mainImage && (
          <div className="relative aspect-[16/9] mb-10 overflow-hidden bg-stone-200">
            <Image
              src={urlFor(interview.mainImage).width(1200).height(675).url()}
              alt={interview.mainImage.alt ?? interview.intervieweeName}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Excerpt pull quote */}
        {interview.excerpt && (
          <blockquote className="border-l-4 border-red-700 pl-5 mb-10 text-xl italic text-stone-600 leading-relaxed">
            {interview.excerpt}
          </blockquote>
        )}

        {/* Body */}
        {interview.body?.length > 0 && (
          <div className="flex flex-col gap-6">
            {renderBody(interview.body)}
          </div>
        )}
      </article>

      <footer className="border-t border-stone-200 px-6 py-8 md:px-12 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} American Stories
      </footer>
    </div>
  )
}
