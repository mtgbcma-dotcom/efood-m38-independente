import { useEffect, useRef, useState } from 'react'
import { useCart } from '../../hooks/useCart'
import Checkout from '../../pages/Checkout'
import trashIcon from '../../assets/trash.png'
import {
  Overlay, Drawer, Empty, Items, Item, ItemImage, ItemInfo, ItemName,
  ItemPrice, RemoveButton, Summary, TotalRow, ContinueButton, CloseButton
} from './styles'

const formatPrice = value => new Intl.NumberFormat('pt-BR', {
  style: 'currency', currency: 'BRL'
}).format(value)

function CartDialog() {
  const drawer = useRef(null)
  const busy = useRef(false)
  const [step, setStep] = useState('cart')
  const { items, total, closeCart, removeItem } = useCart()
  const close = () => { if (!busy.current) closeCart() }

  useEffect(() => {
    const previous = document.activeElement
    drawer.current.querySelector('button').focus()
    document.body.classList.add('cart-open')
    const onKeyDown = event => {
      if (event.key === 'Escape' && !busy.current) closeCart()
      if (event.key === 'Tab') {
        const controls = [...drawer.current.querySelectorAll('button, input, a[href]')]
          .filter(control => !control.disabled && !control.closest('fieldset[disabled]'))
        const first = controls[0], last = controls[controls.length - 1]
        if (!first) { event.preventDefault(); return }
        if (event.shiftKey && (document.activeElement === first || !controls.includes(document.activeElement))) {
          event.preventDefault(); last.focus()
        } else if (!event.shiftKey && (document.activeElement === last || !controls.includes(document.activeElement))) {
          event.preventDefault(); first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('cart-open')
      window.removeEventListener('keydown', onKeyDown)
      if (previous?.isConnected) previous.focus()
    }
  }, [closeCart])

  return <Overlay onMouseDown={event => event.target === event.currentTarget && close()}>
    <Drawer ref={drawer} role="dialog" aria-modal="true" aria-label="Carrinho e finalização do pedido">
      <CloseButton type="button" aria-label="Fechar carrinho" onClick={close}>×</CloseButton>
      {step === 'cart' ? <>
        <h2 className="sr-only">Carrinho de compras</h2>
        {!items.length ? <Empty>O carrinho está vazio.</Empty> : <>
          <Items>{items.map(item => <Item key={item.cartItemId}>
            <ItemImage src={item.imagem} alt={item.nome} />
            <ItemInfo><ItemName>{item.nome}</ItemName><ItemPrice>{formatPrice(item.preco)}</ItemPrice></ItemInfo>
            <RemoveButton type="button" aria-label={`Remover ${item.nome}`} onClick={() => removeItem(item.cartItemId)}>
              <img src={trashIcon} alt="" />
            </RemoveButton>
          </Item>)}</Items>
          <Summary>
            <TotalRow><strong>Valor total</strong><strong>{formatPrice(total)}</strong></TotalRow>
            <ContinueButton type="button" onClick={() => setStep('checkout')}>Continuar com a entrega</ContinueButton>
          </Summary>
        </>}
      </> : <Checkout onBack={() => setStep('cart')} onFinish={closeCart} onBusyChange={value => { busy.current = value }} />}
    </Drawer>
  </Overlay>
}

export default function Cart() {
  const { isOpen } = useCart()
  return isOpen ? <CartDialog /> : null
}
