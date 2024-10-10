import React, { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import { getFurniture, deleteFurniture } from '../db/localDatabase'

interface Furniture {
  id: number
  name: string
  quantity: number
  model: string
  imageUrl: string
}

interface FurnitureListProps {
  updateFurnitureCount: () => void;
}

const FurnitureList: React.FC<FurnitureListProps> = ({ updateFurnitureCount }) => {
  const [furniture, setFurniture] = useState<Furniture[]>([])

  useEffect(() => {
    loadFurniture()
  }, [])

  const loadFurniture = () => {
    const loadedFurniture = getFurniture()
    setFurniture(loadedFurniture)
    updateFurnitureCount()
  }

  const handleDelete = (id: number) => {
    deleteFurniture(id)
    loadFurniture()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Móveis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {furniture.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow">
            <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover mb-4 rounded" />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p>Quantidade: {item.quantity}</p>
            <p>Modelo: {item.model}</p>
            <button
              onClick={() => handleDelete(item.id)}
              className="mt-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
            >
              <Trash2 size={18} className="inline-block mr-1" />
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FurnitureList