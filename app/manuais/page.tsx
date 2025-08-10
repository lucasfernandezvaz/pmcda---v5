"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, Plus, Edit, Trash2, Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Manual {
  id: number
  title: string
  description: string
  category: string
  image: string
  link: string
  fileType: string
  lastUpdated: string
}

const initialManuais: Manual[] = [
  {
    id: 1,
    title: "Manual de Conduta Policial",
    description: "Diretrizes éticas e comportamentais para todos os policiais militares da PMCAP",
    category: "Conduta",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    fileType: "PDF",
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    title: "Manual de Procedimentos Operacionais",
    description: "Protocolos e procedimentos para operações policiais padrão",
    category: "Operacional",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    fileType: "PDF",
    lastUpdated: "2024-01-20",
  },
  {
    id: 3,
    title: "Manual de Abordagem Policial",
    description: "Técnicas e procedimentos seguros para abordagem de suspeitos e veículos",
    category: "Técnico",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    fileType: "PDF",
    lastUpdated: "2024-01-10",
  },
  {
    id: 4,
    title: "Manual de Uso de Armamentos",
    description: "Instruções de segurança e uso correto de armamentos da corporação",
    category: "Armamento",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    fileType: "PDF",
    lastUpdated: "2024-01-25",
  },
  {
    id: 5,
    title: "Manual de Primeiros Socorros",
    description: "Procedimentos básicos de primeiros socorros para situações de emergência",
    category: "Saúde",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    fileType: "PDF",
    lastUpdated: "2024-01-18",
  },
  {
    id: 6,
    title: "Manual de Comunicação Operacional",
    description: "Protocolos de comunicação via rádio e sistemas de comunicação",
    category: "Comunicação",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    fileType: "PDF",
    lastUpdated: "2024-01-22",
  },
  {
    id: 7,
    title: "Manual de Investigação Criminal",
    description: "Técnicas e procedimentos para investigação de crimes",
    category: "Investigação",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    fileType: "PDF",
    lastUpdated: "2024-01-12",
  },
  {
    id: 8,
    title: "Manual de Trânsito e Fiscalização",
    description: "Regulamentos de trânsito e procedimentos de fiscalização",
    category: "Trânsito",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    fileType: "PDF",
    lastUpdated: "2024-01-28",
  },
]

export default function ManuaisPage() {
  const [manuais, setManuais] = useState<Manual[]>(initialManuais)
  const [isEditing, setIsEditing] = useState(false)
  const [editingManual, setEditingManual] = useState<Manual | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    link: "",
    fileType: "PDF",
  })

  const categories = [
    "Todos",
    "Conduta",
    "Operacional",
    "Técnico",
    "Armamento",
    "Saúde",
    "Comunicação",
    "Investigação",
    "Trânsito",
  ]

  const filteredManuais =
    selectedCategory === "Todos" ? manuais : manuais.filter((manual) => manual.category === selectedCategory)

  const handleEdit = (manual: Manual) => {
    setEditingManual(manual)
    setFormData({
      title: manual.title,
      description: manual.description,
      category: manual.category,
      image: manual.image,
      link: manual.link,
      fileType: manual.fileType,
    })
    setIsEditing(true)
  }

  const handleAdd = () => {
    setEditingManual(null)
    setFormData({
      title: "",
      description: "",
      category: "",
      image: "",
      link: "",
      fileType: "PDF",
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editingManual) {
      setManuais(
        manuais.map((manual) =>
          manual.id === editingManual.id
            ? { ...manual, ...formData, lastUpdated: new Date().toISOString().split("T")[0] }
            : manual,
        ),
      )
    } else {
      const newManual: Manual = {
        id: Math.max(...manuais.map((m) => m.id)) + 1,
        ...formData,
        lastUpdated: new Date().toISOString().split("T")[0],
      }
      setManuais([...manuais, newManual])
    }
    setIsEditing(false)
    setEditingManual(null)
  }

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este manual?")) {
      setManuais(manuais.filter((manual) => manual.id !== id))
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingManual(null)
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
            <span className="text-yellow-500">Manuais</span> PMCAP
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Biblioteca de manuais operacionais e documentos técnicos da corporação
          </p>
        </div>
      </section>

      {/* Filter and Controls */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-yellow-500 text-black hover:bg-yellow-600"
                      : "border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-black"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
            <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
              <Plus className="h-4 w-4 mr-2" />
              Novo Manual
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Edit Form */}
        {isEditing && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingManual ? "Editar Manual" : "Adicionar Novo Manual"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="title">Título do Manual</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Digite o título do manual"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Selecione a categoria</option>
                    {categories.slice(1).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="fileType">Tipo de Arquivo</Label>
                  <select
                    id="fileType"
                    value={formData.fileType}
                    onChange={(e) => setFormData({ ...formData, fileType: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="PDF">PDF</option>
                    <option value="DOC">DOC</option>
                    <option value="DOCX">DOCX</option>
                    <option value="PPT">PPT</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="URL da imagem do manual"
                  />
                </div>
                <div>
                  <Label htmlFor="link">Link do Arquivo</Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="Link para download do manual"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descreva o conteúdo e objetivo do manual"
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

        {/* Manuais Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredManuais.map((manual) => (
            <Card key={manual.id} className="hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={manual.image || "/placeholder.svg"}
                  alt={manual.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold">
                  {manual.fileType}
                </div>
                <div className="absolute top-2 left-2 bg-black bg-opacity-80 text-yellow-500 px-2 py-1 rounded text-xs font-semibold">
                  {manual.category}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{manual.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{manual.description}</p>

                <div className="text-xs text-gray-500 mb-4">Atualizado em: {formatDate(manual.lastUpdated)}</div>

                <div className="flex gap-2">
                  <Button asChild size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600">
                    <Link href={manual.link} target="_blank">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(manual)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(manual.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredManuais.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum manual encontrado</h3>
              <p className="text-gray-600 mb-4">Não há manuais na categoria selecionada.</p>
              <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Manual
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
