"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Users } from "lucide-react"
import Image from "next/image"

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string
  category: string
  participants?: number
}

const events: Event[] = [
  {
    id: 1,
    title: "Operação Cidade Segura",
    description: "Grande operação de segurança com foco na prevenção de crimes e aproximação com a comunidade",
    date: "2024-02-15",
    time: "08:00",
    location: "Centro de Cidade Alta Paradise",
    image: "/placeholder.svg?height=300&width=400",
    category: "Operação",
    participants: 45,
  },
  {
    id: 2,
    title: "Treinamento Tático Conjunto",
    description: "Exercício de treinamento envolvendo todas as unidades especializadas da PMCAP",
    date: "2024-02-20",
    time: "14:00",
    location: "Centro de Treinamento PMCAP",
    image: "/placeholder.svg?height=300&width=400",
    category: "Treinamento",
    participants: 80,
  },
  {
    id: 3,
    title: "Palestra Educativa nas Escolas",
    description: "Programa de educação sobre segurança no trânsito e prevenção às drogas",
    date: "2024-02-25",
    time: "09:00",
    location: "Escolas Municipais",
    image: "/placeholder.svg?height=300&width=400",
    category: "Educativo",
    participants: 200,
  },
  {
    id: 4,
    title: "Cerimônia de Formatura",
    description: "Formatura da nova turma de recrutas da Polícia Militar",
    date: "2024-03-01",
    time: "19:00",
    location: "Auditório Central",
    image: "/placeholder.svg?height=300&width=400",
    category: "Cerimônia",
    participants: 25,
  },
  {
    id: 5,
    title: "Blitz Educativa de Trânsito",
    description: "Ação educativa focada na conscientização sobre segurança no trânsito",
    date: "2024-03-05",
    time: "07:00",
    location: "Avenida Principal",
    image: "/placeholder.svg?height=300&width=400",
    category: "Blitz",
    participants: 15,
  },
  {
    id: 6,
    title: "Reunião Comunitária",
    description: "Encontro com líderes comunitários para discussão de estratégias de segurança",
    date: "2024-03-10",
    time: "18:00",
    location: "Centro Comunitário",
    image: "/placeholder.svg?height=300&width=400",
    category: "Reunião",
    participants: 30,
  },
]

export default function EventosPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const categories = ["Todos", "Operação", "Treinamento", "Educativo", "Cerimônia", "Blitz", "Reunião"]

  const filteredEvents =
    selectedCategory === "Todos" ? events : events.filter((event) => event.category === selectedCategory)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black via-blue-900 to-black py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-yellow-500">Eventos</span> PMCAP
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Acompanhe nossas operações, treinamentos e atividades comunitárias
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-yellow-500 text-black hover:bg-yellow-600"
                    : "border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-black"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold">
                    {event.category}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    {event.participants && (
                      <div className="flex items-center text-gray-500">
                        <Users className="h-4 w-4 mr-2" />
                        {event.participants} participantes
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum evento encontrado</h3>
              <p className="text-gray-600">Não há eventos na categoria selecionada.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
