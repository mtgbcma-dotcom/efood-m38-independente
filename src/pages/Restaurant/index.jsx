import { Navigate, useParams } from 'react-router-dom'

import Footer from '../../components/Footer'
import MenuCard from '../../components/MenuCard'
import Cart from '../../components/Cart'
import logo from '../../assets/logo.png'
import pattern from '../../assets/profile-pattern.png'
import { useRestaurants } from '../../context/RestaurantsContext'
import LoadState from '../../components/LoadState'
import { useCart } from '../../hooks/useCart'
import {
  ProfileHeader,
  HeaderContent,
  Back,
  Logo,
  CartButton,
  Hero,
  HeroOverlay,
  HeroContent,
  Category,
  RestaurantName,
  Main,
  MenuGrid
} from './styles'

const Restaurant = () => {
  const { id } = useParams()
  const { count, openCart } = useCart()

  const { restaurants, loading, error, retry } = useRestaurants()
  if (loading || error) return <main><LoadState loading={loading} error={error} retry={retry} /></main>
  const restaurant = restaurants.find(item => String(item.id) === id)
  if (!restaurant) return <Navigate to="/" replace />

  return (
    <>
      <ProfileHeader $pattern={pattern}>
        <HeaderContent className="container">
          <Back to="/">Restaurantes</Back>
          <Logo src={logo} alt="efood" />
          <CartButton type="button" onClick={openCart}>
            {count} produto(s) no carrinho
          </CartButton>
        </HeaderContent>
      </ProfileHeader>

      <Hero $image={restaurant.hero} aria-labelledby="restaurant-name">
        <HeroOverlay aria-hidden="true" />
        <HeroContent className="container">
          <Category>{restaurant.categoria}</Category>
          <RestaurantName id="restaurant-name">{restaurant.nome}</RestaurantName>
        </HeroContent>
      </Hero>

      <Main>
        <MenuGrid className="container">
          {restaurant.cardapio.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </MenuGrid>
      </Main>

      <Footer />
      <Cart />
    </>
  )
}

export default Restaurant
