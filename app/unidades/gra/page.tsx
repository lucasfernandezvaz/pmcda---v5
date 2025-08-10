import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plane, Users, Target, Clock, ExternalLink, AlertCircle, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function GRAPage() {
  const editalAberto = true
  const editalInfo = {
    title: "Seleção GRA - Radiopatrulhamento Aéreo",
    vagas: 5,
    dataFechamento: "2024-03-15",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black via-blue-900 to-black py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=120&width=120&text=GRA+LOGO"
                  alt="Logo GRA"
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="text-center md:text-left text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-yellow-500">GRA</span>
              </h1>
              <h2 className="text-2xl md:text-3xl mb-4">Grupo de Radiopatrulhamento Aéreo</h2>
              <p className="text-xl text-gray-300 max-w-2xl">
                Unidade especializada em patrulhamento aéreo e apoio tático às operações terrestres
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Edital Status */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <Card className={`border-l-4 ${editalAberto ? "border-l-green-500" : "border-l-red-500"}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {editalAberto ? (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  ) : (
                    <AlertCircle className="h-8 w-8 text-red-500" />
                  )}
                  <div>
                    <h3 className="text-xl font-bold">Status do Edital: {editalAberto ? "ABERTO" : "FECHADO"}</h3>
                    {editalAberto && (
                      <div className="text-gray-600">
                        <p>{editalInfo.title}</p>
                        <p>
                          {editalInfo.vagas} vagas disponíveis • Encerra em {editalInfo.dataFechamento}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {editalAberto && (
                  <Button asChild className="bg-green-500 hover:bg-green-600">
                    <Link href="/painel/editais">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver Edital
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About GRA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Sobre o <span className="text-yellow-600">GRA</span>
              </h2>
              <p className="text-gray-600 mb-4">
                O Grupo de Radiopatrulhamento Aéreo (GRA) é responsável pelo patrulhamento aéreo de Cidade Alta
                Paradise, proporcionando uma visão estratégica das operações e apoio tático às unidades terrestres.
              </p>
              <p className="text-gray-600 mb-4">
                Equipado com aeronaves modernas e tecnologia de ponta, o GRA realiza missões de vigilância,
                reconhecimento, apoio a perseguições e operações de resgate em locais de difícil acesso.
              </p>
              <p className="text-gray-600 mb-6">
                A unidade opera 24 horas por dia, garantindo cobertura aérea contínua e resposta rápida a emergências
                que requerem intervenção aérea.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Plane className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="font-bold text-lg">4</div>
                  <div className="text-sm text-gray-600">Aeronaves Ativas</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="font-bold text-lg">12</div>
                  <div className="text-sm text-gray-600">Pilotos Certificados</div>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=400&width=600&text=GRA+Helicóptero"
                alt="GRA em operação aérea"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How GRA Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Como Funciona o <span className="text-yellow-600">GRA</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Plane className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle>Patrulhamento Aéreo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Monitoramento contínuo do espaço aéreo e vigilância de pontos estratégicos da cidade.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle>Apoio Tático</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Suporte aéreo às operações terrestres com coordenação em tempo real.</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle>Resposta Rápida</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Tempo de resposta otimizado para emergências e situações críticas.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Especialidades do <span className="text-yellow-600">GRA</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Patrulhamento Aéreo",
              "Apoio Tático",
              "Vigilância",
              "Resgate Aéreo",
              "Reconhecimento",
              "Perseguição Aérea",
              "Transporte Tático",
              "Operações Noturnas",
            ].map((specialty, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 text-center">
                  <Badge variant="outline" className="border-blue-500 text-blue-600">
                    {specialty}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Requisitos para <span className="text-yellow-500">Ingresso</span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gray-900 border-blue-500">
                <CardHeader>
                  <CardTitle className="text-blue-400">Requisitos Básicos</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Mínimo 1 ano de experiência na PMCAP
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Exame médico aeronáutico aprovado
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Ausência de vertigem ou claustrofobia
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Boa condição física geral
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-blue-500">
                <CardHeader>
                  <CardTitle className="text-blue-400">Requisitos Técnicos</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Curso de Comunicação Operacional
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Conhecimento básico de navegação
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Curso Aerotático (obrigatório)
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Disponibilidade para voos noturnos
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
