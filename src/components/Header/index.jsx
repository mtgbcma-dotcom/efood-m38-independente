import logo from '../../assets/logo.png'
import pattern from '../../assets/home-pattern.png'
import { HeaderArea, HeaderContent, Logo, Title } from './styles'

const Header = () => (
  <HeaderArea $pattern={pattern}>
    <HeaderContent className="container">
      <Logo src={logo} alt="efood" />
      <Title>
        Viva experiências gastronômicas
        <br />
        no conforto da sua casa
      </Title>
    </HeaderContent>
  </HeaderArea>
)

export default Header
