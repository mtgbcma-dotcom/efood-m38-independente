import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { colors } from '../../styles'

export const FooterArea = styled.footer`
  width: 100%;
  margin-top: 120px;
  background: ${colors.peach};

  @media (max-width: 600px) {
    margin-top: 72px;
  }
`

export const FooterContent = styled.div`
  min-height: 298px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
`

export const LogoLink = styled(Link)`
  display: block;
  flex-shrink: 0;
`

export const Logo = styled.img`
  width: 125px;
  height: 58px;
  object-fit: cover;
`

export const Socials = styled.nav`
  display: flex;
  gap: 8px;
  margin-top: 32px;
`

export const SocialLink = styled.a`
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: ${colors.salmon};
  color: ${colors.peach};
  text-decoration: none;

  &:hover {
    filter: brightness(0.9);
  }
`

export const Disclaimer = styled.p`
  width: 100%;
  max-width: 480px;
  margin-top: auto;
  padding-top: 32px;
  color: ${colors.salmon};
  font-size: 10px;
  line-height: 12px;
  font-weight: 400;
  text-align: center;
`
