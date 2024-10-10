import React, { useState, useEffect } from 'react'
import { Upload } from 'lucide-react'
import { updateLogo, getLogo } from '../db/localDatabase'

interface LogoSettingsProps {
  updateLogo: (logo: string | null) => void;
}

const LogoSettings: React.FC<LogoSettingsProps> = ({ updateLogo }) => {
  const [logo, setLogo] = useState<string | null>(null)

  useEffect(() => {
    const savedLogo = getLogo()
    if (savedLogo) {
      setLogo(savedLogo)
      updateLogo(savedLogo)
    }
  }, [updateLogo])

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setLogo(result)
        updateLogo(result)
        updateLogo(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (logo) {
      updateLogo(logo)
      alert('Logo atualizado com sucesso!')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Configurações de Logo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {logo && (
          <div className="mb-4">
            <img src={logo} alt="Logo atual" className="w-32 h-32 object-contain" />
          </div>
        )}
        <div>
          <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
            Selecionar novo logo
          </label>
          <input
            type="file"
            id="logo"
            accept="image/*"
            onChange={handleLogoChange}
            className="mt-1 block w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Upload className="mr-2" size={18} />
          Atualizar Logo
        </button>
      </form>
    </div>
  )
}

export default LogoSettings