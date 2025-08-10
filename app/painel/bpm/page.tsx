"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, FileText, Shirt, Car, Zap, Calculator } from "lucide-react"
import Link from "next/link"

export default function BPMPage() {
  const [penaltyForm, setPenaltyForm] = useState({
    illegalTool: 0,
    drugs: 0,
    illegalAmmo: 0,
    illegalMoney: 0,
    receiving: 0,
    fines: 0,
  })
  const [totalPenalty, setTotalPenalty] = useState(0)

  const calculatePenalty = () => {
    const total =
      penaltyForm.illegalTool * 50 +
      penaltyForm.drugs * 100 +
      penaltyForm.illegalAmmo * 25 +
      penaltyForm.illegalMoney * 0.1 +
      penaltyForm.receiving * 75 +
      penaltyForm.fines

    setTotalPenalty(total)
  }

  const resetForm = () => {
    setPenaltyForm({
      illegalTool: 0,
      drugs: 0,
      illegalAmmo: 0,
      illegalMoney: 0,
      receiving: 0,
      fines: 0,
    })
    setTotalPenalty(0)
  }

  const bpmSections = [
    {
      title: "Manual de Conduta",
      description: "Documentos e diretrizes de conduta para policiais",
      icon: FileText,
      href: "/painel/bpm/manual",
      color: "bg-blue-500",
    },
    {
      title: "Fardamentos",
      description: "Uniformes masculinos e femininos com numeração",
      icon: Shirt,
      href: "/painel/bpm/fardamentos",
      color: "bg-green-500",
    },
    {
      title: "Viaturas",
      description: "Veículos oficiais e patentes autorizadas",
      icon: Car,
      href: "/painel/bpm/viaturas",
      color: "bg-red-500",
    },
    {
      title: "Armamentos",
      description: "Arsenal disponível e regras de uso",
      icon: Zap,
      href: "/painel/bpm/armamentos",
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <Shield className="h-6 w-6 mr-2 text-yellow-500" />
                1º Batalhão de Polícia Militar
              </h1>
              <p className="text-yellow-500">Gestão de recursos e regulamentos</p>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black bg-transparent"
            >
              <Link href="/painel">Voltar ao Painel</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* BPM Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {bpmSections.map((section) => (
            <Card key={section.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${section.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <section.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{section.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{section.description}</p>
                <Button asChild className="w-full bg-yellow-500 text-black hover:bg-yellow-600">
                  <Link href={section.href}>Acessar</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Penalty Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="h-6 w-6 mr-2 text-yellow-500" />
              Calculadora de Penas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="illegalTool">Ferramenta Ilícita (x R$ 50)</Label>
                <Input
                  id="illegalTool"
                  type="number"
                  min="0"
                  value={penaltyForm.illegalTool}
                  onChange={(e) =>
                    setPenaltyForm({ ...penaltyForm, illegalTool: Number.parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div>
                <Label htmlFor="drugs">Entorpecentes (x R$ 100)</Label>
                <Input
                  id="drugs"
                  type="number"
                  min="0"
                  value={penaltyForm.drugs}
                  onChange={(e) => setPenaltyForm({ ...penaltyForm, drugs: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="illegalAmmo">Munição Ilegal (x R$ 25)</Label>
                <Input
                  id="illegalAmmo"
                  type="number"
                  min="0"
                  value={penaltyForm.illegalAmmo}
                  onChange={(e) =>
                    setPenaltyForm({ ...penaltyForm, illegalAmmo: Number.parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div>
                <Label htmlFor="illegalMoney">Dinheiro Ilícito (x 10%)</Label>
                <Input
                  id="illegalMoney"
                  type="number"
                  min="0"
                  value={penaltyForm.illegalMoney}
                  onChange={(e) =>
                    setPenaltyForm({ ...penaltyForm, illegalMoney: Number.parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div>
                <Label htmlFor="receiving">Receptação (x R$ 75)</Label>
                <Input
                  id="receiving"
                  type="number"
                  min="0"
                  value={penaltyForm.receiving}
                  onChange={(e) => setPenaltyForm({ ...penaltyForm, receiving: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="fines">Multas (R$)</Label>
                <Input
                  id="fines"
                  type="number"
                  min="0"
                  value={penaltyForm.fines}
                  onChange={(e) => setPenaltyForm({ ...penaltyForm, fines: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <Button onClick={calculatePenalty} className="bg-yellow-500 text-black hover:bg-yellow-600">
                Calcular Pena
              </Button>
              <Button onClick={resetForm} variant="outline">
                Zerar
              </Button>
              {totalPenalty > 0 && (
                <div className="ml-auto">
                  <div className="text-2xl font-bold text-green-600">
                    Total: R$ {totalPenalty.toLocaleString("pt-BR")}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
