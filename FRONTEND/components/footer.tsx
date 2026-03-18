import { BookOpen } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Motivational quote */}
        <div className="mb-10 text-center">
          <blockquote className="mx-auto max-w-lg">
            <p className="text-lg italic leading-relaxed text-foreground/80">
              {'"The beautiful thing about learning is that nobody can take it away from you."'}
            </p>
            <cite className="mt-3 block font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
              {"-- B.B. King"}
            </cite>
          </blockquote>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <span className="text-sm font-bold text-foreground">StudyMate</span>
            </div>

            {/* Links */}
            <nav className="flex items-center gap-6">
              {["Privacy", "Terms", "Contact"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Copyright */}
            <p className="font-mono text-[10px] tracking-wider text-muted-foreground">
              {"2026 StudyMate. All rights reserved."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
