<template>
  <div class="q-pa-md">
    <div class="q-pa-sm header shadow-5" :class="bgColor">
      <q-breadcrumbs style="margin: auto 0px;" v-if="!fetching">
        <q-breadcrumbs-el label="Inicio" icon="home" to="/" active-color="black"/>
        <q-breadcrumbs-el label="Busqueda" icon="search" :to="{name: 'expediente-busqueda'}" />
        <q-breadcrumbs-el label="Consulta de expediente" icon="balance" :to="{
          name: 'expediente-consulta',
          params: {
            uuid: expediente.id,
          }
        }"/>
        <q-breadcrumbs-el label="Detalle de acuerdo" icon="view_quilt"/>
      </q-breadcrumbs>

      <q-space/>

      <historial-header />
    </div>

    <div class="q-gutter-y-md">
      <div class="q-mb-sm text-center titulo">
        <strong>CONSULTA DE EXPEDIENTE v{{env.VERSION_CONSULTA_EXPEDIENTE}}</strong>
      </div>

      <box-info-actuacion
        v-if="!fetching"
        :actuacion="actuacion"
      ></box-info-actuacion>

      <div class="x_content text-center" v-if="fetching">
        <q-spinner
          color="black"
          size="4em"
          :thickness="5"
        />
      </div>

      <template v-if="!fetching && !fetchingAcuerdos && acuerdos.length == 0">
        <div class="x_content">
          <h6 class="text-center">No hay acuerdos registrados para esta promoción</h6>
        </div>
      </template>

      <contenedor-acuerdos
        v-if="!fetching && !fetchingAcuerdos && acuerdos.length > 0 "
        :acuerdos="acuerdos"
        :actuacion="actuacion"
        :expediente="expediente"
        @openModalNotificacionEditar="openModalNotificacionEditar"
      ></contenedor-acuerdos>

      <div class="x_content text-center" v-if="fetching || fetchingAcuerdos">
        <q-spinner
          color="black"
          size="4em"
          :thickness="5"
        />
      </div>
    </div>

    <q-dialog
      v-model="showModalNotificacionEditar"
      @hide="closeModalNotificacionEditar"
    >
      <form-notificacion-editar
        v-if="showModalNotificacionEditar"
        :notificacion="notificacionSelected"
        :actores="actores"
        :autoridades="autoridades"
        :autoridadesSub="autoridadesSub"
        :expediente="expediente"
        :terceros="terceros"
        @close="closeModalNotificacionEditar"
      ></form-notificacion-editar>
    </q-dialog>
  </div>
</template>

<script>
import {
  Loading,
  QDialog,
  QSpinner,
  QSpinnerGears,
  QBreadcrumbs,
  QBreadcrumbsEl,
} from 'quasar';

import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';

import env from 'boot/env';
import errors from 'boot/errors';

import HistorialHeader from 'components/Generales/HistorialHeader';
import BoxInfoActuacion from 'components/ExpedienteConsulta/NotificacionesConsulta/BoxInfoActuacion';
import ContenedorAcuerdos from 'components/ExpedienteConsulta/NotificacionesConsulta/Acuerdos/ContenedorAcuerdos';
import FormNotificacionEditar from 'components/ExpedienteConsulta/NotificacionesConsulta/Notificaciones/FormNotificacionEditar';

