"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const slides = [
  {
    id: 1,
    image: "/placeholder.svg?height=400&width=800",
    title: "Frota Moderna",
    description: "Viaturas equipadas com tecnologia de ponta para melhor atendimento",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=400&width=800",
    title: "Treinamento Contínuo",
    description: "Capacitação constante de nossos policiais para excelência no serviço",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=400&width=800",
    title: "Proximidade com a Comunidade",
    description: "Trabalhamos junto à população para uma cidade mais segura",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=400&width=800",
    title: "Unidades Especializadas",
    description: "Grupos táticos preparados para situações de alta complexidade",
  },
]

export function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Nossa <span className="text-yellow-600">Corporação</span>
        </h2>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={slides[currentSlide].image || "/placeholder.svg"}
              alt={slides[currentSlide].title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">{slides[currentSlide].title}</h3>
                <p className="text-lg">{slides[currentSlide].description}</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-yellow-600" : "bg-gray-300"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
