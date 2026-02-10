"use client"

import { useState } from "react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#555] outline-none focus:border-[#555] transition-colors"
      />
      <button
        type="submit"
        className="px-5 py-2.5 text-sm font-semibold text-black bg-white rounded-xl hover:bg-gray-100 transition-colors whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  )
}
