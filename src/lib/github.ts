export interface ContributionDay {
  date: string
  contributionCount: number
  color: string
}

export interface ContributionWeek {
  contributionDays: ContributionDay[]
}

export interface ContributionCalendar {
  totalContributions: number
  weeks: ContributionWeek[]
}

const GITHUB_GRAPHQL = "https://api.github.com/graphql"

const QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`

export interface PinnedRepo {
  name: string
  description: string | null
  url: string
  stargazerCount: number
  openGraphImageUrl: string
  primaryLanguage: { name: string; color: string } | null
}

const PINNED_QUERY = `
  query($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            openGraphImageUrl
            primaryLanguage { name color }
          }
        }
      }
    }
  }
`

export async function getPinnedRepos(username: string): Promise<PinnedRepo[]> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return []

  const res = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: PINNED_QUERY, variables: { username } }),
    next: { revalidate: 3600 },
  })

  if (!res.ok) return []
  const json = await res.json()
  return json?.data?.user?.pinnedItems?.nodes ?? []
}

export async function getContributions(username: string): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    console.warn("GITHUB_TOKEN manquant dans .env.local")
    return null
  }

  const res = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY, variables: { username } }),
    next: { revalidate: 3600 }, // revalidate toutes les heures
  })

  if (!res.ok) return null

  const json = await res.json()
  return json?.data?.user?.contributionsCollection?.contributionCalendar ?? null
}
