import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Cart from '../components/Cart'
import Footer from '../components/Footer'
import logo from '../assets/logo.png'
import pattern from '../assets/profile-pattern.png'

const Header = styled.header`
  padding: 40px 16px; background: url(${pattern}) center;
  img { width: 125px; margin: auto; }
`
const Main = styled.main`
  padding-block: 48px 80px; min-height: 55vh;
  h1 { margin: 24px 0; font-size: 28px; }
`

export default function CartPage() {
  return <>
    <Header><Link to="/" aria-label="efood — página inicial"><img src={logo} alt="efood" /></Link></Header>
    <Main className="container">
      <Link to="/">Voltar aos restaurantes</Link>
      <h1>Carrinho de compras</h1>
      <Cart standalone />
    </Main>
    <Footer />
  </>
}
