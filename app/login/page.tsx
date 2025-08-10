"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

// Dados dos usuários (em produção, isso viria de uma API/banco de dados)
const users = [
  {
    id: 1,
    username: "comandante.silva",
    name: "Coronel Silva",
    rank: "Coronel",
    permissions: ["administrador", "coronel", "cursos", "recrutamento", "editais"],
    password: "admin123",
  },
  {
    id: 2,
    username: "cap.santos",
    name: "Capitão Santos",
    rank: "Capitão",
    permissions: ["administrador", "cursos", "recrutamento"],
    password: "cap123",
  },
  {
    id: 3,
    username: "sgt.oliveira",
    name: "Sargento Oliveira",
    rank: "Sargento",
    permissions: ["cursos"],
    password: "sgt123",
  },
  {
    id: 4,
    username: "cb.costa",
    name: "Cabo Costa",
    rank: "Cabo",
    permissions: ["recrutamento"],
    password: "cb123",
  },
  {
    id: 5,
    username: "sd.ferreira",
    name: "Soldado Ferreira",
    rank: "Soldado",
    permissions: ["policial"],
    password: "sd123",
  },
]

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simular delay de autenticação
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Buscar usuário
      const user = users.find((u) => u.username === username && u.password === password)

      if (user) {
        // Armazenar dados do usuário no localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: user.id,
              username: user.username,
              name: user.name,
              rank: user.rank,
              permissions: user.permissions,
            }),
          )
        }

        // Redirecionar para o painel
        router.push("/painel")
      } else {
        setError("Usuário ou senha incorretos")
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-blue-900 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Acesso ao Sistema</CardTitle>
          <p className="text-gray-600">Portal Administrativo PMCAP</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}

            <Button type="submit" className="w-full bg-yellow-500 text-black hover:bg-yellow-600" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-sm mb-2">👥 Usuários de Teste:</h3>
            <div className="text-xs space-y-1 text-gray-600">
              <div className="flex justify-between">
                <strong>Coronel:</strong>
                <span>comandante.silva / admin123</span>
              </div>
              <div className="flex justify-between">
                <strong>Capitão:</strong>
                <span>cap.santos / cap123</span>
              </div>
              <div className="flex justify-between">
                <strong>Sargento:</strong>
                <span>sgt.oliveira / sgt123</span>
              </div>
              <div className="flex justify-between">
                <strong>Cabo:</strong>
                <span>cb.costa / cb123</span>
              </div>
              <div className="flex justify-between">
                <strong>Soldado:</strong>
                <span>sd.ferreira / sd123</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
