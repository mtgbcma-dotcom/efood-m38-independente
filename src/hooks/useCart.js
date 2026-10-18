import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem, openCart, closeCart, selectCart, selectTotal } from '../store/cartSlice'

export function useCart() {
  const dispatch = useDispatch()
  const { items, isOpen } = useSelector(selectCart)
  const total = useSelector(selectTotal)
  const add = useCallback(product => dispatch(addItem(product)), [dispatch])
  const remove = useCallback(id => dispatch(removeItem(id)), [dispatch])
  const open = useCallback(() => dispatch(openCart()), [dispatch])
  const close = useCallback(() => dispatch(closeCart()), [dispatch])
  return {
    items, isOpen, total, count: items.length,
    addItem: add,
    removeItem: remove,
    openCart: open,
    closeCart: close
  }
}
