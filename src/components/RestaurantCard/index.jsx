import {
  Card,
  ImageArea,
  Image,
  Tags,
  Tag,
  Content,
  TopLine,
  Name,
  Rating,
  StarIcon,
  Description,
  More
} from './styles'

const RestaurantCard = ({ restaurant }) => (
  <Card>
    <ImageArea>
      <Image src={restaurant.imagem} alt={restaurant.nome} />
      <Tags>
        {restaurant.destacado && <Tag>Destaque da semana</Tag>}
        <Tag>{restaurant.categoria}</Tag>
      </Tags>
    </ImageArea>

    <Content>
      <TopLine>
        <Name>{restaurant.nome}</Name>
        <Rating>
          {restaurant.avaliacao.toFixed(1)}
          <StarIcon viewBox="0 0 24 24" aria-hidden="true">
            <path d="m12 2.4 2.82 5.72 6.31.92-4.56 4.45 1.08 6.28L12 16.8l-5.65 2.97 1.08-6.28-4.56-4.45 6.31-.92L12 2.4Z" />
          </StarIcon>
        </Rating>
      </TopLine>

      <Description>{restaurant.descricao}</Description>
      <More to={`/restaurante/${restaurant.id}`}>Saiba mais</More>
    </Content>
  </Card>
)

export default RestaurantCard
