import { createSlice, nanoid } from '@reduxjs/toolkit'

export const STORAGE_KEY = 'efood-m38-cart'

export function loadCart() {
  try {
    const data = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(data) ? data.filter(item =>
      item && typeof item.cartItemId === 'string' && typeof item.nome === 'string' &&
      typeof item.preco === 'number' && Number.isFinite(item.preco) && item.preco >= 0
    ) : []
  } catch { return [] }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], isOpen: false },
  reducers: {
    addItem: {
      prepare: product => ({ payload: { ...product, cartItemId: nanoid() } }),
      reducer(state, action) {
        state.items.push(action.payload)
        state.isOpen = true
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter(item => item.cartItemId !== action.payload)
    },
    clearCart(state) { state.items = [] },
    openCart(state) { state.isOpen = true },
    closeCart(state) { state.isOpen = false }
  }
})

export const { addItem, removeItem, openCart, closeCart, clearCart } = cartSlice.actions
export const selectCart = state => state.cart
// Soma em centavos para evitar erros de ponto flutuante nos valores monetários.
export const selectTotal = state => state.cart.items.reduce((sum, item) => sum + Math.round(item.preco * 100), 0) / 100
export default cartSlice.reducer
