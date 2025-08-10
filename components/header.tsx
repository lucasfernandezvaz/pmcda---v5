"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

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

  const institutionalItems = [
    { name: "Sobre", href: "/institucional/sobre" },
    { name: "Eventos", href: "/institucional/eventos" },
    { name: "Notícias", href: "/institucional/noticias" },
    { name: "Hierarquia Militar", href: "/institucional/hierarquia" },
  ]

  const unitsItems = [
    { name: "GTM", href: "/unidades/gtm" },
    { name: "GRA", href: "/unidades/gra" },
    { name: "SPEED", href: "/unidades/speed" },
    { name: "GOT", href: "/unidades/got" },
    { name: "PERÍCIA", href: "/unidades/pericia" },
    { name: "GIC", href: "/unidades/gic" },
  ]

  return (
    <header className="bg-black border-b-2 border-yellow-500 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-yellow-500" />
            <div className="text-white">
              <div className="font-bold text-lg">PMCAP</div>
              <div className="text-xs text-yellow-500">Cidade Alta Paradise</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white hover:text-yellow-500 transition-colors">
              Início
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-white hover:text-yellow-500 transition-colors">
                Institucional <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-yellow-500">
                {institutionalItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link href={item.href} className="text-white hover:text-yellow-500">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-white hover:text-yellow-500 transition-colors">
                Unidades <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-yellow-500">
                {unitsItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link href={item.href} className="text-white hover:text-yellow-500">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/blitz" className="text-white hover:text-yellow-500 transition-colors">
              Blitz
            </Link>
            <Link href="/recrutamento" className="text-white hover:text-yellow-500 transition-colors">
              Recrutamento
            </Link>

            <Button
              asChild
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black bg-transparent"
            >
              <Link href={user ? "/painel" : "/login"}>{user ? "Painel" : "Login"}</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-yellow-500">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-white hover:text-yellow-500 py-2">
                Início
              </Link>
              <div className="text-yellow-500 font-semibold py-2">Institucional</div>
              {institutionalItems.map((item) => (
                <Link key={item.name} href={item.href} className="text-white hover:text-yellow-500 py-1 pl-4">
                  {item.name}
                </Link>
              ))}
              <div className="text-yellow-500 font-semibold py-2">Unidades</div>
              {unitsItems.map((item) => (
                <Link key={item.name} href={item.href} className="text-white hover:text-yellow-500 py-1 pl-4">
                  {item.name}
                </Link>
              ))}
              <Link href="/blitz" className="text-white hover:text-yellow-500 py-2">
                Blitz
              </Link>
              <Link href="/recrutamento" className="text-white hover:text-yellow-500 py-2">
                Recrutamento
              </Link>
              <Button
                asChild
                variant="outline"
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black mt-4 bg-transparent"
              >
                <Link href={user ? "/painel" : "/login"}>{user ? "Painel" : "Login"}</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
