"use client"

import { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import { CalendarDays } from "lucide-react"

export function CalFloatingButton() {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({
        namespace: "premier-contact-15",
        embedLibUrl: "https://cal.yanis-harrat.com/embed/embed.js",
      })
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: true,
        layout: "month_view",
      })
    })()
  }, [])

  return (
    <button
      data-cal-namespace="premier-contact-15"
      data-cal-link="yanis-harrat/premier-contact-15"
      data-cal-origin="https://cal.yanis-harrat.com"
      data-cal-config='{"layout":"month_view","theme":"dark"}'
      className="fixed bottom-5 right-5 z-50 flex h-9 items-center gap-2 rounded-full bg-white px-3.5 text-xs font-medium text-black shadow-lg hover:bg-gray-100 transition-colors"
    >
      <CalendarDays className="h-3.5 w-3.5 shrink-0" />
      Prendre RDV
    </button>
  )
}
