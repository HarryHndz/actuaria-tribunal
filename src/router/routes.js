const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'form-login',
        component: () => import('pages/LoginForm.vue'),
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token')) {
            next({
              path: '/inicio',
            });
          }
          next();
        },
      },
    ],
  },
  {
    path: '/inicio',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        name: 'inicio',
        path: '/',
        component: () => import('pages/Index.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/form-perfil',
        name: 'form-perfil',
        component: () => import('pages/PerfilForm.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/ayuda',
        name: 'ayuda',
        component: () => import('pages/Ayuda.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/lista-estrados',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        path: 'generacion',
        name: 'generacion-listado',
        component: () => import('pages/ListaEstrados/Generacion.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'listado/:uuid',
        name: 'listado-acuerdo',
        props: true,
        component: () => import('pages/ListaEstrados/Consulta.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'busqueda',
        name: 'busqueda-listado-acuerdo',
        props: true,
        component: () => import('pages/ListaEstrados/Busqueda.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/notificaciones-comparecencia',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        path: 'generacion',
        name: 'generacion-notificaciones-comparecencia',
        component: () => import('pages/NotificacionesComparecencia/Generacion.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'listado/:uuid',
        name: 'listado-notificaciones-comparecencia',
        props: true,
        component: () => import('pages/NotificacionesComparecencia/Consulta.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'busqueda',
        name: 'busqueda-listado-notificaciones-comparecencia',
        props: true,
        component: () => import('pages/NotificacionesComparecencia/Busqueda.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/notificaciones',
    component: () => import('layouts/BaseLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'busqueda',
        name: 'notificaciones-busqueda',
        component: () => import('pages/Notificaciones/Busqueda.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/expediente',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        path: 'consulta/:uuid',
        name: 'expediente-consulta',
        component: () => import('pages/ExpedienteConsulta/Consulta.vue'),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'busqueda',
        name: 'expediente-busqueda',
        component: () => import('pages/ExpedienteConsulta/Busqueda.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'notificaciones/consulta/:uuid',
        name: 'expediente-notificaciones-consulta',
        component: () => import('pages/ExpedienteConsulta/NotificacionesConsulta.vue'),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/citas-sco',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        path: 'busqueda',
        name: 'busqueda-citas-sco',
        component: () => import('pages/BusquedaCitasSco'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/admin-tipos-leyendas',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        path: '',
        name: 'admin-tipos-leyendas',
        component: () => import('pages/AdminTiposLeyendas'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/grupo-plantillas',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        path: 'busqueda',
        name: 'grupo-plantillas-busqueda',
        component: () => import('pages/GrupoPlantillas/Busqueda.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'consulta/:uuid',
        name: 'grupo-plantillas-consulta',
        component: () => import('pages/GrupoPlantillas/Consulta.vue'),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/generacion-cedula',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        path: '',
        name: 'generacion-cedula',
        component: () => import('pages/GeneracionCedulas/GeneracionCedula.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'detalle/:uuid',
        name: 'generacion-cedula-detalle',
        component: () => import('pages/GeneracionCedulas/GeneracionCedulaDetalle.vue'),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      // {
      //   path: 'consulta/acuerdo/:uuid',
      //   name: 'generacion-cedula-consulta',
      //   component: () => import('pages/GeneracionCedulas/GeneracionCedulaConsulta.vue'),
      //   props: true,
      //   meta: {
      //     requiresAuth: true,
      //   },
      // },
      {
        path: 'busqueda',
        name: 'busqueda-generacion-cedula',
        component: () => import('pages/GeneracionCedulas/GeneracionCedulaBusqueda.vue'),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
