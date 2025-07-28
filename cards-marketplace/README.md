# ♠️ Cards Marketplace

Um marketplace de troca de cartas desenvolvido com **Vue 3 + TypeScript**, que permite aos usuários registrarem-se, adicionarem cartas à sua conta e realizarem trocas com outros usuários. Este projeto foi desenvolvido como desafio técnico, focando em uma aplicação **SPA** moderna, responsiva e funcional.

---

## 🧪 Tecnologias e Ferramentas

| Tecnologia  | Descrição                        |
| ----------- | -------------------------------- |
| Vue 3       | Framework JavaScript progressivo |
| TypeScript  | Tipagem estática para JS         |
| Vite        | Build tool super rápida          |
| TailwindCSS | Utilitário de estilos            |
| Pinia       | Gerenciador de estado moderno    |
| Vue Router  | Roteamento SPA                   |
| Axios       | Cliente HTTP para API            |

---

## 📁 Estrutura de Pastas

```bash
src/
├── assets/              # Imagens e estilos globais
├── components/          # Componentes reutilizáveis
├── pages/               # Páginas do sistema (Login, Registro, Dashboard etc.)
├── router/              # Configurações de rotas com Vue Router
├── stores/              # Gerenciamento de estado com Pinia
├── services/            # Integrações com a API (axios)
├── composables/         # Composables para lógica compartilhada
└── App.vue              # Componente raiz
```

---

## 🚀 Funcionalidades

* ✅ Registro de usuário
* ✅ Login de usuário com autenticação JWT
* ✅ Adicionar cartas à conta do usuário
* ✅ Criar solicitações de troca
* ✅ Selecionar cartas que possui e deseja
* ✅ Listar trocas criadas
* ✅ Deletar trocas
* ✅ Listar todas as trocas públicas (marketplace)
* ✅ Layout responsivo com **TailwindCSS**
* ✅ Lightbox de visualização da carta
* ✅ Interface escura com identidade visual roxa e branca

---

## 🧠 Implementações Técnicas

### 1. 🛡️ Tratamento de erros

Erros de API são tratados com `try/catch` e mensagens de erro são exibidas na interface.

### 2. 📦 Cache

#### Cache de Trocas Públicas
    Velocidade: evita chamadas repetidas, deixando as páginas mais rápidas.

    Escalabilidade: reduz carga na API, economizando recursos e custos.

    Equilíbrio: mantém dados “recentes” sem sobrecarregar o servidor.

**Local:** `src/stores/useMarketplaceStore.ts`

* Guarda em estado `trades`, `loaded` e `lastFetched`
* Cache válido por 1 minuto, comparando `Date.now() - lastFetched < cacheDuration`
* Forçar atualização com `fetchTrades(true)`

**Uso:**

```ts
const marketplace = useMarketplaceStore()
onMounted(() => { marketplace.fetchTrades() })
// para ignorar cache:
marketplace.fetchTrades(true)
```

#### Cache de "Minhas Cartas"

**Local:** `src/stores/useUserCardsStore.ts`

* Guarda em estado `cards`, `loaded` e `lastFetched`
* Mesma lógica de duração e `forceReload`

**Uso no Dashboard:**

```ts
const userCards = useUserCardsStore()
onMounted(() => { userCards.fetchUserCards() })
// botão:
userCards.fetchUserCards(true)
```

---

## 🌐 Deploy no GitHub Pages

    Agilidade: cada push atualiza o site sem passos manuais.

    Confiabilidade: builds consistentes e rollback fácil via commits.

    Disponibilidade: CDN global gratuita com HTTPS, sem custos de hospedagem.

1. Ajustar `base` em `vite.config.ts` para `/cards-marketplace/`
2. Instalar `gh-pages` e adicionar scripts:

   ```jsonc
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. `npm run deploy` e ativar Pages na branch `gh-pages`.
