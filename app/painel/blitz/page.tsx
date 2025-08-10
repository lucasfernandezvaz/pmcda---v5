"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, Plus, Edit, Trash2, Clock, MapPin, Target } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface BlitzType {
  id: number
  name: string
  description: string
  frequency: string
  locations: string[]
  objectives: string[]
  image: string
}

const initialBlitzTypes: BlitzType[] = [
  {
    id: 1,
    name: "Blitz de Trânsito",
    description: "Fiscalização de infrações de trânsito, documentação veicular e condutores",
    frequency: "Diária",
    locations: ["Avenida Principal", "Centro da Cidade", "Saídas da Cidade"],
    objectives: ["Reduzir acidentes", "Fiscalizar documentação", "Educação no trânsito"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    name: "Blitz Anti-Drogas",
    description: "Operação de combate ao tráfico e uso de entorpecentes",
    frequency: "Semanal",
    locations: ["Pontos estratégicos", "Áreas de risco", "Eventos públicos"],
    objectives: ["Combater tráfico", "Apreender drogas", "Prisão de traficantes"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    name: "Blitz de Armas",
    description: "Fiscalização de porte ilegal de armas e munições",
    frequency: "Quinzenal",
    locations: ["Barreiras móveis", "Pontos de controle", "Eventos especiais"],
    objectives: ["Apreender armas ilegais", "Reduzir violência", "Controle de munições"],
    image: "/placeholder.svg?height=300&width=400",
  },
]

export default function BlitzAdminPage() {
  const [blitzTypes, setBlitzTypes] = useState<BlitzType[]>(initialBlitzTypes)
  const [isEditing, setIsEditing] = useState(false)
  const [editingBlitz, setEditingBlitz] = useState<BlitzType | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    frequency: "",
    locations: [] as string[],
    objectives: [] as string[],
    image: "",
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      if (userData) {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)

        const hasPermission =
          parsedUser.permissions.includes("blitz") ||
          parsedUser.permissions.includes("administrador") ||
          parsedUser.permissions.includes("coronel")

        if (!hasPermission) {
          router.push("/painel")
          return
        }
      } else {
        router.push("/login")
        return
      }
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4 animate-spin" />
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleEdit = (blitz: BlitzType) => {
    setEditingBlitz(blitz)
    setFormData({
      name: blitz.name,
      description: blitz.description,
      frequency: blitz.frequency,
      locations: [...blitz.locations],
      objectives: [...blitz.objectives],
      image: blitz.image,
    })
    setIsEditing(true)
  }

  const handleAdd = () => {
    setEditingBlitz(null)
    setFormData({
      name: "",
      description: "",
      frequency: "",
      locations: [],
      objectives: [],
      image: "",
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editingBlitz) {
      setBlitzTypes(blitzTypes.map((blitz) => (blitz.id === editingBlitz.id ? { ...blitz, ...formData } : blitz)))
    } else {
      const newBlitz: BlitzType = {
        id: Math.max(...blitzTypes.map((b) => b.id), 0) + 1,
        ...formData,
      }
      setBlitzTypes([...blitzTypes, newBlitz])
    }
    setIsEditing(false)
    setEditingBlitz(null)
  }

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este tipo de blitz?")) {
      setBlitzTypes(blitzTypes.filter((blitz) => blitz.id !== id))
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingBlitz(null)
  }

  const handleArrayChange = (field: "locations" | "objectives", index: number, value: string) => {
    const newArray = [...formData[field]]
    newArray[index] = value
    setFormData({ ...formData, [field]: newArray })
  }

  const addArrayItem = (field: "locations" | "objectives") => {
    setFormData({ ...formData, [field]: [...formData[field], ""] })
  }

  const removeArrayItem = (field: "locations" | "objectives", index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index)
    setFormData({ ...formData, [field]: newArray })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2 text-yellow-500" />
                Gerenciar Blitz
              </h1>
              <p className="text-yellow-500">Administração de operações blitz</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Plus className="h-4 w-4 mr-2" />
                Nova Blitz
              </Button>
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
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Edit Form */}
        {isEditing && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingBlitz ? "Editar Tipo de Blitz" : "Adicionar Novo Tipo de Blitz"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome da Blitz</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Digite o nome da blitz"
                  />
                </div>
                <div>
                  <Label htmlFor="frequency">Frequência</Label>
                  <Input
                    id="frequency"
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    placeholder="Ex: Diária, Semanal, Quinzenal"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="URL da imagem da blitz"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descreva o tipo de blitz"
                    rows={3}
                  />
                </div>

                {/* Locais */}
                <div className="md:col-span-2">
                  <Label>Locais de Atuação</Label>
                  <div className="space-y-2 mt-2">
                    {formData.locations.map((location, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={location}
                          onChange={(e) => handleArrayChange("locations", index, e.target.value)}
                          placeholder="Digite um local"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem("locations", index)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("locations")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Local
                    </Button>
                  </div>
                </div>

                {/* Objetivos */}
                <div className="md:col-span-2">
                  <Label>Objetivos</Label>
                  <div className="space-y-2 mt-2">
                    {formData.objectives.map((objective, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={objective}
                          onChange={(e) => handleArrayChange("objectives", index, e.target.value)}
                          placeholder="Digite um objetivo"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem("objectives", index)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("objectives")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Objetivo
                    </Button>
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

        {/* Blitz Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blitzTypes.map((blitz) => (
            <Card
              key={blitz.id}
              className="hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-yellow-500"
            >
              <div className="relative h-48">
                <Image
                  src={blitz.image || "/placeholder.svg"}
                  alt={blitz.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{blitz.name}</CardTitle>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  Frequência: {blitz.frequency}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{blitz.description}</p>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-yellow-500" />
                      Locais de Atuação:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {blitz.locations.map((location, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {location}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Target className="h-4 w-4 mr-1 text-yellow-500" />
                      Objetivos:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {blitz.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(blitz)} className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(blitz.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {blitzTypes.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum tipo de blitz cadastrado</h3>
              <p className="text-gray-600 mb-4">Comece adicionando os tipos de operações blitz.</p>
              <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Tipo
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
