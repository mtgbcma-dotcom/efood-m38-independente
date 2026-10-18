import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useCart } from '../hooks/useCart'
import { clearCart } from '../store/cartSlice'
import { createPayload, submitOrder, validateDelivery, validatePayment } from '../services/checkout'
import logo from '../assets/logo.png'
import pattern from '../assets/profile-pattern.png'
import { colors } from '../styles'
import Footer from '../components/Footer'

const Header = styled.header`
  padding: 40px 16px; background: url(${pattern}) center;
  img { width: 125px; margin: auto; }
`
const Main = styled.main`
  min-height: 60vh; padding-block: 40px 64px;
  > p { margin-bottom: 24px; }
`
const Panel = styled.section`
  width: min(100%, 480px); margin: 24px auto 0; padding: 24px 16px;
  color: ${colors.peach}; background: ${colors.salmon};
  h1 { font-size: 18px; line-height: 24px; margin-bottom: 24px; overflow-wrap: anywhere; }
  p { font-size: 14px; line-height: 22px; margin-bottom: 16px; }
  fieldset { border: 0; min-width: 0; }
  label { display: block; font-size: 14px; font-weight: 700; margin-bottom: 8px; }
  input { width: 100%; min-width: 0; height: 36px; border: 2px solid transparent; padding: 6px 8px;
    margin-top: 8px; color: #4B4B4B; background: ${colors.peach}; }
  input:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
  button, a.action { display: block; width: 100%; text-align: center; text-decoration: none;
    border: 0; padding: 8px; margin-top: 8px; background: ${colors.peach};
    color: ${colors.salmon}; font-size: 14px; font-weight: 700; }
  button:disabled { cursor: wait; opacity: .7; }
  [role='alert'] { padding: 8px; border: 1px solid currentColor; margin-block: 16px; }
`
const Row = styled.div`
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px;
`
const price = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
const emptyPayment = { name: '', number: '', code: '', month: '', year: '' }

function Input({ label, name, data, onChange, ...props }) {
  return <label>{label}<input name={name} value={data[name]} onInput={onChange} required {...props} /></label>
}

export default function Checkout() {
  const { items, total } = useCart()
  const dispatch = useDispatch()
  const [step, setStep] = useState('delivery')
  const [delivery, setDelivery] = useState({ receiver: '', description: '', city: '', zipCode: '', number: '', complement: '' })
  const [payment, setPayment] = useState(emptyPayment)
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const pending = useRef(false)
  const heading = useRef(null)
  const errorBox = useRef(null)

  useEffect(() => { heading.current?.focus() }, [step])
  useEffect(() => { if (error) errorBox.current?.focus() }, [error])

  const update = setter => event => {
    const { name, value } = event.target
    setter(current => ({ ...current, [name]: value }))
  }
  const next = event => {
    event.preventDefault()
    const problem = validateDelivery(delivery)
    setError(problem)
    if (!problem) setStep('payment')
  }
  const finish = async event => {
    event.preventDefault()
    if (pending.current) return
    const problem = validateDelivery(delivery) || validatePayment(payment)
    if (problem) { setError(problem); return }
    if (!items.length) { setError('Seu carrinho está vazio. Adicione produtos antes de concluir.'); return }
    pending.current = true
    setSubmitting(true)
    setError('')
    try {
      const response = await submitOrder(createPayload(items, delivery, payment))
      setOrder(response)
      setPayment(emptyPayment)
      setDelivery({ receiver: '', description: '', city: '', zipCode: '', number: '', complement: '' })
      dispatch(clearCart())
      setStep('confirmation')
    } catch (failure) {
      setError(failure instanceof TypeError ? 'Não foi possível conectar à API. Confira sua conexão e tente novamente.' : failure.message)
    } finally {
      pending.current = false
      setSubmitting(false)
    }
  }

  return <>
    <Header><Link to="/" aria-label="efood — página inicial"><img src={logo} alt="efood" /></Link></Header>
    <Main className="container">
      {step !== 'confirmation' && <p>Compra de demonstração acadêmica. Utilize somente dados fictícios.</p>}
      <Panel aria-label="Finalização do pedido">
        <h1 ref={heading} tabIndex={-1}>{step === 'confirmation' ? `Pedido realizado — ${order.orderId}` : step === 'delivery' ? 'Entrega' : `Pagamento — Valor a pagar ${price(total)}`}</h1>
        {step === 'confirmation' ? <>
          <p>Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue no endereço fornecido.</p>
          <p>Gostaríamos de ressaltar que nossos entregadores não estão autorizados a realizar cobranças extras.</p>
          <p>Lembre-se da importância de higienizar as mãos após o recebimento do pedido.</p>
          <p>Esperamos que desfrute de uma deliciosa e agradável experiência gastronômica. Bom apetite!</p>
          <Link className="action" to="/">Concluir</Link>
        </> : !items.length ? <>
          <p>O carrinho está vazio. Adicione produtos antes de continuar.</p><Link className="action" to="/">Voltar aos restaurantes</Link>
        </> : <>
          {error && <p role="alert" tabIndex={-1} ref={errorBox}>{error}</p>}
          {step === 'delivery' ? <form onSubmit={next}>
            <Input label="Quem irá receber" name="receiver" data={delivery} onChange={update(setDelivery)} autoComplete="name" maxLength={100} />
            <Input label="Endereço" name="description" data={delivery} onChange={update(setDelivery)} autoComplete="address-line1" maxLength={160} />
            <Input label="Cidade" name="city" data={delivery} onChange={update(setDelivery)} autoComplete="address-level2" maxLength={100} />
            <Row>
              <Input label="CEP" name="zipCode" data={delivery} onChange={update(setDelivery)} inputMode="numeric" autoComplete="postal-code" maxLength={9} pattern="[0-9]{5}-?[0-9]{3}" />
              <Input label="Número" name="number" data={delivery} onChange={update(setDelivery)} inputMode="numeric" pattern="[0-9]+" maxLength={10} />
            </Row>
            <label>Complemento (opcional)<input name="complement" value={delivery.complement} onInput={update(setDelivery)} maxLength={100} /></label>
            <button type="submit">Continuar com o pagamento</button>
            <Link className="action" to="/carrinho">Voltar para o carrinho</Link>
          </form> : <form onSubmit={finish} aria-busy={submitting}>
            <fieldset disabled={submitting}>
              <Input label="Nome no cartão" name="name" data={payment} onChange={update(setPayment)} autoComplete="off" maxLength={100} />
              <Input label="Número do cartão" name="number" data={payment} onChange={update(setPayment)} inputMode="numeric" autoComplete="off" maxLength={23} />
              <Input label="CVV" name="code" data={payment} onChange={update(setPayment)} type="password" inputMode="numeric" autoComplete="off" minLength={3} maxLength={4} pattern="[0-9]{3,4}" />
              <Row>
                <Input label="Mês de vencimento" name="month" data={payment} onChange={update(setPayment)} inputMode="numeric" maxLength={2} pattern="[0-9]{1,2}" />
                <Input label="Ano de vencimento" name="year" data={payment} onChange={update(setPayment)} inputMode="numeric" maxLength={4} pattern="[0-9]{4}" placeholder="AAAA" />
              </Row>
              <button type="submit">{submitting ? 'Enviando pedido…' : 'Concluir pedido'}</button>
              <button type="button" onClick={() => { setError(''); setStep('delivery') }}>Voltar para a entrega</button>
            </fieldset>
            {submitting && <p role="status">Aguarde a confirmação da API.</p>}
          </form>}
        </>}
      </Panel>
    </Main>
    <Footer />
  </>
}
