import Image from "next/image"
import Link from "next/link"
import {
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MessageSquare,
  Download,
} from "lucide-react"
import { Suspense } from "react"
import { ContactForm } from "@/components/contact-form"
import { GithubContributions } from "@/components/github-contributions"
import { ResourcesSection } from "@/components/resources-section"
import { VideosSection } from "@/components/videos-section"
import { LinkedInSection } from "@/components/linkedin-section"
import { InstagramSection } from "@/components/instagram-section"
import { FreelanceServicesSection } from "@/components/freelance-services-section"
import { SoftwareSection } from "@/components/software-section"

/* ── helpers ── */
function SectionSkeleton() {
  return (
    <div className="rounded-2xl bg-[#1c1c1e] border border-[#2a2a2a] h-24 animate-pulse" />
  )
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-[#1c1c1e] border border-[#2a2a2a] ${className}`}>
      {children}
    </div>
  )
}

function ContactBadge({ icon, value, href }: { icon: React.ReactNode; value?: string; href: string }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <div className="flex items-center justify-center gap-1.5 rounded-full border border-[#2a2a2a] bg-[#1c1c1e] px-3 py-1.5 h-[28px] min-w-[52px] text-xs text-[#ccc] hover:border-[#444] hover:text-white transition-colors">
        {icon}
        {value && <span>{value}</span>}
      </div>
    </Link>
  )
}

/* ── page ── */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <main className="mx-auto max-w-[440px] px-4 py-10 space-y-3">

        {/* ────── IDENTITÉ ────── */}
        <div className="flex flex-col items-center text-center pb-4">
          <div className="mb-3 h-16 w-16 overflow-hidden rounded-full border-2 border-[#2a2a2a]">
            <Image
              src="https://github.com/yanix2445.png"
              alt="Yanis Harrat"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">Yanis Harrat</h1>

          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-[#1c1c1e] border border-[#2a2a2a] px-3 py-1 text-[11px] text-[#888]">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
              BTS SIO SISR
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-[#1c1c1e] border border-[#2a2a2a] px-3 py-1 text-[11px] text-[#888]">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 shrink-0" />
              Alternant
            </span>
          </div>
          <p className="mt-1.5 text-xs text-[#555]">Passionné de tech & open source</p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <ContactBadge icon={<Mail className="h-3 w-3" />} href="mailto:yanis.amine.harrat@gmail.com" />
            <ContactBadge icon={<Phone className="h-3 w-3" />} href="tel:0768187934" />
            <ContactBadge icon={<Instagram className="h-3 w-3" />} value="10K" href="https://instagram.com/yanix2445" />
            <ContactBadge icon={<Linkedin className="h-3 w-3" />} value="300+" href="https://linkedin.com/in/yanis-harrat" />
          </div>
        </div>

        {/* ────── RECHERCHE D'ALTERNANCE ────── */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="text-sm font-semibold">En recherche d'alternance</span>
          </div>
          <p className="text-xs text-[#555] mb-3 leading-relaxed">
            BTS SIO SISR · Disponible dès maintenant · Île-de-France & remote
          </p>
          <div className="flex gap-2">
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-white text-black text-xs font-medium py-2 hover:bg-gray-100 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Mon CV
            </Link>
            <Link
              href="https://linkedin.com/in/yanis-harrat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#252525] text-[#ccc] text-xs font-medium py-2 hover:bg-[#2a2a2a] hover:text-white transition-colors"
            >
              <Linkedin className="h-3.5 w-3.5" />
              LinkedIn
            </Link>
          </div>
        </Card>

        {/* ────── GITHUB ────── */}
        <Suspense fallback={<SectionSkeleton />}>
          <GithubContributions username="yanix2445" />
        </Suspense>

        {/* ────── COMPÉTENCES ────── */}
        <FreelanceServicesSection />

        {/* ────── RESSOURCES ────── */}

        {/* Projets & Liens */}
        <ResourcesSection />

        {/* Stack & Outils */}
        <Card className="overflow-hidden">
          <div className="px-5 pt-4 pb-3 border-b border-[#232323]">
            <p className="text-sm font-semibold text-white">Stack & Outils</p>
            <p className="text-xs text-[#555] mt-0.5">Outils self-hosted & quotidien</p>
          </div>
          <div className="px-5 pb-4">
            <SoftwareSection />
          </div>
        </Card>

        {/* ────── CONTENU ────── */}

        {/* LinkedIn */}
        <LinkedInSection />

        {/* Instagram */}
        <Suspense fallback={<SectionSkeleton />}>
          <InstagramSection />
        </Suspense>

        {/* Vidéos YouTube */}
        <Suspense fallback={<SectionSkeleton />}>
          <VideosSection />
        </Suspense>

        {/* ────── CONTACT ────── */}
        <Card className="p-5" id="contact">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-4 w-4 text-[#888]" />
            <span className="text-sm font-semibold">Drop a line</span>
          </div>
          <ContactForm />
        </Card>

        {/* Footer */}
        <div className="pt-6 pb-2 text-center">
          <p className="text-xs text-[#444]">© 2026 Yanis Harrat</p>
        </div>

      </main>
    </div>
  )
}
