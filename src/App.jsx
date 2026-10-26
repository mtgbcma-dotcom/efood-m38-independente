import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './components/Cart'
import { useCart } from './hooks/useCart'
import Restaurant from './pages/Restaurant'

function LegacyCart() {
  const { openCart } = useCart()
  useEffect(() => { openCart() }, [openCart])
  return <Navigate to="/" replace />
}

const App = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <><Routes>
      <Route path="/" element={<Home />} />
      <Route path="/carrinho" element={<LegacyCart />} />
      <Route path="/checkout" element={<LegacyCart />} />
      <Route path="/restaurante/:id" element={<Restaurant />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes><Cart /></>
  )
}

export default App
