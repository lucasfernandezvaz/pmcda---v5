"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Shield, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

interface User {
  id: number
  username: string
  name: string
  rank: string
  permissions: string[]
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

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
    }
  }, [])

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
    setUser(null)
    router.push("/")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-yellow-500" />
            <span className="text-xl font-bold">PMCAP</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="hover:text-yellow-500 transition-colors">Institucional</button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link href="/institucional/sobre" className="block px-4 py-2 hover:bg-gray-100">
                  Sobre Nós
                </Link>
                <Link href="/institucional/hierarquia" className="block px-4 py-2 hover:bg-gray-100">
                  Hierarquia
                </Link>
                <Link href="/institucional/eventos" className="block px-4 py-2 hover:bg-gray-100">
                  Eventos
                </Link>
                <Link href="/institucional/noticias" className="block px-4 py-2 hover:bg-gray-100">
                  Notícias
                </Link>
              </div>
            </div>

            <div className="relative group">
              <button className="hover:text-yellow-500 transition-colors">Unidades</button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link href="/unidades" className="block px-4 py-2 hover:bg-gray-100">
                  Todas as Unidades
                </Link>
                <Link href="/unidades/gtm" className="block px-4 py-2 hover:bg-gray-100">
                  GTM
                </Link>
                <Link href="/unidades/gra" className="block px-4 py-2 hover:bg-gray-100">
                  GRA
                </Link>
                <Link href="/unidades/speed" className="block px-4 py-2 hover:bg-gray-100">
                  SPEED
                </Link>
                <Link href="/unidades/got" className="block px-4 py-2 hover:bg-gray-100">
                  GOT
                </Link>
                <Link href="/unidades/pericia" className="block px-4 py-2 hover:bg-gray-100">
                  PERÍCIA
                </Link>
                <Link href="/unidades/gic" className="block px-4 py-2 hover:bg-gray-100">
                  GIC
                </Link>
              </div>
            </div>

            <Link href="/recrutamento" className="hover:text-yellow-500 transition-colors">
              Recrutamento
            </Link>
            <Link href="/blitz" className="hover:text-yellow-500 transition-colors">
              Blitz
            </Link>

            {user && (
              <div className="relative group">
                <button className="hover:text-yellow-500 transition-colors">Utilidades</button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/utilidades/changelog" className="block px-4 py-2 hover:bg-gray-100">
                    Changelog
                  </Link>
                  <Link href="/utilidades/perimetros" className="block px-4 py-2 hover:bg-gray-100">
                    Perímetros de Ações
                  </Link>
                  <Link href="/utilidades/relatorios" className="block px-4 py-2 hover:bg-gray-100">
                    Relatório de Alunos
                  </Link>
                </div>
              </div>
            )}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">
                  {user.rank} {user.name}
                </span>
                <Button asChild size="sm" className="bg-yellow-500 text-black hover:bg-yellow-600">
                  <Link href="/painel">Painel</Link>
                </Button>
                <Button
                  onClick={handleLogout}
                  size="sm"
                  variant="outline"
                  className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black bg-transparent"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button asChild size="sm" className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden p-2 rounded-md hover:bg-gray-800 transition-colors">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <div>
                <div className="font-semibold mb-2">Institucional</div>
                <div className="pl-4 space-y-2">
                  <Link href="/institucional/sobre" className="block hover:text-yellow-500">
                    Sobre Nós
                  </Link>
                  <Link href="/institucional/hierarquia" className="block hover:text-yellow-500">
                    Hierarquia
                  </Link>
                  <Link href="/institucional/eventos" className="block hover:text-yellow-500">
                    Eventos
                  </Link>
                  <Link href="/institucional/noticias" className="block hover:text-yellow-500">
                    Notícias
                  </Link>
                </div>
              </div>

              <div>
                <div className="font-semibold mb-2">Unidades</div>
                <div className="pl-4 space-y-2">
                  <Link href="/unidades" className="block hover:text-yellow-500">
                    Todas as Unidades
                  </Link>
                  <Link href="/unidades/gtm" className="block hover:text-yellow-500">
                    GTM
                  </Link>
                  <Link href="/unidades/gra" className="block hover:text-yellow-500">
                    GRA
                  </Link>
                  <Link href="/unidades/speed" className="block hover:text-yellow-500">
                    SPEED
                  </Link>
                  <Link href="/unidades/got" className="block hover:text-yellow-500">
                    GOT
                  </Link>
                  <Link href="/unidades/pericia" className="block hover:text-yellow-500">
                    PERÍCIA
                  </Link>
                  <Link href="/unidades/gic" className="block hover:text-yellow-500">
                    GIC
                  </Link>
                </div>
              </div>

              <Link href="/recrutamento" className="hover:text-yellow-500">
                Recrutamento
              </Link>
              <Link href="/blitz" className="hover:text-yellow-500">
                Blitz
              </Link>

              {user && (
                <div>
                  <div className="font-semibold mb-2">Utilidades</div>
                  <div className="pl-4 space-y-2">
                    <Link href="/utilidades/changelog" className="block hover:text-yellow-500">
                      Changelog
                    </Link>
                    <Link href="/utilidades/perimetros" className="block hover:text-yellow-500">
                      Perímetros de Ações
                    </Link>
                    <Link href="/utilidades/relatorios" className="block hover:text-yellow-500">
                      Relatório de Alunos
                    </Link>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-800">
                {user ? (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-300">
                      {user.rank} {user.name}
                    </div>
                    <div className="flex space-x-2">
                      <Button asChild size="sm" className="bg-yellow-500 text-black hover:bg-yellow-600">
                        <Link href="/painel">Painel</Link>
                      </Button>
                      <Button
                        onClick={handleLogout}
                        size="sm"
                        variant="outline"
                        className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black bg-transparent"
                      >
                        Sair
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button asChild size="sm" className="bg-yellow-500 text-black hover:bg-yellow-600">
                    <Link href="/login">Login</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
