import type { ContactPayload, ContactResponse } from "@/types/contact"

export async function sendContactMessage(payload: ContactPayload): Promise<ContactResponse> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const data: ContactResponse = await res.json()

  if (!res.ok) {
    return { success: false, error: data.error ?? "Erreur inconnue." }
  }

  return { success: true }
}
