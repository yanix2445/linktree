import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"
import type { ContactPayload, ContactResponse } from "@/types/contact"

const resend = new Resend(process.env.RESEND_API_KEY)

const RECIPIENT = "yanis.amine.harrat@gmail.com"

function validate(payload: Partial<ContactPayload>): string | null {
  if (!payload.name?.trim()) return "Le nom est requis."
  if (!payload.email?.trim()) return "L'email est requis."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return "L'email est invalide."
  if (!payload.message?.trim()) return "Le message est requis."
  return null
}

export async function POST(req: NextRequest) {
  const body: Partial<ContactPayload> = await req.json()

  const validationError = validate(body)
  if (validationError) {
    return NextResponse.json<ContactResponse>({ success: false, error: validationError }, { status: 400 })
  }

  const { name, email, message } = body as ContactPayload

  const { error } = await resend.emails.send({
    from: "Linktree Contact <onboarding@resend.dev>",
    to: RECIPIENT,
    replyTo: email,
    subject: `Nouveau message de ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#111;color:#fff;padding:32px;border-radius:12px;">
        <h2 style="margin:0 0 24px;font-size:20px;">Nouveau message via Linktree</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#888;width:80px;">Nom</td>
            <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;">${name}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;color:#888;">Email</td>
            <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;">
              <a href="mailto:${email}" style="color:#aaa;">${email}</a>
            </td>
          </tr>
        </table>
        <div style="margin-top:24px;">
          <p style="color:#888;margin:0 0 8px;font-size:13px;">Message</p>
          <p style="background:#1c1c1e;border:1px solid #2a2a2a;border-radius:8px;padding:16px;margin:0;white-space:pre-wrap;line-height:1.6;">${message}</p>
        </div>
      </div>
    `,
  })

  if (error) {
    return NextResponse.json<ContactResponse>({ success: false, error: "Erreur lors de l'envoi." }, { status: 500 })
  }

  return NextResponse.json<ContactResponse>({ success: true })
}
