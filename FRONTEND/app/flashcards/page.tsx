import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FlashcardPanel } from "@/components/flashcard-panel"

export const metadata: Metadata = {
  title: "Flashcard Generator — StudyMate",
  description:
    "Turn your notes into study-ready flashcards. Build lasting memory through active recall practice.",
}

export default function FlashcardsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <FlashcardPanel />
      </main>
      <Footer />
    </div>
  )
}
