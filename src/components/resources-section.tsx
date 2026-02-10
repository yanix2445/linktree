"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { projects } from "@/data/projects"

export function ResourcesSection() {
  const [current, setCurrent] = useState(0)

  if (projects.length === 0) {
    return (
      <div className="rounded-2xl bg-[#1c1c1e] border border-[#2a2a2a] p-5 text-center">
        <p className="text-xs text-[#555]">Ajoute tes projets dans src/data/projects.ts</p>
      </div>
    )
  }

  const project = projects[current]
  const prev = () => setCurrent((c) => (c - 1 + projects.length) % projects.length)
  const next = () => setCurrent((c) => (c + 1) % projects.length)

  return (
    <div className="rounded-2xl bg-[#1c1c1e] border border-[#2a2a2a] overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div>
          <p className="text-sm font-semibold text-white">Mes Projets</p>
          <p className="text-xs text-[#555] mt-0.5">
            {current + 1} / {projects.length}
          </p>
        </div>
        <Link
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-[#555] hover:text-white transition-colors"
        >
          Voir le projet <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Image + overlay */}
      <div className="relative aspect-video bg-[#252525]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          unoptimized
        />

        {/* Gradient + infos */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-white leading-tight">{project.title}</p>
              {project.description && (
                <p className="text-xs text-[#bbb] mt-0.5 leading-snug">{project.description}</p>
              )}
            </div>
            {project.tag && (
              <span className="text-[10px] text-[#aaa] border border-white/20 rounded-full px-2 py-0.5 shrink-0">
                {project.tag}
              </span>
            )}
          </div>
        </div>

        {/* Boutons navigation */}
        {projects.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {projects.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 py-3">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-4 bg-white" : "w-1.5 bg-[#444] hover:bg-[#666]"
              }`}
            />
          ))}
        </div>
      )}

    </div>
  )
}
