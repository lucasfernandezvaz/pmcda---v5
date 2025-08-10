import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Target, Clock, ExternalLink, AlertCircle, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function GTMPage() {
  // Simular verificação de edital aberto
  const editalAberto = true
  const editalInfo = {
    title: "Recrutamento GTM - Grupo Tático Militar",
    vagas: 10,
    dataFechamento: "2024-02-28",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black via-blue-900 to-black py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-yellow-500 rounded-full flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=120&width=120&text=GTM+LOGO"
                  alt="Logo GTM"
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="text-center md:text-left text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-yellow-500">GTM</span>
              </h1>
              <h2 className="text-2xl md:text-3xl mb-4">Grupo Tático Militar</h2>
              <p className="text-xl text-gray-300 max-w-2xl">
                Unidade de elite especializada em operações táticas de alta complexidade e situações de risco extremo
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

      {/* About GTM */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Sobre o <span className="text-yellow-600">GTM</span>
              </h2>
              <p className="text-gray-600 mb-4">
                O Grupo Tático Militar (GTM) é a unidade de elite da PMCAP, especializada em operações de alta
                complexidade que exigem treinamento avançado e equipamentos especializados.
              </p>
              <p className="text-gray-600 mb-4">
                Nossos operadores são altamente treinados em técnicas de combate urbano, resgate de reféns, controle de
                distúrbios e operações especiais que demandam precisão e eficiência máxima.
              </p>
              <p className="text-gray-600 mb-6">
                O GTM atua como força de resposta rápida em situações críticas, proporcionando suporte tático às demais
                unidades da corporação quando necessário.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Users className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="font-bold text-lg">25</div>
                  <div className="text-sm text-gray-600">Operadores Ativos</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Target className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="font-bold text-lg">98%</div>
                  <div className="text-sm text-gray-600">Taxa de Sucesso</div>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=400&width=600&text=GTM+em+Ação"
                alt="GTM em operação"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How GTM Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Como Funciona o <span className="text-yellow-600">GTM</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>Seleção Rigorosa</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Processo seletivo criterioso que avalia aptidão física, psicológica e técnica dos candidatos.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Target className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>Treinamento Intensivo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Programa de treinamento contínuo em técnicas táticas, tiro de precisão e operações especiais.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>Resposta Rápida</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Prontidão 24/7 para atender ocorrências de alta complexidade em tempo record.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Especialidades do <span className="text-yellow-600">GTM</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Operações Táticas",
              "Controle de Distúrbios",
              "Resgate de Reféns",
              "Negociação",
              "Combate Urbano",
              "Operações Noturnas",
              "Apoio Aéreo",
              "Explosivos",
            ].map((specialty, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 text-center">
                  <Badge variant="outline" className="border-yellow-500 text-yellow-600">
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
              <Card className="bg-gray-900 border-yellow-500">
                <CardHeader>
                  <CardTitle className="text-yellow-500">Requisitos Básicos</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Mínimo 2 anos de experiência na PMCAP
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Excelente condicionamento físico
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Avaliação psicológica aprovada
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Histórico disciplinar exemplar
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-yellow-500">
                <CardHeader>
                  <CardTitle className="text-yellow-500">Requisitos Técnicos</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Curso de Tiro Tático aprovado
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Conhecimento em primeiros socorros
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Experiência em operações de campo
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Disponibilidade para missões especiais
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
