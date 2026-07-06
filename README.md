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

## Alterações feitas por mim
* fiz a copia do arquivo .env.example
* Removi a conexão com o repositório do curso. Desconectei do projeto original, do qual eu tinha clonado. Comando bash: git remote remove origin.
* Design da Página de Login: alterei cores de alguns elementos e background.
* Implementado a funcionalidade logout "Sair".

