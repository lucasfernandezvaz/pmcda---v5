"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Zap, Plus, Edit, Trash2, BookOpen, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Weapon {
  id: number
  name: string
  image: string
  authorizedRanks: string[]
  weaponClass: string
  description: string
  requiredCourses: string[]
  authorizedUnits: string[]
  caliber: string
  capacity: string
}

const initialWeapons: Weapon[] = [
  {
    id: 1,
    name: "Pistola Padrão PM",
    image: "/placeholder.svg?height=200&width=300&text=Pistola+PM",
    authorizedRanks: ["Soldado 1º Classe", "Cabo", "Sargento", "Subtenente", "Tenente", "Capitão"],
    weaponClass: "Classe A - Sidearm",
    description: "Pistola padrão para uso geral da corporação",
    requiredCourses: ["Curso de Tiro Básico", "Curso de Manuseio de Armas"],
    authorizedUnits: ["Patrulhamento Geral", "1º BPM"],
    caliber: ".40 S&W",
    capacity: "15 cartuchos",
  },
  {
    id: 2,
    name: "Fuzil Tático GTM",
    image: "/placeholder.svg?height=200&width=300&text=Fuzil+GTM",
    authorizedRanks: ["GTM Operador", "GTM Líder", "Comandante GTM"],
    weaponClass: "Classe S - Especial",
    description: "Fuzil de assalto para operações táticas de alto risco",
    requiredCourses: ["Curso Tático Avançado", "Curso de Tiro de Precisão", "Curso de Abordagem"],
    authorizedUnits: ["GTM"],
    caliber: "5.56x45mm",
    capacity: "30 cartuchos",
  },
  {
    id: 3,
    name: "Espingarda Calibre 12",
    image: "/placeholder.svg?height=200&width=300&text=Espingarda+12",
    authorizedRanks: ["Cabo", "Sargento", "Subtenente", "Tenente"],
    weaponClass: "Classe B - Suporte",
    description: "Espingarda para controle de distúrbios e operações especiais",
    requiredCourses: ["Curso de Tiro Básico", "Curso de Controle de Distúrbios"],
    authorizedUnits: ["GTM", "GOT", "Patrulhamento Geral"],
    caliber: "12 GA",
    capacity: "8 cartuchos",
  },
]

