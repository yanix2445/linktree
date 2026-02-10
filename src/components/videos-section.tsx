import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Play, Youtube } from "lucide-react"
import { getVideosOEmbed } from "@/lib/youtube"
import { curatedVideoUrls } from "@/data/videos"

export async function VideosSection() {
  const videos = await getVideosOEmbed(curatedVideoUrls)

  if (videos.length === 0) return null

  return (
    <div>

      {/* ── Vidéos sélectionnées (oEmbed officiel) ── */}
      <div className="rounded-2xl bg-[#1c1c1e] border border-[#2a2a2a] overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#232323]">
          <div className="flex items-center gap-2">
            <Youtube className="h-4 w-4 text-[#888]" />
            <div>
              <p className="text-sm font-semibold leading-none">Vidéos</p>
              <p className="text-[11px] text-[#555] mt-0.5">Ma sélection</p>
            </div>
          </div>
          <Link
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#555] hover:text-[#888] transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-[#1e1e1e]">
          {videos.map((v) => (
            <Link
              key={v.url}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex gap-3 items-center px-5 py-3 hover:bg-[#232325] transition-colors"
            >
              {/* Thumbnail fournie directement par oEmbed */}
              <div className="relative h-[52px] w-[90px] shrink-0 overflow-hidden rounded-lg bg-[#252525]">
                <Image
                  src={v.thumbnail_url}
                  alt={v.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="h-4 w-4 text-white fill-white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium line-clamp-2 leading-snug">
                  {v.title}
                </p>
                <p className="text-[11px] text-[#555] mt-1">{v.author_name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
