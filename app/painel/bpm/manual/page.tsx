import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function ManualCondutaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <FileText className="h-6 w-6 mr-2 text-yellow-500" />
                Manual de Conduta
              </h1>
              <p className="text-yellow-500">Diretrizes éticas e comportamentais da PMCAP</p>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black bg-transparent"
            >
              <Link href="/painel/bpm">Voltar ao 1º BPM</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Sobre o Manual de Conduta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  O Manual de Conduta da Polícia Militar de Cidade Alta Paradise estabelece os princípios éticos, morais
                  e comportamentais que devem nortear a atuação de todos os policiais militares da corporação.
                </p>

                <p className="text-gray-600">
                  Este documento é fundamental para manter os padrões de excelência e integridade que caracterizam nossa
                  instituição, definindo claramente as expectativas de comportamento profissional e pessoal de nossos
                  membros.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Principais Tópicos Abordados:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Código de Ética Policial Militar
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Direitos e Deveres do Policial Militar
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Procedimentos Disciplinares
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Relacionamento com a Comunidade
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Uso Adequado de Equipamentos e Recursos
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Conduta em Serviço e Fora de Serviço
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Prevenção à Corrupção e Conflitos de Interesse
                  </li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-3">Importância do Manual:</h3>
                <p className="text-gray-600">
                  O cumprimento das diretrizes estabelecidas neste manual é obrigatório para todos os membros da PMCAP,
                  independentemente da patente ou função exercida. O conhecimento e aplicação destes princípios são
                  essenciais para:
                </p>
                <ul className="space-y-2 text-gray-600 mt-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Manter a credibilidade e confiança da população
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Garantir a qualidade dos serviços prestados
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Promover um ambiente de trabalho saudável
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Fortalecer a imagem institucional da corporação
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Manual Access */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-center">Acesso ao Manual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-10 w-10 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Manual de Conduta PMCAP</h3>
                  <p className="text-sm text-gray-600 mb-4">Versão 2024.1 - Atualizado em Janeiro/2024</p>
                </div>

                <div className="space-y-3">
                  <Button asChild className="w-full bg-blue-500 hover:bg-blue-600">
                    <Link href="#" target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visualizar Online
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="#" target="_blank">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Link>
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">📋 Leitura Obrigatória</h4>
                  <p className="text-xs text-gray-600">
                    Todos os policiais militares devem ler e compreender integralmente este manual. O conhecimento das
                    diretrizes é requisito para promoções e transferências.
                  </p>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">🔄 Atualizações</h4>
                  <p className="text-xs text-gray-600">
                    O manual é revisado anualmente. Fique atento às comunicações oficiais sobre mudanças e atualizações
                    nas diretrizes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
