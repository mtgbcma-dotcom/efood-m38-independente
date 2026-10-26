# eFood — Módulo 38 | EBAC

Projeto desenvolvido para a atividade do Módulo 38 da EBAC, dando continuidade à M37 em um projeto independente.

Nesta etapa, implementei o fluxo de finalização do pedido, com formulário de entrega, pagamento e confirmação a partir da resposta da API.

## Funcionalidades

- Listagem de restaurantes e cardápios carregados pela API.
- Modal com detalhes dos produtos.
- Carrinho gerenciado com Redux Toolkit e React Redux.
- Soma automática dos preços, adição e remoção de produtos.
- Entrega, pagamento e confirmação no mesmo modal lateral do carrinho, mantendo o cardápio ao fundo e sem mudança de página.
- Formulário de pagamento com validação dos campos e do vencimento.
- Envio do pedido por POST para a API de checkout da EBAC.
- Bloqueio de envios duplicados enquanto a requisição está em andamento.
- Confirmação com o número do pedido retornado pela API.
- Limpeza do carrinho somente após a confirmação da API.
- Preservação do carrinho quando ocorre erro no envio.
- Layout responsivo.

## Tecnologias utilizadas

- React
- JavaScript
- Redux Toolkit
- React Redux
- Styled Components
- React Router
- Vite

## Executar o projeto

```bash
npm ci
npm start
```

## Testes

```bash
npm test
```

Os testes verificam o carrinho, a soma dos valores, a persistência, a validação dos formulários, o formato do POST e os cenários de erro e sucesso do checkout.

## Gerar a versão de produção

```bash
npm run build
```

## Rotas

- `/`: restaurantes.
- `/restaurante/:id`: cardápio.
- `/carrinho` e `/checkout`: links antigos redirecionam para a página inicial e abrem o modal do carrinho. O fluxo normal ocorre sobre `/restaurante/:id`, sem navegar para outra página.

## API

- Restaurantes: `https://api-ebac.vercel.app/api/efood/restaurantes`
- Checkout: `https://api-ebac.vercel.app/api/efood/checkout`

O checkout é uma demonstração acadêmica e deve ser utilizado com dados fictícios. Os dados do cartão ficam apenas no formulário durante a operação e não são gravados no Redux nem no armazenamento local.

## Layout

[Figma — eFood](https://www.figma.com/file/JjduV2Tg713TzYUUsees8b/efood?type=design&node-id=0-1&mode=design)

## Autor

Bruno Costa Macedo de Almeida

## Correção após avaliação do módulo 38

O botão “Continuar com a entrega” avança dentro do painel lateral de 360px. Entrega → pagamento → confirmação compartilham o mesmo modal, com campos e botões organizados conforme o Figma. O botão de voltar do pagamento preserva os dados de entrega. Apenas “Finalizar pagamento” envia o POST; durante o envio, o fechamento e os envios repetidos são bloqueados. A confirmação usa o orderId retornado pela API e continua visível após a limpeza do carrinho. “Concluir” fecha o modal e mantém o usuário no cardápio.

Os testes também cobrem o mesmo elemento de diálogo em todas as etapas, ausência de navegação, erros e resposta sem orderId, preservação do carrinho e conclusão no modal.
