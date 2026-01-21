import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

// Configuration
// Add SANITY_API_TOKEN to your .env.local file
// Project ID: 5x0wp0xx
// Dataset: production
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5x0wp0xx'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // process.env.NODE_ENV === 'production', // Force fresh data for now
  token: process.env.SANITY_API_TOKEN,
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Helper types
export interface Project {
  _id: string
  title: string
  slug: { current: string }
  coverImage: SanityImageSource
  gallery?: SanityImageSource[]
  category: string
  clientName?: string
  projectDate?: string
  role?: string
  description?: any[]
  projectLink?: string
  challenge?: string
  solution?: string
  impact?: string[]
  tags?: string[]
}

export interface Experience {
  _id: string
  company: string
  role: string
  location?: string
  period?: string
  description?: string
  website?: string
  highlights?: string[]
}

export interface ServicePackage {
  _id: string
  title: string
  category: string
  price: string
  features?: string[]
  isPopular?: boolean
  description?: string
}

export interface Photographer {
  _id: string
  name: string
  bio?: string
  portraitImage?: SanityImageSource
  philosophy?: string
  gearList?: string[]
  socialLinks?: { platform: string; url: string }[]
  cvFile?: {
    asset: {
      _ref: string
      url: string
    }
  }
}

export interface ContactSettings {
  _id: string
  email?: string
  phone?: string
  location?: string
  availabilityStatus?: string
}

export interface Profile {
  _id: string
  name: string
  title?: string
  bio?: string
  portraitImage?: SanityImageSource
  heroBackgroundImage?: SanityImageSource
  interests?: string[]
  skills?: string[]
  hobbies?: { name: string; description: string }[]
  education?: { degree: string; institution: string; period: string }[]
  cvFile?: string
  socialLinks?: { platform: string; url: string }[]
}

// GROQ Queries
export const queries = {
  allProjects: `*[_type == "project"] | order(projectDate desc) {
    _id, title, slug, coverImage, category, clientName, projectDate, role, projectLink, description,
    challenge, solution, impact, tags
  }`,

  featuredProjects: `*[_type == "project"] | order(projectDate desc)[0...4] {
    _id, title, slug, coverImage, category, projectLink
  }`,

  projectBySlug: `*[_type == "project" && slug.current == $slug][0] {
    _id, title, slug, coverImage, gallery, category, clientName, projectDate, role, description, projectLink,
    challenge, solution, impact, tags
  }`,

  allExperience: `*[_type == "experience"] | order(order asc) {
    _id, company, role, location, period, description, website, highlights
  }`,

  allServicePackages: `*[_type == "servicePackage"] | order(category) {
    _id, title, category, price, features, isPopular, description
  }`,

  photographer: `*[_type == "photographer"][0] {
    _id, name, bio, portraitImage, philosophy, gearList, socialLinks,
    "cvFile": cvFile.asset->url
  }`,

  contactSettings: `*[_type == "contactSettings"][0] {
    _id, email, phone, location, availabilityStatus
  }`,

  profile: `*[_type == "profile"][0] {
    _id, name, title, bio, portraitImage, heroBackgroundImage,
    interests, skills, hobbies, education, socialLinks,
    "cvFile": cvFile.asset->url
  }`,
}
