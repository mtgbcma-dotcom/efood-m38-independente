import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { colors } from '../../styles'

export const Card = styled.article`
  width: 100%;
  min-height: 398px;
  overflow: hidden;
  border: 1px solid ${colors.salmon};
  background: ${colors.white};
  color: ${colors.salmon};
`

export const ImageArea = styled.div`
  position: relative;
  height: 217px;
  overflow: hidden;
  background: #ddd;
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`

export const Tags = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;
`

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 6px 8px;
  background: ${colors.salmon};
  color: ${colors.white};
  font-size: 12px;
  line-height: 14px;
  font-weight: 700;
  white-space: nowrap;
`

export const Content = styled.div`
  min-height: 181px;
  display: flex;
  flex-direction: column;
  padding: 8px;
`

export const TopLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

export const Name = styled.h2`
  font-size: 18px;
  line-height: 21px;
  font-weight: 700;
`

export const Rating = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  line-height: 21px;
  font-weight: 700;
  white-space: nowrap;
`

export const StarIcon = styled.svg`
  width: 21px;
  height: 21px;
  flex: 0 0 21px;
  fill: ${colors.gold};
`

export const Description = styled.p`
  margin-top: 16px;
  color: ${colors.salmon};
  font-size: 14px;
  line-height: 22px;
`

export const More = styled(Link)`
  width: fit-content;
  margin-top: auto;
  padding: 6px 8px;
  background: ${colors.salmon};
  color: ${colors.white};
  text-decoration: none;
  font-size: 14px;
  line-height: 16px;
  font-weight: 700;
`
