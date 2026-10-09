<template>
  <q-page class="q-pa-md">
    <div class="q-pa-sm q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Inicio" icon="home" to="/" />
        <q-breadcrumbs-el label="Busqueda" icon="search"/>
      </q-breadcrumbs>
    </div>

    <div class="q-mb-sm text-center">
      <div class="titulo">
        <strong>CITAS SCO v{{env.VERSION_CITAS_SCO}}</strong>
      </div>
    </div>

    <div class="SIDJ-box">
      <div class="row">
        <div class="col-md-12">
          <label class="q-ma-sm" for="no_folio">Búsqueda</label>
          <q-input outlined
            autofocus
            stack-label
            autocomplete="off"
            name="no_folio"
            label="No folio citas"
            class="q-ma-sm"
            v-model="filtros.folio"
            v-on:keyup.enter="busquedaB"
          />
        </div>
      </div>

      <template v-if="busqueda_avanzada">
        <div class="row">
          <div class="col-md-12 col-xs-12">
            <label class="q-ma-sm" for="horarios">Horarios</label>
             <q-select
              outlined
              use-input
              clearable
              stack-label
              label="Horarios"
              class="q-ma-sm"
              :options="aConfiguracionScoFiltered"
              v-model="aConfiguracionScoObject"
              @filter="filterAConfScoFn"
            />
          </div>
        </div>
      </template>

      <div class="row">
        <div class="col-md-6">
          <q-btn class="q-ma-sm q-mt-md"
            color="warning"
            icon="search"
            label="Buscar"
            :loading="fetching"
            @click="busquedaB"
          />
        </div>

        <div class="col-md-6 col-xs-12 text-right">
          <span>
            <q-btn class="q-ma-sm q-mt-md"
              color="warning"
              :icon="busqueda_avanzada ? 'expand_less' : 'expand_more'"
              @click.prevent="busqueda_avanzada = !busqueda_avanzada"
            />
            <q-tooltip>Búsqueda avanzada</q-tooltip>
          </span>
        </div>
      </div>
    </div>

    <q-separator style="margin: 30px 5px 10px 5px;"/>

    <div class="row">
      <div class="col-md-6 col-xs-6 text-left">
        <span>
          <q-btn
            push
            round
            icon="more"
            color="primary"
            class="q-mx-md"
          >
            <q-menu fit v-if="!fetching && resultados.length > 0"
              anchor="top right"
              self="top left"
            >
              <q-list style="min-width: 150px" class="q-ma-sm">
                <q-item clickable v-close-popup
                  @click.prevent="reportePdf"
                >
                  <q-item-section>
                    <q-icon name="fa fa-file-pdf" color="black"
                      size="1.5em" clickable
                    /> Reporte PDF
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup
                  @click.prevent="reporteExcel"
                >
                  <q-item-section>
                    <q-icon name="fa fa-file-excel" color="black"
                      size="1.5em" clickable
                    /> Reporte EXCEL
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-tooltip anchor="top middle" self="bottom middle">Opciones</q-tooltip>
        </span>
      </div>
    </div>

    <div class="row">
      <div class="col-md-9 col-xs-12 q-mt-md">
        <template v-if="!fetching">
          <citas-resultados
            :filtros="filtros"
            :resultados="resultados"
            :fetchingLoading="fetchingLoading"
          >
          </citas-resultados>
        </template>

        <div class="x_content text-center" v-if="fetching">
          <q-spinner
            color="black"
            size="4em"
            :thickness="5"
          />
        </div>
      </div>

      <div class="col-md-3 col-xs-12 q-mt-sm text-center">
        <component-date
          @seleccionDate="busquedaCalendario"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import {
  QMenu,
  QInput,
  QSelect,
  Loading,
  QSpinner,
  ClosePopup,
  QSeparator,
  QBreadcrumbs,
  QBreadcrumbsEl,
} from 'quasar';

import axios from 'axios';
import moment from 'moment';

import env from 'boot/env';
import scobridge from 'boot/scobridge';

import ComponentDate from 'components/BusquedaCitasSco/ComponentDate';
import CitasResultados from 'components/BusquedaCitasSco/CitasResultados';

import 'src/css/SIDJ-style.css';
import errors from 'boot/errors';

