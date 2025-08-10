"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Plus, Edit, Trash2, ExternalLink, Calendar, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Edital {
  id: number
  title: string
  description: string
  unit: string
  openingDate: string
  closingDate: string
  vacancies: number
  image: string
  link: string
  status: "Aberto" | "Fechado" | "Em Breve"
}

const initialEditais: Edital[] = [
  {
    id: 1,
    title: "Recrutamento GTM - Grupo Tático Militar",
    description:
      "Processo seletivo para ingresso no Grupo Tático Militar. Vagas para soldados com experiência operacional.",
    unit: "GTM",
    openingDate: "2024-02-01",
    closingDate: "2024-02-28",
    vacancies: 10,
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    status: "Aberto",
  },
  {
    id: 2,
    title: "Seleção GRA - Radiopatrulhamento Aéreo",
    description: "Edital para formação de cadastro reserva do Grupo de Radiopatrulhamento Aéreo.",
    unit: "GRA",
    openingDate: "2024-02-15",
    closingDate: "2024-03-15",
    vacancies: 5,
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    status: "Aberto",
  },
  {
    id: 3,
    title: "Processo Seletivo SPEED - Trânsito",
    description: "Recrutamento para a unidade de policiamento de trânsito. Requisitos específicos de habilitação.",
    unit: "SPEED",
    openingDate: "2024-01-15",
    closingDate: "2024-01-31",
    vacancies: 15,
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    status: "Fechado",
  },
]

export default function EditaisPage() {
  const [editais, setEditais] = useState<Edital[]>(initialEditais)
  const [isEditing, setIsEditing] = useState(false)
  const [editingEdital, setEditingEdital] = useState<Edital | null>(null)
  const [selectedStatus, setSelectedStatus] = useState("Todos")
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    unit: "",
    openingDate: "",
    closingDate: "",
    vacancies: 0,
    image: "",
    link: "",
    status: "Aberto" as "Aberto" | "Fechado" | "Em Breve",
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      if (userData) {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)

        // Verificar se tem permissão para acessar editais
        const hasPermission =
          parsedUser.permissions.includes("editais") ||
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
          <FileText className="h-12 w-12 text-yellow-500 mx-auto mb-4 animate-spin" />
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const statusOptions = ["Todos", "Aberto", "Fechado", "Em Breve"]
  const unitOptions = ["GTM", "GRA", "SPEED", "GOT", "PERÍCIA", "GIC"]

  const filteredEditais =
    selectedStatus === "Todos" ? editais : editais.filter((edital) => edital.status === selectedStatus)

  const handleEdit = (edital: Edital) => {
    setEditingEdital(edital)
    setFormData({
      title: edital.title,
      description: edital.description,
      unit: edital.unit,
      openingDate: edital.openingDate,
      closingDate: edital.closingDate,
      vacancies: edital.vacancies,
      image: edital.image,
      link: edital.link,
      status: edital.status,
    })
    setIsEditing(true)
  }

  const handleAdd = () => {
    setEditingEdital(null)
    setFormData({
      title: "",
      description: "",
      unit: "",
      openingDate: "",
      closingDate: "",
      vacancies: 0,
      image: "",
      link: "",
      status: "Aberto",
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editingEdital) {
      setEditais(editais.map((edital) => (edital.id === editingEdital.id ? { ...edital, ...formData } : edital)))
    } else {
      const newEdital: Edital = {
        id: Math.max(...editais.map((e) => e.id)) + 1,
        ...formData,
      }
      setEditais([...editais, newEdital])
    }
    setIsEditing(false)
    setEditingEdital(null)
  }

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este edital?")) {
      setEditais(editais.filter((edital) => edital.id !== id))
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingEdital(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aberto":
        return "bg-green-500"
      case "Fechado":
        return "bg-red-500"
      case "Em Breve":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
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
                <FileText className="h-6 w-6 mr-2 text-yellow-500" />
                Gerenciar Editais
              </h1>
              <p className="text-yellow-500">Processos seletivos e oportunidades</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Plus className="h-4 w-4 mr-2" />
                Novo Edital
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

      {/* Filter Buttons */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {statusOptions.map((status) => (
              <Button
                key={status}
                variant={selectedStatus === status ? "default" : "outline"}
                onClick={() => setSelectedStatus(status)}
                className={
                  selectedStatus === status
                    ? "bg-yellow-500 text-black hover:bg-yellow-600"
                    : "border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-black"
                }
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Edit Form */}
        {isEditing && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingEdital ? "Editar Edital" : "Adicionar Novo Edital"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="title">Título do Edital</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Digite o título do edital"
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unidade</Label>
                  <select
                    id="unit"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Selecione a unidade</option>
                    {unitOptions.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="vacancies">Número de Vagas</Label>
                  <Input
                    id="vacancies"
                    type="number"
                    min="1"
                    value={formData.vacancies}
                    onChange={(e) => setFormData({ ...formData, vacancies: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="openingDate">Data de Abertura</Label>
                  <Input
                    id="openingDate"
                    type="date"
                    value={formData.openingDate}
                    onChange={(e) => setFormData({ ...formData, openingDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="closingDate">Data de Encerramento</Label>
                  <Input
                    id="closingDate"
                    type="date"
                    value={formData.closingDate}
                    onChange={(e) => setFormData({ ...formData, closingDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as "Aberto" | "Fechado" | "Em Breve" })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Aberto">Aberto</option>
                    <option value="Fechado">Fechado</option>
                    <option value="Em Breve">Em Breve</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="URL da imagem do edital"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descreva os requisitos e informações do edital"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="link">Link do Edital</Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="Link para o documento completo"
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

        {/* Editais Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEditais.map((edital) => (
            <Card key={edital.id} className="hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={edital.image || "/placeholder.svg"}
                  alt={edital.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
                <div
                  className={`absolute top-2 right-2 ${getStatusColor(edital.status)} text-white px-2 py-1 rounded text-xs font-semibold`}
                >
                  {edital.status}
                </div>
                <div className="absolute top-2 left-2 bg-black bg-opacity-80 text-yellow-500 px-2 py-1 rounded text-xs font-semibold">
                  {edital.unit}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{edital.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{edital.description}</p>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(edital.openingDate)} - {formatDate(edital.closingDate)}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    {edital.vacancies} vagas disponíveis
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button asChild size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600">
                    <Link href={edital.link} target="_blank">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Ver Edital
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(edital)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(edital.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEditais.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum edital encontrado</h3>
              <p className="text-gray-600 mb-4">Não há editais na categoria selecionada.</p>
              <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Edital
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
