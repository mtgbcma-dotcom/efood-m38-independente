import Footer from '../../components/Footer'
import Header from '../../components/Header'
import RestaurantCard from '../../components/RestaurantCard'
import { useRestaurants } from '../../context/RestaurantsContext'
import LoadState from '../../components/LoadState'
import { Main, Grid } from './styles'

const Home = () => {
  const { restaurants, loading, error, retry } = useRestaurants()
  return (
  <>
    <Header />
    <Main>
      {(loading || error || !restaurants.length) ? <LoadState loading={loading} error={error} retry={retry} /> : <Grid className="container">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </Grid>}
    </Main>
    <Footer />
  </>
)
}

export default Home
