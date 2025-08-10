import { Shield, Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-black text-white border-t-2 border-yellow-500">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-8 w-8 text-yellow-500" />
              <div>
                <div className="font-bold text-lg">Polícia Militar</div>
                <div className="text-sm text-yellow-500">Cidade Alta Paradise</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Servindo e protegendo a comunidade de Cidade Alta Paradise com excelência, disciplina e compromisso com a
              segurança pública.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-yellow-500 mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/institucional/sobre" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/recrutamento" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Recrutamento
                </Link>
              </li>
              <li>
                <Link href="/editais" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Editais
                </Link>
              </li>
              <li>
                <Link href="/manuais" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Manuais
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-yellow-500 mb-4">Contato</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Emergência: 190</li>
              <li>Ouvidoria: (11) 9999-9999</li>
              <li>Email: contato@pmcap.rp</li>
              <li>Endereço: Cidade Alta Paradise</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Polícia Militar de Cidade Alta Paradise. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
