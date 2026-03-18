"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Layers,
  Sparkles,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Shuffle,
  RotateCw,
} from "lucide-react"

interface Flashcard {
  front: string
  back: string
}

const countOptions = [
  { label: "5 Cards", value: 5 },
  { label: "10 Cards", value: 10 },
  { label: "15 Cards", value: 15 },
]

const sampleTexts = [
  {
    title: "Cell Biology",
    text: "The cell is the basic structural, functional, and biological unit of all known organisms. Cells are the smallest unit of life that can replicate independently. The cell membrane is a biological membrane that separates the interior of all cells from the outside environment. The cell membrane controls the movement of substances in and out of cells. Mitochondria are membrane-bound organelles found in the cytoplasm of eukaryotic cells that generate most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy. The nucleus contains most of the cell's genetic material, organized as DNA molecules along with a variety of proteins to form chromosomes. The endoplasmic reticulum is a type of organelle that forms an interconnected network of flattened, membrane-enclosed sacs known as cisternae. Ribosomes are macromolecular machines that perform biological protein synthesis, translating messenger RNA into polypeptide chains. The Golgi apparatus packages proteins inside the cell before they are sent to their destination.",
  },
  {
    title: "World War II",
    text: "World War II lasted from 1939 to 1945 and involved most of the world's nations. The war began when Germany invaded Poland on September 1, 1939. The Allied Powers included the United Kingdom, France, the Soviet Union, the United States, and China. The Axis Powers were led by Germany, Italy, and Japan. D-Day, June 6, 1944, was the largest seaborne invasion in history when Allied forces landed in Normandy, France. The Battle of Stalingrad was one of the deadliest battles in history and marked a turning point on the Eastern Front. The war in Europe ended on May 8, 1945, known as V-E Day, when Germany surrendered unconditionally. The atomic bombings of Hiroshima and Nagasaki in August 1945 led to Japan's surrender and the end of the war. The United Nations was established after the war to promote international cooperation and prevent future conflicts.",
  },
]

function extractFlashcards(text: string, count: number): Flashcard[] {
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 15)

  const cards: Flashcard[] = []
  const usedSentences = sentences.slice(0, Math.min(count * 2, sentences.length))

  for (let i = 0; i < Math.min(count, usedSentences.length); i++) {
    const sentence = usedSentences[i]
    const words = sentence.split(/\s+/)

    // Find key terms (longer words, likely subject-specific)
    const keyTerms = words.filter((w) => w.length > 5 && /^[A-Za-z]/.test(w))
    const keyTerm =
      keyTerms.length > 0
        ? keyTerms[Math.floor(Math.random() * keyTerms.length)]
        : words[Math.floor(words.length / 2)]

    // Create a question from the sentence
    const cleanSentence = sentence.replace(/^\s+/, "")

    if (cleanSentence.toLowerCase().includes("is ") || cleanSentence.toLowerCase().includes("are ")) {
      // Definition-style: "What is/are X?"
      const parts = cleanSentence.split(/\b(?:is|are)\b/i)
      if (parts.length >= 2 && parts[0].trim().length > 3) {
        cards.push({
          front: `What ${cleanSentence.toLowerCase().includes("are ") ? "are" : "is"} ${parts[0].trim().toLowerCase()}?`,
          back: cleanSentence,
        })
        continue
      }
    }

    if (cleanSentence.toLowerCase().includes("when ") || /\b\d{4}\b/.test(cleanSentence)) {
      // Date-related
      cards.push({
        front: `When did this happen: ${cleanSentence.replace(/\b\d{4}\b/g, "____").toLowerCase()}?`,
        back: cleanSentence,
      })
      continue
    }

    // Generic fill-in-the-blank
    const blanked = cleanSentence.replace(
      new RegExp(`\\b${keyTerm}\\b`, "i"),
      "______"
    )
    if (blanked !== cleanSentence) {
      cards.push({
        front: `Fill in the blank: ${blanked}`,
        back: keyTerm,
      })
    } else {
      cards.push({
        front: `Explain: ${cleanSentence.substring(0, 60)}...`,
        back: cleanSentence,
      })
    }
  }

  return cards.length > 0
    ? cards
    : [
        {
          front: "Could not generate flashcards",
          back: "Try pasting more detailed notes with complete sentences.",
        },
      ]
}

