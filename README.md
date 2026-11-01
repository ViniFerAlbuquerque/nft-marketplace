# KURIO — NFT Marketplace

Marketplace demonstrativo de NFTs, desenvolvido com React, TypeScript e Vite, com interface responsiva, carrinho de compras, checkout simulado e testes automatizados.

## Tecnologias

- React + TypeScript + Vite
- Tailwind CSS e shadcn/ui
- TanStack Router e TanStack Query
- Axios e Mock Service Worker (MSW)
- decimal.js
- Vitest e Playwright

## Funcionalidades

- Catálogo de NFTs com busca, filtros e ordenação
- Visualização de detalhes dos NFTs
- Seleção de quantidade e carrinho persistente
- Checkout demonstrativo com MetaMask e WalletConnect simulados
- API simulada para criação e consulta de pedidos
- Proteção contra duplicação de pedidos por chave de idempotência
- Página de confirmação de compra
- Cadastro, login e perfil demonstrativos
- Cadastro local de endereços de carteiras Ethereum
- Interface responsiva para desktop e dispositivos móveis

## Como executar

**Pré-requisitos:** Node.js e npm compatíveis com a versão do Vite utilizada.

```bash
npm install
```

Crie `.env.development` na raiz:

```env
VITE_ENABLE_MOCKS=true
```

Inicie o servidor:

```bash
npm run dev
```

Acesse o endereço informado pelo Vite.

## Testes

Testes unitários:

```bash
npx vitest run
```

Testes de ponta a ponta:

```bash
npx playwright install chromium
npx playwright test
```

Build de produção:

```bash
npm run build
```

Pré-visualização da versão compilada:

```bash
npm run preview
```

## Estrutura do projeto

- `src/app` — roteamento e configuração do TanStack Query
- `src/components` — componentes reutilizáveis
- `src/features` — funcionalidades de autenticação e carrinho
- `src/pages` — páginas da aplicação
- `src/services` — comunicação com a API
- `src/mocks` — dados e handlers do MSW
- `tests` — testes end-to-end com Playwright

## Limitações

Este projeto é uma demonstração técnica.

- Não realiza transações reais em blockchain.
- Não conecta carteiras reais nem processa pagamentos.
- A autenticação é simulada e não verifica a identidade do usuário.
- Senhas não são armazenadas nem verificadas.
- Os dados demonstrativos são mantidos localmente no navegador.
- A API é simulada pelo MSW e não substitui um backend de produção.

Não utilize senhas reais, chaves privadas ou informações sensíveis.

## Deploy

O frontend pode ser publicado na Vercel com as seguintes configurações:

- Framework: Vite
- Build: `npm run build`
- Output: `dist`
- Variável de ambiente: `VITE_ENABLE_MOCKS=true`

O arquivo `vercel.json` configura o fallback das rotas da aplicação.

## Objetivo

Demonstrar competências em desenvolvimento frontend, arquitetura de componentes, gerenciamento de estado, integração com APIs, responsividade, testes automatizados e publicação de aplicações web.
