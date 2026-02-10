import { getLinkedInPosts } from "@/lib/linkedin"
import { LinkedInCarousel } from "./linkedin-carousel"

const FALLBACK_POSTS = [
  {
    id: "1",
    text: "🖥️ Mon homelab tourne 24/7 : Proxmox, plusieurs VMs, Traefik comme reverse proxy, et des services self-hosted (Cal.com, Typebot, Excalidraw...). Apprendre en cassant des choses, c'est ma méthode préférée.",
    date: "Il y a 2 jours",
    publishedAt: 0,
    url: "https://linkedin.com/in/yanis-harrat",
    likes: 31,
  },
  {
    id: "2",
    text: "📚 BTS SIO SISR le jour, Next.js et Docker la nuit. La combinaison réseaux + dev web c'est vraiment puissant pour comprendre la stack complète — du réseau jusqu'à l'appli. Je recommande.",
    date: "Il y a 1 semaine",
    publishedAt: 0,
    url: "https://linkedin.com/in/yanis-harrat",
    likes: 54,
  },
  {
    id: "3",
    text: "🤝 En recherche active d'alternance BTS SIO SISR. Si tu cherches quelqu'un de curieux, autonome et qui a déjà les mains dans les serveurs et le code — parlons-en !",
    date: "Il y a 2 semaines",
    publishedAt: 0,
    url: "https://linkedin.com/in/yanis-harrat",
    likes: 76,
  },
]

export async function LinkedInSection() {
  const apiPosts = await getLinkedInPosts(3)
  const posts = apiPosts.length > 0 ? apiPosts : FALLBACK_POSTS

  return <LinkedInCarousel posts={posts} />
}
