import { client } from './client'
import type { Interview, InterviewDetail } from './types'

const interviewFields = `
  _id,
  _createdAt,
  title,
  slug,
  intervieweeName,
  intervieweeOrigin,
  publishedAt,
  excerpt,
  mainImage,
  tags
`

export async function getAllInterviews(): Promise<Interview[]> {
  try {
    return await client.fetch(
      `*[_type == "interview"] | order(publishedAt desc) { ${interviewFields} }`
    )
  } catch {
    return []
  }
}

export async function getInterviewBySlug(slug: string): Promise<InterviewDetail | null> {
  try {
    return await client.fetch(
      `*[_type == "interview" && slug.current == $slug][0] { ${interviewFields}, body }`,
      { slug }
    )
  } catch {
    return null
  }
}
