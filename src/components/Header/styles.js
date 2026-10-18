import styled from 'styled-components'
import { colors } from '../../styles'

export const HeaderArea = styled.header`
  height: 360px;
  background-color: ${colors.peach};
  background-image: url('${({ $pattern }) => $pattern}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
`

export const HeaderContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 43px;
`

export const Logo = styled.img`
  width: 125px;
  height: auto;
`

export const Title = styled.h1`
  margin-top: auto;
  width: 100%;
  color: ${colors.salmon};
  text-align: center;
  font-size: 36px;
  line-height: 42px;
  font-weight: 900;

  @media (max-width: 600px) {
    font-size: 28px;
    line-height: 34px;
  }
`
