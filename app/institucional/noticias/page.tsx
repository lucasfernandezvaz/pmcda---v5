"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, Tag, ExternalLink } from "lucide-react"
import Image from "next/image"

interface News {
  id: number
  title: string
  summary: string
  content: string
  author: string
  date: string
  category: string
  image: string
  featured: boolean
}

const news: News[] = [
  {
    id: 1,
    title: "PMCAP Inaugura Nova Base Operacional no Distrito Sul",
    summary: "Nova instalação amplia cobertura de segurança e reduz tempo de resposta na região",
    content: "A Polícia Militar de Cidade Alta Paradise inaugurou oficialmente sua nova base operacional...",
    author: "Assessoria de Imprensa",
    date: "2024-01-28",
    category: "Institucional",
    image: "/placeholder.svg?height=300&width=500",
    featured: true,
  },
  {
    id: 2,
    title: "Operação Carnaval 2024 Registra Zero Ocorrências Graves",
    summary: "Planejamento estratégico e efetivo policial garantiram segurança durante os festejos",
    content: "Durante os quatro dias de Carnaval, a PMCAP mobilizou mais de 100 policiais...",
    author: "Coronel Silva",
    date: "2024-01-25",
    category: "Operações",
    image: "/placeholder.svg?height=300&width=500",
    featured: true,
  },
  {
    id: 3,
    title: "GTM Recebe Novos Equipamentos Táticos",
    summary: "Investimento em tecnologia fortalece capacidade operacional da unidade de elite",
    content: "O Grupo Tático Militar da PMCAP recebeu novos equipamentos de última geração...",
    author: "Cap. Santos",
    date: "2024-01-22",
    category: "Equipamentos",
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
  {
    id: 4,
    title: "Programa 'Escola Segura' Alcança 15 Instituições de Ensino",
    summary: "Iniciativa educativa promove cultura de paz e prevenção nas escolas",
    content: "O programa desenvolvido pela PMCAP já beneficiou mais de 3.000 estudantes...",
    author: "Sgt. Oliveira",
    date: "2024-01-20",
    category: "Educação",
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
  {
    id: 5,
    title: "SPEED Intensifica Fiscalização em Pontos Críticos",
    summary: "Unidade de trânsito foca em locais com maior índice de acidentes",
    content: "A unidade SPEED da PMCAP iniciou operação especial de fiscalização...",
    author: "Cb. Costa",
    date: "2024-01-18",
    category: "Trânsito",
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
  {
    id: 6,
    title: "Cerimônia de Promoção Reconhece Mérito de 20 Policiais",
    summary: "Evento celebra dedicação e excelência no serviço público",
    content: "Em cerimônia solene, 20 policiais militares foram promovidos...",
    author: "Assessoria de Imprensa",
    date: "2024-01-15",
    category: "Institucional",
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
]

export default function NoticiasPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todas")

  const categories = ["Todas", "Institucional", "Operações", "Equipamentos", "Educação", "Trânsito"]

  const filteredNews = selectedCategory === "Todas" ? news : news.filter((item) => item.category === selectedCategory)

  const featuredNews = news.filter((item) => item.featured)
  const regularNews = filteredNews.filter((item) => !item.featured)

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
            <span className="text-yellow-500">Notícias</span> PMCAP
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Fique por dentro das últimas novidades e acontecimentos da nossa corporação
          </p>
        </div>
      </section>

      {/* Featured News */}
      {selectedCategory === "Todas" && featuredNews.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Notícias em <span className="text-yellow-600">Destaque</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredNews.map((item) => (
                <Card
                  key={item.id}
                  className="hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-yellow-500"
                >
                  <div className="relative h-64">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      DESTAQUE
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(item.date)}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {item.author}
                      </div>
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-1" />
                        {item.category}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{item.summary}</p>
                    <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ler Mais
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filter Buttons */}
      <section className="py-8 bg-gray-100 border-b">
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

      {/* Regular News */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(selectedCategory === "Todas" ? regularNews : filteredNews).map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold">
                    {item.category}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <Calendar className="h-3 w-3" />
                    {formatDate(item.date)}
                    <User className="h-3 w-3 ml-2" />
                    {item.author}
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.summary}</p>
                  <Button size="sm" className="bg-yellow-500 text-black hover:bg-yellow-600">
                    Ler Mais
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <Tag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhuma notícia encontrada</h3>
              <p className="text-gray-600">Não há notícias na categoria selecionada.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
