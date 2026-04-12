# P3AGA Blog

Blog/portifolio pessoal em Astro, com suporte a Markdown/MDX, tema claro/escuro, paginação de posts e busca estática com Pagefind.

## Visão Geral

- Framework principal: Astro 6
- Estilos: Tailwind CSS v4 (via plugin Vite)
- Conteúdo: Astro Content Collections
- Busca: Pagefind (gerada no postbuild)
- Ícones: astro-icon + material-symbols-light
- Highlight de código: astro-expressive-code

## Requisitos

- Node.js 24.11.0 (definido em mise.toml)
- npm

## Comandos

Todos os comandos devem ser executados na raiz do projeto.

| Comando | Descrição |
| --- | --- |
| npm install | Instala dependências |
| npm run dev | Inicia ambiente de desenvolvimento |
| npm run dev:host | Inicia dev server acessível na rede |
| npm run build | Gera build estático em dist |
| npm run preview | Sobe preview da build |
| npm run preview:host | Preview acessível na rede |
| npm run check | Validação de tipos e projeto Astro |

Observação: o script de build executa postbuild com Pagefind automaticamente.

## Estrutura do Projeto

```text
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── blog/
│   │   └── layout/
│   ├── content/
│   │   └── blog/
│   ├── layouts/
│   ├── pages/
│   │   ├── blog/
│   │   └── 404.astro
│   ├── plugins/
│   ├── styles/
│   ├── types/
│   ├── content.config.ts
│   └── site.config.ts
├── astro.config.ts
├── package.json
└── tsconfig.json
```

## Arquitetura e Fluxos

### 1) Configuração de site

Arquivo: src/site.config.ts

- Metadados globais (URL, idioma, nome, descrição, autor, ano)
- Links de menu principal

### 2) Conteúdo de blog

Arquivos:

- src/content.config.ts
- src/content/blog/*.md ou *.mdx

Coleção blog usa schema validado com zod:

- title: string (max 30)
- description: string (max 100)
- pubDate: date
- tags: string[] (max 5)

Ordenação de posts por data decrescente em src/utils/blog.ts.

### 3) Renderização de páginas

Arquivos principais:

- src/pages/index.astro: home + 5 posts mais recentes
- src/pages/blog/index.astro: redireciona para /blog/page/1
- src/pages/blog/page/[page].astro: listagem paginada (10 por página)
- src/pages/blog/[slug].astro: página de post estática por slug
- src/pages/404.astro: página de não encontrado

### 4) Layout e UI

Arquivos principais:

- src/layouts/Base.astro: HTML base, carregamento de tema e classes globais
- src/layouts/SiteBase.astro: moldura de página com Header/Footer
- src/components/layout/Header.astro: logo, navegação, busca, toggle de tema
- src/components/layout/Search.astro: integração do modal de busca
- src/components/layout/ThemeToggle.astro: troca entre system/dark/light

### 5) Estilos

Arquivos principais:

- src/styles/global.css: import do Tailwind + fontes + tokens de fonte
- src/styles/prose.css: tipografia e elementos de conteúdo markdown
- src/styles/modal-search.css: customização visual do modal Pagefind

### 6) Markdown pipeline

Configuração em astro.config.ts:

- remark-directive habilitado
- plugin personalizado rehype-table-processor envolve tabelas em div.table-wrapper para scroll horizontal

## Busca (Pagefind)

- Build gera índice em dist/pagefind (script postbuild)
- Modal de busca é exibido apenas fora de ambiente de desenvolvimento
- Em desenvolvimento, o botão de busca mostra aviso de desativado

Para validar a busca localmente:

1. npm run build
2. npm run preview
3. Abrir o site em preview e testar o botão de busca

## Tema Claro/Escuro

- Classe dark é aplicada no elemento raiz
- Prioridade do tema:
	1. localStorage (light/dark)
	2. preferência do sistema (prefers-color-scheme)
	3. fallback claro

## Convenções Importantes

- Alias de importação @/* configurado em tsconfig.json
- Conteúdo de post deve seguir schema da coleção
- Tipografia e componentes markdown são definidos em prose.css

## Observações da Análise

- O menu inclui rota /about em site.config.ts, mas não existe página correspondente em src/pages.
- Há um tipo em src/types/components.types.ts que não aparece no fluxo atual.
- O modal de busca em modo dark usa tokens color-mist-* em modal-search.css. No Tailwind, tokens fora da paleta padrão precisam existir no tema para serem gerados no build.

## Próximos Passos Sugeridos

1. Criar a página src/pages/about.astro ou remover o link do menu.
2. Padronizar os tokens de cor do modal-search para paleta padrão ou definir os tokens custom no tema.
3. Revisar limites do schema de posts (title/description/tags) conforme necessidade editorial.
