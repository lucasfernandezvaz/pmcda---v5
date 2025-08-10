import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Users, Target, Clock } from "lucide-react"
import Image from "next/image"

const gotMembers = [
  {
    id: 1,
    name: "Comandante Silva",
    rank: "Capitão",
    role: "Comandante GOT",
    image: "/placeholder.svg?height=200&width=150&text=Cap+Silva",
    specialties: ["Liderança Tática", "Planejamento Operacional"],
  },
  {
    id: 2,
    name: "Operador Santos",
    rank: "Sargento",
    role: "Operador Sênior",
    image: "/placeholder.svg?height=200&width=150&text=Sgt+Santos",
    specialties: ["Operações Especiais", "Armamento Pesado"],
  },
  {
    id: 3,
    name: "Operador Costa",
    rank: "Cabo",
    role: "Operador Tático",
    image: "/placeholder.svg?height=200&width=150&text=Cb+Costa",
    specialties: ["Infiltração", "Combate Urbano"],
  },
]

const missions = [
  {
    id: 1,
    title: "Operação Tempestade",
    date: "2024-01-15",
    status: "Concluída",
    description: "Operação de combate ao crime organizado na região metropolitana",
    result: "100% de sucesso - 15 prisões efetuadas",
  },
  {
    id: 2,
    title: "Operação Escudo",
    date: "2024-01-10",
    status: "Concluída",
    description: "Proteção de evento de grande porte com autoridades",
    result: "Evento realizado sem incidentes",
  },
  {
    id: 3,
    title: "Operação Resgate",
    date: "2024-01-05",
    status: "Concluída",
    description: "Resgate de reféns em situação de crise",
    result: "Todos os reféns liberados com segurança",
  },
]

const equipment = [
  {
    name: "Fuzil de Assalto HK416",
    category: "Armamento Principal",
    description: "Fuzil de alta precisão para operações táticas",
  },
  {
    name: "Pistola Glock 19",
    category: "Armamento Secundário",
    description: "Pistola compacta para situações de emergência",
  },
  {
    name: "Colete Balístico Nível IIIA",
    category: "Proteção",
    description: "Proteção contra projéteis de armas de fogo",
  },
  {
    name: "Óculos de Visão Noturna",
    category: "Equipamento Tático",
    description: "Visão aprimorada para operações noturnas",
  },
]

const editais = [
  {
    id: 1,
    title: "Processo Seletivo GOT 2024",
    description: "Seleção para novos operadores do Grupo de Operações Táticas",
    deadline: "2024-03-15",
    vacancies: 5,
    status: "Aberto",
  },
  {
    id: 2,
    title: "Curso de Especialização Tática",
    description: "Curso avançado para aperfeiçoamento de operadores",
    deadline: "2024-02-28",
    vacancies: 10,
    status: "Aberto",
  },
]

export default function GOTPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black via-red-900 to-black py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-red-500">GOT</span> - Grupo de Operações Táticas
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Unidade de elite especializada em operações de alto risco e situações críticas
          </p>
        </div>
      </section>

      {/* Main Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/placeholder.svg?height=400&width=600&text=GOT+Operations"
                alt="GOT em ação"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Sobre o <span className="text-red-600">GOT</span>
              </h2>
              <p className="text-gray-600 mb-4">
                O Grupo de Operações Táticas (GOT) é a unidade de elite da PMCAP, especializada em operações de alto
                risco, controle de distúrbios, resgate de reféns e combate ao crime organizado.
              </p>
              <p className="text-gray-600 mb-4">
                Formado por operadores altamente treinados e equipados com tecnologia de ponta, o GOT atua em situações
                que exigem resposta rápida, precisão e eficiência máxima.
              </p>
              <p className="text-gray-600 mb-6">
                Nossa missão é proteger vidas, manter a ordem pública e garantir a segurança da comunidade através de
                operações táticas especializadas.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <Target className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <div className="font-bold text-lg">98%</div>
                  <div className="text-sm text-gray-600">Taxa de Sucesso</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <Clock className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <div className="font-bold text-lg">24/7</div>
                  <div className="text-sm text-gray-600">Prontidão</div>
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
            Equipe <span className="text-red-600">GOT</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gotMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    {member.rank}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-center">{member.name}</CardTitle>
                  <p className="text-center text-red-600 font-semibold">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold mb-2">Especialidades:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, index) => (
                        <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
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

      {/* Recent Missions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Missões <span className="text-red-600">Recentes</span>
          </h2>

          <div className="space-y-6">
            {missions.map((mission) => (
              <Card key={mission.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-xl font-bold">{mission.title}</h3>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                          {mission.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{mission.description}</p>
                      <p className="text-sm text-gray-500 mb-2">
                        <Clock className="h-4 w-4 inline mr-1" />
                        {new Date(mission.date).toLocaleDateString("pt-BR")}
                      </p>
                      <p className="text-sm font-semibold text-green-600">{mission.result}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Equipamentos <span className="text-red-600">Táticos</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {equipment.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                      <p className="text-red-600 text-sm font-semibold mb-2">{item.category}</p>
                      <p className="text-gray-600 text-sm">{item.description}</p>
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
            Processos <span className="text-red-600">Seletivos</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {editais.map((edital) => (
              <Card key={edital.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
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
                  <Button className="w-full mt-4 bg-red-500 hover:bg-red-600">Inscrever-se</Button>
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
            Faça Parte do <span className="text-red-500">GOT</span>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Junte-se à elite da PMCAP. Torne-se um operador tático e faça a diferença em operações críticas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-500 text-white hover:bg-red-600">
              Processo Seletivo
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
            >
              Mais Informações
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
