export interface LinkedInPost {
  id: string
  text: string
  date: string
  publishedAt: number
  url: string
}

function formatRelativeDate(ms: number): string {
  const diff = Date.now() - ms
  const days = Math.floor(diff / 86_400_000)
  if (days === 0) return "Aujourd'hui"
  if (days === 1) return "Hier"
  if (days < 7) return `Il y a ${days} jours`
  const weeks = Math.floor(days / 7)
  if (weeks === 1) return "Il y a 1 semaine"
  if (weeks < 4) return `Il y a ${weeks} semaines`
  return `Il y a ${Math.floor(days / 30)} mois`
}

export async function getLinkedInPosts(count = 3): Promise<LinkedInPost[]> {
  const token = process.env.LINKEDIN_ACCESS_TOKEN
  if (!token) return []

  try {
    // 1. Récupérer le personId
    const meRes = await fetch("https://api.linkedin.com/v2/me", {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    })
    if (!meRes.ok) return []
    const me = await meRes.json()
    if (!me.id) return []

    // 2. Récupérer les posts
    const urn = encodeURIComponent(`urn:li:person:${me.id}`)
    const postsRes = await fetch(
      `https://api.linkedin.com/rest/posts?author=${urn}&q=author&count=${count}&sortBy=LAST_MODIFIED`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Restli-Protocol-Version": "2.0.0",
          "Linkedin-Version": "202601",
          "X-RestLi-Method": "FINDER",
        },
        next: { revalidate: 3600 },
      }
    )
    if (!postsRes.ok) return []
    const postsData = await postsRes.json()
    const elements: Record<string, unknown>[] = postsData.elements ?? []

    return elements
      .filter((el) => el.commentary)
      .map((el) => ({
        id: String(el.id),
        text: String(el.commentary),
        publishedAt: Number(el.publishedAt ?? el.createdAt ?? 0),
        date: formatRelativeDate(Number(el.publishedAt ?? el.createdAt ?? 0)),
        url: `https://www.linkedin.com/feed/update/${el.id}/`,
      }))
  } catch {
    return []
  }
}
