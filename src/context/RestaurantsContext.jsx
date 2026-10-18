import { createContext, useContext, useEffect, useState } from 'react'

export const API_URL = 'https://api-ebac.vercel.app/api/efood/restaurantes'
const RestaurantsContext = createContext(null)

export function normalizeRestaurant(item) {
  return {
    ...item, nome: item.titulo, categoria: item.tipo, imagem: item.capa, hero: item.capa,
    cardapio: item.cardapio.map(product => ({ ...product, imagem: product.foto }))
  }
}

export function RestaurantsProvider({ children }) {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(false)
    async function load() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal })
        if (!response.ok) throw new Error('Erro ao carregar restaurantes')
        const data = await response.json()
        if (!Array.isArray(data)) throw new Error('Resposta inválida')
        const normalized = data.map(normalizeRestaurant)
        if (!controller.signal.aborted) setRestaurants(normalized)
      } catch {
        if (!controller.signal.aborted) setError(true)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    load()
    return () => controller.abort()
  }, [attempt])

  return <RestaurantsContext.Provider value={{ restaurants, loading, error, retry: () => setAttempt(value => value + 1) }}>{children}</RestaurantsContext.Provider>
}

export const useRestaurants = () => useContext(RestaurantsContext)
