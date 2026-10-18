import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import CartPage from './pages/Cart'
import Checkout from './pages/Checkout'
import Restaurant from './pages/Restaurant'

const App = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/carrinho" element={<CartPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/restaurante/:id" element={<Restaurant />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
