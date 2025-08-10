"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Plus, Edit, Trash2, Star } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface Rank {
  id: number
  name: string
  level: number
  description: string
  image: string
  responsibilities: string[]
  requirements: string[]
}

const initialRanks: Rank[] = [
  {
    id: 1,
    name: "Aluno",
    level: 1,
    description: "Candidato em processo de formação inicial na academia de polícia",
    image: "/placeholder.svg?height=200&width=150&text=Aluno",
    responsibilities: ["Participar dos treinamentos", "Estudar regulamentos", "Cumprir horários"],
    requirements: ["Aprovação no processo seletivo", "Idade mínima 18 anos", "Ensino médio completo"],
  },
  {
    id: 2,
    name: "Soldado 2º Classe",
    level: 2,
    description: "Primeira patente operacional, executa atividades básicas de policiamento",
    image: "/placeholder.svg?height=200&width=150&text=Soldado+2",
    responsibilities: ["Patrulhamento básico", "Atendimento de ocorrências simples", "Apoio operacional"],
    requirements: ["Conclusão do curso de formação", "Aprovação em exames", "Período probatório"],
  },
  {
    id: 3,
    name: "Soldado 1º Classe",
    level: 3,
    description: "Soldado experiente com maior autonomia operacional",
    image: "/placeholder.svg?height=200&width=150&text=Soldado+1",
    responsibilities: ["Patrulhamento avançado", "Orientação de novatos", "Operações especiais básicas"],
    requirements: ["2 anos como Soldado 2º Classe", "Cursos de especialização", "Avaliação positiva"],
  },
  {
    id: 4,
    name: "Cabo",
    level: 4,
    description: "Primeira patente de graduado, lidera pequenas equipes",
    image: "/placeholder.svg?height=200&width=150&text=Cabo",
    responsibilities: ["Liderança de equipe", "Supervisão de patrulhas", "Treinamento de soldados"],
    requirements: ["3 anos como Soldado", "Curso de liderança", "Aprovação em concurso interno"],
  },
  {
    id: 5,
    name: "3º Sargento",
    level: 5,
    description: "Sargento júnior com responsabilidades administrativas e operacionais",
    image: "/placeholder.svg?height=200&width=150&text=3+Sargento",
    responsibilities: ["Coordenação de turnos", "Relatórios operacionais", "Supervisão de cabos"],
    requirements: ["2 anos como Cabo", "Curso de gestão", "Especialização técnica"],
  },
  {
    id: 6,
    name: "2º Sargento",
    level: 6,
    description: "Sargento intermediário com ampla experiência operacional",
    image: "/placeholder.svg?height=200&width=150&text=2+Sargento",
    responsibilities: ["Planejamento operacional", "Coordenação de operações", "Instrução técnica"],
    requirements: ["3 anos como 3º Sargento", "Cursos avançados", "Liderança comprovada"],
  },
  {
    id: 7,
    name: "1º Sargento",
    level: 7,
    description: "Sargento sênior, principal auxiliar dos oficiais",
    image: "/placeholder.svg?height=200&width=150&text=1+Sargento",
    responsibilities: ["Assessoria a oficiais", "Coordenação geral", "Formação de praças"],
    requirements: ["4 anos como 2º Sargento", "Curso superior", "Especialização avançada"],
  },
  {
    id: 8,
    name: "Sub Tenente",
    level: 8,
    description: "Última patente de praça, ponte entre praças e oficiais",
    image: "/placeholder.svg?height=200&width=150&text=Sub+Tenente",
    responsibilities: ["Administração de unidade", "Coordenação de sargentos", "Projetos especiais"],
    requirements: ["5 anos como 1º Sargento", "Curso de aperfeiçoamento", "Mérito excepcional"],
  },
  {
    id: 9,
    name: "2º Tenente",
    level: 9,
    description: "Primeira patente de oficial, comando de pequenas unidades",
    image: "/placeholder.svg?height=200&width=150&text=2+Tenente",
    responsibilities: ["Comando de pelotão", "Planejamento tático", "Liderança direta"],
    requirements: ["Curso de formação de oficiais", "Ensino superior", "Estágio supervisionado"],
  },
  {
    id: 10,
    name: "1º Tenente",
    level: 10,
    description: "Tenente experiente com comando consolidado",
    image: "/placeholder.svg?height=200&width=150&text=1+Tenente",
    responsibilities: ["Comando de companhia", "Operações complexas", "Desenvolvimento de subordinados"],
    requirements: ["3 anos como 2º Tenente", "Curso de aperfeiçoamento", "Avaliação superior"],
  },
  {
    id: 11,
    name: "Capitão",
    level: 11,
    description: "Oficial intermediário, comando de unidades médias",
    image: "/placeholder.svg?height=200&width=150&text=Capitão",
    responsibilities: ["Comando de batalhão", "Planejamento estratégico", "Coordenação inter-unidades"],
    requirements: ["4 anos como 1º Tenente", "Especialização", "Liderança comprovada"],
  },
  {
    id: 12,
    name: "Major",
    level: 12,
    description: "Oficial superior com responsabilidades estratégicas",
    image: "/placeholder.svg?height=200&width=150&text=Major",
    responsibilities: ["Estado-maior", "Planejamento regional", "Assessoria superior"],
    requirements: ["5 anos como Capitão", "Curso de estado-maior", "Pós-graduação"],
  },
  {
    id: 13,
    name: "Tenente Coronel",
    level: 13,
    description: "Alto oficial com comando de grandes unidades",
    image: "/placeholder.svg?height=200&width=150&text=Ten+Coronel",
    responsibilities: ["Comando regional", "Políticas públicas", "Coordenação estadual"],
    requirements: ["6 anos como Major", "Curso superior de polícia", "Mestrado"],
  },
  {
    id: 14,
    name: "Coronel",
    level: 14,
    description: "Oficial general, comando supremo da corporação",
    image: "/placeholder.svg?height=200&width=150&text=Coronel",
    responsibilities: ["Comando geral", "Diretrizes estratégicas", "Representação institucional"],
    requirements: ["7 anos como Ten. Coronel", "Curso de altos estudos", "Notório saber"],
  },
  {
    id: 15,
    name: "Comissário",
    level: 15,
    description: "Cargo especial de supervisão e controle administrativo",
    image: "/placeholder.svg?height=200&width=150&text=Comissário",
    responsibilities: ["Supervisão geral", "Controle interno", "Auditoria operacional"],
    requirements: ["Nomeação especial", "Experiência comprovada", "Formação específica"],
  },
]

