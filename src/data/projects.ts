export interface Project {
  title: string
  description?: string
  href: string
  image: string // URL absolue ou chemin /public/ (ex: "/projects/mon-projet.png")
  tag?: string
}

// 👉 Remplace les "image" par tes vrais screenshots (dossier /public/projects/ ou URL directe)
export const projects: Project[] = [
  {
    title: "Home Lab",
    description: "Infrastructure self-hosted — Proxmox, Docker, Traefik & services maison",
    href: "https://github.com/yanix2445",
    image: "https://opengraph.githubassets.com/1/yanix2445/homelab",
    tag: "Infra",
  },
  {
    title: "Portfolio",
    description: "Mon site portfolio — yanis-harrat.com",
    href: "https://yanis-harrat.com",
    image: "https://opengraph.githubassets.com/1/yanix2445/portfolio",
    tag: "Next.js",
  },
]
