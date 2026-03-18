"use client"

import { BookOpen, Menu, X } from "lucide-react"
import { useState } from "react"

const navItems = ["Tools", "Library", "Progress", "About"]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card transition-colors group-hover:border-primary/40 group-hover:bg-primary/5">
            <BookOpen className="h-4 w-4 text-primary" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold leading-tight tracking-wide text-foreground">
              StudyMate
            </span>
            <span className="hidden font-mono text-[9px] leading-tight tracking-widest uppercase text-muted-foreground sm:block">
              Academic companion
            </span>
          </div>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="rounded-md px-4 py-2 font-mono text-xs tracking-widest uppercase text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#"
          className="hidden items-center rounded-md border border-primary bg-primary px-5 py-2 font-mono text-[11px] tracking-widest uppercase text-primary-foreground transition-all hover:bg-primary/90 md:inline-flex"
        >
          Sign In
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-card hover:text-foreground md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="rounded-md px-3 py-2.5 font-mono text-xs tracking-widest uppercase text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
              >
                {item}
              </a>
            ))}
            <div className="mt-2 border-t border-border pt-3">
              <a
                href="#"
                className="inline-flex w-full items-center justify-center rounded-md border border-primary bg-primary px-5 py-2.5 font-mono text-[11px] tracking-widest uppercase text-primary-foreground transition-all hover:bg-primary/90"
              >
                Sign In
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
