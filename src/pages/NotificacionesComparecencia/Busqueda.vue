<template>
  <div class="q-pa-md">
    <div class="q-pa-sm q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Inicio" icon="home" to="/" />
        <q-breadcrumbs-el label="Busqueda" icon="search"/>
      </q-breadcrumbs>
    </div>

    <div class="q-mb-sm text-center titulo">
      <strong>
        NOTIFICACIONES COMPARECENCIA v{{env.VERSION_NOTIFICACIONES_COMPARECENCIA}}
      </strong>
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
        :to="{name: 'busqueda-listado-notificaciones-comparecencia'}"
      />
      <q-route-tab name="generacion"
        icon="input"
        label="Generación"
        class="text-black"
        :to="{name: 'generacion-notificaciones-comparecencia'}"
      />
    </q-tabs>

    <div class="q-gutter-y-sm">
      <div class="SIDJ-box">
        <div class="row">
          <div class="col-md-12">
            <label class="q-ma-sm" for="no_folio">Búsqueda</label>
            <q-input outlined
              autofocus
              autocomplete="off"
              name="no_folio"
              label="No folio listado, No folio acuerdo"
              class="q-ma-sm"
              v-model="filtros.folio"
              v-on:keyup.enter="busqueda"
            />
          </div>

          <template v-if="busqueda_avanzada">
            <div class="col-md-6">
              <label class="q-ma-sm" for="fecha_inicio">Fecha de inicio</label>
              <q-input outlined
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

            <div class="col-md-4">
              <label class="q-ma-sm" for="sala">Sala</label>
              <q-select
                outlined
                use-input
                clearable
                class="q-ma-sm"
                label="Sala"
                :options="sFiltered"
                v-model="salaObject"
                @filter="filterSalaFn"
              />
            </div>

            <div class="col-md-4">
              <label class="q-ma-sm" for="ponencia">Ponencia</label>
              <q-select
                outlined
                use-input
                clearable
                class="q-ma-sm"
                label="Ponencia"
                :options="pFiltered"
                v-model="ponenciaObject"
                @filter="filterPonenciaFn"
              />
            </div>

            <div class="col-md-4">
              <label class="q-ma-sm" for="estatus">Estatus</label>
              <q-select
                outlined
                clearable
                class="q-ma-sm"
                label="Estatus"
                :options="estatus"
                v-model="estatusObject"
              />
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

      <q-separator style="margin:30px 5px;"/>

      <div class="x_content text-center" v-if="fetching">
        <q-spinner
          color="black"
          size="4em"
          :thickness="5"
        />
      </div>

      <contenedor-listados
        v-if="!fetching && resultados.length > 0"
        :resultados="resultados"
        @dar-alta="darAlta"
        @dar-baja="darBaja"
      >
      </contenedor-listados>

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
  Loading,
  QSelect,
  QSpinner,
  QRouteTab,
  QSeparator,
  QPagination,
  QPopupProxy,
  QBreadcrumbs,
  QSpinnerGears,
  QBreadcrumbsEl,
  Notify,
} from 'quasar';

import 'src/css/SIDJ-style.css';
import env from 'boot/env';

import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import errors from 'boot/errors';

import ContenedorListados from 'components/NotificacionesComparecencia/Busqueda/ContenedorListados';

