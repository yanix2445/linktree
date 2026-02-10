"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, ThumbsUp } from "lucide-react"
import type { LinkedInPost } from "@/lib/linkedin"

const INTERVAL = 6000

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

interface Props {
  posts: LinkedInPost[]
}

export function LinkedInCarousel({ posts }: Props) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progressKey, setProgressKey] = useState(0)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % posts.length)
    setProgressKey((k) => k + 1)
  }, [posts.length])

  useEffect(() => {
    if (paused || posts.length <= 1) return
    const id = setInterval(next, INTERVAL)
    return () => clearInterval(id)
  }, [paused, next, posts.length])

  if (posts.length === 0) return null

  return (
    <div className="rounded-2xl bg-[#1c1c1e] border border-[#2a2a2a] overflow-hidden">

      {/* Barre de progression */}
      {posts.length > 1 && !paused && (
        <div className="h-[2px] bg-[#232323]">
          <div
            key={progressKey}
            className="h-full bg-[#0a66c2]"
            style={{
              width: "0%",
              animation: `linkedin-progress ${INTERVAL}ms linear forwards`,
            }}
          />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#232323]">
        <div className="flex items-center gap-2">
          <LinkedInIcon className="h-4 w-4 text-[#0a66c2]" />
          <span className="text-sm font-semibold">LinkedIn</span>
          <span className="text-[10px] text-[#555] border border-[#2a2a2a] rounded-full px-2 py-0.5">
            300+
          </span>
        </div>
        <Link
          href="https://linkedin.com/in/yanis-harrat"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#555] hover:text-[#888] transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Slider */}
      <div
        className="overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: "transform 700ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {posts.map((p) => (
            <Link
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group min-w-full block px-5 pt-4 pb-4"
            >
              {/* Auteur */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-[#2a2a2a]">
                  <Image
                    src="https://github.com/yanix2445.png"
                    alt="Yanis Harrat"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white leading-none">Yanis Harrat</p>
                  <p className="text-[10px] text-[#555] mt-0.5">BTS SIO SISR · {p.date}</p>
                </div>
              </div>

              {/* Texte */}
              <p className="text-[13px] text-[#ccc] leading-relaxed line-clamp-4 min-h-[76px] group-hover:text-white transition-colors duration-200">
                {p.text}
              </p>

              {/* Pied */}
              {"likes" in p && typeof (p as { likes?: number }).likes === "number" && (
                <div className="flex items-center gap-1.5 mt-3">
                  <ThumbsUp className="h-3 w-3 text-[#555]" />
                  <span className="text-[11px] text-[#555]">
                    {(p as { likes: number }).likes}
                  </span>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Dots */}
      {posts.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 py-3 border-t border-[#1a1a1a]">
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrent(i)
                setProgressKey((k) => k + 1)
                setPaused(true)
                setTimeout(() => setPaused(false), 300)
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-5 bg-[#0a66c2]" : "w-1.5 bg-[#333] hover:bg-[#555]"
              }`}
            />
          ))}
        </div>
      )}

    </div>
  )
}
