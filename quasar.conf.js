// Configuration for your app
// const FileManagerPlugin = require('filemanager-webpack-plugin');
/* eslint-env node */
/* eslint func-names: 0 */
/* eslint global-require: 0 */
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');

let { name } = require('./package.json');

function getEnvFile(mode) {
  if (mode === 'production') {
    return '.env.prod';
  }

  return '.env.dev';
}

function loadEnv(mode) {
  dotenv.config();

  const envFile = getEnvFile(mode);
  const envPath = path.resolve(process.cwd(), envFile);
  dotenv.config({ path: envPath });

  name = mode === 'production' ? `${name}-prod` : `${name}-dev`;

  console.log('=== ENVIRONMENT CONFIG ===');
  console.log('Mode:', mode);
  console.log('API_SIDJ:', process.env.API_SIDJ);
  console.log('API_SCO:', process.env.API_SCO);
  console.log('==========================');
}

module.exports = function () {
  // Determinar modo basado en el build
  const mode = process.env.QUASAR_ENV || process.env.NODE_ENV || 'development';

  // Cargar variables
  loadEnv(mode);

  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'axios',
      'vuelidate',
      'moment',
      'vue-uuid',
      'vue-pdf',
      'sweetalert2',
    ],

    css: [
      'ConsultaExpediente.sass',
    ],

    extras: [
      'roboto-font',
      'material-icons', // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      'fontawesome-v5',
      // 'eva-icons'
    ],

    framework: {
      // all: true, // --- includes everything; for dev only!

      components: [
        // 'QLayout',
      ],

      directives: [
        // 'Ripple',
      ],

      // Quasar plugins
      plugins: [
        'Notify',
      ],

      // language
      lang: 'es',

      // iconSet: 'ionicons-v4'
      // lang: 'de' // Quasar language
    },

    supportIE: false,
    preFetch: true,

    build: {
      env: {
        API_SIDJ: process.env.API_SIDJ,
        API_SCO: process.env.API_SCO,
      },
      gzip: true,
      scopeHoisting: true,
      vueRouterMode: 'hash',
      // vueCompiler: true,
      // analyze: true,
      // extractCSS: false,
      distDir: `dist/${name}`,
      publicPath: `apps/sidj-app-v001/${name}`,
      chainWebpack(chain) {
        chain.output.set('globalObject', 'this');
      },
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
        });
        cfg.plugins.push(
          // new FileManagerPlugin({
          //   onEnd: [
          //     {
          //       archive: [{
          //           source: 'dist/' + name,
          //           destination: 'dist/' + name + '.tar',
          //           format: 'tar',
          //         },
          //       ]
          //     },
          //   ]
          // })
        );
      },
    },

    devServer: {
      host: 'local.tjacdmx.gob.mx',
      https: {
        key: fs.readFileSync('./ssl/tjacdmx.key'),
        cert: fs.readFileSync('./ssl/tjacdmx.crt'),
      },
      port: 8080,
      open: false, // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    animations: [
      'fadeInDown',
      'fadeOutUp',
    ],

    ssr: {
      pwa: false,
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
      // noIosLegacyBuildFlag: true // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      // extendWebpack (cfg) {
      // do something with Electron main process Webpack cfg
      // chainWebpack also available besides this extendWebpack
      // },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      },
    },
  };
};
