"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  FileText,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  ChevronDown,
} from "lucide-react"

const lengthOptions = [
  { label: "Brief", value: "brief", description: "2-3 sentences" },
  { label: "Standard", value: "standard", description: "A short paragraph" },
  { label: "Detailed", value: "detailed", description: "Multiple paragraphs" },
]

const sampleTexts = [
  {
    title: "Photosynthesis",
    text: "Photosynthesis is the process by which green plants and certain other organisms transform light energy into chemical energy. During photosynthesis in green plants, light energy is captured and used to convert water, carbon dioxide, and minerals into oxygen and energy-rich organic compounds. It is one of the most important biochemical pathways, since nearly all life on Earth depends on it as a source of food and oxygen. The process takes place largely in the leaves and depends on chlorophyll, a green pigment that absorbs light energy. Photosynthesis consists of two stages: the light-dependent reactions, which occur in the thylakoid membranes, and the Calvin cycle, which occurs in the stroma of chloroplasts. The light reactions convert solar energy to chemical energy in the form of ATP and NADPH, while simultaneously releasing oxygen. The Calvin cycle uses the ATP and NADPH from the light reactions to fix carbon dioxide into three-carbon sugars, which are later combined to form sucrose and starch.",
  },
  {
    title: "The French Revolution",
    text: "The French Revolution, which began in 1789 and ended in the late 1790s with the ascent of Napoleon Bonaparte, was a period of radical political and societal change in France. The revolution began with the Estates General of 1789 and ended in November 1799 with the formation of the French Consulate. Many of its ideas are considered fundamental principles of liberal democracy, while phrases like 'liberty, equality, fraternity' reappeared in other revolts. The causes of the revolution were many: the American Revolution demonstrated that it was plausible for Enlightenment ideas about how a government should be organized to actually be put into practice; financial crisis caused by involvement in the American Revolution and extravagant spending by King Louis XVI and Marie Antoinette; resentment of royal absolutism; and food scarcity in the years immediately before the revolution. The revolution resulted in the abolition of feudalism, the establishment of a republic, and the drafting of a Declaration of the Rights of Man and of the Citizen.",
  },
]

export function SummarizePanel() {
  const [inputText, setInputText] = useState("")
  const [summary, setSummary] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedLength, setSelectedLength] = useState("standard")
  const [lengthOpen, setLengthOpen] = useState(false)
  const [wordCount, setWordCount] = useState(0)

  const handleTextChange = (text: string) => {
    setInputText(text)
    const count = text.trim() ? text.trim().split(/\s+/).length : 0
    setWordCount(count)
  }

  const handleSummarize = async () => {
  if (!inputText.trim()) return

  setIsLoading(true)
  setSummary("")

  try {
    const response = await fetch("http://localhost:8080/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: inputText,
      }),
    })

    const data = await response.json()

    setSummary(data.summary)
  } catch (error) {
    console.error("Error generating summary:", error)
    setSummary("Something went wrong while generating the summary.")
  }

  setIsLoading(false)
}

  const handleCopy = () => {
    navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setInputText("")
    setSummary("")
    setWordCount(0)
  }

  const handleSampleText = (text: string) => {
    handleTextChange(text)
    setSummary("")
  }

  const currentLength = lengthOptions.find((o) => o.value === selectedLength)

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
          <div className="hidden h-12 w-12 items-center justify-center rounded-xl bg-primary/10 sm:flex">
            <FileText className="h-5 w-5 text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              Summarize Text
            </h1>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-base">
              Paste any article, lecture notes, or textbook passage and get a
              concise summary.
            </p>
          </div>
        </div>
      </div>

      {/* Controls bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card/50 p-3">
        <div className="flex items-center gap-3">
          {/* Length selector */}
          <div className="relative">
            <button
              onClick={() => setLengthOpen(!lengthOpen)}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 font-mono text-[11px] tracking-widest uppercase text-foreground transition-colors hover:border-primary/30"
            >
              {currentLength?.label}
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
            {lengthOpen && (
              <div className="absolute left-0 top-full z-10 mt-1 w-52 rounded-lg border border-border bg-card p-1.5 shadow-lg">
                {lengthOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSelectedLength(option.value)
                      setLengthOpen(false)
                    }}
                    className={`flex w-full flex-col rounded-md px-3 py-2 text-left transition-colors hover:bg-background ${
                      selectedLength === option.value ? "bg-background" : ""
                    }`}
                  >
                    <span className="font-mono text-[11px] tracking-widest uppercase text-foreground">
                      {option.label}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {option.description}
                    </span>
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
          {(inputText || summary) && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 font-mono text-[11px] tracking-widest uppercase text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" />
              Clear
            </button>
          )}
          <button
            onClick={handleSummarize}
            disabled={!inputText.trim() || isLoading}
            className="inline-flex items-center gap-2 rounded-md border border-primary bg-primary px-4 py-2 font-mono text-[11px] tracking-widest uppercase text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                Summarizing
              </>
            ) : (
              <>
                <Sparkles className="h-3 w-3" />
                Summarize
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
              Your Text
            </h2>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Paste your article, lecture notes, or textbook passage here..."
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

        {/* Output panel */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">
              Summary
            </h2>
            {summary && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-muted-foreground transition-colors hover:text-foreground"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copy
                  </>
                )}
              </button>
            )}
          </div>

          <div className="mt-3 min-h-[320px] flex-1 rounded-lg border border-border bg-card p-5 md:min-h-[400px]">
            {isLoading ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <div className="relative flex h-14 w-14 items-center justify-center">
                  <div className="absolute inset-0 animate-spin rounded-full border-2 border-border border-t-primary" />
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-xs tracking-widest uppercase text-foreground">
                    Reading your text
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Distilling the key points...
                  </p>
                </div>
              </div>
            ) : summary ? (
              <div>
                <p className="text-sm leading-relaxed text-foreground">
                  {summary}
                </p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="font-mono text-[10px] tracking-wider text-muted-foreground">
                    {summary.split(/\s+/).length} words{" "}
                    {wordCount > 0 && (
                      <span className="text-primary">
                        ({Math.round((summary.split(/\s+/).length / wordCount) * 100)}% of original)
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-dashed border-border">
                  <FileText className="h-5 w-5 text-muted-foreground/40" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                    No summary yet
                  </p>
                  <p className="mt-1 max-w-[200px] text-xs text-muted-foreground/70">
                    Paste your text and click Summarize to get started.
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
          Tips for better summaries
        </h3>
        <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary/60" />
            Paste complete paragraphs for more context.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary/60" />
            Longer texts produce better summaries.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary/60" />
            Use "Brief" mode for quick exam review.
          </li>
        </ul>
      </div>
    </section>
  )
}
