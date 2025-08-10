"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Plus, Edit, Trash2, MapPin, Clock, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string
  category: string
  participants?: number
}

const initialEvents: Event[] = [
  {
    id: 1,
    title: "Operação Cidade Segura",
    description: "Grande operação de segurança com foco na prevenção de crimes e aproximação com a comunidade",
    date: "2024-02-15",
    time: "08:00",
    location: "Centro de Cidade Alta Paradise",
    image: "/placeholder.svg?height=300&width=400",
    category: "Operação",
    participants: 45,
  },
  {
    id: 2,
    title: "Treinamento Tático Conjunto",
    description: "Exercício de treinamento envolvendo todas as unidades especializadas da PMCAP",
    date: "2024-02-20",
    time: "14:00",
    location: "Centro de Treinamento PMCAP",
    image: "/placeholder.svg?height=300&width=400",
    category: "Treinamento",
    participants: 80,
  },
  {
    id: 3,
    title: "Palestra Educativa nas Escolas",
    description: "Programa de educação sobre segurança no trânsito e prevenção às drogas",
    date: "2024-02-25",
    time: "09:00",
    location: "Escolas Municipais",
    image: "/placeholder.svg?height=300&width=400",
    category: "Educativo",
    participants: 200,
  },
]

export default function EventosAdminPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [isEditing, setIsEditing] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    image: "",
    category: "",
    participants: 0,
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      if (userData) {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)

        const hasPermission =
          parsedUser.permissions.includes("eventos") ||
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
          <Calendar className="h-12 w-12 text-yellow-500 mx-auto mb-4 animate-spin" />
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const categories = ["Todos", "Operação", "Treinamento", "Educativo", "Cerimônia", "Blitz", "Reunião"]
  const filteredEvents =
    selectedCategory === "Todos" ? events : events.filter((event) => event.category === selectedCategory)

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      image: event.image,
      category: event.category,
      participants: event.participants || 0,
    })
    setIsEditing(true)
  }

  const handleAdd = () => {
    setEditingEvent(null)
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      image: "",
      category: "Operação",
      participants: 0,
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editingEvent) {
      setEvents(events.map((event) => (event.id === editingEvent.id ? { ...event, ...formData } : event)))
    } else {
      const newEvent: Event = {
        id: Math.max(...events.map((e) => e.id), 0) + 1,
        ...formData,
      }
      setEvents([...events, newEvent])
    }
    setIsEditing(false)
    setEditingEvent(null)
  }

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este evento?")) {
      setEvents(events.filter((event) => event.id !== id))
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingEvent(null)
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
                <Calendar className="h-6 w-6 mr-2 text-yellow-500" />
                Gerenciar Eventos
              </h1>
              <p className="text-yellow-500">Administração de eventos e atividades</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Plus className="h-4 w-4 mr-2" />
                Novo Evento
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
              <CardTitle>{editingEvent ? "Editar Evento" : "Adicionar Novo Evento"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="title">Título do Evento</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Digite o título do evento"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Local</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Local do evento"
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
                    <option value="Operação">Operação</option>
                    <option value="Treinamento">Treinamento</option>
                    <option value="Educativo">Educativo</option>
                    <option value="Cerimônia">Cerimônia</option>
                    <option value="Blitz">Blitz</option>
                    <option value="Reunião">Reunião</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="participants">Participantes</Label>
                  <Input
                    id="participants"
                    type="number"
                    min="0"
                    value={formData.participants}
                    onChange={(e) => setFormData({ ...formData, participants: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="URL da imagem do evento"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descreva o evento"
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

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold">
                  {event.category}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  {event.participants && (
                    <div className="flex items-center text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      {event.participants} participantes
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(event)} className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(event.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum evento encontrado</h3>
              <p className="text-gray-600 mb-4">Não há eventos na categoria selecionada.</p>
              <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Evento
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