import 'src/css/SIDJ-style.css';
import 'src/css/ConsultaExpediente.sass';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
  name: 'notificaciones-consulta',
  props: {
    uuid: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      fetching: false,
      fetchingAcuerdos: false,
      notificacionSelected: {},
      showModalNotificacionEditar: false,
    };
  },
  components: {
    QDialog,
    QSpinner,
    QBreadcrumbs,
    QBreadcrumbsEl,
    HistorialHeader,
    BoxInfoActuacion,
    ContenedorAcuerdos,
    FormNotificacionEditar,
  },
  async preFetch({ store }) {
    Loading.show({
      spinner: QSpinnerGears,
      backgroundColor: 'pink-8',
    });

    try {
      const dateLimit = env.DATE_CACHE_LIMIT
        ? env.DATE_CACHE_LIMIT
        : '2024-02-29 23:59:59';

      const cache = moment().isAfter(dateLimit);

      await axios.all([
        store.dispatch('procesos/fetchAllProcesos', {
          limit: -1,
        }),
        store.dispatch('promoventes/fetchAllPromoventes', {
          cache,
          limit: -1,
        }),
        store.dispatch('tiposAcuerdo/fetchAllTiposAcuerdos', {
          cache,
          limit: -1,
        }),
        store.dispatch('tiposNotifiquese/fetchAllTiposNotifiquese', {
          cache,
          limit: -1,
        }),
        store.dispatch('tiposNotificaciones/fetchAllTiposNotificaciones', {
          limit: -1,
        }),
        store.dispatch('ponencias/fetchAllPonencias', {
          cache,
          limit: -1,
        }),
        store.dispatch('actuarios/fetchAllActuarios', {
          cache,
          limit: -1,
        }),
        store.dispatch('tiposAnexos/fetchAllTiposAnexos', {
          cache,
          limit: -1,
        }),
        store.dispatch('tiposListados/fetchAllTiposListados', {
          limit: -1,
        }),
        store.dispatch('tiposDocumentos/fetchAllTiposDocumentos', {
          cache,
          limit: -1,
        }),
      ]);
    } catch (error) {
      errors(error);
    } finally {
      Loading.hide();
    }
  },
  async beforeMount() {
    this.$emit('leftDrawerOpen', false);

    this.fetching = true;
    try {
      await this.$store.dispatch('actuaciones/fetchAllActuaciones', {
        uuid: this.uuid,
        include: 'actor,autoridad,terceroperjudicado',
        limit: 1,
      });

      await this.$store.dispatch('expedientes/fetchAllExpedientes', {
        juicio: this.actuacion.juicio_id,
        include: 'actores,autoridades,terceros_perjudicados',
        limit: 1,
      });

      this.$store.dispatch('expedientes/putHistory', this.expediente);

      const filtro = {
        limit: -1,
        areas: null,
      };

      if (this.permisos.some(i => i !== 1)) {
        filtro.areas = this.localizacion.area_id;
      }

      await this.$store.dispatch('tiposLeyendas/fetchAllTiposLeyendas', filtro);

      if ([1].includes(this.expediente.tipo_demanda_id)) {
        this.$store.dispatch('layoutsLabels/setMainColor', 'pink-10');
        this.$store.dispatch('layoutsLabels/setBgHeaderColor', 'bg-pink-2');
        this.$store.dispatch('layoutsLabels/setBgHeaderLayoutColor', 'bg-pink-10');
      }
      if ([2].includes(this.expediente.tipo_demanda_id)) {
        this.$store.dispatch('layoutsLabels/setMainColor', 'pink-10');
        this.$store.dispatch('layoutsLabels/setBgHeaderColor', 'bg-pink-2');
        this.$store.dispatch('layoutsLabels/setBgHeaderLayoutColor', 'bg-pink-10');
      }
      if ([3].includes(this.expediente.tipo_demanda_id)) {
        this.$store.dispatch('layoutsLabels/setMainColor', 'yellow-10');
        this.$store.dispatch('layoutsLabels/setBgHeaderColor', 'bg-yellow-3');
        this.$store.dispatch('layoutsLabels/setBgHeaderLayoutColor', 'bg-yellow-9');
      }
      if ([4].includes(this.expediente.tipo_demanda_id)) {
        this.$store.dispatch('layoutsLabels/setMainColor', 'purple-10');
        this.$store.dispatch('layoutsLabels/setBgHeaderColor', 'bg-purple-2');
        this.$store.dispatch('layoutsLabels/setBgHeaderLayoutColor', 'bg-purple-5');
      }
      if ([5].includes(this.expediente.tipo_demanda_id)) {
        this.$store.dispatch('layoutsLabels/setMainColor', 'red-10');
        this.$store.dispatch('layoutsLabels/setBgHeaderColor', 'bg-red-2');
        this.$store.dispatch('layoutsLabels/setBgHeaderLayoutColor', 'bg-red-14');
      }
      if ([6].includes(this.expediente.tipo_demanda_id)) {
        this.$store.dispatch('layoutsLabels/setMainColor', 'blue-9');
        this.$store.dispatch('layoutsLabels/setBgHeaderColor', 'bg-blue-2');
        this.$store.dispatch('layoutsLabels/setBgHeaderLayoutColor', 'bg-blue-8');
      }

      this.fetching = false;
      this.fetchingAcuerdos = true;

      if (this.expediente.autoridades_substanciadoras) {
        const autoridades = this.expediente.autoridades_substanciadoras
          .map(i => i.id);

        if (autoridades.length > 0) {
          const autoridadesIds = autoridades.join(',');

          await this.$store.dispatch('autoridades/fetchAllAutoridades', {
            autoridad_id: autoridadesIds,
            limit: -1,
          });
        }
      }

      await axios.all([
        this.$store.dispatch('acuerdos/fetchAllAcuerdos', {
          actuacion: this.actuacion.actuacion_id,
          limit: -1,
        }),
        this.$store.dispatch('notificaciones/fetchAllNotificaciones', {
          limit: -1,
          include: 'archivo',
          actuacion: this.actuacion.actuacion_id,
        }),
        this.$store.dispatch('anexos/fetchAllAnexos', {
          actuacion: this.actuacion.actuacion_id,
          limit: -1,
        }),
        this.$store.dispatch('documentos/fetchAllDocumentos', {
          actuacion: this.actuacion.actuacion_id,
          limit: -1,
        }),
      ]);
    } catch (e) {
      errors(e);
    } finally {
      this.fetching = false;
      this.fetchingAcuerdos = false;
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch('layoutsLabels/setMainColor', 'pink-10');
    this.$store.dispatch('layoutsLabels/setBgHeaderColor', 'bg-pink-2');
    this.$store.dispatch('layoutsLabels/setBgHeaderLayoutColor', 'bg-pink-10');
    next();
  },
  computed: {
    env() {
      return env;
    },
    acuerdos() {
      return this.$store.getters['acuerdos/getAcuerdosByActuacionId'](this.actuacion.actuacion_id);
    },
    actuacion() {
      return this.$store.getters['actuaciones/getActuacionById'](this.uuid);
    },
    actores() {
      return this.$store.getters['actores/getActoresAll'].filter(item => this.expediente.actores.includes(item.id));
    },
    autoridades() {
      return this.$store.getters['autoridades/getAutoridadesAll'].filter(item => this.expediente.autoridades.includes(item.id));
    },
    autoridadesSub() {
      if (!this.expediente.autoridades_substanciadoras) {
        return [];
      }

      const autoriadesIds = this.expediente.autoridades_substanciadoras
        .map(i => i.id);

      const autoridades = this.$store.getters['autoridades/getAutoridadesAll']
        .filter(item => autoriadesIds.includes(item.autoridad_id));

      return _.sortBy(autoridades, item => item.created_at);
    },
    bgColor() {
      return this.$store.getters['layoutsLabels/getBgHeaderColor'];
    },
    terceros() {
      return this.$store.getters['terceros/getTercerosAll'].filter(item => this.expediente.terceros_perjudicados.includes(item.id));
    },
    expediente() {
      return this.$store.getters['expedientes/getExpedienteByExpedienteId'](this.actuacion.juicio_id);
    },
    folio() {
      if (this.actuacion.no_folio) {
        const data = this.actuacion.no_folio.split('/');
        return data[0];
      }
      return null;
    },
    localizacion() {
      return this.$store.getters['session/getLocalizacion'];
    },
    notificaciones() {
      const notificaciones = this.$store.getters['notificaciones/getNotificacionesAll'];
      return notificaciones.filter(item => this.acuerdos.includes(item.acuerdo_id));
    },
    permisos() {
      return this.$store.getters['session/getRolesById'];
    },
    proceso() {
      return this.$store.getters['procesos/getProcesoByProcesoId'](this.actuacion.proceso_id);
    },
    vistos() {
      return this.$store.getters['expedientes/getExpedienteHistory'];
    },
  },
  methods: {
    openModalNotificacionEditar(notificacion) {
      this.notificacionSelected = notificacion;
      this.showModalNotificacionEditar = true;
    },
    closeModalNotificacionEditar() {
      this.notificacionSelected = {};
      this.showModalNotificacionEditar = false;
    },
  },
};
</script>
