import { useEffect, useRef } from 'react'

import { Link } from 'react-router-dom'

import { useCart } from '../../hooks/useCart'

import trashIcon from '../../assets/trash.png'

import {

  Overlay,

  Drawer,

  Empty,

  Items,

  Item,

  ItemImage,

  ItemInfo,

  ItemName,

  ItemPrice,

  RemoveButton,

  Summary,

  TotalRow,

  ContinueButton

} from './styles'



const formatPrice = (value) =>

  new Intl.NumberFormat('pt-BR', {

    style: 'currency',

    currency: 'BRL'

  }).format(value)



const Cart = ({ standalone = false }) => {

  const drawer = useRef(null)

  const { items, total, isOpen, closeCart, removeItem } = useCart()



  useEffect(() => {

    if (!isOpen || standalone) return undefined

    const previous = document.activeElement

    drawer.current.querySelector('button').focus()

    document.body.classList.add('cart-open')

    const onKeyDown = (event) => {

      if (event.key === 'Escape') closeCart()

      if (event.key === 'Tab') {

        const controls = drawer.current.querySelectorAll('button, a[href]')

        const first = controls[0], last = controls[controls.length - 1]

        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }

        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }

      }

    }

    window.addEventListener('keydown', onKeyDown)



    return () => {

      document.body.classList.remove('cart-open')

      previous?.focus()

      window.removeEventListener('keydown', onKeyDown)

    }

  }, [isOpen, closeCart, standalone])



  if (!isOpen && !standalone) return null



  const content = (

      <Drawer ref={drawer} $standalone={standalone} role={standalone ? 'region' : 'dialog'} aria-modal={standalone ? undefined : true} aria-label="Carrinho de compras">

        {!standalone && <button type="button" aria-label="Fechar carrinho" onClick={closeCart} style={{display: 'block', marginLeft: 'auto', marginBottom: 16, border: 0, background: 'transparent', color: '#fff', fontSize: 24}}>×</button>}

        {items.length === 0 ? (

          <Empty>O carrinho está vazio.</Empty>

        ) : (

          <>

            <Items>

              {items.map((item) => (

                <Item key={item.cartItemId}>

                  <ItemImage src={item.imagem} alt={item.nome} />

                  <ItemInfo>

                    <ItemName>{item.nome}</ItemName>

                    <ItemPrice>{formatPrice(item.preco)}</ItemPrice>

                  </ItemInfo>

                  <RemoveButton

                    type="button"

                    aria-label={`Remover ${item.nome}`}

                    onClick={() => removeItem(item.cartItemId)}

                  >

                    <img src={trashIcon} alt="" />

                  </RemoveButton>

                </Item>

              ))}

            </Items>

            <Summary>

              <TotalRow>

                <strong>Valor total</strong>

                <strong>{formatPrice(total)}</strong>

              </TotalRow>

              <ContinueButton as={Link} to="/checkout" onClick={closeCart}>

                Continuar com a entrega

              </ContinueButton>

            </Summary>

          </>

        )}

        {!standalone && <Link to="/carrinho" onClick={closeCart} style={{display: 'block', marginTop: 16, color: '#FFEBD9', textAlign: 'center'}}>Ver página do carrinho</Link>}

      </Drawer>

  )

  return standalone ? content : <Overlay onMouseDown={event => event.target === event.currentTarget && closeCart()}>{content}</Overlay>

}



export default Cart