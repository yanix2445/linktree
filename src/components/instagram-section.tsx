import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Instagram } from "lucide-react"
import { getInstagramPosts, getInstagramProfile } from "@/lib/instagram"

export async function InstagramSection() {
  const [posts, profile] = await Promise.all([
    getInstagramPosts(3),
    getInstagramProfile(),
  ])

  const followersLabel = profile
    ? profile.followers_count >= 1000
      ? `${(profile.followers_count / 1000).toFixed(profile.followers_count % 1000 === 0 ? 0 : 1)}K`
      : String(profile.followers_count)
    : "10K"

  return (
    <div className="rounded-2xl bg-[#1c1c1e] border border-[#2a2a2a] overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#232323]">
        <div className="flex items-center gap-2">
          <Instagram className="h-4 w-4 text-[#888]" />
          <span className="text-sm font-semibold">Instagram</span>
          <span className="text-[10px] text-[#555] border border-[#2a2a2a] rounded-full px-2 py-0.5">
            {followersLabel}
          </span>
        </div>
        <Link
          href="https://instagram.com/yanix2445"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#555] hover:text-[#888] transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-3 gap-1.5 p-3">
          {posts.map((post, i) => {
            const src =
              post.media_type === "VIDEO"
                ? (post.thumbnail_url ?? post.media_url)
                : post.media_url
            return (
              <Link
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={src}
                    alt={`Post ${i + 1}`}
                    fill
                    unoptimized
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {post.like_count !== undefined && (
                    <div className="absolute top-1.5 right-1.5 flex items-center gap-1 rounded-full bg-black/60 px-1.5 py-0.5">
                      <span className="text-red-500 text-[10px] leading-none">♥</span>
                      <span className="text-[9px] text-white font-medium leading-none">
                        {post.like_count >= 1000
                          ? `${(post.like_count / 1000).toFixed(1)}K`
                          : post.like_count}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <Link
          href="https://instagram.com/yanix2445"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-5 py-4 hover:bg-[#232325] transition-colors"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#252525] text-[#aaa] group-hover:text-white transition-colors">
            <Instagram className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">@yanix2445</p>
            <p className="text-xs text-[#555] mt-0.5">Voir mon Instagram</p>
          </div>
          <ExternalLink className="h-3.5 w-3.5 text-[#444] ml-auto" />
        </Link>
      )}
    </div>
  )
}
