import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Users, Award, Clock, FileText } from "lucide-react"
import Image from "next/image"

const periciaMembers = [
  {
    id: 1,
    name: "Perito Silva",
    rank: "Capitão",
    role: "Chefe de Perícia",
    image: "/placeholder.svg?height=200&width=150&text=Cap+Silva",
    specialties: ["Balística", "Papiloscopia", "Documentoscopia"],
  },
  {
    id: 2,
    name: "Perito Santos",
    rank: "Tenente",
    role: "Perito Criminal",
    image: "/placeholder.svg?height=200&width=150&text=Ten+Santos",
    specialties: ["Medicina Legal", "Toxicologia", "DNA"],
  },
  {
    id: 3,
    name: "Perito Costa",
    rank: "Sargento",
    role: "Perito Técnico",
    image: "/placeholder.svg?height=200&width=150&text=Sgt+Costa",
    specialties: ["Informática Forense", "Engenharia Legal", "Acidentes"],
  },
]

const investigations = [
  {
    id: 1,
    title: "Investigação de Homicídio",
    date: "2024-01-20",
    status: "Em Andamento",
    description: "Análise balística e coleta de evidências em caso de homicídio",
    progress: "75%",
  },
  {
    id: 2,
    title: "Fraude Documental",
    date: "2024-01-18",
    status: "Concluída",
    description: "Perícia em documentos suspeitos de falsificação",
    progress: "100%",
  },
  {
    id: 3,
    title: "Acidente de Trânsito",
    date: "2024-01-15",
    status: "Concluída",
    description: "Reconstituição de acidente com vítima fatal",
    progress: "100%",
  },
]

const services = [
  {
    name: "Perícia Balística",
    description: "Análise de armas de fogo, projéteis e resíduos de disparo",
    icon: "🔫",
  },
  {
    name: "Papiloscopia",
    description: "Identificação através de impressões digitais",
    icon: "👆",
  },
  {
    name: "Documentoscopia",
    description: "Análise de autenticidade de documentos",
    icon: "📄",
  },
  {
    name: "Medicina Legal",
    description: "Exames médico-legais e necroscópicos",
    icon: "🏥",
  },
  {
    name: "Informática Forense",
    description: "Recuperação e análise de dados digitais",
    icon: "💻",
  },
  {
    name: "Engenharia Legal",
    description: "Perícias em estruturas e acidentes",
    icon: "🏗️",
  },
]

const editais = [
  {
    id: 1,
    title: "Concurso para Perito Criminal",
    description: "Seleção para novos peritos criminais especializados",
    deadline: "2024-04-15",
    vacancies: 3,
    status: "Aberto",
  },
  {
    id: 2,
    title: "Curso de Especialização em Balística",
    description: "Curso avançado para peritos em análise balística",
    deadline: "2024-03-30",
    vacancies: 8,
    status: "Aberto",
  },
]

export default function PericiaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black via-purple-900 to-black py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-purple-500">PERÍCIA</span> - Perícia Criminal
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Unidade especializada em investigação científica e análise forense para elucidação de crimes
          </p>
        </div>
      </section>

      {/* Main Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/placeholder.svg?height=400&width=600&text=Perícia+Forense"
                alt="Perícia em ação"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Sobre a <span className="text-purple-600">Perícia</span>
              </h2>
              <p className="text-gray-600 mb-4">
                A Perícia Criminal da PMCAP é responsável pela investigação científica de crimes, utilizando métodos e
                tecnologias avançadas para coleta, análise e interpretação de evidências.
              </p>
              <p className="text-gray-600 mb-4">
                Nossa equipe de peritos altamente qualificados atua em diversas especialidades, desde balística e
                papiloscopia até informática forense e medicina legal.
              </p>
              <p className="text-gray-600 mb-6">
                Trabalhamos com rigor científico e imparcialidade para fornecer laudos técnicos que auxiliam na
                elucidação de crimes e na busca pela justiça.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <FileText className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="font-bold text-lg">1,250</div>
                  <div className="text-sm text-gray-600">Laudos/Ano</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="font-bold text-lg">95%</div>
                  <div className="text-sm text-gray-600">Precisão</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Equipe de <span className="text-purple-600">Peritos</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {periciaMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    {member.rank}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-center">{member.name}</CardTitle>
                  <p className="text-center text-purple-600 font-semibold">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold mb-2">Especialidades:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, index) => (
                        <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Serviços <span className="text-purple-600">Periciais</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Investigations */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Investigações <span className="text-purple-600">Recentes</span>
          </h2>

          <div className="space-y-6">
            {investigations.map((investigation) => (
              <Card key={investigation.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-xl font-bold">{investigation.title}</h3>
                        <span
                          className={`px-2 py-1 rounded text-sm font-semibold ${
                            investigation.status === "Concluída"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {investigation.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{investigation.description}</p>
                      <p className="text-sm text-gray-500 mb-2">
                        <Clock className="h-4 w-4 inline mr-1" />
                        {new Date(investigation.date).toLocaleDateString("pt-BR")}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">Progresso:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: investigation.progress }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-purple-600">{investigation.progress}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Processos <span className="text-purple-600">Seletivos</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {editais.map((edital) => (
              <Card key={edital.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{edital.title}</CardTitle>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                      {edital.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{edital.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      {edital.vacancies} vagas disponíveis
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      Prazo: {new Date(edital.deadline).toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-purple-500 hover:bg-purple-600">Inscrever-se</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Faça Parte da <span className="text-purple-500">Perícia</span>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contribua para a justiça através da ciência forense. Torne-se um perito criminal e ajude a elucidar crimes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-500 text-white hover:bg-purple-600">
              Processo Seletivo
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white bg-transparent"
            >
              Mais Informações
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
