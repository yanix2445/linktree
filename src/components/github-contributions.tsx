import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { getContributions, getPinnedRepos } from "@/lib/github"

const DARK_COLORS: Record<string, string> = {
  "#ebedf0": "#1e242c",
  "#9be9a8": "#0e4429",
  "#40c463": "#006d32",
  "#30a14e": "#26a641",
  "#216e39": "#39d353",
}

function resolveColor(color: string): string {
  return DARK_COLORS[color.toLowerCase()] ?? "#1e242c"
}

// marge de sécurité supplémentaire
const MAX_WEEKS = 30
const CELL = 8
const GAP = 2

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""]

export async function GithubContributions({ username }: { username: string }) {
  const [calendar, repos] = await Promise.all([
    getContributions(username),
    getPinnedRepos(username),
  ])

  if (!calendar) {
    return (
      <div className="rounded-2xl bg-[#1c1c1e] border border-[#2a2a2a] p-5 text-center text-sm text-[#555]">
        Graphique indisponible — vérifie le GITHUB_TOKEN
      </div>
    )
  }

  const { totalContributions, weeks } = calendar
  const visibleWeeks = weeks.slice(-MAX_WEEKS)

  return (
    <div className="rounded-2xl bg-[#1c1c1e] border border-[#2a2a2a] overflow-hidden">

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#252525]">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-white">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </div>
          <div>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-white leading-none hover:text-[#aaa] transition-colors"
            >
              @{username}
            </a>
            <p className="text-[11px] text-[#555] mt-0.5">GitHub Activity</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-white tabular-nums leading-none">
            {totalContributions.toLocaleString()}
          </p>
          <p className="text-[11px] text-[#555] mt-0.5">contributions</p>
        </div>
      </div>

      {/* ── Grille ── */}
      <div className="px-4 pb-3 overflow-hidden">
        <div className="flex gap-0">

          {/* Labels jours */}
          <div
            className="flex flex-col shrink-0 mr-1.5"
            style={{ gap: `${GAP}px`, width: "20px" }}
          >
            {DAY_LABELS.map((label, i) => (
              <div
                key={i}
                className="flex items-center justify-end"
                style={{ height: `${CELL}px` }}
              >
                <span className="text-[8px] text-[#3a3a3a] leading-none">{label}</span>
              </div>
            ))}
          </div>

          {/* Semaines — overflow-hidden en sécurité */}
          <div className="flex overflow-hidden" style={{ gap: `${GAP}px` }}>
            {visibleWeeks.map((week, wi) => (
              <div key={wi} className="flex flex-col" style={{ gap: `${GAP}px` }}>
                {week.contributionDays.map((day, di) => (
                  <div
                    key={di}
                    title={`${day.date} · ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`}
                    style={{
                      width: `${CELL}px`,
                      height: `${CELL}px`,
                      borderRadius: "2px",
                      backgroundColor: resolveColor(day.color),
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Footer légende ── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#232323]">
        <div className="flex items-center gap-1">
          <span className="text-[9px] text-[#3a3a3a] mr-0.5">Less</span>
          {["#1e242c", "#0e4429", "#006d32", "#26a641", "#39d353"].map((c) => (
            <div
              key={c}
              style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: c }}
            />
          ))}
          <span className="text-[9px] text-[#3a3a3a] ml-0.5">More</span>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[9px] text-[#3a3a3a] hover:text-[#666] transition-colors"
        >
          github.com/{username}
        </a>
      </div>

      {/* ── Repos épinglés ── */}
      {repos.length > 0 && (
        <div className="border-t border-[#232323]">
          <p className="px-5 pt-3.5 pb-2 text-xs font-semibold text-[#555]">Projets épinglés</p>
          <div className="divide-y divide-[#1e1e1e]">
            {repos.map((repo) => (
              <Link
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-5 py-3 hover:bg-[#232325] transition-colors"
              >
                {/* Thumbnail Open Graph */}
                <div className="relative h-10 w-[72px] shrink-0 overflow-hidden rounded-lg bg-[#252525]">
                  <Image
                    src={repo.openGraphImageUrl}
                    alt={repo.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate group-hover:text-white">
                    {repo.name}
                  </p>
                  {repo.description && (
                    <p className="text-[11px] text-[#555] mt-0.5 truncate">{repo.description}</p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  {repo.primaryLanguage && (
                    <span
                      className="text-[10px] border border-[#2a2a2a] rounded-full px-2 py-0.5 text-[#555]"
                    >
                      {repo.primaryLanguage.name}
                    </span>
                  )}
                  {repo.stargazerCount > 0 && (
                    <span className="flex items-center gap-0.5 text-[10px] text-[#444]">
                      <Star className="h-2.5 w-2.5" />
                      {repo.stargazerCount}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
