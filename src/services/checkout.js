export const CHECKOUT_URL = 'https://api-ebac.vercel.app/api/efood/checkout'
export const digits = value => String(value).replace(/\D/g, '')

export function validateDelivery(data) {
  if (!data.receiver.trim() || !data.description.trim() || !data.city.trim()) return 'Preencha o nome, endereço e cidade.'
  if (digits(data.zipCode).length !== 8) return 'Informe um CEP com 8 dígitos.'
  if (!/^\d+$/.test(data.number) || Number(data.number) < 1) return 'Informe um número de endereço válido.'
  return ''
}

export function validatePayment(data, today = new Date()) {
  if (data.name.trim().length < 3) return 'Informe o nome no cartão.'
  if (!/^\d{13,19}$/.test(digits(data.number))) return 'Informe um cartão com 13 a 19 dígitos.'
  if (!/^\d{3,4}$/.test(data.code)) return 'Informe um código de segurança com 3 ou 4 dígitos.'
  const month = Number(data.month), year = Number(data.year)
  if (!/^\d{1,2}$/.test(data.month) || month < 1 || month > 12 || !/^\d{4}$/.test(data.year)) return 'Informe mês e ano de validade válidos.'
  if (year < today.getFullYear() || (year === today.getFullYear() && month < today.getMonth() + 1)) return 'O cartão está vencido.'
  return ''
}

export function createPayload(items, delivery, payment) {
  return {
    products: items.map(item => ({ id: item.id, price: item.preco })),
    delivery: {
      receiver: delivery.receiver.trim(),
      address: {
        description: delivery.description.trim(), city: delivery.city.trim(),
        zipCode: digits(delivery.zipCode), number: Number(delivery.number),
        complement: delivery.complement.trim()
      }
    },
    payment: { card: {
      name: payment.name.trim(), number: digits(payment.number), code: Number(payment.code),
      expires: { month: Number(payment.month), year: Number(payment.year) }
    } }
  }
}

export async function submitOrder(payload) {
  const response = await fetch(CHECKOUT_URL, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
  })
  const data = await response.json().catch(() => null)
  if (!response.ok) throw new Error('Não foi possível concluir o pedido. Confira os dados e tente novamente.')
  if (!data || !['string', 'number'].includes(typeof data.orderId) || !String(data.orderId).trim()) {
    throw new Error('A API não retornou o número do pedido. O carrinho foi mantido.')
  }
  return data
}
