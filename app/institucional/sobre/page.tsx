import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Award, Target, Eye, Heart } from "lucide-react"
import Image from "next/image"

export default function SobrePage() {
  const values = [
    {
      icon: Shield,
      title: "Integridade",
      description: "Agimos com honestidade e transparência em todas as nossas ações",
    },
    {
      icon: Users,
      title: "Respeito",
      description: "Tratamos todos os cidadãos com dignidade e consideração",
    },
    {
      icon: Award,
      title: "Excelência",
      description: "Buscamos constantemente a melhoria de nossos serviços",
    },
    {
      icon: Target,
      title: "Disciplina",
      description: "Mantemos ordem e organização em todas as operações",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black via-blue-900 to-black py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Sobre a <span className="text-yellow-500">PMCAP</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Conheça nossa história, missão e valores que nos guiam na proteção de Cidade Alta Paradise
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center border-t-4 border-t-yellow-500">
              <CardHeader>
                <Target className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>Nossa Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Garantir a segurança pública, a ordem social e a proteção dos direitos fundamentais dos cidadãos de
                  Cidade Alta Paradise através de um policiamento preventivo e repressivo qualificado.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-t-4 border-t-yellow-500">
              <CardHeader>
                <Eye className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>Nossa Visão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ser reconhecida como uma instituição de excelência em segurança pública, referência em
                  profissionalismo, inovação e proximidade com a comunidade.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-t-4 border-t-yellow-500">
              <CardHeader>
                <Heart className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>Nossos Valores</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Integridade, respeito, excelência, disciplina, coragem e compromisso com a justiça e o bem-estar
                  social.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values Detail */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <value.icon className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nossa <span className="text-yellow-600">História</span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Sede da PMCAP"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Fundação e Crescimento</h3>
                <p className="text-gray-600 mb-4">
                  A Polícia Militar de Cidade Alta Paradise foi fundada em 2019 com o objetivo de proporcionar segurança
                  e ordem à crescente comunidade da região. Desde então, temos expandido nossas operações e capacidades.
                </p>
                <p className="text-gray-600 mb-4">
                  Com mais de 5 anos de serviço dedicado, desenvolvemos unidades especializadas e programas de
                  treinamento que nos tornaram referência em segurança pública na região.
                </p>
                <p className="text-gray-600">
                  Hoje, contamos com mais de 150 policiais ativos, 6 unidades especializadas e cobertura 24/7 em toda
                  Cidade Alta Paradise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nossos <span className="text-yellow-500">Números</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">150+</div>
              <div className="text-sm">Policiais Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">6</div>
              <div className="text-sm">Unidades Especiais</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">24/7</div>
              <div className="text-sm">Cobertura</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">5+</div>
              <div className="text-sm">Anos de Serviço</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
