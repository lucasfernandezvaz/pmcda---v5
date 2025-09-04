import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import type { Curso, Edital, Noticia, Evento } from '../lib/supabase'
import { 
  BookOpen, 
  FileText, 
  Newspaper, 
  Calendar, 
  LogOut,
  Users,
  BarChart3,
  Settings
} from 'lucide-react'

export function Dashboard() {
  const { user, signOut } = useAuth()
  const [cursos, setCursos] = useState<Curso[]>([])
  const [editais, setEditais] = useState<Edital[]>([])
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [eventos, setEventos] = useState<Evento[]>([])
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [cursosData, editaisData, noticiasData, eventosData] = await Promise.all([
        supabase.from('cursos').select('*').limit(5),
        supabase.from('editais').select('*').limit(5),
        supabase.from('noticias').select('*').limit(5),
        supabase.from('eventos').select('*').limit(5)
      ])

      setCursos(cursosData.data || [])
      setEditais(editaisData.data || [])
      setNoticias(noticiasData.data || [])
      setEventos(eventosData.data || [])
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">PMCAP</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Olá, {user?.email}</span>
              <button
                onClick={handleSignOut}
                className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'cursos', label: 'Cursos', icon: BookOpen },
              { id: 'editais', label: 'Editais', icon: FileText },
              { id: 'noticias', label: 'Notícias', icon: Newspaper },
              { id: 'eventos', label: 'Eventos', icon: Calendar },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Cursos</p>
                  <p className="text-2xl font-semibold text-gray-900">{cursos.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Editais</p>
                  <p className="text-2xl font-semibold text-gray-900">{editais.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <Newspaper className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Notícias</p>
                  <p className="text-2xl font-semibold text-gray-900">{noticias.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Eventos</p>
                  <p className="text-2xl font-semibold text-gray-900">{eventos.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cursos' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Cursos Disponíveis</h3>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {cursos.map((curso) => (
                  <div key={curso.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-900">{curso.nome}</h4>
                    <p className="text-gray-600 mt-1">{curso.descricao}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <span className="mr-4">Duração: {curso.duracao}</span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {curso.modalidade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'editais' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Editais</h3>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {editais.map((edital) => (
                  <div key={edital.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{edital.titulo}</h4>
                        <p className="text-gray-600 mt-1">{edital.descricao}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <span className="mr-4">Abertura: {new Date(edital.data_abertura).toLocaleDateString()}</span>
                          <span>Fechamento: {new Date(edital.data_fechamento).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        edital.status === 'aberto' ? 'bg-green-100 text-green-800' :
                        edital.status === 'fechado' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {edital.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'noticias' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Notícias</h3>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {noticias.map((noticia) => (
                  <div key={noticia.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-900">{noticia.titulo}</h4>
                    <p className="text-gray-600 mt-1">{noticia.conteudo}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <span className="mr-4">Por: {noticia.autor}</span>
                      <span>{new Date(noticia.data_publicacao).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'eventos' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Eventos</h3>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {eventos.map((evento) => (
                  <div key={evento.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-900">{evento.titulo}</h4>
                    <p className="text-gray-600 mt-1">{evento.descricao}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <span className="mr-4">Data: {new Date(evento.data_evento).toLocaleDateString()}</span>
                      <span>Local: {evento.local}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}