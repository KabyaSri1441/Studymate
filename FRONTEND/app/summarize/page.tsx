import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SummarizePanel } from "@/components/summarize-panel"

export const metadata: Metadata = {
  title: "Summarize Text — StudyMate",
  description:
    "Paste any article, lecture notes, or textbook passage and get a concise, clear summary.",
}

export default function SummarizePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <SummarizePanel />
      </main>
      <Footer />
    </div>
  )
}
