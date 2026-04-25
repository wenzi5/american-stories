export interface Interview {
  _id: string
  _createdAt: string
  title: string
  slug: { current: string }
  intervieweeName: string
  intervieweeOrigin: string
  publishedAt: string
  excerpt: string
  mainImage: {
    asset: { _ref: string }
    alt?: string
  }
  tags: string[]
}

export interface InterviewDetail extends Interview {
  body: PortableTextBlock[]
}

export interface PortableTextBlock {
  _type: string
  _key: string
  style?: string
  children?: Array<{
    _type: string
    _key: string
    text: string
    marks?: string[]
  }>
  markDefs?: Array<{ _type: string; _key: string }>
}
