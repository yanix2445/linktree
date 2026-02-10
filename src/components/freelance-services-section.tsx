"use client"

import { useState } from "react"
import { Network, Code2, Shield, GitBranch, X } from "lucide-react"

interface Competence {
  title: string
  description: string
  tag: string
  icon: React.ReactNode
  details: string[]
}

const competences: Competence[] = [
  {
    title: "Réseaux & Sysadmin",
    description: "Config réseau, Linux, Active Directory, virtualisation",
    tag: "SISR",
    icon: <Network className="h-4 w-4" />,
    details: [
      "VLAN, VPN (WireGuard, OpenVPN)",
      "Routage OSPF, RIP — Cisco Packet Tracer",
      "Active Directory, GPO, DNS, DHCP",
      "Linux Debian/Ubuntu, Bash scripting",
      "Proxmox, VirtualBox, VMware ESXi",
      "Supervision : Wireshark, Nmap",
    ],
  },
  {
    title: "Développement Web",
    description: "Next.js, React, TypeScript, bases de données",
    tag: "Dev",
    icon: <Code2 className="h-4 w-4" />,
    details: [
      "Next.js 14/15, React, TypeScript",
      "Tailwind CSS, shadcn/ui",
      "Prisma ORM, PostgreSQL, Supabase",
      "API REST, tRPC, Auth.js",
      "Déploiement : Vercel, Docker, Traefik",
      "Git, GitHub Actions CI/CD",
    ],
  },
  {
    title: "Cybersécurité",
    description: "Bases sécu, CTF, veille, bonnes pratiques",
    tag: "Sécu",
    icon: <Shield className="h-4 w-4" />,
    details: [
      "OWASP Top 10, bonnes pratiques dev",
      "CTF : TryHackMe, HackTheBox",
      "Kali Linux, Nmap, Metasploit",
      "Wireshark, analyse de trafic",
      "Fail2ban, hardening Linux",
      "Veille sécu et CVE",
    ],
  },
  {
    title: "Open Source & DevOps",
    description: "Git, Docker, self-hosting, Linux",
    tag: "DevOps",
    icon: <GitBranch className="h-4 w-4" />,
    details: [
      "Git, GitHub — contributions open source",
      "Docker, Docker Compose",
      "Traefik reverse proxy + SSL auto",
      "CI/CD GitHub Actions",
      "Self-hosting sur Proxmox",
      "LLMs en local, services maison",
    ],
  },
]

export function FreelanceServicesSection() {
  const [selected, setSelected] = useState<Competence | null>(null)

  return (
    <>
      <div className="rounded-2xl bg-[#1c1c1e] border border-[#2a2a2a] overflow-hidden">
        <div className="px-5 pt-4 pb-3 border-b border-[#232323]">
          <p className="text-sm font-semibold text-white">Mes compétences</p>
          <p className="text-xs text-[#555] mt-0.5">Réseaux, dev web, sécu & DevOps</p>
        </div>
        <div className="divide-y divide-[#1e1e1e]">
          {competences.map((c) => (
            <button
              key={c.title}
              onClick={() => setSelected(c)}
              className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-[#232325] transition-colors text-left"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#252525] text-[#888]">
                {c.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{c.title}</p>
                <p className="text-xs text-[#555] mt-0.5 truncate">{c.description}</p>
              </div>
              <span className="text-[10px] text-[#444] border border-[#2a2a2a] rounded-full px-2 py-0.5 shrink-0">
                {c.tag}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Modale */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-[420px] rounded-2xl bg-[#1c1c1e] border border-[#2a2a2a] p-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#252525] text-[#888]">
                  {selected.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{selected.title}</p>
                  <span className="text-[10px] text-[#444] border border-[#2a2a2a] rounded-full px-2 py-0.5">
                    {selected.tag}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#252525] text-[#888] hover:text-white transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Liste des compétences */}
            <ul className="space-y-2.5">
              {selected.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#444] shrink-0" />
                  <span className="text-xs text-[#aaa] leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
