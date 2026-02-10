"use client"

import { useState } from "react"
import { sendContactMessage } from "@/lib/contact"

type Status = "idle" | "loading" | "success" | "error"

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    const result = await sendContactMessage({ name, email, message })

    if (result.success) {
      setStatus("success")
      setName("")
      setEmail("")
      setMessage("")
    } else {
      setStatus("error")
      setErrorMsg(result.error ?? "Une erreur est survenue.")
    }
  }

  const inputClass =
    "w-full bg-[#252525] border border-[#333] rounded-xl px-4 py-4 text-base text-white placeholder:text-[#666] outline-none focus:border-[#555] transition-colors disabled:opacity-50"

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={status === "loading"}
        required
        className={inputClass}
      />
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "loading"}
        required
        className={inputClass}
      />
      <textarea
        placeholder="Leave a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={status === "loading"}
        required
        rows={4}
        className={`${inputClass} resize-none`}
      />

      {status === "success" && (
        <p className="text-center text-sm text-green-400 py-1">
          Message envoyé avec succès !
        </p>
      )}
      {status === "error" && (
        <p className="text-center text-sm text-red-400 py-1">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 text-base font-bold text-white rounded-xl bg-[#1e1e1e] hover:bg-[#2a2a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Envoi en cours..." : "Send message"}
      </button>
    </form>
  )
}
