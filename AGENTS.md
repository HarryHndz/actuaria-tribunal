# AGENTS.md — sidj-actuaria_v2

## Objetivo
Contexto rapido para agentes que trabajen en este repositorio.
Proyecto: SPA de Actuaria v3 para SIDJ (Quasar 1 + Vue 2). Se despliega como assets estaticos dentro del backend SIDJ.

## Stack tecnico (versiones exactas)

### Runtime y build
- **Framework SPA**: Quasar Framework ^1.22.5
- **Quasar CLI (build)**: @quasar/app ^2.4.3
- **Vue**: ^2.7.14
- **vue-template-compiler**: ^2.7.14 (debe coincidir exacto con vue)
- **Node requerido**: >= 8.9.0
- **npm requerido**: >= 5.6.0
- **yarn requerido**: >= 1.6.0

### Dependencias principales (package.json — versiones exactas)
- `quasar: ^1.22.5`
- `@quasar/extras: ^1.15.9` (iconos y fuentes)
- `@tjacdmx/sidj-components: git+ssh://git@codelab.tcadf.gob.mx:TCA_develop/sidj-components.git#master` — componentes internos TJACDMX
- `vue: ^2.7.14`
- `vue-template-compiler: ^2.7.14`
- `axios: ^1.6.7`
- `moment: ^2.29.4` + `vue-moment: ^4.1.0`
- `lodash: ^4.17.21` + `vue-lodash: ^2.0.2`
- `pdfjs-dist: 2.5.207` (fijada exacta — no actualizar sin validar vue-pdf)
- `vue-pdf: 4.2.0` (fijada exacta — requiere pdfjs-dist 2.5.207)
- `print-js: ^1.3.1`
- `node-forge: ^0.10.0` (operaciones criptograficas)
- `vue-sweetalert2: ^2.1.5`
- `vuelidate: ^0.7.6` (validacion de formularios)
- `vue-uuid: ^1.1.1`
- `xlsx: ^0.18.5` (exportacion Excel)
- `JSON2: ^0.1.0`

### DevDependencies
- `@quasar/app: ^2.4.3`
- `babel-eslint: ^10.0.3`
- `eslint: ^5.10.0`
- `eslint-plugin-vue: ^5.2.3`

## Infraestructura y despliegue

### No tiene contenedores propios
Esta app NO tiene docker-compose ni imagen Docker propia.
Se compila con Quasar y los assets se copian al backend SIDJ.

### Scripts de deploy
```bash
# Desarrollo QA
npm run deploy-qas
# Copia dist/actuariaV3-dev/* -> ../SIDJ/public/apps/sidj-app-v001/actuariaV3-dev/
# Copia index.html -> ../SIDJ/resources/views/apps/act_actuariav3.blade.php

# Produccion
npm run deploy-prod
# Copia dist/actuariaV3-prod/* -> ../SIDJ/public/apps/sidj-app-v001/actuariaV3-prod/
# Copia index.html -> ../SIDJ/resources/views/apps/act_actuariav3_prod.blade.php
```

### Comandos de trabajo
```bash
# Instalar dependencias
yarn install   # o npm install

# Desarrollo con hot-reload
quasar dev

# Build QA
quasar build   # salida en dist/actuariaV3-dev/

# Build produccion
quasar build -m spa   # salida en dist/actuariaV3-prod/

# Actualizar componentes internos
npm run update-components

# Lint
npm run lint
```

## Estructura src/
```
src/
├── App.vue               # Componente raiz
├── index.template.html   # Template HTML base
├── assets/               # Imagenes y recursos estaticos
├── boot/                 # Plugins inicializados antes del root Vue
│   ├── axios.js          # Configuracion axios + interceptores
│   ├── env.js            # Variables de entorno
│   ├── errors.js         # Manejo global de errores
│   └── moment.js         # Configuracion moment.js
├── components/           # Componentes Vue reutilizables
├── css/                  # Estilos globales (Quasar + custom)
├── layouts/              # Layouts de pagina
├── pages/                # Paginas (vistas de router)
├── router/               # Vue Router (modo history o hash)
└── store/                # Vuex store
```

## Dependencia critica: @tjacdmx/sidj-components
- Paquete privado alojado en `codelab.tcadf.gob.mx`
- Se instala via SSH: requiere clave SSH con acceso al repositorio
- Contiene componentes reutilizados entre todas las SPAs SIDJ
- Para actualizar: `npm run update-components`
- **Riesgo**: cambios en este paquete afectan a todas las SPAs que lo usan

## Integracion con SIDJ backend
- La SPA consume la API REST de SIDJ en `/api/v1/*`
- Autenticacion via Laravel Passport (OAuth2 tokens)
- La URL base del API se configura en `src/boot/env.js`
- Variables de entorno en `.env` o `quasar.conf.js` (section build.env)

## Advertencias para agentes
- `vue-pdf 4.2.0` y `pdfjs-dist 2.5.207` estan fijadas exactas — NO actualizar sin probar renderizado de PDFs
- `veevalidate` NO se usa aqui; se usa `vuelidate ^0.7.6`
- El paquete `@tjacdmx/sidj-components` requiere acceso SSH al repo privado
- Este proyecto usa Quasar 1.x (API Quasar v1) — NO es compatible con Quasar 2.x sin migracion
- Vue 2.7.14 — NO migrar a Vue 3 sin plan de migracion completo

## Checklist antes de cerrar cambios
- Build compila sin errores (`quasar build`)
- No hay warnings de versiones incompatibles entre vue y vue-template-compiler
- PDFs renderizan correctamente
- Deploy copia archivos al directorio correcto en SIDJ backend
- Variables de entorno configuradas para el ambiente destino
