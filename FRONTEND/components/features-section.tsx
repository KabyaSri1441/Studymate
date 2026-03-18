import { BookMarked, Clock, BarChart3, Bookmark } from "lucide-react"

const features = [
  {
    icon: BookMarked,
    title: "Subject Library",
    description: "Catalog your subjects and materials in one organized place.",
  },
  {
    icon: Clock,
    title: "Study Timer",
    description: "Stay focused with timed Pomodoro-based study sessions.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor study hours, completed readings, and mastery levels.",
  },
  {
    icon: Bookmark,
    title: "Bookmarks",
    description: "Save and annotate key passages from your reading materials.",
  },
]

export function FeaturesSection() {
  return (
    <section className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-14 text-center">
          <p className="mb-3 font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
            And more
          </p>
          <h2 className="text-balance text-3xl font-bold text-foreground">
            Everything you need to excel
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-lg border border-border bg-background p-6 transition-all duration-200 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                <feature.icon className="h-4.5 w-4.5 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="mb-1.5 font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
