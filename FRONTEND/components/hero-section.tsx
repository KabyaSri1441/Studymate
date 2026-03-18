import { Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-accent-foreground/60" strokeWidth={1.5} />
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
              Your study desk, reimagined
            </span>
          </div>
          <h1 className="text-balance text-4xl font-bold leading-tight text-foreground md:text-5xl">
            Study smarter,{" "}
            <span className="italic text-primary">not harder</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-pretty leading-relaxed text-muted-foreground">
            Transform the way you learn with tools built for focus and retention.
            Summarize dense material and generate flashcards in seconds.
          </p>
        </div>
      </div>
    </section>
  )
}