export default {
  name: 'busqueda-citas',
  data() {
    return {
      tab: 1,
      fetching: false,
      fetchingLoading: false,
      busqueda_avanzada: false,
      aConfiguracionScoObject: null,
      aConfiguracionScoFiltered: this.configuracionesSco,
      filtros: {
        folio: '',
        page: 1,
        limit: -1,
        orderBy: 'asc',
        fecha_cita: moment().format('YYYY-MM-DD'),
        horario_id: null,
        area_id: 42,
      },
    };
  },
  components: {
    QMenu,
    QInput,
    QSelect,
    QSpinner,
    QSeparator,
    QBreadcrumbs,
    ComponentDate,
    QBreadcrumbsEl,
    CitasResultados,
  },
  directives: {
    ClosePopup,
  },
  async preFetch({ store }) {
    Loading.show();
    try {
      await axios.all([
        store.dispatch('tiposTramitesSco/fetchAllTiposTramitesSco', {
          limit: -1,
          cache: true,
        }),
        store.dispatch('areasConfiguracionesSco/fetchAllAreasConfiguracionesSco', {
          limit: -1,
        }),
      ]);
      Loading.hide();
      return Promise.resolve(true);
    } catch (e) {
      errors(e);
      Loading.hide();
      return Promise.reject(true);
    }
  },
  beforeMount() {
    this.$emit('leftDrawerOpen', false);
    this.busqueda();
  },
  computed: {
    env() {
      return env;
    },
    configuracionesSco() {
      return this.$store.getters['areasConfiguracionesSco/getAreasConfiguracionesScoAll']
        .map(i => ({
          label: i.descripcion,
          value: i.configuracion_id,
        }));
    },
    pagination() {
      return this.$store.getters['oficialiaCitas/getOficialiaCitasPagination'];
    },
    resultados() {
      return this.$store.getters['oficialiaCitas/getOficialiaCitasVisibles'];
    },
  },
  methods: {
    filterAConfScoFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.aConfiguracionScoFiltered = this.configuracionesSco
          .filter(v => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    async busqueda(filtros = {}) {
      this.fetchingLoading = true;

      this.filtros = {
        ...this.filtros,
        ...filtros,
      };

      if (this.filtros.folio || this.filtros.folio !== '') {
        this.filtros.fecha_cita = null;
      }

      try {
        await this.$store.dispatch('oficialiaCitas/fetchAllOficialiaCitas', this.filtros);

        if (this.pagination.total === 0) {
          this.fetchingLoading = false;
          return Promise.resolve(true);
        }

        this.fetchingLoading = false;
        return Promise.resolve(true);
      } catch (err) {
        errors(err);
        this.fetchingLoading = false;
        return Promise.resolve(true);
      }
    },
    busquedaB(page = null) {
      if (!Number.isInteger(page)) {
        page = 1;
      }
      this.busqueda({
        ...this.filtros,
        page,
        limit: -1,
        area_id: 42,
        fecha_cita: moment().format('YYYY-MM-DD'),
      });
    },
    busquedaCalendario(fecha) {
      if (fecha) {
        this.filtros.fecha_cita = fecha;
        return this.busqueda({
          ...this.filtros,
          fecha_cita: fecha,
          limit: -1,
          area_id: 42,
        });
      }
      return Promise.resolve(true);
    },
    async reportePdf() {
      try {
        Loading.show();

        const response = await scobridge.get('/v1/reporte-pdf/', {
          params: this.filtros,
        });

        Loading.hide();
        const linkSource = `data:application/pdf;base64,${response.data}`;
        const downloadLink = document.createElement('a');
        const fileName = `reporte_citas_${moment().format('YYYY-MM-DD')}.pdf`;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();

        return Promise.resolve(true);
      } catch (e) {
        errors(e);
        Loading.hide();
        return Promise.reject(true);
      }
    },
    async reporteExcel() {
      try {
        Loading.show();
        const response = await scobridge.get('/v1/reporte-excel/', {
          params: this.filtros,
        });
        Loading.hide();
        const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${response.data}`;
        const downloadLink = document.createElement('a');
        const fileName = `reporte_citas_${moment().format('YYYY-MM-DD')}.xlsx`;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();

        return Promise.resolve(true);
      } catch (error) {
        errors(error);
        Loading.hide();
        return Promise.reject(true);
      }
    },
  },
  watch: {
    aConfiguracionScoObject(val) {
      /* eslint no-unused-expressions: [2, { allowTernary: true }] */
      val != null
        ? this.filtros.horario_id = val.value
        : this.filtros.horario_id = null;
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
