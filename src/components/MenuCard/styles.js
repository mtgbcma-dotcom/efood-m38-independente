import styled from 'styled-components'
import { colors } from '../../styles'

export const Card = styled.article`
  min-height: 338px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  background: ${colors.salmon};
  color: ${colors.white};
`

export const Image = styled.img`
  width: 100%;
  height: 167px;
  object-fit: cover;
`

export const Title = styled.h2`
  margin-top: 8px;
  font-size: 16px;
  line-height: 19px;
  font-weight: 900;
`

export const Description = styled.p`
  margin-top: 8px;
  font-size: 14px;
  line-height: 22px;
`

export const AddButton = styled.button`
  width: 100%;
  min-height: 24px;
  margin-top: auto;
  border: 0;
  background: ${colors.peach};
  color: ${colors.salmon};
  font-size: 14px;
  line-height: 16px;
  font-weight: 700;
`
