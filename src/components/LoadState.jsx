import styled from 'styled-components'
const State = styled.div`
  padding: 64px 16px; text-align: center;
  button { margin-top: 16px; padding: 8px 16px; border: 0; background: #E66767; color: #FFEBD9; font-weight: 700; }
`
export default function LoadState({ loading, error, retry }) {
  return <State role={error ? 'alert' : 'status'}>
    <p>{loading ? 'Carregando restaurantes…' : error ? 'Não foi possível carregar os restaurantes.' : 'Nenhum restaurante disponível no momento.'}</p>
    {error && <button type="button" onClick={retry}>Tentar novamente</button>}
  </State>
}
