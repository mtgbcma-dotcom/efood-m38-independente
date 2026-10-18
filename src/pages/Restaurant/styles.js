import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { colors } from '../../styles'

export const ProfileHeader = styled.header`
  height: 163px;
  background-color: ${colors.peach};
  background-image: url('${({ $pattern }) => $pattern}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;

  @media (max-width: 680px) {
    height: auto;
    min-height: 170px;
  }
`

export const HeaderContent = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 20px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 12px;
    padding: 18px 0;
  }
`

export const Back = styled(Link)`
  color: ${colors.salmon};
  text-decoration: none;
  font-size: 18px;
  line-height: 21px;
  font-weight: 900;
`

export const Logo = styled.img`
  width: 125px;
  height: auto;
`

export const CartButton = styled.button`
  justify-self: end;
  max-width: 100%;
  border: 0;
  background: transparent;
  color: ${colors.salmon};
  font-size: 18px;
  line-height: 21px;
  font-weight: 900;
  white-space: nowrap;

  @media (max-width: 680px) {
    justify-self: center;
    white-space: normal;
  }
`

export const Hero = styled.section`
  position: relative;
  isolation: isolate;
  height: 280px;
  overflow: hidden;
  background-image: ${({ $image }) => ($image ? `url('${$image}')` : 'none')};
  background-size: cover;
  background-position: center;
`

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.42);
  pointer-events: none;
`

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 24px;
  padding-bottom: 32px;
  color: ${colors.white};
`

export const Category = styled.p`
  color: ${colors.white};
  font-size: 32px;
  line-height: 38px;
  font-weight: 100;

  @media (max-width: 600px) {
    font-size: 26px;
    line-height: 32px;
  }
`

export const RestaurantName = styled.h1`
  color: ${colors.white};
  max-width: 100%;
  font-size: 32px;
  line-height: 38px;
  font-weight: 900;
  overflow-wrap: anywhere;

  @media (max-width: 600px) {
    font-size: 26px;
    line-height: 32px;
  }
`

export const Main = styled.main`
  padding-top: 56px;

  @media (max-width: 600px) {
    padding-top: 40px;
  }
`

export const MenuGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;

  @media (max-width: 880px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 580px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }
`
