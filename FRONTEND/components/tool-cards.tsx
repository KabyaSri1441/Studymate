import Link from "next/link"
import { FileText, Layers, ArrowRight } from "lucide-react"

const tools = [
  {
    icon: FileText,
    title: "Summarize Text",
    description:
      "Paste any article, lecture notes, or textbook passage and get a concise, clear summary. Perfect for exam prep and quick reviews.",
    tag: "AI-Powered",
    action: "Start Summarizing",
    href: "/summarize",
    accent: "from-primary/10 to-primary/5",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Layers,
    title: "Flashcard Generator",
    description:
      "Turn your notes into study-ready flashcards with spaced repetition. Build lasting memory through active recall practice.",
    tag: "Smart Recall",
    action: "Generate Cards",
    href: "/flashcards",
    accent: "from-accent/30 to-accent/10",
    iconBg: "bg-accent/30",
    iconColor: "text-accent-foreground",
  },
]

export function ToolCards() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
      <div className="grid gap-6 md:grid-cols-2">
        {tools.map((tool) => (
          <div
            key={tool.title}
            className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            {/* Gradient accent top bar */}
            <div className={`h-1 w-full bg-gradient-to-r ${tool.accent}`} />

            <div className="flex flex-col p-8 md:p-10">
              {/* Icon and tag */}
              <div className="mb-6 flex items-start justify-between">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${tool.iconBg} transition-transform duration-300 group-hover:scale-110`}
                >
                  <tool.icon className={`h-6 w-6 ${tool.iconColor}`} strokeWidth={1.5} />
                </div>
                <span className="rounded-full border border-border bg-background px-3 py-1 font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                  {tool.tag}
                </span>
              </div>

              {/* Content */}
              <h2 className="mb-3 text-2xl font-bold text-foreground">
                {tool.title}
              </h2>
              <p className="mb-8 flex-1 leading-relaxed text-muted-foreground">
                {tool.description}
              </p>

              {/* Action button */}
              <Link
                href={tool.href}
                className="group/btn inline-flex items-center gap-2.5 self-start rounded-lg border border-primary bg-primary px-6 py-3 font-mono text-xs tracking-widest uppercase text-primary-foreground transition-all duration-200 hover:gap-3.5 hover:bg-primary/90 active:scale-[0.98]"
              >
                {tool.action}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
              </Link>
            </div>

            {/* Decorative corner element */}
            <div className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full border border-border/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="pointer-events-none absolute -bottom-4 -right-4 h-20 w-20 rounded-full border border-border/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </section>
  )
}
