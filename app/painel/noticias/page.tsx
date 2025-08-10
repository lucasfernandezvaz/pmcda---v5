"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Plus, Edit, Trash2, Calendar, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface News {
  id: number
  title: string
  summary: string
  content: string
  author: string
  date: string
  category: string
  image: string
  featured: boolean
}

const initialNews: News[] = [
  {
    id: 1,
    title: "PMCAP Inaugura Nova Base Operacional no Distrito Sul",
    summary: "Nova instalação amplia cobertura de segurança e reduz tempo de resposta na região",
    content: "A Polícia Militar de Cidade Alta Paradise inaugurou oficialmente sua nova base operacional...",
    author: "Assessoria de Imprensa",
    date: "2024-01-28",
    category: "Institucional",
    image: "/placeholder.svg?height=300&width=500",
    featured: true,
  },
  {
    id: 2,
    title: "Operação Carnaval 2024 Registra Zero Ocorrências Graves",
    summary: "Planejamento estratégico e efetivo policial garantiram segurança durante os festejos",
    content: "Durante os quatro dias de Carnaval, a PMCAP mobilizou mais de 100 policiais...",
    author: "Coronel Silva",
    date: "2024-01-25",
    category: "Operações",
    image: "/placeholder.svg?height=300&width=500",
    featured: true,
  },
]

export default function NoticiasAdminPage() {
  const [news, setNews] = useState<News[]>(initialNews)
  const [isEditing, setIsEditing] = useState(false)
  const [editingNews, setEditingNews] = useState<News | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    author: "",
    category: "",
    image: "",
    featured: false,
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      if (userData) {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)

        const hasPermission =
          parsedUser.permissions.includes("noticias") ||
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

  const categories = ["Todas", "Institucional", "Operações", "Equipamentos", "Educação", "Trânsito"]
  const filteredNews = selectedCategory === "Todas" ? news : news.filter((item) => item.category === selectedCategory)

  const handleEdit = (newsItem: News) => {
    setEditingNews(newsItem)
    setFormData({
      title: newsItem.title,
      summary: newsItem.summary,
      content: newsItem.content,
      author: newsItem.author,
      category: newsItem.category,
      image: newsItem.image,
      featured: newsItem.featured,
    })
    setIsEditing(true)
  }

  const handleAdd = () => {
    setEditingNews(null)
    setFormData({
      title: "",
      summary: "",
      content: "",
      author: user.name || "",
      category: "Institucional",
      image: "",
      featured: false,
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    const currentDate = new Date().toISOString().split("T")[0]

    if (editingNews) {
      setNews(news.map((item) => (item.id === editingNews.id ? { ...item, ...formData } : item)))
    } else {
      const newNews: News = {
        id: Math.max(...news.map((n) => n.id), 0) + 1,
        ...formData,
        date: currentDate,
      }
      setNews([...news, newNews])
    }
    setIsEditing(false)
    setEditingNews(null)
  }

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta notícia?")) {
      setNews(news.filter((item) => item.id !== id))
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingNews(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
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
                <FileText className="h-6 w-6 mr-2 text-yellow-500" />
                Gerenciar Notícias
              </h1>
              <p className="text-yellow-500">Administração de notícias e comunicados</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Plus className="h-4 w-4 mr-2" />
                Nova Notícia
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
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Edit Form */}
        {isEditing && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingNews ? "Editar Notícia" : "Adicionar Nova Notícia"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="title">Título da Notícia</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Digite o título da notícia"
                  />
                </div>
                <div>
                  <Label htmlFor="author">Autor</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Nome do autor"
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
                    <option value="Institucional">Institucional</option>
                    <option value="Operações">Operações</option>
                    <option value="Equipamentos">Equipamentos</option>
                    <option value="Educação">Educação</option>
                    <option value="Trânsito">Trânsito</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="URL da imagem da notícia"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="summary">Resumo</Label>
                  <Textarea
                    id="summary"
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    placeholder="Resumo da notícia"
                    rows={2}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="content">Conteúdo Completo</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Conteúdo completo da notícia"
                    rows={6}
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="featured">Notícia em destaque</Label>
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

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold">
                  {item.category}
                </div>
                {item.featured && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    DESTAQUE
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(item.date)}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {item.author}
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.summary}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)} className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhuma notícia encontrada</h3>
              <p className="text-gray-600 mb-4">Não há notícias na categoria selecionada.</p>
              <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeira Notícia
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