export default {
  name: 'busqueda-listado',
  data() {
    return {
      tab: 'consulta',
      fetching: false,
      busqueda_avanzada: false,
      ponenciaObject: null,
      salaObject: null,
      estatusObject: null,
      pFiltered: this.ponencias,
      sFiltered: this.salas,
      filtros: {
        folio: '',
        page: 1,
        limit: 10,
        fecha_fin: '',
        fecha_inicio: '',
        pendientes: null,
        folio_acuerdo: '',
        orderByDesc: 'fecha_publicacion',
        sala_id: null,
        ponencia_id: null,
        estatus_id: null,
      },
    };
  },
  preFetch({ store }) {
    Loading.show({
      spinner: QSpinnerGears,
      backgroundColor: 'pink-8',
    });
    return axios.all([
      store.dispatch('actuarios/fetchAllActuarios', {
        limit: -1,
      }),
      store.dispatch('ponencias/fetchAllPonencias', {
        limit: -1,
      }),
      store.dispatch('salas/fetchAllSalas', {
        limit: -1,
      }),
    ]).then(() => {
      Loading.hide();
    });
  },
  beforeMount() {
    this.$emit('leftDrawerOpen', false);

    this.fetching = true;
    this.filtros.pendientes = 1;
    this.$store.dispatch('listadosAcuerdosComparecencia/fetchAllListadosAcuerdos', this.filtros)
      .then(() => {
        this.fetching = false;
        return Promise.resolve(true);
      });
  },
  components: {
    QTabs,
    QDate,
    QInput,
    QSelect,
    QSpinner,
    QRouteTab,
    QSeparator,
    QPagination,
    QPopupProxy,
    QBreadcrumbs,
    QBreadcrumbsEl,
    ContenedorListados,
  },
  computed: {
    env() {
      return env;
    },
    estatus() {
      return [
        {
          label: 'PENDIENTES DE PUBLICAR',
          value: 1,
        },
        {
          label: 'PUBLICADOS',
          value: 2,
        },
        {
          label: 'DADOS DE BAJA',
          value: 3,
        },
      ];
    },
    salas() {
      const salas = this.$store.getters['salas/getSalasAll'].map(item => ({
        label: item.sala,
        value: item.sala_id,
      }));
      return _.orderBy(salas, ['value', 'label'], ['asc', 'asc']);
    },
    ponencias() {
      const ponencias = this.$store.getters['ponencias/getPonenciasAll'].map(item => ({
        label: `${item.clave} ${item.ponencia}`,
        value: item.ponencia_id,
        sala_id: item.sala_id,
      }));

      return _.orderBy(ponencias.filter(item => item.sala_id === this.filtros.sala_id), ['value', 'label'], ['asc', 'asc']);
    },
    pagination() {
      return this.$store.getters['listadosAcuerdosComparecencia/getListadosAcuerdosPagination'];
    },
    resultados() {
      return this.$store.getters['listadosAcuerdosComparecencia/getListadosAcuerdosVisibles'];
    },
  },
  methods: {
    filterSalaFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.sFiltered = this.salas.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    filterPonenciaFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.pFiltered = this.ponencias.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    busqueda() {
      this.fetching = true;

      const filterFolioAcuerdo = /^(A|PA)(-)(\d{1,6})(-)(\d{4})/;
      const filterFolioLisado = /^(SO)?(\d{2})(-)(\d{1,5})(\/\d{4})/;

      this.filtros.pendientes = null;

      if (filterFolioLisado.exec(this.filtros.folio) !== null) {
        this.filtros.folio_acuerdo = null;
      }

      if (filterFolioAcuerdo.exec(this.filtros.folio) !== null) {
        this.filtros.folio_acuerdo = this.filtros.folio;
        this.filtros.folio = null;
      }

      return this.$store.dispatch('listadosAcuerdosComparecencia/fetchAllListadosAcuerdos', this.filtros).then(() => {
        if (this.pagination.total === 0) {
          this.fetching = false;
          return Promise.resolve(true);
        }

        this.fetching = false;
        return Promise.resolve(true);
      });
    },
    busquedaPaginacion(page) {
      this.fetching = true;
      if (!Number.isInteger(page)) {
        page = 1;
      }

      const filterFolioAcuerdo = /^(A-|PA-)(\d{1,6})(-\d{4})/;
      const filterFolioLisado = /^(SO)?(\d{2})(-)(\d{1,5})(\/\d{4})/;

      if (filterFolioLisado.exec(this.filtros.folio) !== null) {
        this.filtros.folio_acuerdo = null;
      }

      if (filterFolioAcuerdo.exec(this.filtros.folio) !== null) {
        this.filtros.folio = null;
      }

      return this.$store.dispatch('listadosAcuerdosComparecencia/fetchAllListadosAcuerdos', {
        ...this.filtros,
        page,
      }).then(() => {
        if (this.pagination.total === 0) {
          this.fetching = false;
          return Promise.resolve(true);
        }

        this.fetching = false;
        return Promise.resolve(true);
      });
    },
    darBaja(id) {
      this.$swal({
        title: '¿Esta seguro de dar de baja el listado publicado?',
        text: 'Este cambio no se podrá revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Dar de baja',
      }).then((resp) => {
        if (resp.value) {
          Loading.show({
            message: 'Dando de baja...',
          });
          return this.$store.dispatch('listadosAcuerdosComparecencia/putBajaListadoAcuerdo', {
            id,
            fecha_baja: moment().format('YYYY-MM-DD'),
          }).then(() => {
            Loading.hide();
            Notify.create({
              message: 'Listado dado de baja',
              position: 'bottom',
              timeout: 5000,
            });
            return Promise.resolve(true);
          }).catch((err) => {
            Loading.hide();
            errors(err);
          });
        }
        return Promise.resolve(true);
      });
    },
    darAlta(id) {
      this.$swal({
        title: '¿Esta seguro de volver a publicar el listado?',
        text: 'Este cambio no se podrá revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Publicar',
      }).then((resp) => {
        if (resp.value) {
          Loading.show({
            message: 'Publicando...',
          });
          return this.$store.dispatch('listadosAcuerdosComparecencia/putAltaListadoAcuerdo', {
            id,
            fecha_baja: null,
          }).then(() => {
            Loading.hide();
            Notify.create({
              message: 'Listado publicado',
              position: 'bottom',
              timeout: 5000,
            });
            return Promise.resolve(true);
          }).catch((err) => {
            Loading.hide();
            errors(err);
          });
        }
        return Promise.resolve(true);
      });
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
    salaObject(val) {
      /* eslint no-unused-expressions: [2, { allowTernary: true }] */
      val != null ? this.filtros.sala_id = val.value : this.filtros.sala_id = '';
    },
    ponenciaObject(val) {
      /* eslint no-unused-expressions: [2, { allowTernary: true }] */
      val != null ? this.filtros.ponencia_id = val.value : this.filtros.ponencia_id = '';
    },
    estatusObject(val) {
      /* eslint no-unused-expressions: [2, { allowTernary: true }] */
      val != null ? this.filtros.estatus_id = val.value : this.filtros.estatus_id = '';
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
