import logo from '../../assets/logo.png'
import {
  FooterArea,
  FooterContent,
  LogoLink,
  Logo,
  Socials,
  SocialLink,
  Disclaimer
} from './styles'

const Footer = () => (
  <FooterArea>
    <FooterContent className="container">
      <LogoLink to="/" aria-label="efood — página inicial">
        <Logo src={logo} alt="efood" width="125" height="58" />
      </LogoLink>

      <Socials aria-label="Redes sociais">
        <SocialLink href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </SocialLink>
        <SocialLink href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
            <path d="M14 22v-9h3l.5-4H14V6.5c0-1.1.3-1.8 1.9-1.8H18V1.1C17.6 1 16.4 1 15 1c-3 0-5 1.8-5 5V9H7v4h3v9h4Z" />
          </svg>
        </SocialLink>
        <SocialLink href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793 3.286 3.286 0 0 0-5.595 2.994A9.325 9.325 0 0 1 1.114 2.6a3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.57v.041a3.283 3.283 0 0 0 2.633 3.218 3.203 3.203 0 0 1-.865.115c-.211 0-.417-.02-.616-.057a3.283 3.283 0 0 0 3.067 2.28A6.588 6.588 0 0 1 .78 13.58c-.26 0-.52-.015-.78-.046A9.344 9.344 0 0 0 5.026 15Z" />
          </svg>
        </SocialLink>
      </Socials>

      <Disclaimer>
        A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela entrega, qualidade dos produtos é toda do estabelecimento contratado.
      </Disclaimer>
    </FooterContent>
  </FooterArea>
)

export default Footer
