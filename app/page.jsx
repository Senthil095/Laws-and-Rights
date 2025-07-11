import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { GameSection } from "@/components/game-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
  
      <Hero />
      <GameSection />
    </main>
  )
}
