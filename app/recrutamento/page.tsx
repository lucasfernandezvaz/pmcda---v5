import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Users, Clock, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const recruitmentMaterials = [
  {
    id: 1,
    title: "Manual do Recruta",
    description: "Guia completo com todas as informações necessárias para novos candidatos",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    type: "PDF",
  },
  {
    id: 2,
    title: "Apostila de Legislação",
    description: "Conteúdo sobre leis e regulamentos aplicáveis à atividade policial",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    type: "PDF",
  },
  {
    id: 3,
    title: "Guia de Conduta Ética",
    description: "Princípios éticos e morais que regem a conduta do policial militar",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    type: "PDF",
  },
  {
    id: 4,
    title: "Formulário de Inscrição",
    description: "Documento oficial para candidatura ao processo de recrutamento",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    type: "Formulário",
  },
]

const requirements = [
  "Idade mínima de 18 anos",
  "Ensino médio completo",
  "Não possuir antecedentes criminais",
  "Estar em dia com obrigações eleitorais",
  "Disponibilidade de horário",
  "Aptidão física e mental",
]

const processSteps = [
  {
    step: 1,
    title: "Inscrição",
    description: "Preenchimento do formulário e envio da documentação",
    icon: FileText,
  },
  {
    step: 2,
    title: "Análise",
    description: "Verificação dos documentos e requisitos básicos",
    icon: Users,
  },
  {
    step: 3,
    title: "Entrevista",
    description: "Entrevista individual com a comissão de recrutamento",
    icon: Clock,
  },
  {
    step: 4,
    title: "Treinamento",
    description: "Período de formação e capacitação inicial",
    icon: Award,
  },
]

export default function RecrutamentoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black via-blue-900 to-black py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Junte-se à <span className="text-yellow-500">PMCAP</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Faça parte de uma corporação comprometida com a segurança e o bem-estar da comunidade. Sua vocação para
            servir pode fazer a diferença.
          </p>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Requisitos <span className="text-yellow-600">Básicos</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  Para se candidatar, você deve atender aos seguintes critérios:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>{requirement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Processo de <span className="text-yellow-600">Recrutamento</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {processSteps.map((step) => (
              <Card key={step.step} className="text-center border-t-4 border-t-yellow-500">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">
                    {step.step}. {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Materiais de <span className="text-yellow-600">Estudo</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recruitmentMaterials.map((material) => (
              <Card key={material.id} className="hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={material.image || "/placeholder.svg"}
                    alt={material.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold">
                    {material.type}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">{material.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{material.description}</p>
                  <Button asChild className="w-full bg-yellow-500 text-black hover:bg-yellow-600">
                    <Link href={material.link}>Acessar Material</Link>
                  </Button>
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
            Pronto para <span className="text-yellow-500">Servir</span>?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Não perca a oportunidade de fazer parte de uma das corporações mais respeitadas de Cidade Alta Paradise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-600">
              Iniciar Candidatura
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black bg-transparent"
            >
              Falar com Recrutador
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
