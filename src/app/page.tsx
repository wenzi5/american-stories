import Image from 'next/image'
import Link from 'next/link'
import { getAllInterviews } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import type { Interview } from '@/lib/sanity/types'

const starPatternBg = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>` +
  `<text x='8' y='30' font-size='11' fill='white' opacity='0.12'>★</text>` +
  `<text x='65' y='14' font-size='7' fill='white' opacity='0.08'>★</text>` +
  `<text x='96' y='62' font-size='9' fill='white' opacity='0.10'>★</text>` +
  `<text x='18' y='88' font-size='6' fill='white' opacity='0.09'>★</text>` +
  `<text x='48' y='112' font-size='12' fill='white' opacity='0.11'>★</text>` +
  `<text x='100' y='98' font-size='6' fill='white' opacity='0.07'>★</text>` +
  `<text x='38' y='50' font-size='5' fill='white' opacity='0.07'>★</text>` +
  `<text x='82' y='30' font-size='5' fill='white' opacity='0.06'>★</text>` +
  `</svg>`
)}")`

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
          className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider border border-blue-300 text-blue-700"
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
      className="group block border-t-2 border-blue-900 pt-6"
    >
      <div className={`grid grid-cols-1 gap-6 md:gap-10 ${story.mainImage ? 'md:grid-cols-2' : ''}`}>
        {story.mainImage && (
          <div className="relative aspect-[4/3] overflow-hidden bg-blue-100">
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
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            Featured Story
          </p>
          <h2 className="text-3xl font-bold leading-tight text-blue-950 group-hover:underline underline-offset-4 md:text-4xl">
            {story.title}
          </h2>
          <p className="text-base font-medium text-blue-700">
            {story.intervieweeName}
            {story.intervieweeOrigin && (
              <span className="font-normal text-blue-500"> — {story.intervieweeOrigin}</span>
            )}
          </p>
          {story.excerpt && (
            <p className="text-slate-700 leading-relaxed line-clamp-4">{story.excerpt}</p>
          )}
          <TagList tags={story.tags} />
          {story.publishedAt && (
            <p className="text-sm text-blue-400">{formatDate(story.publishedAt)}</p>
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
      className="group flex flex-col gap-3 border-t border-blue-200 pt-4"
    >
      {story.mainImage && (
        <div className="relative aspect-[3/2] overflow-hidden bg-blue-100">
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
        <h3 className="text-lg font-bold text-blue-950 group-hover:underline underline-offset-2 leading-snug">
          {story.title}
        </h3>
        <p className="text-sm font-medium text-blue-700">
          {story.intervieweeName}
          {story.intervieweeOrigin && (
            <span className="font-normal text-blue-500"> — {story.intervieweeOrigin}</span>
          )}
        </p>
        {story.excerpt && (
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{story.excerpt}</p>
        )}
        <TagList tags={story.tags} />
        {story.publishedAt && (
          <p className="text-xs text-blue-400">{formatDate(story.publishedAt)}</p>
        )}
      </div>
    </Link>
  )
}

function EmptyState() {
  return (
    <div className="py-24 text-center border-t-2 border-blue-900">
      <p className="text-blue-500 text-lg">No stories published yet.</p>
      <p className="text-blue-400 text-sm mt-2">
        Add interviews in the{' '}
        <Link href="/studio" className="underline hover:text-blue-700">
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
    <div className="min-h-screen bg-blue-50">
      {/* Masthead */}
      <header
        className="bg-blue-900 text-white px-6 py-10 md:px-12 md:py-14"
        style={{ backgroundImage: starPatternBg }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col gap-3 border-b border-blue-700 pb-8 mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300">
              An Interview Series
            </p>
            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
              American Stories
            </h1>
          </div>
          <p className="max-w-xl text-blue-100 leading-relaxed">
            What does it mean to be American? We ask ordinary people to share their
            extraordinary lives — stories of belonging, struggle, resilience, and hope
            from every corner of this country.
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-blue-900 border-t border-blue-800 px-6 md:px-12">
        <div className="max-w-3xl mx-auto flex items-center gap-6 py-3 text-sm">
          <Link href="/" className="text-white font-semibold hover:text-blue-300 transition-colors">
            All Stories
          </Link>
          <Link href="/studio" className="text-blue-300 hover:text-white transition-colors">
            Studio
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 md:px-12 md:py-16">
        {!interviews.length ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-16">
            {featured && <FeaturedStory story={featured} />}

            {rest.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-8 border-t-2 border-blue-900 pt-6">
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

      {/* About */}
      <section className="bg-blue-900 text-white px-6 py-12 md:px-12 md:py-16">
        <div className="max-w-3xl mx-auto flex flex-col gap-8 md:flex-row md:gap-12 md:items-start">
          <div className="flex-shrink-0 flex justify-center">
            <Image
              src="/about-photo.svg"
              alt="About the editor"
              width={140}
              height={140}
              className="rounded-full ring-4 ring-blue-700"
            />
          </div>
          <div className="flex flex-col gap-5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300">
            About This Project
          </h2>
          <p className="text-xl font-semibold leading-snug text-white md:text-2xl">
            America is not one story. It is three hundred million of them.
          </p>
          <div className="flex flex-col gap-4 text-blue-100 leading-relaxed">
            <p>
              American Stories is created by a high school student who grew up watching people talk
              past each other — in classrooms, in courtrooms, on screens — and who believes the most
              powerful antidote to that is a story told honestly. As a volunteer in her county&apos;s
              teen court and a member of her school&apos;s debate team, she has seen firsthand how
              understanding someone&apos;s experience is the first step toward fairness.
            </p>
            <p>
              She started this series because she wanted her generation to meet the America that
              doesn&apos;t make the headlines: the immigrants who rebuilt their lives from scratch,
              the workers who hold communities together, the young people navigating a country that
              doesn&apos;t always see them. In a time of deep political division and persistent
              inequality, she believes that stories — real ones, from real people — are how empathy
              gets built and how small, stubborn change begins.
            </p>
            <p>
              This project is for anyone who refuses to give up on the idea that America can be
              better, fairer, and more honest about who it is and who it belongs to.
            </p>
          </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-blue-800 bg-blue-900 px-6 py-6 md:px-12 text-center text-xs text-blue-400">
        © {new Date().getFullYear()} American Stories
      </footer>
    </div>
  )
}
