import { createClient } from 'next-sanity'
import { config } from 'dotenv'

config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: '2024-01-01',
    useCdn: false,
})

async function debugProfile() {
    try {
        console.log('--- Profile Data ---')
        const profile = await client.fetch(`*[_type == "profile"][0] {
            _id,
            name,
            "cvUrl": cvFile.asset->url,
            cvFile
        }`)
        console.log(JSON.stringify(profile, null, 2))

        console.log('\n--- Photographer Data ---')
        const photographer = await client.fetch(`*[_type == "photographer"][0] {
            _id,
            name,
            "cvUrl": cvFile.asset->url,
            cvFile
        }`)
        console.log(JSON.stringify(photographer, null, 2))

        const allProfiles = await client.fetch('*[_type == "profile"] { _id, name }')
        console.log('\n--- All Profile IDs ---')
        console.log(allProfiles)

    } catch (e: any) {
        console.error('Debug failed:', e.message)
    }
}

debugProfile()
