import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { colors } from '../styles'
import { AddButton } from './MenuCard/styles'

const Overlay = styled.div`
  position: fixed; inset: 0; z-index: 100; background: rgba(0,0,0,.8);
  display: flex; align-items: center; justify-content: center; padding: 24px 16px;
`
const Panel = styled.section`
  position: relative; width: 1024px; max-width: 100%; max-height: 90dvh; overflow-y: auto;
  padding: 32px; display: flex; gap: 24px; background: ${colors.salmon}; color: ${colors.white};
  > img { width: 280px; height: 280px; object-fit: cover; flex-shrink: 0; }
  h2 { font-size: 18px; line-height: 21px; margin-bottom: 16px; }
  p { font-size: 14px; line-height: 22px; margin-bottom: 16px; }
  ${AddButton} { width: auto; padding: 4px 8px; }
  @media(max-width: 680px) { flex-direction: column; padding: 32px 24px 24px;
    > img { width: 100%; height: 220px; } }
`
const Close = styled.button`
  position: absolute; right: 8px; top: 4px; font-size: 28px; line-height: 24px;
  border: 0; background: transparent; color: white; padding: 2px 4px;
`
const formatPrice = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

export default function ProductModal({ item, onClose, onAdd }) {
  const panel = useRef(null)
  useEffect(() => {
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel.current.querySelector('button').focus()
    const onKeyDown = event => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') {
        const buttons = panel.current.querySelectorAll('button')
        const first = buttons[0], last = buttons[buttons.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKeyDown)
      previous?.focus()
    }
  }, [onClose])
  return <Overlay onMouseDown={event => event.target === event.currentTarget && onClose()}>
    <Panel ref={panel} role="dialog" aria-modal="true" aria-labelledby="product-title" aria-describedby="product-description">
      <Close type="button" aria-label="Fechar detalhes do produto" onClick={onClose}>×</Close>
      <img src={item.imagem} alt={item.nome} />
      <div><h2 id="product-title">{item.nome}</h2>
        <p id="product-description">{item.descricao}</p><p>Serve: {item.porcao}</p>
        <AddButton type="button" onClick={() => onAdd(item)}>Adicionar ao carrinho — {formatPrice(item.preco)}</AddButton>
      </div>
    </Panel>
  </Overlay>
}
