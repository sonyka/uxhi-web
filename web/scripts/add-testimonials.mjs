// Run with: npx sanity exec scripts/add-testimonials.mjs --with-user-token
// Or: node scripts/add-testimonials.mjs (requires SANITY_WRITE_TOKEN env var)

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'evh83z0t',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

const testimonials = [
  {
    _type: 'testimonial',
    quote: "UXHI has been an incredible resource for networking and professional growth. The community is welcoming and supportive.",
    author: {
      name: "Karli Young",
      role: "UX Designer",
      company: "Hawaiian Airlines",
    },
    featured: true,
    order: 1,
  },
  {
    _type: 'testimonial',
    quote: "As someone transitioning into UX, UXHI gave me the connections and confidence I needed to make the switch.",
    author: {
      name: "Emily Lee",
      role: "Product Designer",
      company: "Kamehameha Schools",
    },
    featured: true,
    order: 2,
  },
  {
    _type: 'testimonial',
    quote: "The events and Slack community have been invaluable. I've learned so much and made lasting friendships.",
    author: {
      name: "Michelle Tran",
      role: "Senior UX Researcher",
      company: "Google",
    },
    featured: true,
    order: 3,
  },
  {
    _type: 'testimonial',
    quote: "Moving back to Hawaii, I was worried about finding a design community. UXHI exceeded all my expectations—it's like having a built-in ohana.",
    author: {
      name: "Carlo Liquido",
      role: "Design Lead",
      company: "Salesforce",
    },
    featured: true,
    order: 4,
  },
  {
    _type: 'testimonial',
    quote: "The mentorship opportunities through UXHI helped me level up my career. I went from junior to senior in two years thanks to the guidance I received.",
    author: {
      name: "Patrick Lutz",
      role: "Senior Product Designer",
      company: "First Hawaiian Bank",
    },
    featured: true,
    order: 5,
  },
  {
    _type: 'testimonial',
    quote: "Being part of UXHI while working remotely keeps me connected to Hawaii's tech scene. The virtual events and Slack channels make distance feel irrelevant.",
    author: {
      name: "Tyler Nishida",
      role: "UX Manager",
      company: "Amazon",
    },
    featured: true,
    order: 6,
  },
]

async function addTestimonials() {
  console.log('Adding testimonials to Sanity...')

  for (const testimonial of testimonials) {
    try {
      const result = await client.create(testimonial)
      console.log(`✓ Created testimonial for ${testimonial.author.name}: ${result._id}`)
    } catch (error) {
      console.error(`✗ Failed to create testimonial for ${testimonial.author.name}:`, error.message)
    }
  }

  console.log('Done!')
}

addTestimonials()
