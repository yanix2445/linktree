"use client"

import { useState } from "react"

// 👉 À remplir avec ta vraie liste d'outils (quotidiens + self-hosted)
const tools: { name: string; category: string; icon: string }[] = []

export function SoftwareSection() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? tools : tools.slice(0, 4)

  return (
    <>
      <ul className="space-y-3 mt-3">
        {visible.map((tool) => (
          <li key={tool.name} className="flex items-center gap-3 text-sm">
            <span className="w-6 text-center text-[#888] text-base">{tool.icon}</span>
            <span className="text-white font-medium">{tool.name}</span>
            <span className="text-[#555]">·</span>
            <span className="text-[#888]">{tool.category}</span>
          </li>
        ))}
      </ul>
      {!showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full mt-4 py-2.5 text-sm text-[#888] hover:text-white transition-colors"
        >
          Show more
        </button>
      )}
    </>
  )
}
