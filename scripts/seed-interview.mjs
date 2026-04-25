import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'g099swy1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

function block(key, text) {
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: key + 's', text, marks: [] }],
  }
}

const interview = {
  _type: 'interview',
  title: 'America Is the Only Place That Let Me Become Myself',
  slug: { _type: 'slug', current: 'america-let-me-become-myself' },
  intervieweeName: 'Mei Lin Zhang',
  intervieweeOrigin: 'Originally from Chengdu, China -- now living in Seattle, WA',
  publishedAt: new Date().toISOString(),
  excerpt:
    'She arrived with two suitcases, a student visa, and a dream of a PhD in computer science. What followed were years of navigating immigration paperwork, job rejections she was legally barred from taking, and the quiet loneliness of building a life without family nearby. Today she is a U.S. citizen, a mother of two, and a senior engineer -- and she still tears up when she talks about what America gave her.',
  tags: ['immigration', 'identity', 'resilience', 'work', 'family'],
  body: [
    block('b1', 'I came to the United States in 2009 with a suitcase, a laptop, and an F-1 student visa. I had been admitted to a master\'s program in computer science in Pittsburgh. My parents scraped together enough money for the first semester\'s tuition. The understanding was: you go, you succeed, you do not come back empty-handed.'),
    block('b2', 'What nobody told me -- what I could not have understood from Chengdu -- was how alone I would feel. Not just socially, though that was real too. I mean structurally alone. My visa said I could study. It did not say I could work off-campus. It did not say I could take the internship offer I got after my first year -- a real offer, a good one -- because the company\'s legal team said the paperwork was too complicated for a foreign student. I watched my American classmates accept positions I was more qualified for, and I had no recourse. I just had to keep studying.'),
    block('b3', 'My English was functional but not natural. In seminars I would rehearse sentences in my head while someone else was talking, and by the time I was ready to speak, the conversation had moved on. I thought people saw me as quiet. Really I was just translating constantly -- my thoughts, my humor, my feelings -- into a language that did not yet fit.'),
    block('b4', 'I stayed for a PhD. Partly because I loved the research. Partly because a PhD gave me more time on my visa, more time to figure out a path. Optional Practical Training, H-1B lottery, green card sponsorship -- I became an expert in immigration law out of pure necessity. I knew the filing deadlines better than some immigration attorneys. One missed deadline and everything I had built here -- the apartment, the advisor relationship, the friendships I had finally made -- would vanish.'),
    block('b5', 'There was a period, around year four of the PhD, when I seriously considered going back. My mother was sick. The flights were expensive and complicated -- leaving the country on certain visas could mean you could not re-enter. I missed my parents\' birthdays, my grandmother\'s last years. The cost of staying was real and denominated in things that do not appear on any immigration form.'),
    block('b6', 'What kept me here, honestly, was something I am still trying to put into words. It was not money, though the professional opportunities were better. It was something more like permission. In China, who I was supposed to become was very clear. Stable job, marry by 28, live near family, do not make trouble. Here, nobody knew what I was supposed to be. That was terrifying at first. Then it became the most important thing in my life.'),
    block('b7', 'I met my husband here -- he is Taiwanese-American, second generation. We got married in a tiny ceremony with twelve people because that is what we could afford and because our families were an ocean away. We have two kids now. My daughter was born in Seattle. She talks back to me in English when I try to speak Mandarin to her, and it drives me a little crazy, and I also love her so much I cannot breathe.'),
    block('b8', 'I became a citizen six years ago. I remember sitting in that room in the federal building downtown, surrounded by people from maybe forty different countries, and everyone was nervous and everyone was dressed up and some people were crying before it even started. The judge said something like: "You chose this country, and this country is choosing you back." I had not expected to feel anything -- I am not a sentimental person -- but I cried. I cried because it had been so hard and so long and because nobody in that room had been handed anything.'),
    block('b9', 'What does America mean to me? It means that the government does not get to decide what kind of person I am. It means I can criticize my employer, my city, my president, and go home and sleep at night without being afraid. It means my daughter can grow up making her own choices -- even the ones that frustrate me. It means diversity is not just a word on a poster; it is the actual texture of my neighborhood, my team at work, my kids\' school. That is not nothing. After where I came from, that is everything.'),
    block('b10', 'The system is broken in many ways. The visa process is cruel in ways that are entirely unnecessary. I have watched brilliant people leave because the paperwork defeated them, and that is a genuine loss for this country. I say that as someone who loves America -- maybe more than people who never had to fight to be here. You appreciate water differently when you have been thirsty.'),
  ],
}

try {
  const result = await client.create(interview)
  console.log('Created interview:', result._id)
} catch (err) {
  console.error('Failed:', err.message)
}