export default function ArmamentosPage() {
  const [weapons, setWeapons] = useState<Weapon[]>(initialWeapons)
  const [isEditing, setIsEditing] = useState(false)
  const [editingWeapon, setEditingWeapon] = useState<Weapon | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    authorizedRanks: [] as string[],
    weaponClass: "",
    description: "",
    requiredCourses: [] as string[],
    authorizedUnits: [] as string[],
    caliber: "",
    capacity: "",
  })

  const availableRanks = [
    "Aluno",
    "Soldado 2º Classe",
    "Soldado 1º Classe",
    "Cabo",
    "3º Sargento",
    "2º Sargento",
    "1º Sargento",
    "Sub Tenente",
    "2º Tenente",
    "1º Tenente",
    "Capitão",
    "Major",
    "Tenente Coronel",
    "Coronel",
    "Comissário",
    "GTM Operador",
    "GTM Líder",
    "Comandante GTM",
  ]

  const availableCourses = [
    "Curso de Tiro Básico",
    "Curso de Manuseio de Armas",
    "Curso Tático Avançado",
    "Curso de Tiro de Precisão",
    "Curso de Abordagem",
    "Curso de Controle de Distúrbios",
    "Curso de Armamento Pesado",
    "Curso de Segurança com Armas",
  ]

  const availableUnits = ["Patrulhamento Geral", "1º BPM", "GTM", "GRA", "SPEED", "GOT", "PERÍCIA", "GIC"]

  const handleEdit = (weapon: Weapon) => {
    setEditingWeapon(weapon)
    setFormData({
      name: weapon.name,
      image: weapon.image,
      authorizedRanks: [...weapon.authorizedRanks],
      weaponClass: weapon.weaponClass,
      description: weapon.description,
      requiredCourses: [...weapon.requiredCourses],
      authorizedUnits: [...weapon.authorizedUnits],
      caliber: weapon.caliber,
      capacity: weapon.capacity,
    })
    setIsEditing(true)
  }

  const handleAdd = () => {
    setEditingWeapon(null)
    setFormData({
      name: "",
      image: "",
      authorizedRanks: [],
      weaponClass: "",
      description: "",
      requiredCourses: [],
      authorizedUnits: [],
      caliber: "",
      capacity: "",
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editingWeapon) {
      setWeapons(weapons.map((weapon) => (weapon.id === editingWeapon.id ? { ...weapon, ...formData } : weapon)))
    } else {
      const newWeapon: Weapon = {
        id: Math.max(...weapons.map((w) => w.id), 0) + 1,
        ...formData,
      }
      setWeapons([...weapons, newWeapon])
    }
    setIsEditing(false)
    setEditingWeapon(null)
  }

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este armamento?")) {
      setWeapons(weapons.filter((weapon) => weapon.id !== id))
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingWeapon(null)
  }

  const handleArrayChange = (
    field: "authorizedRanks" | "requiredCourses" | "authorizedUnits",
    value: string,
    checked: boolean,
  ) => {
    const currentArray = formData[field]
    if (checked) {
      setFormData({ ...formData, [field]: [...currentArray, value] })
    } else {
      setFormData({ ...formData, [field]: currentArray.filter((item) => item !== value) })
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
                <Zap className="h-6 w-6 mr-2 text-yellow-500" />
                Armamentos
              </h1>
              <p className="text-yellow-500">Arsenal disponível e regras de uso</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Armamento
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
              <CardTitle>{editingWeapon ? "Editar Armamento" : "Adicionar Novo Armamento"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome do Armamento</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Digite o nome do armamento"
                  />
                </div>
                <div>
                  <Label htmlFor="weaponClass">Classe da Arma</Label>
                  <Input
                    id="weaponClass"
                    value={formData.weaponClass}
                    onChange={(e) => setFormData({ ...formData, weaponClass: e.target.value })}
                    placeholder="Ex: Classe A - Sidearm"
                  />
                </div>
                <div>
                  <Label htmlFor="caliber">Calibre</Label>
                  <Input
                    id="caliber"
                    value={formData.caliber}
                    onChange={(e) => setFormData({ ...formData, caliber: e.target.value })}
                    placeholder="Ex: .40 S&W"
                  />
                </div>
                <div>
                  <Label htmlFor="capacity">Capacidade</Label>
                  <Input
                    id="capacity"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    placeholder="Ex: 15 cartuchos"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="URL da imagem do armamento"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descreva o uso e características do armamento"
                    rows={3}
                  />
                </div>

                {/* Patentes Autorizadas */}
                <div className="md:col-span-2">
                  <Label>Patentes Autorizadas</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 max-h-32 overflow-y-auto border p-2 rounded">
                    {availableRanks.map((rank) => (
                      <label key={rank} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.authorizedRanks.includes(rank)}
                          onChange={(e) => handleArrayChange("authorizedRanks", rank, e.target.checked)}
                          className="rounded"
                        />
                        <span>{rank}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Cursos Necessários */}
                <div className="md:col-span-2">
                  <Label>Cursos Necessários</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 max-h-32 overflow-y-auto border p-2 rounded">
                    {availableCourses.map((course) => (
                      <label key={course} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.requiredCourses.includes(course)}
                          onChange={(e) => handleArrayChange("requiredCourses", course, e.target.checked)}
                          className="rounded"
                        />
                        <span>{course}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Unidades Autorizadas */}
                <div className="md:col-span-2">
                  <Label>Unidades com Acesso</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {availableUnits.map((unit) => (
                      <label key={unit} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.authorizedUnits.includes(unit)}
                          onChange={(e) => handleArrayChange("authorizedUnits", unit, e.target.checked)}
                          className="rounded"
                        />
                        <span>{unit}</span>
                      </label>
                    ))}
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

        {/* Weapons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {weapons.map((weapon) => (
            <Card key={weapon.id} className="hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={weapon.image || "/placeholder.svg"}
                  alt={weapon.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  {weapon.weaponClass}
                </div>
                <div className="absolute top-2 left-2 bg-black bg-opacity-80 text-yellow-500 px-2 py-1 rounded text-xs font-semibold">
                  {weapon.caliber}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{weapon.name}</CardTitle>
                <p className="text-sm text-gray-600">Capacidade: {weapon.capacity}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{weapon.description}</p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Shield className="h-4 w-4 mr-1 text-yellow-500" />
                      Patentes Autorizadas:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {weapon.authorizedRanks.map((rank) => (
                        <span key={rank} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {rank}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 mr-1 text-green-500" />
                      Cursos Necessários:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {weapon.requiredCourses.map((course) => (
                        <span key={course} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Zap className="h-4 w-4 mr-1 text-purple-500" />
                      Unidades com Acesso:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {weapon.authorizedUnits.map((unit) => (
                        <span key={unit} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                          {unit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(weapon)} className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(weapon.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {weapons.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Zap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum armamento cadastrado</h3>
              <p className="text-gray-600 mb-4">Comece adicionando o arsenal da corporação.</p>
              <Button onClick={handleAdd} className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Armamento
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
