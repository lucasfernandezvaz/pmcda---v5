"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const faqs = [
  {
    question: "Como posso ingressar na Polícia Militar de Cidade Alta Paradise?",
    answer:
      "Para ingressar na PMCAP, você deve participar do processo de recrutamento que inclui análise de documentos, entrevista e período de treinamento. Acesse a seção 'Recrutamento' para mais informações sobre editais abertos.",
  },
  {
    question: "Quais são os requisitos básicos para ser policial?",
    answer:
      "Os requisitos incluem: ter mais de 18 anos, ensino médio completo, não possuir antecedentes criminais, estar em dia com as obrigações eleitorais e militares, e ter disponibilidade de horário para as atividades.",
  },
  {
    question: "Como funciona a hierarquia militar na corporação?",
    answer:
      "Nossa hierarquia segue o padrão militar tradicional, desde Soldado até Coronel. Cada patente possui responsabilidades específicas e requisitos para promoção. Consulte a seção 'Hierarquia Militar' para detalhes completos.",
  },
  {
    question: "Quais unidades especializadas existem na PMCAP?",
    answer:
      "Contamos com 6 unidades especializadas: GTM (Grupo Tático Militar), GRA (Grupo de Radiopatrulhamento Aéreo), SPEED (Policiamento de Trânsito), GOT (Grupo de Operações Táticas), PERÍCIA (Perícia Criminal) e GIC (Grupo de Investigações Criminais).",
  },
  {
    question: "Como posso fazer uma denúncia ou solicitar ajuda?",
    answer:
      "Em emergências, ligue 190. Para denúncias não urgentes, utilize nossos canais de ouvidoria ou compareça a uma de nossas unidades. Todas as informações de contato estão disponíveis no rodapé do site.",
  },
  {
    question: "Existe treinamento contínuo para os policiais?",
    answer:
      "Sim! Oferecemos diversos cursos de capacitação como: abordagem, acompanhamento, boosting, comunicação, aerotático e progressão. Os cursos são obrigatórios para certas funções e promoções.",
  },
]

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Perguntas <span className="text-yellow-600">Frequentes</span>
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-l-4 border-l-yellow-500">
              <CardContent className="p-0">
                <button
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleItem(index)}
                >
                  <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                  )}
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
