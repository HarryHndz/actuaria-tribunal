# sidj-actuaria_v2 ("Sistema digital de juicio modulo actuaria")

Aplicacion tjacdmx sidj-actuaria "Sistema digital de juicio modulo actuaria"

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).


## Configuración de variables de entorno
Para configurar las variables de entorno, crear un archivo `.env.dev` para desarrollo y un archivo `.env.prod` para
producción en la raíz del proyecto con el siguiente contenido:

```env
API_SIDJ=
API_SCO=
```

## Despliegue
Para desplegar la aplicación en el entorno de desarrollo, ejecutar el siguiente comando:

```bash
npm run deploy:dev
```

Para desplegar la aplicación en el entorno de producción, ejecutar el siguiente comando:

```bash
npm run deploy:prod
```
