import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, Target, ExternalLink, AlertCircle, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SPEEDPage() {
  const editalAberto = false
  const editalInfo = {
    title: "Processo Seletivo SPEED - Trânsito",
    vagas: 15,
    dataFechamento: "2024-01-31",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black via-blue-900 to-black py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=120&width=120&text=SPEED+LOGO"
                  alt="Logo SPEED"
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="text-center md:text-left text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-yellow-500">SPEED</span>
              </h1>
              <h2 className="text-2xl md:text-3xl mb-4">Policiamento de Trânsito</h2>
              <p className="text-xl text-gray-300 max-w-2xl">
                Unidade especializada em fiscalização de trânsito e educação viária para garantir a segurança nas vias
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
                    {!editalAberto && (
                      <div className="text-gray-600">
                        <p>Último edital: {editalInfo.title}</p>
                        <p>Encerrado em {editalInfo.dataFechamento}</p>
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

      {/* About SPEED */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Sobre o <span className="text-yellow-600">SPEED</span>
              </h2>
              <p className="text-gray-600 mb-4">
                O SPEED (Policiamento de Trânsito) é a unidade responsável pela fiscalização e educação no trânsito de
                Cidade Alta Paradise, atuando na prevenção de acidentes e no cumprimento das leis de trânsito.
              </p>
              <p className="text-gray-600 mb-4">
                Nossa equipe trabalha diariamente nas principais vias da cidade, realizando blitz educativas,
                fiscalização de velocidade, controle de documentação e orientação aos condutores.
              </p>
              <p className="text-gray-600 mb-6">
                Além da fiscalização, o SPEED desenvolve campanhas educativas em escolas e comunidades, promovendo a
                conscientização sobre segurança no trânsito.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <Car className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <div className="font-bold text-lg">18</div>
                  <div className="text-sm text-gray-600">Agentes de Trânsito</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <Target className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <div className="font-bold text-lg">85%</div>
                  <div className="text-sm text-gray-600">Redução de Acidentes</div>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=400&width=600&text=SPEED+Fiscalização"
                alt="SPEED em fiscalização"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Especialidades do <span className="text-yellow-600">SPEED</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Fiscalização de Trânsito",
              "Educação Viária",
              "Controle de Velocidade",
              "Acidentes de Trânsito",
              "Blitz Educativa",
              "Documentação Veicular",
              "Sinalização Viária",
              "Operações Especiais",
            ].map((specialty, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 text-center">
                  <Badge variant="outline" className="border-red-500 text-red-600">
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
              <Card className="bg-gray-900 border-red-500">
                <CardHeader>
                  <CardTitle className="text-red-400">Requisitos Básicos</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Carteira Nacional de Habilitação categoria B ou superior
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Mínimo 6 meses de experiência na PMCAP
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Conhecimento do Código de Trânsito Brasileiro
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Boa comunicação e relacionamento interpessoal
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-red-500">
                <CardHeader>
                  <CardTitle className="text-red-400">Requisitos Técnicos</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Curso de Comunicação Operacional
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Conhecimento em legislação de trânsito
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Capacidade de trabalhar em turnos
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Habilidade com equipamentos de fiscalização
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
