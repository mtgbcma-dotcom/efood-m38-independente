import styled from 'styled-components'
import { colors } from '../../styles'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: ${colors.overlay};
`

export const Drawer = styled.aside`
  position: absolute;
  top: 0;
  right: 0;
  width: min(360px, 100%);
  height: 100dvh;
  padding: 32px 8px;
  overflow-y: auto;
  background: ${colors.salmon};
`

export const Empty = styled.p`
  margin: 32px 16px;
  color: ${colors.white};
  text-align: center;
  font-size: 16px;
  font-weight: 700;
`

export const CloseButton = styled.button`
  position: absolute;
  top: 2px;
  right: 8px;
  border: 0;
  background: transparent;
  color: ${colors.peach};
  font-size: 24px;
  line-height: 24px;
`

export const Items = styled.div`
  display: grid;
  gap: 12px;
`

export const Item = styled.article`
  position: relative;
  min-height: 100px;
  display: grid;
  grid-template-columns: 80px 1fr 24px;
  gap: 8px;
  padding: 8px;
  background: ${colors.peach};
  color: ${colors.salmon};
`

export const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`

export const ItemInfo = styled.div`
  min-width: 0;
`

export const ItemName = styled.h3`
  font-size: 18px;
  line-height: 21px;
  font-weight: 900;
`

export const ItemPrice = styled.p`
  margin-top: 14px;
  font-size: 14px;
  line-height: 16px;
`

export const RemoveButton = styled.button`
  align-self: end;
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;

  img {
    width: 16px;
    height: 16px;
  }
`

export const Summary = styled.div`
  margin-top: 32px;
  color: ${colors.white};
`

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  font-size: 14px;
  line-height: 16px;
`

export const ContinueButton = styled.button`
  display: block;
  text-align: center;
  text-decoration: none;
  width: 100%;
  min-height: 24px;
  margin-top: 16px;
  border: 0;
  background: ${colors.peach};
  color: ${colors.salmon};
  font-size: 14px;
  line-height: 16px;
  font-weight: 700;
`
