# mvp-sinutre-frontend

Backend do **SiNutre — Sistema de Ingestão de Macronutrientes**.

Stack: **TypeScript + Express + Prisma + SQLite**.

## Stack

- Vite 6 + React 19 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- daisyUI v5 (plugin do Tailwind)
- @phosphor-icons/react para os ícones
- ESLint 9 (flat config) + typescript-eslint

## Estrutura

```
src/
├── components/
│   ├── cards/      # AddMealCard, TotalMealsCard
│   ├── forms/      # FormField
│   ├── layout/     # Sidebar, SidebarBrand, SidebarItem, Header
│   ├── macros/     # MacroStat, MacroStatsBar
│   ├── meals/      # MealActionButton, MealFab, MealsList/Table…
│   └── modal/      # AddMealModal e suas sub-partes
├── constants/      # MEAL_CATEGORIES, NAV_ITEMS
├── data/           # mocks de usuário, macros e refeições
├── hooks/          # useMealModal
├── pages/          # DashboardPage
├── styles/         # tailwind + tema sinutre
├── types/          # tipos de domínio
├── App.tsx
└── main.tsx
```

## Scripts

```bash
npm install     # instala dependências
npm run dev     # servidor de desenvolvimento (vite)
npm run build   # build de produção (tsc -b + vite build)
npm run lint    # ESLint em todo o projeto
npm run preview # preview do build
```

## Tema

O tema customizado `sinutre` (paleta verde) está definido em
`src/styles/theme.css` usando a sintaxe `@plugin 'daisyui/theme'` do daisyUI v5.

## Minhas implementações, novas funcionalidades e/ou alterações
* Ref 01: Implementei uma forma de **alterar um alimento** cadastrado;
* Ref 02: Implementei uma forma de **excluir um alimento** cadastrado;
* Ref 04: Implementei uma forma de **cadastrar** e **alterar** dados complementares do usuário logado, **como meta calórica, altura e peso com validações**;
* Ref 05: Implementei uma forma de **alterar dados complementares** do usuário logado;
* Ref 09: Adicionei uma página que **calcula o IMC**, o usuário informa peso e altura, e o sistema mostra em que **faixa ele se encontra**;
* Ref 11: Fiz uma forma do usuário **fazer logout** (implementei a **função Sair** do sistema);
* Ref 12: Mudei algumas **cores da interface e de títulos**;
## outras
* Fiz uma **animação da imagem** (alimentos) na página inicial (página de login);



