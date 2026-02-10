"use client"

import { Button } from "@/components/ui/button"
import { Github, Instagram, Linkedin, Mail, Twitter, Youtube } from "lucide-react"
import Link from "next/link"

const socialLinks = [
  { name: "GitHub",    href: "https://github.com",              icon: <Github    className="h-5 w-5" /> },
  { name: "Twitter",   href: "https://twitter.com",             icon: <Twitter   className="h-5 w-5" /> },
  { name: "Instagram", href: "https://instagram.com/yanix2445", icon: <Instagram className="h-5 w-5" /> },
  { name: "LinkedIn",  href: "https://linkedin.com/in/yanis-harrat", icon: <Linkedin className="h-5 w-5" /> },
  { name: "YouTube",   href: "https://youtube.com",             icon: <Youtube   className="h-5 w-5" /> },
  { name: "Email",     href: "mailto:yanis.amine.harrat@gmail.com", icon: <Mail  className="h-5 w-5" /> },
]

export function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {socialLinks.map((social) => (
        // asChild : Button rend directement le <a> de Link — pas de <button> dans <a>
        <Button
          key={social.name}
          asChild
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
        >
          <Link href={social.href} target="_blank" rel="noopener noreferrer">
            {social.icon}
            <span className="sr-only">{social.name}</span>
          </Link>
        </Button>
      ))}
    </div>
  )
}
