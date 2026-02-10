export interface InstagramPost {
  id: string
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  media_url: string
  thumbnail_url?: string
  permalink: string
  like_count?: number
}

export interface InstagramProfile {
  username: string
  followers_count: number
}

export async function getInstagramProfile(): Promise<InstagramProfile | null> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  if (!token) return null

  try {
    const url = `https://graph.instagram.com/me?fields=username,followers_count&access_token=${token}`
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const data = await res.json()
    if (data.error) return null
    return { username: data.username, followers_count: data.followers_count } as InstagramProfile
  } catch {
    return null
  }
}

// Instagram API with Instagram Login (officiel, sans revue Meta en mode dev)
// Doc : https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login
export async function getInstagramPosts(limit = 3): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  if (!token) return []

  try {
    const url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,like_count&limit=${limit}&access_token=${token}`
    const res = await fetch(url, { next: { revalidate: 3600 } }) // cache 1h
    if (!res.ok) return []
    const data = await res.json()
    if (data.error) return []
    return (data.data ?? []) as InstagramPost[]
  } catch {
    return []
  }
}
