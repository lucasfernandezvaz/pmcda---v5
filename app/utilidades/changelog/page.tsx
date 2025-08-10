"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Plus, Edit, Trash2, User, Calendar } from "lucide-react"

interface ChangelogEntry {
  id: number
  title: string
  content: string
  author: string
  date: string
  time: string
  type: "Atualização" | "Correção" | "Nova Funcionalidade" | "Aviso"
}

const initialChangelog: ChangelogEntry[] = [
  {
    id: 1,
    title: "Atualização do Sistema de Cursos",
    content:
      "Implementado novo sistema de gerenciamento de cursos com funcionalidades aprimoradas de edição e categorização.",
    author: "Coronel Silva",
    date: "2024-01-28",
    time: "14:30",
    type: "Atualização",
  },
  {
    id: 2,
    title: "Nova Seção de Editais",
    content:
      "Adicionada seção dedicada para editais de recrutamento das unidades especializadas com sistema de filtros.",
    author: "Cap. Santos",
    date: "2024-01-25",
    time: "09:15",
    type: "Nova Funcionalidade",
  },
  {
    id: 3,
    title: "Correção na Calculadora de Penas",
    content: "Corrigido bug na calculadora de penas que causava erro no cálculo de multas por dinheiro ilícito.",
    author: "Sgt. Oliveira",
    date: "2024-01-22",
    time: "16:45",
    type: "Correção",
  },
  {
    id: 4,
    title: "Manutenção Programada do Sistema",
    content: "Sistema ficará indisponível no dia 30/01 das 02:00 às 06:00 para manutenção preventiva dos servidores.",
    author: "Administrador",
    date: "2024-01-20",
    time: "11:00",
    type: "Aviso",
  },
  {
    id: 5,
    title: "Atualização de Segurança",
    content: "Implementadas melhorias de segurança no sistema de autenticação e controle de acesso.",
    author: "Coronel Silva",
    date: "2024-01-18",
    time: "13:20",
    type: "Atualização",
  },
]

export default function ChangelogPage() {
  const [changelog, setChangelog] = useState<ChangelogEntry[]>(initialChangelog)
  const [isEditing, setIsEditing] = useState(false)
  const [editingEntry, setEditingEntry] = useState<ChangelogEntry | null>(null)
  const [selectedType, setSelectedType] = useState("Todos")
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    type: "Atualização" as "Atualização" | "Correção" | "Nova Funcionalidade" | "Aviso",
  })

  const types = ["Todos", "Atualização", "Correção", "Nova Funcionalidade", "Aviso"]

  const filteredChangelog =
    selectedType === "Todos" ? changelog : changelog.filter((entry) => entry.type === selectedType)

  const handleEdit = (entry: ChangelogEntry) => {
    setEditingEntry(entry)
    setFormData({
      title: entry.title,
      content: entry.content,
      author: entry.author,
      type: entry.type,
    })
    setIsEditing(true)
  }

  const handleAdd = () => {
    setEditingEntry(null)
    setFormData({
      title: "",
      content: "",
      author: "",
      type: "Atualização",
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    const now = new Date()
    const date = now.toISOString().split("T")[0]
    const time = now.toTimeString().slice(0, 5)

    if (editingEntry) {
      setChangelog(
        changelog.map((entry) => (entry.id === editingEntry.id ? { ...entry, ...formData, date, time } : entry)),
      )
    } else {
      const newEntry: ChangelogEntry = {
        id: Math.max(...changelog.map((e) => e.id)) + 1,
        ...formData,
        date,
        time,
      }
      setChangelog([newEntry, ...changelog])
    }
    setIsEditing(false)
    setEditingEntry(null)
  }

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta entrada?")) {
      setChangelog(changelog.filter((entry) => entry.id !== id))
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingEntry(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Atualização":
        return "bg-blue-500"
      case "Correção":
        return "bg-red-500"
      case "Nova Funcionalidade":
        return "bg-green-500"
      case "Aviso":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black via-blue-900 to-black py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-yellow-500">Changelog</span> PMCAP
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Histórico de mudanças, atualizações e avisos do sistema</p>
        </div>
      </section>

      {/* Filter and Controls */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  onClick={() => setSelectedType(type)}
                  className={
                    selectedType === type
                      ? "bg-yellow-500 text-black hover:bg-yellow-600"
                      : "border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-black"
                  }
                >
                  {type}
                </Button>
              ))}
            </div>
            <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
              <Plus className="h-4 w-4 mr-2" />
              Nova Entrada
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Edit Form */}
        {isEditing && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingEntry ? "Editar Entrada" : "Nova Entrada do Changelog"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Digite o título da atualização"
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
                  <Label htmlFor="type">Tipo</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Atualização">Atualização</option>
                    <option value="Correção">Correção</option>
                    <option value="Nova Funcionalidade">Nova Funcionalidade</option>
                    <option value="Aviso">Aviso</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="content">Conteúdo</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Descreva a mudança ou atualização"
                    rows={4}
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

        {/* Changelog Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {filteredChangelog.map((entry, index) => (
              <Card key={entry.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-yellow-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`${getTypeColor(entry.type)} text-white px-2 py-1 rounded text-xs font-semibold`}
                        >
                          {entry.type}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(entry.date)}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {entry.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <User className="h-4 w-4 mr-1" />
                          {entry.author}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{entry.title}</CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(entry)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(entry.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{entry.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredChangelog.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhuma entrada encontrada</h3>
                <p className="text-gray-600 mb-4">Não há entradas na categoria selecionada.</p>
                <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeira Entrada
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
