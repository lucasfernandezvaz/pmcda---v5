import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const units = [
  {
    id: "gtm",
    name: "GTM",
    fullName: "Grupo Tático Militar",
    description:
      "Unidade especializada em operações táticas de alta complexidade, incluindo controle de distúrbios, operações especiais e situações de alto risco.",
    image: "/placeholder.svg?height=300&width=400",
    specialties: ["Operações Táticas", "Controle de Distúrbios", "Resgate", "Negociação"],
  },
  {
    id: "gra",
    name: "GRA",
    fullName: "Grupo de Radiopatrulhamento Aéreo",
    description:
      "Responsável pelo patrulhamento aéreo da cidade, apoio às operações terrestres e vigilância de grandes eventos.",
    image: "/placeholder.svg?height=300&width=400",
    specialties: ["Patrulhamento Aéreo", "Apoio Tático", "Vigilância", "Resgate Aéreo"],
  },
  {
    id: "speed",
    name: "SPEED",
    fullName: "Policiamento de Trânsito",
    description:
      "Unidade dedicada ao policiamento de trânsito, fiscalização de infrações e educação no trânsito para garantir a segurança viária.",
    image: "/placeholder.svg?height=300&width=400",
    specialties: ["Fiscalização de Trânsito", "Educação Viária", "Controle de Velocidade", "Acidentes"],
  },
  {
    id: "got",
    name: "GOT",
    fullName: "Grupo de Operações Táticas",
    description:
      "Força de elite especializada em operações de alto risco, combate ao crime organizado e situações críticas.",
    image: "/placeholder.svg?height=300&width=400",
    specialties: ["Operações Especiais", "Crime Organizado", "Situações Críticas", "Intervenção Rápida"],
  },
  {
    id: "pericia",
    name: "PERÍCIA",
    fullName: "Perícia Criminal",
    description:
      "Responsável pela investigação científica de crimes, coleta e análise de evidências, e elaboração de laudos periciais.",
    image: "/placeholder.svg?height=300&width=400",
    specialties: ["Investigação Científica", "Análise de Evidências", "Laudos Periciais", "Balística"],
  },
  {
    id: "gic",
    name: "GIC",
    fullName: "Grupo de Investigações Criminais",
    description:
      "Unidade especializada em investigações criminais complexas, inteligência policial e combate ao crime organizado.",
    image: "/placeholder.svg?height=300&width=400",
    specialties: ["Investigações Complexas", "Inteligência Policial", "Crime Organizado", "Análise Criminal"],
  },
]

export default function UnidadesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black via-blue-900 to-black py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nossas <span className="text-yellow-500">Unidades</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Conheça as unidades especializadas da PMCAP, cada uma com expertise específica para garantir a segurança e
            ordem em Cidade Alta Paradise.
          </p>
        </div>
      </section>

      {/* Units Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {units.map((unit) => (
              <Card
                key={unit.id}
                className="hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-yellow-500"
              >
                <div className="relative h-64">
                  <Image
                    src={unit.image || "/placeholder.svg"}
                    alt={unit.fullName}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4 bg-black bg-opacity-80 text-yellow-500 px-3 py-1 rounded font-bold text-lg">
                    {unit.name}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{unit.fullName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{unit.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-yellow-600">Especialidades:</h4>
                    <div className="flex flex-wrap gap-2">
                      {unit.specialties.map((specialty, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="w-full bg-yellow-500 text-black hover:bg-yellow-600">
                    <Link href={`/unidades/${unit.id}`}>Saiba Mais</Link>
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
            Interessado em uma <span className="text-yellow-500">Unidade Específica</span>?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Cada unidade possui requisitos e treinamentos específicos. Entre em contato para saber mais sobre
            oportunidades de transferência ou especialização.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-600">
              Falar com Comandante
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black bg-transparent"
            >
              Ver Requisitos
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
