import Image from 'next/image'
import Link from 'next/link'
import { getAllInterviews } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import type { Interview } from '@/lib/sanity/types'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function TagList({ tags }: { tags: string[] }) {
  if (!tags?.length) return null
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider border border-stone-400 text-stone-600"
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}

function FeaturedStory({ story }: { story: Interview }) {
  return (
    <Link
      href={`/stories/${story.slug.current}`}
      className="group block border-t-2 border-stone-900 pt-6"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
        {story.mainImage && (
          <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
            <Image
              src={urlFor(story.mainImage).width(800).height(600).url()}
              alt={story.mainImage.alt ?? story.intervieweeName}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
        )}
        <div className="flex flex-col justify-center gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-700">
            Featured Story
          </p>
          <h2 className="text-3xl font-bold leading-tight text-stone-900 group-hover:underline underline-offset-4 md:text-4xl">
            {story.title}
          </h2>
          <p className="text-base font-medium text-stone-600">
            {story.intervieweeName}
            {story.intervieweeOrigin && (
              <span className="font-normal text-stone-500"> — {story.intervieweeOrigin}</span>
            )}
          </p>
          {story.excerpt && (
            <p className="text-stone-700 leading-relaxed line-clamp-4">{story.excerpt}</p>
          )}
          <TagList tags={story.tags} />
          {story.publishedAt && (
            <p className="text-sm text-stone-500">{formatDate(story.publishedAt)}</p>
          )}
        </div>
      </div>
    </Link>
  )
}

function StoryCard({ story }: { story: Interview }) {
  return (
    <Link
      href={`/stories/${story.slug.current}`}
      className="group flex flex-col gap-3 border-t border-stone-300 pt-4"
    >
      {story.mainImage && (
        <div className="relative aspect-[3/2] overflow-hidden bg-stone-200">
          <Image
            src={urlFor(story.mainImage).width(600).height(400).url()}
            alt={story.mainImage.alt ?? story.intervieweeName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-stone-900 group-hover:underline underline-offset-2 leading-snug">
          {story.title}
        </h3>
        <p className="text-sm font-medium text-stone-600">
          {story.intervieweeName}
          {story.intervieweeOrigin && (
            <span className="font-normal text-stone-500"> — {story.intervieweeOrigin}</span>
          )}
        </p>
        {story.excerpt && (
          <p className="text-sm text-stone-600 leading-relaxed line-clamp-3">{story.excerpt}</p>
        )}
        <TagList tags={story.tags} />
        {story.publishedAt && (
          <p className="text-xs text-stone-400">{formatDate(story.publishedAt)}</p>
        )}
      </div>
    </Link>
  )
}

function EmptyState() {
  return (
    <div className="py-24 text-center border-t-2 border-stone-900">
      <p className="text-stone-500 text-lg">No stories published yet.</p>
      <p className="text-stone-400 text-sm mt-2">
        Add interviews in the{' '}
        <Link href="/studio" className="underline hover:text-stone-600">
          Sanity Studio
        </Link>
        .
      </p>
    </div>
  )
}

export default async function HomePage() {
  const interviews = await getAllInterviews()
  const [featured, ...rest] = interviews

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Masthead */}
      <header className="bg-stone-900 text-stone-50 px-6 py-10 md:px-12 md:py-14">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col gap-3 border-b border-stone-600 pb-8 mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
              An Interview Series
            </p>
            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
              American Stories
            </h1>
          </div>
          <p className="max-w-xl text-stone-300 leading-relaxed">
            What does it mean to be American? We ask ordinary people to share their
            extraordinary lives — stories of belonging, struggle, resilience, and hope
            from every corner of this country.
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-stone-900 border-t border-stone-700 px-6 md:px-12">
        <div className="max-w-5xl mx-auto flex items-center gap-6 py-3 text-sm">
          <Link href="/" className="text-stone-50 font-semibold hover:text-red-400 transition-colors">
            All Stories
          </Link>
          <Link href="/studio" className="text-stone-400 hover:text-stone-200 transition-colors">
            Studio
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 md:px-12 md:py-16">
        {!interviews.length ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-16">
            {featured && <FeaturedStory story={featured} />}

            {rest.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-8 border-t-2 border-stone-900 pt-6">
                  More Stories
                </h2>
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((story) => (
                    <StoryCard key={story._id} story={story} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-stone-200 px-6 py-8 md:px-12 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} American Stories
      </footer>
    </div>
  )
}
