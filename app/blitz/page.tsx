import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Users, AlertTriangle, CheckCircle, Target } from "lucide-react"
import Image from "next/image"

const blitzTypes = [
  {
    id: 1,
    name: "Blitz de Trânsito",
    description: "Fiscalização de infrações de trânsito, documentação veicular e condutores",
    frequency: "Diária",
    locations: ["Avenida Principal", "Centro da Cidade", "Saídas da Cidade"],
    objectives: ["Reduzir acidentes", "Fiscalizar documentação", "Educação no trânsito"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    name: "Blitz Anti-Drogas",
    description: "Operação de combate ao tráfico e uso de entorpecentes",
    frequency: "Semanal",
    locations: ["Pontos estratégicos", "Áreas de risco", "Eventos públicos"],
    objectives: ["Combater tráfico", "Apreender drogas", "Prisão de traficantes"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    name: "Blitz de Armas",
    description: "Fiscalização de porte ilegal de armas e munições",
    frequency: "Quinzenal",
    locations: ["Barreiras móveis", "Pontos de controle", "Eventos especiais"],
    objectives: ["Apreender armas ilegais", "Reduzir violência", "Controle de munições"],
    image: "/placeholder.svg?height=300&width=400",
  },
]

const statistics = [
  { label: "Blitz realizadas este mês", value: "45", icon: Target },
  { label: "Infrações registradas", value: "128", icon: AlertTriangle },
  { label: "Veículos fiscalizados", value: "1,250", icon: CheckCircle },
  { label: "Policiais envolvidos", value: "80", icon: Users },
]

export default function BlitzPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black via-blue-900 to-black py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Operações <span className="text-yellow-500">Blitz</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Conheça nossas operações de fiscalização e controle para garantir a segurança e ordem pública
          </p>
        </div>
      </section>

      {/* Main Image and Description */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Operação Blitz PMCAP"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">
                O que são as <span className="text-yellow-600">Blitz</span>?
              </h2>
              <p className="text-gray-600 mb-4">
                As operações blitz da PMCAP são ações preventivas e repressivas realizadas em pontos estratégicos da
                cidade com o objetivo de fiscalizar, educar e garantir o cumprimento das leis.
              </p>
              <p className="text-gray-600 mb-4">
                Essas operações são planejadas com base em análises de dados criminais, estatísticas de acidentes e
                demandas da comunidade, sempre visando a máxima eficiência e segurança.
              </p>
              <p className="text-gray-600 mb-6">
                Nossa abordagem combina rigor na fiscalização com educação e orientação aos cidadãos, promovendo uma
                cultura de respeito às leis e segurança coletiva.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="font-bold text-lg">24/7</div>
                  <div className="text-sm text-gray-600">Operação Contínua</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <MapPin className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="font-bold text-lg">15+</div>
                  <div className="text-sm text-gray-600">Pontos Estratégicos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Resultados das <span className="text-yellow-600">Operações</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statistics.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <stat.icon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Blitz */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Tipos de <span className="text-yellow-600">Operações</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blitzTypes.map((blitz) => (
              <Card
                key={blitz.id}
                className="hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-yellow-500"
              >
                <div className="relative h-48">
                  <Image
                    src={blitz.image || "/placeholder.svg"}
                    alt={blitz.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{blitz.name}</CardTitle>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    Frequência: {blitz.frequency}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{blitz.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-yellow-500" />
                      Locais de Atuação:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {blitz.locations.map((location, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {location}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Target className="h-4 w-4 mr-1 text-yellow-500" />
                      Objetivos:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {blitz.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Operational Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Como Funcionam as <span className="text-yellow-600">Operações</span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="font-bold mb-2">Planejamento</h3>
                  <p className="text-sm text-gray-600">Análise de dados e definição de pontos estratégicos</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="font-bold mb-2">Mobilização</h3>
                  <p className="text-sm text-gray-600">Deslocamento das equipes para os locais definidos</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="font-bold mb-2">Execução</h3>
                  <p className="text-sm text-gray-600">Fiscalização, abordagem e orientação aos cidadãos</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <h3 className="font-bold mb-2">Relatório</h3>
                  <p className="text-sm text-gray-600">Documentação dos resultados e análise de eficácia</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Colabore com as <span className="text-yellow-500">Operações</span>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Sua colaboração é fundamental para o sucesso das operações. Mantenha sempre seus documentos em dia e
            respeite as orientações dos policiais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-600">
              Denunciar Irregularidade
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black bg-transparent"
            >
              Falar com a Ouvidoria
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
