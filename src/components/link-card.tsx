"use client"

import { Card } from "@/components/ui/card"
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Code,
  FileText,
  Gift,
  Heart,
  Newspaper,
  ShoppingBag,
} from "lucide-react"
import Link from "next/link"

interface LinkCardProps {
  title: string
  description?: string
  href: string
  icon?: string
}

const iconMap = {
  briefcase: Briefcase,
  newspaper: Newspaper,
  code: Code,
  fileText: FileText,
  bookOpen: BookOpen,
  shoppingBag: ShoppingBag,
  heart: Heart,
  gift: Gift,
}

export function LinkCard({ title, description, href, icon }: LinkCardProps) {
  const Icon = icon ? iconMap[icon as keyof typeof iconMap] : null

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="group">
      <Card className="relative overflow-hidden border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-primary">
        <div className="flex items-center gap-4 p-6">
          {Icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
        </div>
      </Card>
    </Link>
  )
}
