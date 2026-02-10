import Link from "next/link"
import { Calendar, Clock, ArrowUpRight } from "lucide-react"

const BASE = "https://cal.yanis-harrat.com/yanis-harrat"

const events = [
  {
    slug: "question-rapide-10-min",
    title: "Question rapide",
    description: "Une question précise, une réponse directe",
    duration: "10 min",
  },
  {
    slug: "premier-contact-15",
    title: "Premier contact",
    description: "Faisons connaissance et explorons votre projet",
    duration: "15 min",
  },
  {
    slug: "brief-mission-30-min",
    title: "Brief mission",
    description: "Définissons ensemble le périmètre de votre projet",
    duration: "30 min",
  },
  {
    slug: "call-business-30-min",
    title: "Call business",
    description: "Discussion stratégique et commerciale",
    duration: "30 min",
  },
  {
    slug: "opportunite-pro-45-min",
    title: "Opportunité pro",
    description: "Collaboration, partenariat ou mission longue durée",
    duration: "45 min",
  },
]

export function CalComSection() {
  return (
    <div className="rounded-2xl bg-[#1c1c1e] border border-[#2a2a2a] overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#232323]">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#888]" />
          <div>
            <p className="text-sm font-semibold leading-none">Réserver un appel</p>
            <p className="text-[11px] text-[#555] mt-0.5">Choisissez le format qui vous convient</p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-[#1e1e1e]">
        {events.map((e) => (
          <Link
            key={e.slug}
            href={`${BASE}/${e.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-5 py-3.5 hover:bg-[#232325] transition-colors"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#252525] text-[#888] group-hover:text-white transition-colors">
              <Clock className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{e.title}</p>
              <p className="text-xs text-[#555] mt-0.5 truncate">{e.description}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-[#444] border border-[#2a2a2a] rounded-full px-2 py-0.5">
                {e.duration}
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#444] group-hover:text-[#888] transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
