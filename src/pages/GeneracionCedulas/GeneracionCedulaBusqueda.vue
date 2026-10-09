<template>
  <div class="q-pa-md">
    <div class="q-pa-sm q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Inicio" icon="home" to="/" />
        <q-breadcrumbs-el label="Busqueda" icon="search"/>
      </q-breadcrumbs>
    </div>

    <div class="q-mb-sm text-center titulo">
      <strong>GENERACIÓN CÉDULAS v{{env.VERSION_GENERACION_CEDULAS}}</strong>
    </div>

    <q-tabs
      dense
      v-model="tab"
      class="text-teal q-mb-lg"
    >
      <q-route-tab name="consulta"
        icon="search"
        label="Consulta"
        class="text-black"
        :to="{name: 'busqueda-generacion-cedula'}"
      />
      <q-route-tab name="generacion"
        icon="input"
        label="Generación"
        class="text-black"
        :to="{name: 'generacion-cedula'}"
      />
    </q-tabs>

    <div class="q-gutter-y-sm">
      <div class="SIDJ-box">
        <div class="row">
          <div class="col-md-12">
            <label class="q-ma-sm" for="no_folio">Búsqueda</label>
            <q-input outlined
              autofocus
              stack-label
              autocomplete="off"
              name="no_folio"
              label="No folio"
              class="q-ma-sm"
              v-model="filtros.folio"
              v-on:keyup.enter="busqueda"
            />
          </div>

          <template v-if="busqueda_avanzada">
            <div class="col-md-6">
              <label class="q-ma-sm" for="fecha_inicio">Fecha de inicio</label>
              <q-input outlined
                stack-label
                class="q-ma-sm"
                mask="####-##-##"
                autocomplete="off"
                name="fecha_inicio"
                label="Fecha de inicio"
                v-on:keyup.enter="busqueda"
                v-model="filtros.fecha_inicio"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateInicial"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="filtros.fecha_inicio"
                        @input="() => $refs.qDateInicial.hide()"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

            <div class="col-md-6">
              <label class="q-ma-sm" for="fecha_fin">Fecha final</label>
              <q-input outlined
                stack-label
                class="q-ma-sm"
                mask="####-##-##"
                autocomplete="off"
                name="Fecha final"
                label="Fecha final"
                v-on:keyup.enter="busqueda"
                v-model="filtros.fecha_fin"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateFinal"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="filtros.fecha_fin"
                        @input="() => $refs.qDateFinal.hide()"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </template>

          <div class="col-md-6">
            <q-btn class="q-ma-sm q-mt-md"
              color="warning"
              icon="search"
              label="Buscar"
              :loading="fetching"
              @click="busqueda"
            />
          </div>
          <div class="col-md-6">
            <div class="col-md-6" align="right">
              <q-btn class="q-ma-sm q-mt-md"
                color="warning"
                :icon="busqueda_avanzada ? 'expand_less' : 'expand_more'"
                @click.prevent="busqueda_avanzada = !busqueda_avanzada"
              />
            </div>
          </div>
        </div>
      </div>

      <q-separator class="q-my-lg"/>

      <div class="x_content text-center" v-if="fetching">
        <q-spinner
          color="black"
          size="4em"
          :thickness="5"
        />
      </div>

      <tabla-listados
        v-if="!fetching && resultados.length > 0"
        :resultados="resultados"
      >
      </tabla-listados>

      <template v-if="resultados.length == 0 && !fetching">
        <div class="x_content">
          <h6 class="text-center">No se encontraron resultados</h6>
        </div>
      </template>

      <div  v-if="pagination.total > 10 && !fetching"
        class="q-pa-lg flex flex-center"
      >
        <q-pagination
          v-model="filtros.page"
          color="pink-10"
          :min="1"
          :max="pagination.total_pages"
          :max-pages="6"
          :direction-links="true"
          @input="busquedaPaginacion"
        >
        </q-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  QTabs,
  QDate,
  QInput,
  QSpinner,
  QRouteTab,
  QSeparator,
  QPagination,
  QPopupProxy,
  QBreadcrumbs,
  QBreadcrumbsEl,
} from 'quasar';

import errors from 'boot/errors';
import env from 'boot/env';

import TablaListados from 'components/GeneracionCedulas/Busqueda/TablaListados';

export default {
  name: 'busqueda-atc',
  data() {
    return {
      tab: 'Consulta',
      fetching: false,
      busqueda_avanzada: false,
      filtros: {
        folio: '',
        page: 1,
        limit: 10,
        fecha_fin: null,
        fecha_inicio: null,
        orderBy: 'desc',
      },
    };
  },
  async beforeMount() {
    this.$emit('leftDrawerOpen', false);
    this.fetching = true;

    if (!this.roles.includes(1)) {
      this.filtros = {
        ...this.filtros,
        user_id: this.usuario.user_id,
      };
    }
    try {
      await this.$store.dispatch('areaTrabajoCedulas/fetchAllAreasTrabajoCedulas', this.filtros);
      this.fetching = false;
      return Promise.resolve(true);
    } catch (err) {
      errors(err);
      this.fetching = false;
      return Promise.reject(true);
    }
  },
  components: {
    QTabs,
    QDate,
    QInput,
    QSpinner,
    QRouteTab,
    QSeparator,
    QPagination,
    QPopupProxy,
    QBreadcrumbs,
    QBreadcrumbsEl,
    TablaListados,
  },
  computed: {
    env() {
      return env;
    },
    pagination() {
      return this.$store.getters['areaTrabajoCedulas/getAreasTrabajoCedulasPagination'];
    },
    resultados() {
      return this.$store.getters['areaTrabajoCedulas/getAreasTrabajoCedulasVisibles'];
    },
    roles() {
      return this.$store.getters['session/getRolesById'];
    },
    usuario() {
      return this.$store.getters['session/getUsuario'];
    },
  },
  methods: {
    async busqueda() {
      this.fetching = true;

      try {
        await this.$store.dispatch('areaTrabajoCedulas/fetchAllAreasTrabajoCedulas', this.filtros);

        if (this.pagination.total === 0) {
          this.fetching = false;
          return Promise.resolve(true);
        }

        this.fetching = false;
        return Promise.resolve(true);
      } catch (err) {
        errors(err);
        this.fetching = false;
        return Promise.reject(true);
      }
    },
    async busquedaPaginacion(page) {
      this.fetching = true;
      if (!Number.isInteger(page)) {
        page = 1;
      }

      try {
        await this.$store.dispatch('areaTrabajoCedulas/fetchAllAreasTrabajoCedulas', {
          ...this.filtros,
          page,
        });
        if (this.pagination.total === 0) {
          this.fetching = false;
          return Promise.resolve(true);
        }

        this.fetching = false;
        return Promise.resolve(true);
      } catch (err) {
        errors(err);
        this.fetching = false;
        return Promise.reject(true);
      }
    },
  },
  watch: {
    'filtros.folio': {
      handler(val) {
        if (val === '') {
          this.filtros.page = 1;
          this.filtros.folio = null;
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
  .SIDJ-box {
    background: rgba(42, 63, 84, 0.04);
    margin: 10px;
    padding: 10px;
    background-color: #fff;
  }

  .SIDJ-box label{
    font-size: 16px;
    font-weight: 700;
  }
</style>
