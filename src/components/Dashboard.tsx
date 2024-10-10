import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import FurnitureList from './FurnitureList'
import FurnitureForm from './FurnitureForm'
import LogoSettings from './LogoSettings'
import { Home, List, PlusCircle, Settings, LogOut, FileText } from 'lucide-react'
import { getFurniture, getLogo } from '../db/localDatabase'

const Dashboard: React.FC = () => {
  const { user, logout } = useUser()
  const navigate = useNavigate()
  const [logo, setLogo] = useState<string | null>(null)
  const [furnitureCount, setFurnitureCount] = useState(0)

  useEffect(() => {
    const storedLogo = getLogo()
    setLogo(storedLogo)
    updateFurnitureCount()
  }, [])

  const updateLogo = (newLogo: string | null) => {
    setLogo(newLogo)
  }

  const updateFurnitureCount = () => {
    const furniture = getFurniture()
    setFurnitureCount(furniture.length)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-indigo-700 text-white p-6">
        <div className="mb-8">
          {logo ? (
            <img src={logo} alt="Logo" className="w-32 h-32 mx-auto" />
          ) : (
            <h1 className="text-2xl font-bold">Amorosa Decorações</h1>
          )}
        </div>
        <nav>
          <Link to="/dashboard" className="block py-2 px-4 text-sm hover:bg-indigo-600 rounded transition duration-200">
            <Home className="inline-block mr-2" size={18} />
            Dashboard
          </Link>
          <Link to="/dashboard/furniture" className="block py-2 px-4 text-sm hover:bg-indigo-600 rounded transition duration-200">
            <List className="inline-block mr-2" size={18} />
            Lista de Móveis
          </Link>
          <Link to="/dashboard/add-furniture" className="block py-2 px-4 text-sm hover:bg-indigo-600 rounded transition duration-200">
            <PlusCircle className="inline-block mr-2" size={18} />
            Adicionar Móvel
          </Link>
          <Link to="/dashboard/logo-settings" className="block py-2 px-4 text-sm hover:bg-indigo-600 rounded transition duration-200">
            <Settings className="inline-block mr-2" size={18} />
            Configurações de Logo
          </Link>
          <Link to="/dashboard/create-budget" className="block py-2 px-4 text-sm hover:bg-indigo-600 rounded transition duration-200">
            <FileText className="inline-block mr-2" size={18} />
            Criar Orçamento
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="absolute bottom-4 left-4 flex items-center text-sm text-white hover:text-gray-300 transition duration-200"
        >
          <LogOut className="mr-2" size={18} />
          Logout
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={<h2 className="text-2xl font-bold mb-4">Bem-vindo, {user?.username}! Total de móveis: {furnitureCount}</h2>} />
          <Route path="/furniture" element={<FurnitureList updateFurnitureCount={updateFurnitureCount} />} />
          <Route path="/add-furniture" element={<FurnitureForm updateFurnitureCount={updateFurnitureCount} />} />
          <Route path="/logo-settings" element={<LogoSettings updateLogo={updateLogo} />} />
          <Route path="/create-budget" element={<h2 className="text-2xl font-bold mb-4">Criar Orçamento (Em desenvolvimento)</h2>} />
        </Routes>
      </main>
    </div>
  )
}

export default Dashboard