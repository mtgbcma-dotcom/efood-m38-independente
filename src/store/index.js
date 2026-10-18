import { configureStore } from '@reduxjs/toolkit'
import cartReducer, { loadCart, STORAGE_KEY } from './cartSlice'

export function createAppStore() {
  const store = configureStore({
    reducer: { cart: cartReducer },
    preloadedState: { cart: { items: loadCart(), isOpen: false } }
  })
  let previousItems = store.getState().cart.items
  store.subscribe(() => {
    const { items } = store.getState().cart
    if (items === previousItems) return
    previousItems = items
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) } catch {
      // O Redux continua funcionando quando o navegador bloqueia o armazenamento.
    }
  })
  return store
}
