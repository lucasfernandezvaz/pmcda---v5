import { Carousel } from "@/components/carousel"
import { FAQ } from "@/components/faq"
import { Hero } from "@/components/hero"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Carousel />
      <FAQ />
    </div>
  )
}