export function FlashcardPanel() {
  const [inputText, setInputText] = useState("")
  const [cards, setCards] = useState<Flashcard[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [selectedCount, setSelectedCount] = useState(10)
  const [countOpen, setCountOpen] = useState(false)
  const [wordCount, setWordCount] = useState(0)

  const handleTextChange = (text: string) => {
    setInputText(text)
    const count = text.trim() ? text.trim().split(/\s+/).length : 0
    setWordCount(count)
  }

  const handleGenerate = useCallback(() => {
    if (!inputText.trim()) return
    setIsLoading(true)
    setCards([])
    setCurrentIndex(0)
    setIsFlipped(false)

    setTimeout(() => {
      const generated = extractFlashcards(inputText, selectedCount)
      setCards(generated)
      setIsLoading(false)
    }, 1800)
  }, [inputText, selectedCount])

  const handleReset = () => {
    setInputText("")
    setCards([])
    setCurrentIndex(0)
    setIsFlipped(false)
    setWordCount(0)
  }

  const handleSampleText = (text: string) => {
    handleTextChange(text)
    setCards([])
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  const goNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false)
      setTimeout(() => setCurrentIndex(currentIndex + 1), 150)
    }
  }

  const goPrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false)
      setTimeout(() => setCurrentIndex(currentIndex - 1), 150)
    }
  }

  const handleShuffle = () => {
    setIsFlipped(false)
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setCurrentIndex(0)
  }

  const currentCount = countOptions.find((o) => o.value === selectedCount)

  return (
    <section className="mx-auto max-w-5xl px-6 py-10 md:py-16">
      {/* Back link and page heading */}
      <div className="mb-10">
        <Link
          href="/"
          className="group mb-6 inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back to Home
        </Link>
        <div className="flex items-start gap-4">
          <div className="hidden h-12 w-12 items-center justify-center rounded-xl bg-accent/30 sm:flex">
            <Layers className="h-5 w-5 text-accent-foreground" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              Flashcard Generator
            </h1>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-base">
              Paste your notes and generate study-ready flashcards with active recall.
            </p>
          </div>
        </div>
      </div>

      {/* Controls bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card/50 p-3">
        <div className="flex items-center gap-3">
          {/* Count selector */}
          <div className="relative">
            <button
              onClick={() => setCountOpen(!countOpen)}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 font-mono text-[11px] tracking-widest uppercase text-foreground transition-colors hover:border-primary/30"
            >
              {currentCount?.label}
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
            {countOpen && (
              <div className="absolute left-0 top-full z-10 mt-1 w-40 rounded-lg border border-border bg-card p-1.5 shadow-lg">
                {countOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSelectedCount(option.value)
                      setCountOpen(false)
                    }}
                    className={`flex w-full rounded-md px-3 py-2 text-left font-mono text-[11px] tracking-widest uppercase transition-colors hover:bg-background ${
                      selectedCount === option.value
                        ? "bg-background text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Word count badge */}
          {wordCount > 0 && (
            <span className="rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[10px] tracking-wider text-muted-foreground">
              {wordCount} {wordCount === 1 ? "word" : "words"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {(inputText || cards.length > 0) && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 font-mono text-[11px] tracking-widest uppercase text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" />
              Clear
            </button>
          )}
          <button
            onClick={handleGenerate}
            disabled={!inputText.trim() || isLoading}
            className="inline-flex items-center gap-2 rounded-md border border-primary bg-primary px-4 py-2 font-mono text-[11px] tracking-widest uppercase text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                Generating
              </>
            ) : (
              <>
                <Sparkles className="h-3 w-3" />
                Generate
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main two-panel layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input panel */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">
              Your Notes
            </h2>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Paste your lecture notes, textbook excerpts, or study material here..."
            className="mt-3 min-h-[320px] flex-1 resize-none rounded-lg border border-border bg-card p-5 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary/30 focus:outline-none md:min-h-[400px]"
          />
          {/* Sample texts */}
          {!inputText && (
            <div className="mt-4">
              <p className="mb-2 font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                Try a sample
              </p>
              <div className="flex flex-wrap gap-2">
                {sampleTexts.map((sample) => (
                  <button
                    key={sample.title}
                    onClick={() => handleSampleText(sample.text)}
                    className="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-[11px] tracking-wider text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                  >
                    {sample.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Output panel — flashcard viewer */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">
              Flashcards
            </h2>
            {cards.length > 0 && (
              <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
                {currentIndex + 1} / {cards.length}
              </span>
            )}
          </div>

          <div className="mt-3 min-h-[320px] flex-1 rounded-lg border border-border bg-card md:min-h-[400px]">
            {isLoading ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 text-center md:min-h-[400px]">
                <div className="relative flex h-14 w-14 items-center justify-center">
                  <div className="absolute inset-0 animate-spin rounded-full border-2 border-border border-t-primary" />
                  <Layers className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-xs tracking-widest uppercase text-foreground">
                    Analyzing your notes
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Crafting questions and answers...
                  </p>
                </div>
              </div>
            ) : cards.length > 0 ? (
              <div className="flex h-full min-h-[320px] flex-col md:min-h-[400px]">
                {/* Card display */}
                <div className="flex flex-1 flex-col">
                  <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="group/card flex flex-1 cursor-pointer flex-col items-center justify-center p-6 text-center transition-all"
                    aria-label={isFlipped ? "Show question" : "Show answer"}
                  >
                    {/* Card label */}
                    <span className="mb-4 rounded-full border border-border bg-background px-3 py-1 font-mono text-[9px] tracking-widest uppercase text-muted-foreground">
                      {isFlipped ? "Answer" : "Question"}
                    </span>

                    {/* Card content */}
                    <p className="max-w-sm text-base leading-relaxed text-foreground md:text-lg">
                      {isFlipped
                        ? cards[currentIndex].back
                        : cards[currentIndex].front}
                    </p>

                    {/* Flip hint */}
                    <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60 transition-colors group-hover/card:text-muted-foreground">
                      <RotateCw className="h-3 w-3" />
                      {isFlipped ? "Tap to see question" : "Tap to reveal answer"}
                    </span>
                  </button>
                </div>

                {/* Navigation controls */}
                <div className="flex items-center justify-between border-t border-border p-4">
                  <button
                    onClick={goPrev}
                    disabled={currentIndex === 0}
                    className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 font-mono text-[11px] tracking-widest uppercase text-muted-foreground transition-colors hover:bg-background hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    Prev
                  </button>

                  <button
                    onClick={handleShuffle}
                    className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 font-mono text-[11px] tracking-widest uppercase text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                    aria-label="Shuffle cards"
                  >
                    <Shuffle className="h-3.5 w-3.5" />
                    Shuffle
                  </button>

                  <button
                    onClick={goNext}
                    disabled={currentIndex === cards.length - 1}
                    className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 font-mono text-[11px] tracking-widest uppercase text-muted-foreground transition-colors hover:bg-background hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Next
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Progress dots */}
                <div className="flex items-center justify-center gap-1.5 border-t border-border px-4 py-3">
                  {cards.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setIsFlipped(false)
                        setCurrentIndex(i)
                      }}
                      className={`h-1.5 rounded-full transition-all ${
                        i === currentIndex
                          ? "w-4 bg-primary"
                          : "w-1.5 bg-border hover:bg-muted-foreground/30"
                      }`}
                      aria-label={`Go to card ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-3 text-center md:min-h-[400px]">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-dashed border-border">
                  <Layers
                    className="h-5 w-5 text-muted-foreground/40"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                    No flashcards yet
                  </p>
                  <p className="mt-1 max-w-[220px] text-xs text-muted-foreground/70">
                    Paste your notes and click Generate to create study cards.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tips section */}
      <div className="mt-10 rounded-lg border border-dashed border-border p-6">
        <h3 className="mb-3 font-mono text-[11px] tracking-widest uppercase text-muted-foreground">
          Tips for better flashcards
        </h3>
        <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary/60" />
            Use detailed notes with clear definitions.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary/60" />
            Click each card to flip between question and answer.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary/60" />
            Shuffle the deck to test yourself in random order.
          </li>
        </ul>
      </div>
    </section>
  )
}
