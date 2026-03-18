import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ToolCards } from "@/components/tool-cards"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <ToolCards />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
