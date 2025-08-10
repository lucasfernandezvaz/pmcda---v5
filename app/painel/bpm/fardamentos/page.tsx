"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shirt, Plus, Edit, Trash2, User, UserCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface UniformItem {
  id: number
  name: string
  icon: string
  maleSize?: string
  femaleSize?: string
}

interface Uniform {
  id: number
  name: string
  type: "Masculino" | "Feminino" | "Aluno"
  image: string
  items: UniformItem[]
}

const uniformItems = [
  { id: 1, name: "Boné", icon: "🧢" },
  { id: 2, name: "Jaqueta", icon: "🧥" },
  { id: 3, name: "Luvas", icon: "🧤" },
  { id: 4, name: "Calça", icon: "👖" },
  { id: 5, name: "Coturno", icon: "🥾" },
  { id: 6, name: "Colete", icon: "🦺" },
  { id: 7, name: "Camisa", icon: "👕" },
  { id: 8, name: "Colar de Perna", icon: "🔗" },
  { id: 9, name: "Distintivo", icon: "🏅" },
]

const initialUniforms: Uniform[] = [
  {
    id: 1,
    name: "Uniforme Aluno",
    type: "Aluno",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Yg376qsJD3kKDhnie1x9PLMPWkF4U6.png",
    items: [
      { id: 1, name: "Boné", icon: "🧢", maleSize: "0", femaleSize: "0" },
      { id: 2, name: "Jaqueta", icon: "🧥", maleSize: "668-5", femaleSize: "774-5" },
      { id: 3, name: "Luvas", icon: "🧤", maleSize: "171", femaleSize: "223" },
      { id: 4, name: "Calça", icon: "👖", maleSize: "278-2", femaleSize: "314-1" },
      { id: 5, name: "Coturno", icon: "🥾", maleSize: "25", femaleSize: "25" },
      { id: 6, name: "Colete", icon: "🦺", maleSize: "0", femaleSize: "0" },
      { id: 7, name: "Camisa", icon: "👕", maleSize: "214", femaleSize: "298" },
      { id: 8, name: "Colar de Perna", icon: "🔗", maleSize: "192", femaleSize: "180" },
      { id: 9, name: "Distintivo", icon: "🏅", maleSize: "0", femaleSize: "0" },
    ],
  },
]

export default function FardamentosPage() {
  const [uniforms, setUniforms] = useState<Uniform[]>(initialUniforms)
  const [isEditing, setIsEditing] = useState(false)
  const [editingUniform, setEditingUniform] = useState<Uniform | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    type: "Masculino" as "Masculino" | "Feminino" | "Aluno",
    image: "",
    items: [] as UniformItem[],
  })

  const handleEdit = (uniform: Uniform) => {
    setEditingUniform(uniform)
    setFormData({
      name: uniform.name,
      type: uniform.type,
      image: uniform.image,
      items: [...uniform.items],
    })
    setIsEditing(true)
  }

  const handleAdd = () => {
    setEditingUniform(null)
    setFormData({
      name: "",
      type: "Masculino",
      image: "",
      items: uniformItems.map((item) => ({ ...item, maleSize: "0", femaleSize: "0" })),
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editingUniform) {
      setUniforms(uniforms.map((uniform) => (uniform.id === editingUniform.id ? { ...uniform, ...formData } : uniform)))
    } else {
      const newUniform: Uniform = {
        id: Math.max(...uniforms.map((u) => u.id), 0) + 1,
        ...formData,
      }
      setUniforms([...uniforms, newUniform])
    }
    setIsEditing(false)
    setEditingUniform(null)
  }

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este fardamento?")) {
      setUniforms(uniforms.filter((uniform) => uniform.id !== id))
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingUniform(null)
  }

  const handleItemSizeChange = (itemId: number, field: "maleSize" | "femaleSize", value: string) => {
    setFormData({
      ...formData,
      items: formData.items.map((item) => (item.id === itemId ? { ...item, [field]: value } : item)),
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <Shirt className="h-6 w-6 mr-2 text-yellow-500" />
                Fardamentos
              </h1>
              <p className="text-yellow-500">Uniformes e numerações da PMCAP</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Fardamento
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
              <CardTitle>{editingUniform ? "Editar Fardamento" : "Adicionar Novo Fardamento"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="name">Nome do Fardamento</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Digite o nome do fardamento"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Tipo</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value as "Masculino" | "Feminino" | "Aluno" })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Aluno">Aluno</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="URL da imagem do fardamento"
                  />
                </div>
              </div>

              {/* Items Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Configuração dos Itens</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.items.map((item) => (
                    <Card key={item.id} className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs">Masculino</Label>
                          <Input
                            size="sm"
                            value={item.maleSize || ""}
                            onChange={(e) => handleItemSizeChange(item.id, "maleSize", e.target.value)}
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Feminino</Label>
                          <Input
                            size="sm"
                            value={item.femaleSize || ""}
                            onChange={(e) => handleItemSizeChange(item.id, "femaleSize", e.target.value)}
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
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

        {/* Uniforms Display */}
        <div className="space-y-8">
          {uniforms.map((uniform) => (
            <Card key={uniform.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">{uniform.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(uniform)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(uniform.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Masculino */}
                  <div className="text-center">
                    <h3 className="text-lg font-bold mb-4 flex items-center justify-center">
                      <User className="h-5 w-5 mr-2" />
                      MASCULINO
                    </h3>
                    <div className="space-y-2">
                      {uniform.items.map((item) => (
                        <div
                          key={`male-${item.id}`}
                          className="flex items-center justify-between bg-gray-100 p-2 rounded"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-sm font-medium">{item.name}</span>
                          </div>
                          <span className="font-bold">{item.maleSize || "0"}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Centro com imagem */}
                  <div className="text-center">
                    <h3 className="text-lg font-bold mb-4">{uniform.type.toUpperCase()}</h3>
                    <div className="relative h-64 w-full">
                      <Image
                        src={uniform.image || "/placeholder.svg"}
                        alt={uniform.name}
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Feminino */}
                  <div className="text-center">
                    <h3 className="text-lg font-bold mb-4 flex items-center justify-center">
                      <UserCheck className="h-5 w-5 mr-2" />
                      FEMININO
                    </h3>
                    <div className="space-y-2">
                      {uniform.items.map((item) => (
                        <div
                          key={`female-${item.id}`}
                          className="flex items-center justify-between bg-gray-100 p-2 rounded"
                        >
                          <span className="font-bold">{item.femaleSize || "0"}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{item.name}</span>
                            <span className="text-lg">{item.icon}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {uniforms.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Shirt className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum fardamento cadastrado</h3>
              <p className="text-gray-600 mb-4">Comece adicionando os uniformes da corporação.</p>
              <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Fardamento
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
