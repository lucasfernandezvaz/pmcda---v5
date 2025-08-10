"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Users, Plus, Edit, Trash2, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface RecruitmentMaterial {
  id: number
  title: string
  description: string
  image: string
  link: string
  type: string
}

interface Requirement {
  id: number
  text: string
}

interface ProcessStep {
  id: number
  step: number
  title: string
  description: string
  icon: string
}

const initialMaterials: RecruitmentMaterial[] = [
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

const initialRequirements: Requirement[] = [
  { id: 1, text: "Idade mínima de 18 anos" },
  { id: 2, text: "Ensino médio completo" },
  { id: 3, text: "Não possuir antecedentes criminais" },
  { id: 4, text: "Estar em dia com obrigações eleitorais" },
  { id: 5, text: "Disponibilidade de horário" },
  { id: 6, text: "Aptidão física e mental" },
]

const initialProcessSteps: ProcessStep[] = [
  {
    id: 1,
    step: 1,
    title: "Inscrição",
    description: "Preenchimento do formulário e envio da documentação",
    icon: "📝",
  },
  {
    id: 2,
    step: 2,
    title: "Análise",
    description: "Verificação dos documentos e requisitos básicos",
    icon: "👥",
  },
  {
    id: 3,
    step: 3,
    title: "Entrevista",
    description: "Entrevista individual com a comissão de recrutamento",
    icon: "🕐",
  },
  {
    id: 4,
    step: 4,
    title: "Treinamento",
    description: "Período de formação e capacitação inicial",
    icon: "🏆",
  },
]

export default function RecrutamentoAdminPage() {
  const [materials, setMaterials] = useState<RecruitmentMaterial[]>(initialMaterials)
  const [requirements, setRequirements] = useState<Requirement[]>(initialRequirements)
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>(initialProcessSteps)
  const [activeTab, setActiveTab] = useState<"materials" | "requirements" | "process">("materials")
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      if (userData) {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)

        const hasPermission =
          parsedUser.permissions.includes("recrutamento") ||
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
          <Users className="h-12 w-12 text-yellow-500 mx-auto mb-4 animate-spin" />
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setFormData({ ...item })
    setIsEditing(true)
  }

  const handleAdd = () => {
    setEditingItem(null)
    if (activeTab === "materials") {
      setFormData({
        title: "",
        description: "",
        image: "",
        link: "",
        type: "PDF",
      })
    } else if (activeTab === "requirements") {
      setFormData({
        text: "",
      })
    } else if (activeTab === "process") {
      setFormData({
        step: Math.max(...processSteps.map((s) => s.step), 0) + 1,
        title: "",
        description: "",
        icon: "📝",
      })
    }
    setIsEditing(true)
  }

  const handleSave = () => {
    if (activeTab === "materials") {
      if (editingItem) {
        setMaterials(materials.map((item) => (item.id === editingItem.id ? { ...item, ...formData } : item)))
      } else {
        const newMaterial: RecruitmentMaterial = {
          id: Math.max(...materials.map((m) => m.id), 0) + 1,
          ...formData,
        }
        setMaterials([...materials, newMaterial])
      }
    } else if (activeTab === "requirements") {
      if (editingItem) {
        setRequirements(requirements.map((item) => (item.id === editingItem.id ? { ...item, ...formData } : item)))
      } else {
        const newRequirement: Requirement = {
          id: Math.max(...requirements.map((r) => r.id), 0) + 1,
          ...formData,
        }
        setRequirements([...requirements, newRequirement])
      }
    } else if (activeTab === "process") {
      if (editingItem) {
        setProcessSteps(processSteps.map((item) => (item.id === editingItem.id ? { ...item, ...formData } : item)))
      } else {
        const newStep: ProcessStep = {
          id: Math.max(...processSteps.map((s) => s.id), 0) + 1,
          ...formData,
        }
        setProcessSteps([...processSteps, newStep].sort((a, b) => a.step - b.step))
      }
    }
    setIsEditing(false)
    setEditingItem(null)
  }

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este item?")) {
      if (activeTab === "materials") {
        setMaterials(materials.filter((item) => item.id !== id))
      } else if (activeTab === "requirements") {
        setRequirements(requirements.filter((item) => item.id !== id))
      } else if (activeTab === "process") {
        setProcessSteps(processSteps.filter((item) => item.id !== id))
      }
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingItem(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <Users className="h-6 w-6 mr-2 text-yellow-500" />
                Gerenciar Recrutamento
              </h1>
              <p className="text-yellow-500">Administração do processo de recrutamento</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Item
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

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("materials")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "materials"
                  ? "border-yellow-500 text-yellow-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Materiais de Estudo
            </button>
            <button
              onClick={() => setActiveTab("requirements")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "requirements"
                  ? "border-yellow-500 text-yellow-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Requisitos
            </button>
            <button
              onClick={() => setActiveTab("process")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "process"
                  ? "border-yellow-500 text-yellow-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Processo Seletivo
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Edit Form */}
        {isEditing && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {editingItem ? "Editar Item" : "Adicionar Novo Item"} -{" "}
                {activeTab === "materials"
                  ? "Material"
                  : activeTab === "requirements"
                    ? "Requisito"
                    : "Etapa do Processo"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeTab === "materials" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={formData.title || ""}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Título do material"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Tipo</Label>
                    <select
                      id="type"
                      value={formData.type || "PDF"}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="PDF">PDF</option>
                      <option value="Formulário">Formulário</option>
                      <option value="Vídeo">Vídeo</option>
                      <option value="Link">Link</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Descrição do material"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">URL da Imagem</Label>
                    <Input
                      id="image"
                      value={formData.image || ""}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="URL da imagem"
                    />
                  </div>
                  <div>
                    <Label htmlFor="link">Link do Material</Label>
                    <Input
                      id="link"
                      value={formData.link || ""}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      placeholder="Link para acessar o material"
                    />
                  </div>
                </div>
              )}

              {activeTab === "requirements" && (
                <div>
                  <Label htmlFor="text">Texto do Requisito</Label>
                  <Input
                    id="text"
                    value={formData.text || ""}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    placeholder="Digite o requisito"
                  />
                </div>
              )}

              {activeTab === "process" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="step">Número da Etapa</Label>
                    <Input
                      id="step"
                      type="number"
                      min="1"
                      value={formData.step || 1}
                      onChange={(e) => setFormData({ ...formData, step: Number.parseInt(e.target.value) || 1 })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="icon">Ícone (Emoji)</Label>
                    <Input
                      id="icon"
                      value={formData.icon || ""}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="📝"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Título da Etapa</Label>
                    <Input
                      id="title"
                      value={formData.title || ""}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Título da etapa"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Descrição da etapa"
                      rows={3}
                    />
                  </div>
                </div>
              )}

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

        {/* Content based on active tab */}
        {activeTab === "materials" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {materials.map((material) => (
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
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{material.description}</p>
                  <div className="flex gap-2">
                    <Button asChild size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600">
                      <Link href={material.link} target="_blank">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Acessar
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(material)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(material.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "requirements" && (
          <Card>
            <CardHeader>
              <CardTitle>Requisitos Básicos para Candidatura</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requirements.map((requirement) => (
                  <div key={requirement.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>{requirement.text}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(requirement)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(requirement.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "process" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps
              .sort((a, b) => a.step - b.step)
              .map((step) => (
                <Card key={step.id} className="text-center border-t-4 border-t-yellow-500 relative">
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(step)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(step.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <h3 className="font-bold text-lg mb-2">
                      {step.step}. {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}

        {/* Empty states */}
        {((activeTab === "materials" && materials.length === 0) ||
          (activeTab === "requirements" && requirements.length === 0) ||
          (activeTab === "process" && processSteps.length === 0)) && (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum item cadastrado</h3>
              <p className="text-gray-600 mb-4">
                Comece adicionando{" "}
                {activeTab === "materials"
                  ? "materiais de estudo"
                  : activeTab === "requirements"
                    ? "requisitos"
                    : "etapas do processo"}{" "}
                para o recrutamento.
              </p>
              <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Item
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
