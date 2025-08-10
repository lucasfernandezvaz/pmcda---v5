"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, Plus, Edit, Trash2, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Course {
  id: number
  name: string
  description: string
  image: string
  link: string
  category: string
}

const initialCourses: Course[] = [
  {
    id: 1,
    name: "Curso de Abordagem",
    description: "Técnicas e procedimentos para abordagem policial segura e eficaz",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    category: "Operacional",
  },
  {
    id: 2,
    name: "Curso de Acompanhamento",
    description: "Métodos de acompanhamento e vigilância em operações policiais",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    category: "Investigação",
  },
  {
    id: 3,
    name: "Curso de Boosting",
    description: "Técnicas avançadas de perseguição e interceptação veicular",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    category: "Trânsito",
  },
  {
    id: 4,
    name: "Curso de Comunicação",
    description: "Comunicação eficaz em situações de emergência e operações",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    category: "Comunicação",
  },
  {
    id: 5,
    name: "Curso Aerotático",
    description: "Operações aéreas e coordenação com unidades terrestres",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    category: "Especializado",
  },
  {
    id: 6,
    name: "Curso de Progressão",
    description: "Desenvolvimento de carreira e liderança na corporação",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
    category: "Carreira",
  },
]

export default function CursosPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [isEditing, setIsEditing] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    link: "",
    category: "",
  })

  const handleEdit = (course: Course) => {
    setEditingCourse(course)
    setFormData({
      name: course.name,
      description: course.description,
      image: course.image,
      link: course.link,
      category: course.category,
    })
    setIsEditing(true)
  }

  const handleAdd = () => {
    setEditingCourse(null)
    setFormData({
      name: "",
      description: "",
      image: "",
      link: "",
      category: "",
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editingCourse) {
      // Update existing course
      setCourses(courses.map((course) => (course.id === editingCourse.id ? { ...course, ...formData } : course)))
    } else {
      // Add new course
      const newCourse: Course = {
        id: Math.max(...courses.map((c) => c.id)) + 1,
        ...formData,
      }
      setCourses([...courses, newCourse])
    }
    setIsEditing(false)
    setEditingCourse(null)
  }

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este curso?")) {
      setCourses(courses.filter((course) => course.id !== id))
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingCourse(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-yellow-500" />
                Gerenciar Cursos
              </h1>
              <p className="text-yellow-500">Administração de cursos e treinamentos</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Curso
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
              <CardTitle>{editingCourse ? "Editar Curso" : "Adicionar Novo Curso"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome do Curso</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Digite o nome do curso"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Ex: Operacional, Investigação"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descreva o conteúdo e objetivos do curso"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="URL da imagem do curso"
                  />
                </div>
                <div>
                  <Label htmlFor="link">Link do Material</Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="Link para o material do curso"
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

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold">
                  {course.category}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{course.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

                <div className="flex gap-2">
                  <Button asChild size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600">
                    <Link href={course.link} target="_blank">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Acessar
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(course)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(course.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {courses.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum curso cadastrado</h3>
              <p className="text-gray-600 mb-4">Comece adicionando o primeiro curso de treinamento.</p>
              <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Curso
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