export default function HierarquiaPage() {
  const [ranks, setRanks] = useState<Rank[]>(initialRanks)
  const [isEditing, setIsEditing] = useState(false)
  const [editingRank, setEditingRank] = useState<Rank | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    level: 1,
    description: "",
    image: "",
    responsibilities: [] as string[],
    requirements: [] as string[],
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      if (userData) {
        try {
          setUser(JSON.parse(userData))
        } catch (error) {
          console.error("Erro ao carregar dados do usuário:", error)
        }
      }
      setLoading(false)
    }
  }, [])

  const canEdit = () => {
    if (!user) return false
    return (
      user.permissions.includes("administrador") ||
      user.permissions.includes("coronel") ||
      user.permissions.includes("hierarquia")
    )
  }

  const handleEdit = (rank: Rank) => {
    if (!canEdit()) return
    setEditingRank(rank)
    setFormData({
      name: rank.name,
      level: rank.level,
      description: rank.description,
      image: rank.image,
      responsibilities: [...rank.responsibilities],
      requirements: [...rank.requirements],
    })
    setIsEditing(true)
  }

  const handleAdd = () => {
    if (!canEdit()) return
    setEditingRank(null)
    setFormData({
      name: "",
      level: Math.max(...ranks.map((r) => r.level)) + 1,
      description: "",
      image: "",
      responsibilities: [],
      requirements: [],
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editingRank) {
      setRanks(ranks.map((rank) => (rank.id === editingRank.id ? { ...rank, ...formData } : rank)))
    } else {
      const newRank: Rank = {
        id: Math.max(...ranks.map((r) => r.id), 0) + 1,
        ...formData,
      }
      setRanks([...ranks, newRank].sort((a, b) => a.level - b.level))
    }
    setIsEditing(false)
    setEditingRank(null)
  }

  const handleDelete = (id: number) => {
    if (!canEdit()) return
    if (confirm("Tem certeza que deseja excluir esta patente?")) {
      setRanks(ranks.filter((rank) => rank.id !== id))
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingRank(null)
  }

  const handleArrayChange = (field: "responsibilities" | "requirements", index: number, value: string) => {
    const newArray = [...formData[field]]
    newArray[index] = value
    setFormData({ ...formData, [field]: newArray })
  }

  const addArrayItem = (field: "responsibilities" | "requirements") => {
    setFormData({ ...formData, [field]: [...formData[field], ""] })
  }

  const removeArrayItem = (field: "responsibilities" | "requirements", index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index)
    setFormData({ ...formData, [field]: newArray })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-yellow-500 mx-auto mb-4 animate-spin" />
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black via-blue-900 to-black py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-yellow-500">Hierarquia</span> Militar
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Estrutura organizacional e patentes da Polícia Militar de Cidade Alta Paradise
          </p>
          {canEdit() && (
            <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Patente
            </Button>
          )}
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Edit Form */}
        {isEditing && canEdit() && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingRank ? "Editar Patente" : "Adicionar Nova Patente"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome da Patente</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Digite o nome da patente"
                  />
                </div>
                <div>
                  <Label htmlFor="level">Nível Hierárquico</Label>
                  <Input
                    id="level"
                    type="number"
                    min="1"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: Number.parseInt(e.target.value) || 1 })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="URL da imagem da patente"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descreva as características da patente"
                    rows={3}
                  />
                </div>

                {/* Responsabilidades */}
                <div className="md:col-span-2">
                  <Label>Responsabilidades</Label>
                  <div className="space-y-2 mt-2">
                    {formData.responsibilities.map((resp, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={resp}
                          onChange={(e) => handleArrayChange("responsibilities", index, e.target.value)}
                          placeholder="Digite uma responsabilidade"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem("responsibilities", index)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("responsibilities")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Responsabilidade
                    </Button>
                  </div>
                </div>

                {/* Requisitos */}
                <div className="md:col-span-2">
                  <Label>Requisitos</Label>
                  <div className="space-y-2 mt-2">
                    {formData.requirements.map((req, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={req}
                          onChange={(e) => handleArrayChange("requirements", index, e.target.value)}
                          placeholder="Digite um requisito"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem("requirements", index)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("requirements")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Requisito
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

        {/* Hierarchy Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ranks
            .sort((a, b) => a.level - b.level)
            .map((rank) => (
              <Card key={rank.id} className="hover:shadow-xl transition-shadow duration-300 relative">
                <div className="absolute top-2 right-2 flex gap-1">
                  {Array.from({ length: Math.min(rank.level, 5) }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                {canEdit() && (
                  <div className="absolute top-2 left-2 flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(rank)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(rank.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}

                <div className="relative h-48">
                  <Image
                    src={rank.image || "/placeholder.svg"}
                    alt={rank.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-sm font-semibold">
                    Nível {rank.level}
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg text-center">{rank.name}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{rank.description}</p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center">
                        <Shield className="h-4 w-4 mr-1 text-blue-500" />
                        Responsabilidades:
                      </h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {rank.responsibilities.map((resp, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        Requisitos:
                      </h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {rank.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1 h-1 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {ranks.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhuma patente cadastrada</h3>
              <p className="text-gray-600 mb-4">Comece adicionando as patentes da hierarquia militar.</p>
              {canEdit() && (
                <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeira Patente
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
