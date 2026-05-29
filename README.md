# Rimac — Cotizador de Seguro Salud Flexible

App de cotización de seguro de salud para Rimac. Reto técnico **Frontend Web 2026** — Chapter Frontend.

🔗 **Demo en producción**: [project-89s2g.vercel.app](https://vercel.app)

---

## 📋 Tabla de contenidos

- [Sobre el proyecto](#-sobre-el-proyecto)
- [Stack técnico](#-stack-técnico)
- [Requisitos previos](#-requisitos-previos)
- [Instalación y ejecución](#-instalación-y-ejecución)
- [Scripts disponibles](#-scripts-disponibles)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Decisiones de arquitectura](#-decisiones-de-arquitectura)
- [Reglas de negocio](#-reglas-de-negocio)
- [Tests](#-tests)
- [Despliegue con Docker](#-despliegue-con-docker)
- [Despliegue en Vercel (vía GitHub)](#-despliegue-en-vercel-vía-github)
- [Enlaces](#-enlaces)

---

## 📌 Sobre el proyecto

Flujo de cotización en **3 pantallas**:

1. **Landing** (`/`) — Formulario de identificación (tipo de documento, número, celular, checkboxes legales).
2. **Plans** (`/plans`) — Selección de target ("Para mí" o "Para alguien más") + grid de planes filtrados por edad del usuario.
3. **Summary** (`/summary`) — Resumen del seguro elegido con datos del responsable de pago y plan seleccionado.

### Features implementadas

- ✅ Validación de **todos los campos** con Zod + React Hook Form (mensajes inline + `aria-invalid` + `aria-describedby`)
- ✅ Consumo del API `/user.json` y `/plans.json` con manejo de loading/error
- ✅ Filtrado de planes por edad (`userAge ≤ plan.age`) calculada desde `birthDay` en formato `DD-MM-YYYY`
- ✅ Descuento del **5%** sobre el precio cuando se cotiza para "alguien más"
- ✅ Persistencia entre pasos con guards de routing (no se puede saltar a `/plans` o `/summary` sin data previa)
- ✅ Diseño **responsive mobile / tablet / desktop** con tokens centralizados
- ✅ HTML semántico, focus visible, contraste AA
- ✅ Tests unitarios sobre la lógica de negocio
- ✅ Listo para deploy con **Docker** (Nginx) o **Vercel** (CDN edge)

---

## 🛠️ Stack técnico

| Capa | Elección | Por qué |
|---|---|---|
| Build tool | **Vite 5** | HMR rápido, builds optimizados, TypeScript nativo |
| Lenguaje | **TypeScript** (strict) | Tipado fuerte, mejor DX, evaluación del reto lo pondera |
| UI | **React 18** | StrictMode, concurrent features |
| Routing | **React Router v6** | 3 rutas con guards |
| Estado | **Zustand** + `persist` | Mínimo boilerplate, persistencia en localStorage |
| Forms | **React Hook Form** + **Zod** | Validación declarativa con resolver tipado |
| Estilos | **SCSS Modules** | Scope local, tokens, sin runtime |
| Tests | **Vitest** + **React Testing Library** | Mismo runner que Vite, RTL para integraciones |
| HTTP | **Fetch nativo** | Sin dependencia externa, wrapper en `lib/apiClient.ts` |
| Linting | **ESLint** + **Stylelint** + **Prettier** | Consistencia |

---

## ✅ Requisitos previos

- **Node** ≥ 18 (recomendado 20 LTS)
- **pnpm** ≥ 8 (`npm install -g pnpm`)
- **Docker Desktop** (opcional, solo para la sección Docker)

---

## 🚀 Instalación y ejecución

```bash
# 1. Clonar el repo
git clone <tu-repo-url>
cd frontend-challenge

# 2. Instalar dependencias
pnpm install

# 3. Crear archivo de variables de entorno
cp .env.example .env

# 4. Levantar el dev server
pnpm dev
```

Abre **http://localhost:5173** en tu navegador.

### Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `VITE_API_BASE` | `https://rimac-front-end-challenge.netlify.app/api` | URL base del API de Rimac (user.json + plans.json) |

---

## 📜 Scripts disponibles

```bash
pnpm dev              # Dev server con HMR → http://localhost:5173
pnpm build            # Build de producción (typecheck + Vite) → dist/
pnpm preview          # Previsualiza el bundle de producción → http://localhost:4173
pnpm test             # Tests en modo watch
pnpm test:run         # Tests single-run (CI)
pnpm test:coverage    # Tests + reporte de cobertura
pnpm lint             # ESLint + Stylelint
pnpm lint:fix         # Auto-fix de issues de lint
pnpm format           # Formatear con Prettier
pnpm typecheck        # tsc --noEmit
pnpm docker:build     # Construir imagen Docker
pnpm docker:run       # Correr contenedor en :8080
pnpm vercel:deploy    # Deploy de producción a Vercel
```

---

## 📁 Estructura del proyecto

```
src/
├── app/              # Shell de la app
│   ├── App.tsx       # Composición root
│   ├── providers.tsx # BrowserRouter
│   └── router.tsx    # Rutas + guards (RequireUser, RequirePlan)
├── pages/            # Una carpeta por ruta
│   ├── Landing/      # Formulario + fetch /user
│   ├── Plans/        # TargetCards + grid/slider de planes
│   └── Summary/      # Resumen final
├── features/         # Lógica de dominio
│   ├── user/         # types, api, hook, schema Zod
│   ├── plans/        # types, api, hook, filterByAge, applyDiscount, componentes
│   └── quote/        # store Zustand, TargetCard
├── components/       # UI agnóstica del dominio
│   ├── Button/       Card/ Checkbox/ Footer/ Header/ Input/ Layout/
│   ├── Select/ Spinner/ Stepper/ BackLink/
│   └── README.md     # Convenciones de componentes
├── lib/              # Utilidades
│   ├── apiClient.ts  # Wrapper de fetch con ApiError
│   ├── age.ts        # calcAge(DD-MM-YYYY)
│   └── formatters.ts # formatMonthlyPrice, round2, getFirstName
├── hooks/            # Hooks transversales
│   └── useMediaQuery.ts
├── styles/           # Tokens + globals
│   ├── _tokens.scss  # Colores, spacing, tipografía, breakpoints
│   ├── _mixins.scss  # respond-to, container, focus-ring
│   ├── _reset.scss
│   └── global.scss
└── types/
tests/
└── setup.ts          # @testing-library/jest-dom
public/
├── icons/            # SVG: doctor, laptop, hospital, family hero, etc.
└── rimac-logo-header.svg
```

### Convención por componente

```
ComponentName/
├── ComponentName.tsx
├── ComponentName.module.scss
├── ComponentName.test.tsx     (opcional pero recomendado)
├── ComponentName.types.ts     (si las props son no triviales)
└── index.ts                   (re-exports)
```

---

## 🧠 Decisiones de arquitectura

1. **Zustand con `persist`** — Los datos del usuario (`/user`) y plan seleccionado se persisten en `localStorage` para sobrevivir refresh. El `target` se mantiene solo en memoria para cumplir el criterio "al inicio los planes no deben mostrarse".

2. **Edad calculada client-side** — `calcAge('DD-MM-YYYY', now)` en `lib/age.ts`. Función pura, testeable, con validación regex estricta del formato.

3. **`filterByAge` y `applyDiscount` como funciones puras** — Vivienen en `features/plans/lib/` y se testean aisladas con casos reales del API (Rocío 36 años, precios exactos $37.05/$94.05/$46.55).

4. **Guards en el router** — `RequireUser` redirige a `/` si no hay user; `RequirePlan` redirige a `/` si no hay selectedPlan. Imposible llegar a `/summary` con data corrupta.

5. **Mobile-first con mixin `respond-to`** — Sin media queries crudas. Tablet (768-1023) usa un media query scoped por separado para no afectar mobile/desktop.

6. **Sin librerías de UI** — Todos los componentes son custom para pixel-perfect con Figma. Incluye Button, Input (con startSlot para Select embebido), Checkbox custom, Stepper desktop/mobile, BackLink, PlansSlider con peek.

7. **Tokens de diseño centralizados** — `_tokens.scss` es la fuente de verdad para colores, spacing, radios, tipografía, breakpoints. Los componentes consumen `color: inherit` cuando aplica para que el contexto del padre mande.

8. **Dedupe en `usePlans`** — `useRef` previene la doble llamada que provoca React 18 StrictMode en dev.

---

## 📐 Reglas de negocio

| Regla | Implementación |
|---|---|
| `/plans` se llama **después** de `/user` | El form submit fetchea `/user`, guarda en store, navega; `/plans` se llama desde `usePlans(target !== null)` |
| Mostrar solo planes con `userAge ≤ plan.age` | `filterByAge(plans, age)` en `features/plans/lib/` |
| Descuento del 5% en "alguien más" | `toQuotePlan(plan, 'someone-else')` aplica `price * 0.95` redondeado a 2 decimales |
| Al inicio los planes no se muestran | Mount effect en `Plans.tsx` llama `clearTarget()` + gate `mounted && target !== null` |
| Refresh conserva estado relevante | Zustand `persist` con `partialize`: persiste `user` y `selectedPlan`, NO `target` |
| Selección de plan → navega a `/summary` | `setSelectedPlan(plan)` + `navigate('/summary')` en el handler del PlanCard |

---

## 🧪 Tests

```bash
pnpm test:run
```

**27 tests** sobre la lógica de negocio crítica:

| Suite | Cobertura |
|---|---|
| `calcAge` | Edad calculada antes/después del cumpleaños, formato inválido |
| `filterByAge` | Caso real del API (Rocío 36 años → 3 planes visibles) |
| `applyDiscount` (`toQuotePlan`) | Precios exactos del diseño: $99 → $94.05, $39 → $37.05, $49 → $46.55 |
| `userFormSchema` | DNI/CE longitudes, celular formato, checkboxes obligatorios |
| `formatters` | `formatMonthlyPrice`, `round2`, `getFirstName` |
| `Button` | Render, click, loading, type default |
| `Input` | Label/htmlFor, error con `aria-invalid`, escribir valor |

---

## 🐳 Despliegue con Docker

> Independiente de Vercel. Útil para preview de producción local, deploys a otros proveedores (Fly.io, Railway, AWS ECS), o ambiente reproducible.

### Build + run rápido

```bash
pnpm docker:build    # ~1-3 min la primera vez (descarga base images)
pnpm docker:run      # → http://localhost:8080
```

### Stack del contenedor

- **Multi-stage build**:
  - Stage 1 (`node:20-alpine`): instala con pnpm, corre `pnpm build`
  - Stage 2 (`nginx:1.27-alpine`): sirve `dist/` desde Nginx
- **Imagen final**: ~50 MB (solo Nginx + bundle estático, sin Node ni `node_modules`)

### Override de variables de build

Las vars `VITE_*` se **inlinean** en el bundle al hacer `pnpm build`, por eso van como `--build-arg`, no como `-e` al `docker run`:

```bash
docker build \
  --build-arg VITE_API_BASE=https://otro-endpoint.com/api \
  -t rimac-frontend .
```

### Lo que el Nginx incluye

- **SPA fallback** (`try_files $uri /index.html`) → React Router maneja el routing client-side
- **Cache infinito** en `/assets/*` (Vite genera hashes; cambian con cada build)
- **No-cache** en `index.html` (siempre sirve la última versión)
- **Gzip** sobre HTML/CSS/JS/SVG/JSON (mínimo 1KB)
- Headers de seguridad: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`
- `HEALTHCHECK` cada 30s para orquestadores

### Detener el contenedor

```bash
# Opción A: Ctrl+C en la terminal (el flag --rm lo borra solo)
# Opción B: desde Docker Desktop → Containers → stop
# Opción C:
docker stop rimac-frontend
```

---

## ▲ Despliegue en Vercel (vía GitHub)

> Independiente de Docker. Vercel no usa el Dockerfile — corre su propio builder con `pnpm install && pnpm build` y sirve el `dist/` desde su CDN edge global.

### Pasos

1. **Push del repo a GitHub** (si aún no está).

   ```bash
   git remote add origin git@github.com:<usuario>/<repo>.git
   git push -u origin main
   ```

2. **Importar el proyecto en Vercel**.

   - Ir a [vercel.com/new](https://vercel.com/new)
   - Click en **Add New… → Project**
   - Selecciona tu repo de GitHub (autoriza el GitHub App de Vercel si es la primera vez)

3. **Configurar el proyecto**.

   - **Framework Preset**: Vercel detecta **Vite** automáticamente (no cambies nada — ya está en [`vercel.json`](vercel.json))
   - **Build Command**, **Output Directory**, **Install Command**: ya configurados en `vercel.json`

4. **Agregar la variable de entorno**.

   En **Environment Variables**, agrega:

   | Name | Value | Environments |
   |---|---|---|
   | `VITE_API_BASE` | `https://rimac-front-end-challenge.netlify.app/api` | Production, Preview, Development |

5. **Deploy**.

   Click en **Deploy**. El primer build tarda ~1-2 min.

6. **Configurar deploys automáticos**.

   Vercel ya queda conectado a GitHub. A partir de aquí:

   - **Push a `main`** → deploy automático a producción (tu URL `.vercel.app`)
   - **Push a otra rama** o **PR** → preview deploy con URL única (perfecto para revisar antes de mergear)

### Qué hace `vercel.json`

```json
{
  "framework": "vite",
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install --frozen-lockfile",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [...]
}
```

- `rewrites` → todas las rutas SPA caen a `index.html` (igual que el `try_files` de Nginx)
- `headers` → mismo schema de cache que Docker: `assets/*` immutable, `index.html` no-cache

---

## 🔗 Enlaces

- 📄 **Diseño Figma**: ver brief del reto
- 🌐 **API usuarios**: [user.json](https://rimac-front-end-challenge.netlify.app/api/user.json)
- 🌐 **API planes**: [plans.json](https://rimac-front-end-challenge.netlify.app/api/plans.json)

---

## 📝 Notas para el evaluador

- **Pixel-perfect**: las medidas críticas (cards 285px, button 195×64 desktop / 336×56 mobile, inputs 48px, checkbox 20×20, etc.) están en su SCSS module respectivo, derivadas del Figma.
- **Iconos como assets reales**: SVGs del Figma exportados a [public/icons/](public/icons/). Los componentes los importan con `import iconUrl from '/icons/...svg'` para que Vite los hashee.
- **Bold semantic en descripciones**: el API devuelve strings planos; el `highlightDescription` en `PlanCard.tsx` envuelve las frases clave con `<strong>` según el diseño.
- **A11y**: `aria-current="step"` en el Stepper, `aria-live="polite"` en el bloque de planes, focus rings con `:focus-visible`, contraste AA, labels asociados a inputs.
