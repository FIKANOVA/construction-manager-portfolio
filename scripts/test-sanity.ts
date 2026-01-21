import { createClient } from 'next-sanity'
import { config } from 'dotenv'

config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

console.log('Project ID:', projectId)
console.log('Dataset:', dataset)
console.log('Token starts with:', token?.substring(0, 10))

const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: '2024-01-01',
    useCdn: false,
})

async function test() {
    try {
        const results = await client.fetch('*[_type == "project"][0...1]')
        console.log('Successfully fetched:', results.length, 'projects')
    } catch (e: any) {
        console.error('Fetch failed:', e.message)
        if (e.response) {
            console.error('Response:', e.response.body)
        }
    }
}

test()
