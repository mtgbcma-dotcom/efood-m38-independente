import { useCallback, useState } from 'react'
import ProductModal from '../ProductModal'
import { useCart } from '../../hooks/useCart'
import { Card, Image, Title, Description, AddButton } from './styles'

const MenuCard = ({ item }) => {
  const { addItem } = useCart()
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  return (
    <>
    <Card>
      <Image src={item.imagem} alt={item.nome} />
      <Title>{item.nome}</Title>
      <Description>{item.descricao.length > 145 ? item.descricao.slice(0, 142) + '…' : item.descricao}</Description>
      <AddButton type="button" onClick={() => setOpen(true)}>
        Comprar o produto
      </AddButton>
    </Card>
    {open && <ProductModal item={item} onClose={close} onAdd={product => { close(); addItem(product) }} />}
    </>
  )
}

export default MenuCard
