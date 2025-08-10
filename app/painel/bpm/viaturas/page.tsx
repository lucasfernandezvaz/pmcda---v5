"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Car, Plus, Edit, Trash2, BookOpen, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Vehicle {
  id: number
  name: string
  image: string
  authorizedRanks: string[]
  vehicleClass: string
  description: string
  requiredCourses: string[]
  authorizedUnits: string[]
}

const initialVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Viatura Padrão PM",
    image: "/placeholder.svg?height=200&width=300&text=Viatura+Padrão",
    authorizedRanks: ["Soldado", "Cabo", "Sargento", "Subtenente"],
    vehicleClass: "Classe A - Patrulhamento",
    description: "Viatura padrão para patrulhamento urbano e atendimento de ocorrências básicas",
    requiredCourses: ["Curso de Condução Defensiva", "Curso de Comunicação"],
    authorizedUnits: ["Patrulhamento Geral", "1º BPM"],
  },
  {
    id: 2,
    name: "Viatura de Comando",
    image: "/placeholder.svg?height=200&width=300&text=Viatura+Comando",
    authorizedRanks: ["Tenente", "Capitão", "Major", "Coronel"],
    vehicleClass: "Classe B - Comando",
    description: "Veículo destinado ao transporte de oficiais e coordenação de operações",
    requiredCourses: ["Curso de Liderança", "Curso de Comunicação", "Curso de Comando"],
    authorizedUnits: ["Comando Geral", "1º BPM"],
  },
  {
    id: 3,
    name: "Viatura Tática GTM",
    image: "/placeholder.svg?height=200&width=300&text=Viatura+GTM",
    authorizedRanks: ["GTM Operador", "GTM Líder", "Comandante GTM"],
    vehicleClass: "Classe S - Especial",
    description: "Veículo blindado para operações táticas de alto risco",
    requiredCourses: ["Curso Tático Avançado", "Curso de Abordagem", "Curso de Progressão"],
    authorizedUnits: ["GTM"],
  },
]

export default function ViaturasPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles)
  const [isEditing, setIsEditing] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    authorizedRanks: [] as string[],
    vehicleClass: "",
    description: "",
    requiredCourses: [] as string[],
    authorizedUnits: [] as string[],
  })

  const availableRanks = [
    "Aluno",
    "Soldado 2º Classe",
    "Soldado 1º Classe",
    "Cabo",
    "3º Sargento",
    "2º Sargento",
    "1º Sargento",
    "Sub Tenente",
    "2º Tenente",
    "1º Tenente",
    "Capitão",
    "Major",
    "Tenente Coronel",
    "Coronel",
    "Comissário",
  ]

  const availableCourses = [
    "Curso de Condução Defensiva",
    "Curso de Comunicação",
    "Curso de Liderança",
    "Curso de Comando",
    "Curso Tático Avançado",
    "Curso de Abordagem",
    "Curso de Progressão",
    "Curso Aerotático",
    "Curso de Boosting",
  ]

  const availableUnits = ["Patrulhamento Geral", "1º BPM", "GTM", "GRA", "SPEED", "GOT", "PERÍCIA", "GIC"]

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle)
    setFormData({
      name: vehicle.name,
      image: vehicle.image,
      authorizedRanks: [...vehicle.authorizedRanks],
      vehicleClass: vehicle.vehicleClass,
      description: vehicle.description,
      requiredCourses: [...vehicle.requiredCourses],
      authorizedUnits: [...vehicle.authorizedUnits],
    })
    setIsEditing(true)
  }

  const handleAdd = () => {
    setEditingVehicle(null)
    setFormData({
      name: "",
      image: "",
      authorizedRanks: [],
      vehicleClass: "",
      description: "",
      requiredCourses: [],
      authorizedUnits: [],
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editingVehicle) {
      setVehicles(vehicles.map((vehicle) => (vehicle.id === editingVehicle.id ? { ...vehicle, ...formData } : vehicle)))
    } else {
      const newVehicle: Vehicle = {
        id: Math.max(...vehicles.map((v) => v.id), 0) + 1,
        ...formData,
      }
      setVehicles([...vehicles, newVehicle])
    }
    setIsEditing(false)
    setEditingVehicle(null)
  }

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta viatura?")) {
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id))
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingVehicle(null)
  }

  const handleArrayChange = (
    field: "authorizedRanks" | "requiredCourses" | "authorizedUnits",
    value: string,
    checked: boolean,
  ) => {
    const currentArray = formData[field]
    if (checked) {
      setFormData({ ...formData, [field]: [...currentArray, value] })
    } else {
      setFormData({ ...formData, [field]: currentArray.filter((item) => item !== value) })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <Car className="h-6 w-6 mr-2 text-yellow-500" />
                Viaturas
              </h1>
              <p className="text-yellow-500">Veículos oficiais, patentes e requisitos</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Viatura
              </Button>
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
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Edit Form */}
        {isEditing && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingVehicle ? "Editar Viatura" : "Adicionar Nova Viatura"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome da Viatura</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Digite o nome da viatura"
                  />
                </div>
                <div>
                  <Label htmlFor="vehicleClass">Classe do Veículo</Label>
                  <Input
                    id="vehicleClass"
                    value={formData.vehicleClass}
                    onChange={(e) => setFormData({ ...formData, vehicleClass: e.target.value })}
                    placeholder="Ex: Classe A - Patrulhamento"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="URL da imagem da viatura"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descreva o uso e características da viatura"
                    rows={3}
                  />
                </div>

                {/* Patentes Autorizadas */}
                <div className="md:col-span-2">
                  <Label>Patentes Autorizadas</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 max-h-32 overflow-y-auto border p-2 rounded">
                    {availableRanks.map((rank) => (
                      <label key={rank} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.authorizedRanks.includes(rank)}
                          onChange={(e) => handleArrayChange("authorizedRanks", rank, e.target.checked)}
                          className="rounded"
                        />
                        <span>{rank}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Cursos Necessários */}
                <div className="md:col-span-2">
                  <Label>Cursos Necessários</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 max-h-32 overflow-y-auto border p-2 rounded">
                    {availableCourses.map((course) => (
                      <label key={course} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.requiredCourses.includes(course)}
                          onChange={(e) => handleArrayChange("requiredCourses", course, e.target.checked)}
                          className="rounded"
                        />
                        <span>{course}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Unidades Autorizadas */}
                <div className="md:col-span-2">
                  <Label>Unidades com Acesso</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {availableUnits.map((unit) => (
                      <label key={unit} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.authorizedUnits.includes(unit)}
                          onChange={(e) => handleArrayChange("authorizedUnits", unit, e.target.checked)}
                          className="rounded"
                        />
                        <span>{unit}</span>
                      </label>
                    ))}
                  </div>
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

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold">
                  {vehicle.vehicleClass}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{vehicle.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{vehicle.description}</p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Shield className="h-4 w-4 mr-1 text-yellow-500" />
                      Patentes Autorizadas:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {vehicle.authorizedRanks.map((rank) => (
                        <span key={rank} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {rank}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 mr-1 text-green-500" />
                      Cursos Necessários:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {vehicle.requiredCourses.map((course) => (
                        <span key={course} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Car className="h-4 w-4 mr-1 text-purple-500" />
                      Unidades com Acesso:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {vehicle.authorizedUnits.map((unit) => (
                        <span key={unit} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                          {unit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(vehicle)} className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(vehicle.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {vehicles.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhuma viatura cadastrada</h3>
              <p className="text-gray-600 mb-4">Comece adicionando os veículos da corporação.</p>
              <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeira Viatura
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
