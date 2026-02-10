export interface OEmbedVideo {
  url: string
  title: string
  author_name: string
  thumbnail_url: string
}

// API officielle YouTube oEmbed — aucune clé requise
// Doc : https://oembed.com / https://www.youtube.com/oembed
export async function getVideoOEmbed(url: string): Promise<OEmbedVideo | null> {
  try {
    const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
    const res = await fetch(endpoint, { next: { revalidate: 86400 } }) // cache 24h
    if (!res.ok) return null
    const data = await res.json()
    return {
      url,
      title: data.title,
      author_name: data.author_name,
      thumbnail_url: data.thumbnail_url,
    }
  } catch {
    return null
  }
}

export async function getVideosOEmbed(urls: string[]): Promise<OEmbedVideo[]> {
  const results = await Promise.all(urls.map(getVideoOEmbed))
  return results.filter((v): v is OEmbedVideo => v !== null)
}
