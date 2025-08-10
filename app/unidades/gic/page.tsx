import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Users, Clock, Shield } from "lucide-react"
import Image from "next/image"

const gicMembers = [
  {
    id: 1,
    name: "Investigador Silva",
    rank: "Capitão",
    role: "Chefe de Investigação",
    image: "/placeholder.svg?height=200&width=150&text=Cap+Silva",
    specialties: ["Crimes Organizados", "Inteligência", "Operações Especiais"],
  },
  {
    id: 2,
    name: "Investigador Santos",
    rank: "Tenente",
    role: "Investigador Sênior",
    image: "/placeholder.svg?height=200&width=150&text=Ten+Santos",
    specialties: ["Crimes Cibernéticos", "Fraudes", "Lavagem de Dinheiro"],
  },
  {
    id: 3,
    name: "Investigador Costa",
    rank: "Sargento",
    role: "Investigador de Campo",
    image: "/placeholder.svg?height=200&width=150&text=Sgt+Costa",
    specialties: ["Vigilância", "Infiltração", "Coleta de Inteligência"],
  },
]

const cases = [
  {
    id: 1,
    title: "Operação Rede Sombra",
    date: "2024-01-22",
    status: "Em Andamento",
    description: "Investigação de organização criminosa envolvida em tráfico de drogas",
    classification: "Confidencial",
  },
  {
    id: 2,
    title: "Caso Fraude Bancária",
    date: "2024-01-20",
    status: "Concluído",
    description: "Investigação de esquema de fraudes em instituições financeiras",
    classification: "Sigiloso",
  },
  {
    id: 3,
    title: "Operação Cyber Shield",
    date: "2024-01-18",
    status: "Concluído",
    description: "Combate a crimes cibernéticos e invasões de sistemas",
    classification: "Reservado",
  },
]

const specialties = [
  {
    name: "Crimes Organizados",
    description: "Investigação de organizações criminosas e suas ramificações",
    icon: "🕵️",
  },
  {
    name: "Inteligência Criminal",
    description: "Coleta e análise de informações para prevenção de crimes",
    icon: "🧠",
  },
  {
    name: "Crimes Cibernéticos",
    description: "Investigação de crimes praticados no ambiente digital",
    icon: "💻",
  },
  {
    name: "Lavagem de Dinheiro",
    description: "Rastreamento de recursos financeiros ilícitos",
    icon: "💰",
  },
  {
    name: "Vigilância e Infiltração",
    description: "Operações encobertas para coleta de evidências",
    icon: "👁️",
  },
  {
    name: "Análise de Dados",
    description: "Processamento de grandes volumes de informações",
    icon: "📊",
  },
]

const editais = [
  {
    id: 1,
    title: "Seleção para Investigador Criminal",
    description: "Processo seletivo para novos investigadores do GIC",
    deadline: "2024-05-15",
    vacancies: 4,
    status: "Aberto",
  },
  {
    id: 2,
    title: "Curso de Inteligência Criminal",
    description: "Especialização em técnicas de investigação e inteligência",
    deadline: "2024-04-30",
    vacancies: 12,
    status: "Aberto",
  },
]

export default function GICPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black via-indigo-900 to-black py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center">
              <Eye className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-indigo-500">GIC</span> - Grupo de Investigação Criminal
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Unidade especializada em investigação criminal, inteligência e combate ao crime organizado
          </p>
        </div>
      </section>

      {/* Main Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/placeholder.svg?height=400&width=600&text=GIC+Investigation"
                alt="GIC em investigação"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Sobre o <span className="text-indigo-600">GIC</span>
              </h2>
              <p className="text-gray-600 mb-4">
                O Grupo de Investigação Criminal (GIC) é a unidade de elite da PMCAP especializada em investigações
                complexas, inteligência criminal e combate ao crime organizado.
              </p>
              <p className="text-gray-600 mb-4">
                Nossa equipe de investigadores altamente treinados utiliza técnicas avançadas de investigação, análise
                de dados e inteligência para desmantelar organizações criminosas e elucidar crimes complexos.
              </p>
              <p className="text-gray-600 mb-6">
                Trabalhamos em estreita colaboração com outras unidades e órgãos de segurança para garantir a eficácia
                das operações e a segurança da comunidade.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <Shield className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
                  <div className="font-bold text-lg">87%</div>
                  <div className="text-sm text-gray-600">Taxa de Solução</div>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <Eye className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
                  <div className="font-bold text-lg">24/7</div>
                  <div className="text-sm text-gray-600">Vigilância</div>
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
            Equipe de <span className="text-indigo-600">Investigadores</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gicMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 bg-indigo-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    {member.rank}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-center">{member.name}</CardTitle>
                  <p className="text-center text-indigo-600 font-semibold">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold mb-2">Especialidades:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, index) => (
                        <span key={index} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">
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

      {/* Specialties */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Áreas de <span className="text-indigo-600">Especialização</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((specialty, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{specialty.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{specialty.name}</h3>
                  <p className="text-gray-600 text-sm">{specialty.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Cases */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Casos <span className="text-indigo-600">Recentes</span>
          </h2>

          <div className="space-y-6">
            {cases.map((case_) => (
              <Card key={case_.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-xl font-bold">{case_.title}</h3>
                        <span
                          className={`px-2 py-1 rounded text-sm font-semibold ${
                            case_.status === "Concluído"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {case_.status}
                        </span>
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                          {case_.classification}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{case_.description}</p>
                      <p className="text-sm text-gray-500">
                        <Clock className="h-4 w-4 inline mr-1" />
                        {new Date(case_.date).toLocaleDateString("pt-BR")}
                      </p>
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
            Processos <span className="text-indigo-600">Seletivos</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {editais.map((edital) => (
              <Card key={edital.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-indigo-500">
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
                  <Button className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600">Inscrever-se</Button>
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
            Faça Parte do <span className="text-indigo-500">GIC</span>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Torne-se um investigador criminal e contribua para o combate ao crime organizado e a segurança da sociedade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-indigo-500 text-white hover:bg-indigo-600">
              Processo Seletivo
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white bg-transparent"
            >
              Mais Informações
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
