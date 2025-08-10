import { Button } from "@/components/ui/button"
import { Shield, Users, Award, Clock } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-black via-blue-900 to-black py-20">
      <div className="container mx-auto px-4">
        <div className="text-center text-white">
          <div className="flex justify-center mb-6">
            <Shield className="h-20 w-20 text-yellow-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Polícia Militar
            <span className="block text-yellow-500">Cidade Alta Paradise</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Servindo e protegendo nossa comunidade com excelência, disciplina e compromisso
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-yellow-500 text-black hover:bg-yellow-600">
              <Link href="/recrutamento">Junte-se a Nós</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black bg-transparent"
            >
              <Link href="/institucional/sobre">Saiba Mais</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Users className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">150+</div>
              <div className="text-sm text-gray-400">Policiais Ativos</div>
            </div>
            <div className="text-center">
              <Shield className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">6</div>
              <div className="text-sm text-gray-400">Unidades Especiais</div>
            </div>
            <div className="text-center">
              <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-gray-400">Proteção</div>
            </div>
            <div className="text-center">
              <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">5+</div>
              <div className="text-sm text-gray-400">Anos de Serviço</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
