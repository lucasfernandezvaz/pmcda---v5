"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Plus, Edit, Trash2, Map } from "lucide-react"
import Image from "next/image"

interface Perimeter {
  id: number
  name: string
  description: string
  coordinates: string
  riskLevel: "Baixo" | "Médio" | "Alto" | "Crítico"
  responsibleUnit: string
  image: string
  lastUpdate: string
}

const initialPerimeters: Perimeter[] = [
  {
    id: 1,
    name: "Centro Comercial",
    description: "Área central da cidade com alta concentração de comércio e movimento de pessoas",
    coordinates: "Lat: -23.5505, Long: -46.6333",
    riskLevel: "Médio",
    responsibleUnit: "Patrulhamento Geral",
    image: "/placeholder.svg?height=200&width=300&text=Centro+Comercial",
    lastUpdate: "2024-01-28",
  },
  {
    id: 2,
    name: "Zona Industrial",
    description: "Perímetro industrial com empresas e fábricas, movimento intenso de veículos pesados",
    coordinates: "Lat: -23.5605, Long: -46.6433",
    riskLevel: "Baixo",
    responsibleUnit: "SPEED",
    image: "/placeholder.svg?height=200&width=300&text=Zona+Industrial",
    lastUpdate: "2024-01-25",
  },
  {
    id: 3,
    name: "Bairro Residencial Norte",
    description: "Área residencial com histórico de furtos e roubos, requer patrulhamento intensivo",
    coordinates: "Lat: -23.5405, Long: -46.6233",
    riskLevel: "Alto",
    responsibleUnit: "GTM",
    image: "/placeholder.svg?height=200&width=300&text=Bairro+Norte",
    lastUpdate: "2024-01-20",
  },
  {
    id: 4,
    name: "Área Portuária",
    description: "Zona portuária com atividade de carga e descarga, controle de acesso restrito",
    coordinates: "Lat: -23.5705, Long: -46.6533",
    riskLevel: "Crítico",
    responsibleUnit: "GOT",
    image: "/placeholder.svg?height=200&width=300&text=Área+Portuária",
    lastUpdate: "2024-01-22",
  },
]

export default function PerimetrosPage() {
  const [perimeters, setPerimeters] = useState<Perimeter[]>(initialPerimeters)
  const [isEditing, setIsEditing] = useState(false)
  const [editingPerimeter, setEditingPerimeter] = useState<Perimeter | null>(null)
  const [selectedRisk, setSelectedRisk] = useState("Todos")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    coordinates: "",
    riskLevel: "Baixo" as "Baixo" | "Médio" | "Alto" | "Crítico",
    responsibleUnit: "",
    image: "",
  })

  const riskLevels = ["Todos", "Baixo", "Médio", "Alto", "Crítico"]
  const units = ["Patrulhamento Geral", "GTM", "GRA", "SPEED", "GOT", "PERÍCIA", "GIC"]

  const filteredPerimeters =
    selectedRisk === "Todos" ? perimeters : perimeters.filter((p) => p.riskLevel === selectedRisk)

  const handleEdit = (perimeter: Perimeter) => {
    setEditingPerimeter(perimeter)
    setFormData({
      name: perimeter.name,
      description: perimeter.description,
      coordinates: perimeter.coordinates,
      riskLevel: perimeter.riskLevel,
      responsibleUnit: perimeter.responsibleUnit,
      image: perimeter.image,
    })
    setIsEditing(true)
  }

  const handleAdd = () => {
    setEditingPerimeter(null)
    setFormData({
      name: "",
      description: "",
      coordinates: "",
      riskLevel: "Baixo",
      responsibleUnit: "",
      image: "",
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editingPerimeter) {
      setPerimeters(
        perimeters.map((perimeter) =>
          perimeter.id === editingPerimeter.id
            ? { ...perimeter, ...formData, lastUpdate: new Date().toISOString().split("T")[0] }
            : perimeter,
        ),
      )
    } else {
      const newPerimeter: Perimeter = {
        id: Math.max(...perimeters.map((p) => p.id)) + 1,
        ...formData,
        lastUpdate: new Date().toISOString().split("T")[0],
      }
      setPerimeters([...perimeters, newPerimeter])
    }
    setIsEditing(false)
    setEditingPerimeter(null)
  }

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este perímetro?")) {
      setPerimeters(perimeters.filter((perimeter) => perimeter.id !== id))
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingPerimeter(null)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Baixo":
        return "bg-green-500"
      case "Médio":
        return "bg-yellow-500"
      case "Alto":
        return "bg-orange-500"
      case "Crítico":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black via-blue-900 to-black py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-yellow-500">Perímetros</span> de Ações
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Mapeamento estratégico das áreas de atuação e responsabilidade das unidades da PMCAP
          </p>
        </div>
      </section>

      {/* Filter and Controls */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {riskLevels.map((risk) => (
                <Button
                  key={risk}
                  variant={selectedRisk === risk ? "default" : "outline"}
                  onClick={() => setSelectedRisk(risk)}
                  className={
                    selectedRisk === risk
                      ? "bg-yellow-500 text-black hover:bg-yellow-600"
                      : "border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-black"
                  }
                >
                  {risk}
                </Button>
              ))}
            </div>
            <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
              <Plus className="h-4 w-4 mr-2" />
              Novo Perímetro
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Edit Form */}
        {isEditing && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingPerimeter ? "Editar Perímetro" : "Adicionar Novo Perímetro"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome do Perímetro</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Digite o nome do perímetro"
                  />
                </div>
                <div>
                  <Label htmlFor="coordinates">Coordenadas</Label>
                  <Input
                    id="coordinates"
                    value={formData.coordinates}
                    onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                    placeholder="Lat: -23.5505, Long: -46.6333"
                  />
                </div>
                <div>
                  <Label htmlFor="riskLevel">Nível de Risco</Label>
                  <select
                    id="riskLevel"
                    value={formData.riskLevel}
                    onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value as any })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Baixo">Baixo</option>
                    <option value="Médio">Médio</option>
                    <option value="Alto">Alto</option>
                    <option value="Crítico">Crítico</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="responsibleUnit">Unidade Responsável</Label>
                  <select
                    id="responsibleUnit"
                    value={formData.responsibleUnit}
                    onChange={(e) => setFormData({ ...formData, responsibleUnit: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Selecione a unidade</option>
                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="URL da imagem do perímetro"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descreva as características e particularidades do perímetro"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button onClick={handleSave} className="bg-yellow-500 text-black hover:bg-yellow-600">
                  Salvar
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Perimeters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPerimeters.map((perimeter) => (
            <Card key={perimeter.id} className="hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={perimeter.image || "/placeholder.svg"}
                  alt={perimeter.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
                <div
                  className={`absolute top-2 right-2 ${getRiskColor(perimeter.riskLevel)} text-white px-2 py-1 rounded text-xs font-semibold`}
                >
                  {perimeter.riskLevel}
                </div>
                <div className="absolute top-2 left-2 bg-black bg-opacity-80 text-yellow-500 px-2 py-1 rounded text-xs font-semibold">
                  {perimeter.responsibleUnit}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{perimeter.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{perimeter.description}</p>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    {perimeter.coordinates}
                  </div>
                  <div className="text-xs text-gray-500">Atualizado em: {formatDate(perimeter.lastUpdate)}</div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(perimeter)} className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(perimeter.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPerimeters.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum perímetro encontrado</h3>
              <p className="text-gray-600 mb-4">Não há perímetros na categoria selecionada.</p>
              <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Perímetro
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
