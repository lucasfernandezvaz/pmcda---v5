"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ExternalLink, Calendar, Users, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Report {
  id: number
  title: string
  description: string
  category: string
  lastUpdate: string
  link: string
  icon: string
}

const reports: Report[] = [
  {
    id: 1,
    title: "Relatório Mensal de Alunos",
    description: "Relatório completo com dados de frequência, notas e desempenho dos alunos em treinamento",
    category: "Mensal",
    lastUpdate: "2024-01-28",
    link: "https://docs.google.com/spreadsheets/d/exemplo-mensal",
    icon: "📊",
  },
  {
    id: 2,
    title: "Relatório Semanal de Atividades",
    description: "Resumo semanal das atividades de treinamento e exercícios práticos realizados",
    category: "Semanal",
    lastUpdate: "2024-01-26",
    link: "https://docs.google.com/spreadsheets/d/exemplo-semanal",
    icon: "📈",
  },
  {
    id: 3,
    title: "Relatório de Avaliações",
    description: "Compilado das avaliações teóricas e práticas dos alunos por período",
    category: "Avaliações",
    lastUpdate: "2024-01-25",
    link: "https://docs.google.com/spreadsheets/d/exemplo-avaliacoes",
    icon: "📝",
  },
  {
    id: 4,
    title: "Relatório de Frequência",
    description: "Controle de presença e faltas dos alunos em todas as atividades",
    category: "Frequência",
    lastUpdate: "2024-01-24",
    link: "https://docs.google.com/spreadsheets/d/exemplo-frequencia",
    icon: "✅",
  },
  {
    id: 5,
    title: "Relatório de Desempenho Individual",
    description: "Análise detalhada do progresso individual de cada aluno",
    category: "Individual",
    lastUpdate: "2024-01-23",
    link: "https://docs.google.com/spreadsheets/d/exemplo-individual",
    icon: "👤",
  },
  {
    id: 6,
    title: "Relatório de Cursos Concluídos",
    description: "Lista de alunos que concluíram cursos e especializações",
    category: "Conclusões",
    lastUpdate: "2024-01-22",
    link: "https://docs.google.com/spreadsheets/d/exemplo-conclusoes",
    icon: "🎓",
  },
]

export default function RelatoriosPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      if (userData) {
        try {
          setUser(JSON.parse(userData))
        } catch (error) {
          console.error("Erro ao carregar dados do usuário:", error)
          router.push("/login")
        }
      } else {
        router.push("/login")
      }
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-12 w-12 text-yellow-500 mx-auto mb-4 animate-spin" />
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const categories = ["Todos", "Mensal", "Semanal", "Avaliações", "Frequência", "Individual", "Conclusões"]
  const filteredReports =
    selectedCategory === "Todos" ? reports : reports.filter((report) => report.category === selectedCategory)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Mensal":
        return "bg-blue-500"
      case "Semanal":
        return "bg-green-500"
      case "Avaliações":
        return "bg-purple-500"
      case "Frequência":
        return "bg-orange-500"
      case "Individual":
        return "bg-red-500"
      case "Conclusões":
        return "bg-indigo-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black via-blue-900 to-black py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-yellow-500">Relatórios</span> de Alunos
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Acesse relatórios detalhados sobre desempenho, frequência e progresso dos alunos em treinamento
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

      {/* Statistics Cards */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">156</div>
                <div className="text-sm text-gray-600">Alunos Ativos</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <BarChart3 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">89%</div>
                <div className="text-sm text-gray-600">Taxa de Aprovação</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Calendar className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">24</div>
                <div className="text-sm text-gray-600">Cursos Ativos</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <FileText className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">6</div>
                <div className="text-sm text-gray-600">Relatórios Disponíveis</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reports Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{report.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <div
                          className={`${getCategoryColor(report.category)} text-white px-2 py-1 rounded text-xs font-semibold mt-1 inline-block`}
                        >
                          {report.category}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{report.description}</p>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    Atualizado em: {formatDate(report.lastUpdate)}
                  </div>

                  <Button asChild className="w-full bg-yellow-500 text-black hover:bg-yellow-600">
                    <a href={report.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Acessar Relatório
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhum relatório encontrado</h3>
                <p className="text-gray-600">Não há relatórios na categoria selecionada.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Instructions Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Como Acessar os <span className="text-yellow-600">Relatórios</span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="font-bold mb-2">Selecione o Relatório</h3>
                  <p className="text-sm text-gray-600">Escolha o tipo de relatório que deseja visualizar</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="font-bold mb-2">Clique em "Acessar"</h3>
                  <p className="text-sm text-gray-600">O relatório será aberto em uma nova aba do navegador</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="font-bold mb-2">Visualize os Dados</h3>
                  <p className="text-sm text-gray-600">Analise as informações e exporte se necessário</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
