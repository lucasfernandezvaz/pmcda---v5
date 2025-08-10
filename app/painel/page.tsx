"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Users, BookOpen, FileText, Settings, LogOut, Calendar, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface User {
  id: number
  username: string
  name: string
  rank: string
  permissions: string[]
}

export default function PainelPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      if (userData) {
        try {
          setUser(JSON.parse(userData))
        } catch (error) {
          console.error("Erro ao carregar dados do usuário:", error)
          router.push("/login")
        }
      } else {
        router.push("/login")
      }
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
    router.push("/")
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

  if (!user) {
    return null
  }

  const hasPermission = (permission: string) => {
    return (
      user.permissions.includes(permission) ||
      user.permissions.includes("administrador") ||
      user.permissions.includes("coronel")
    )
  }

  const adminModules = [
    {
      title: "Cursos",
      description: "Gerenciar cursos e treinamentos",
      icon: BookOpen,
      href: "/painel/cursos",
      permission: "cursos",
      color: "bg-blue-500",
    },
    {
      title: "Recrutamento",
      description: "Gerenciar processo de recrutamento",
      icon: Users,
      href: "/painel/recrutamento",
      permission: "recrutamento",
      color: "bg-green-500",
    },
    {
      title: "1º BPM",
      description: "Manuais, fardamentos, viaturas e armamentos",
      icon: Shield,
      href: "/painel/bpm",
      permission: "administrador",
      color: "bg-red-500",
    },
    {
      title: "Editais",
      description: "Gerenciar editais e comunicados",
      icon: FileText,
      href: "/painel/editais",
      permission: "editais",
      color: "bg-purple-500",
    },
    {
      title: "Manuais",
      description: "Biblioteca de manuais operacionais",
      icon: BookOpen,
      href: "/painel/manuais",
      permission: "administrador",
      color: "bg-indigo-500",
    },
    {
      title: "Eventos",
      description: "Gerenciar eventos e atividades",
      icon: Calendar,
      href: "/painel/eventos",
      permission: "eventos",
      color: "bg-teal-500",
    },
    {
      title: "Notícias",
      description: "Gerenciar notícias e comunicados",
      icon: FileText,
      href: "/painel/noticias",
      permission: "noticias",
      color: "bg-cyan-500",
    },
    {
      title: "Blitz",
      description: "Gerenciar operações blitz",
      icon: AlertTriangle,
      href: "/painel/blitz",
      permission: "blitz",
      color: "bg-amber-500",
    },
    {
      title: "Changelog",
      description: "Histórico de mudanças e atualizações",
      icon: Settings,
      href: "/utilidades/changelog",
      permission: "administrador",
      color: "bg-orange-500",
    },
  ]

  const availableModules = adminModules.filter((module) => hasPermission(module.permission))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Painel Administrativo</h1>
            <p className="text-yellow-500">
              Bem-vindo, {user.rank} {user.name}
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black bg-transparent"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Dashboard */}
      <div className="container mx-auto px-4 py-8">
        {/* User Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-6 w-6 mr-2 text-yellow-500" />
              Informações do Usuário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nome</p>
                <p className="font-semibold">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Patente</p>
                <p className="font-semibold">{user.rank}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Usuário</p>
                <p className="font-semibold">{user.username}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Permissões</p>
              <div className="flex flex-wrap gap-2">
                {user.permissions.map((permission) => (
                  <span key={permission} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableModules.map((module) => (
            <Card key={module.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center mb-4`}>
                  <module.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                <p className="text-gray-600 mb-4">{module.description}</p>
                <Button asChild className="w-full bg-yellow-500 text-black hover:bg-yellow-600">
                  <Link href={module.href}>Acessar</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Access Message */}
        {availableModules.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Acesso Limitado</h3>
              <p className="text-gray-600">
                Você não possui permissões para acessar módulos administrativos. Entre em contato com seu superior para
                solicitar acesso.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
