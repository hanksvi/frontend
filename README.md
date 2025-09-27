# CityGuides Frontend

Frontend SPA para el proyecto CityGuides, construido con Vite, React 18, TypeScript y TailwindCSS.

## Stack y herramientas
- Vite + React 18 + TypeScript
- TailwindCSS
- React Router
- TanStack Query
- Axios
- Zustand
- ESLint + Prettier
- Vitest + Testing Library + jsdom

## Scripts
- `dev`: desarrollo local
- `build`: build de producción
- `preview`: preview del build
- `lint`: linting
- `format`: formateo
- `test`: tests unitarios
- `test:ui`: tests de UI
- `typecheck`: chequeo de tipos

## Variables de entorno
Ver `.env.example`.

## Despliegue en AWS Amplify
Incluye `amplify.yml` y configuración SPA (fallback 200 a index.html). Ver sección de Amplify en la documentación.

## Arquitectura y estructura
- `src/app/`: providers, router, layout
- `src/components/`: componentes reusables
- `src/features/`: features por dominio (auth, guides, bookings, admin, system)
- `src/lib/`: axios, queryClient
- `src/types/`: tipos globales

## Consumo de microservicios vía BFF
La app consume 5 microservicios vía el orquestador BFF (`https://api.tudominio.com/api`).
- **Auth**: login, me, refresh, logout
- **Guías**: búsqueda, detalle, hold
- **Reservas**: crear, listar, detalle, cancelar
- **Admin**: alta de guía, listado de reservas
- **Utilitarios**: health, version

Cada feature tiene hooks y tests mínimos. Ver código y documentación interna.

## Accesibilidad y calidad
- Accesibilidad básica (labels, roles, focus visible)
- ESLint/Prettier sin errores
- Tests pasando
- Build OK

## Enlaces
- [Repositorio público backend](#)
- [Repositorio público frontend](#)
- [URL de AWS Amplify](#)

---

> Documentación completa en progreso. Verifica los endpoints y flujos en el código fuente.
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
