<template>
  <div class="q-pa-md">
    <div class="q-pa-sm header shadow-5" :class="bgColor">
      <q-breadcrumbs style="margin: auto 0px;">
        <q-breadcrumbs-el label="Inicio" icon="home" to="/" active-color="black"/>
        <q-breadcrumbs-el label="Busqueda" icon="search" :to="{name: 'expediente-busqueda'}" />
        <q-breadcrumbs-el label="Consulta de expediente" icon="balance"/>
      </q-breadcrumbs>

      <q-space/>

      <historial-header />
    </div>

    <div class="q-gutter-y-md">
      <div class="q-mt-md text-center titulo">
        <strong>CONSULTA DE EXPEDIENTE v{{env.VERSION_CONSULTA_EXPEDIENTE}}</strong>
      </div>

      <box-info-expediente
        v-if="!fetching"
        :expediente="expediente"
      ></box-info-expediente>

      <contenedor-actuaciones
        v-if="!fetching"
        :actuaciones="actuaciones"
        :expediente="expediente"
        @openModalNotificados="openModalNotificados"
        @openModalNotificacion="openModalNotificacion"
        @openModalNotificacionEditar="openModalNotificacionEditar"
      ></contenedor-actuaciones>

      <div class="x_content text-center" v-if="fetching">
        <q-spinner
          color="black"
          size="4em"
          :thickness="5"
        />
      </div>

      <q-dialog
        v-model="showModalNotificacionEditar"
        @hide="closeModalNotificacionEditar"
      >
        <form-notificacion-editar
          v-if="showModalNotificacionEditar"
          :acuerdo="acuerdoSelected"
          :notificacion="notificacionSelected"
          :actores="actores"
          :autoridades="autoridades"
          :autoridadesSub="autoridadesSub"
          :expediente="expediente"
          :terceros="terceros"
          @close="closeModalNotificacionEditar"
        ></form-notificacion-editar>
      </q-dialog>

      <q-dialog
        v-model="showModalNotificados"
        @hide="closeModalNotificados"
      >
        <modal-notificados
          v-if="showModalNotificados"
          :expediente="expediente"
          :acuerdo="acuerdoSelected"
          :notificaciones="notificaciones"
          @openModalNotificacion="openModalNotificacion"
          @openModalNotificacionEditar="openModalNotificacionEditar"
          @close="closeModalNotificados"
        ></modal-notificados>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import {
  Loading,
  QSpinner,
  QBreadcrumbs,
  QSpinnerGears,
  QBreadcrumbsEl,
} from 'quasar';

import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';

import env from 'boot/env';
import errors from 'boot/errors';

import 'src/css/SIDJ-style.css';
import 'src/css/ConsultaExpediente.sass';
import 'sweetalert2/dist/sweetalert2.min.css';

import HistorialHeader from 'components/Generales/HistorialHeader';
import ModalNotificados from 'components/ExpedienteConsulta/Generales/ModalNotificados';
import BoxInfoExpediente from 'components/ExpedienteConsulta/Consulta/BoxInfoExpediente';
import ContenedorActuaciones from 'components/ExpedienteConsulta/Consulta/ContenedorActuaciones';
import FormNotificacionEditar from 'components/ExpedienteConsulta/NotificacionesConsulta/Notificaciones/FormNotificacionEditar';

export default {
  name: 'expediente-consulta',
  props: {
    uuid: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      folio: null,
      fetching: false,

      acuerdoSelected: null,
      notificacionSelected: null,

      showModalNotificados: false,
      showModalNotificacionEditar: false,
    };
  },
  components: {
    QSpinner,
    QBreadcrumbs,
    QBreadcrumbsEl,
    HistorialHeader,
    ModalNotificados,
    BoxInfoExpediente,
    ContenedorActuaciones,
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
        store.dispatch('delegaciones/fetchAllDelegaciones', {
          limit: -1,
          cache: true,
        }),
        store.dispatch('dependenciasAutoridades/fetchAllDependenciasAutoridades', {
          limit: -1,
          cache,
        }),
        store.dispatch('magistrados/fetchAllMagistrados', {
          limit: -1,
          cache,
        }),
        store.dispatch('materias/fetchAllMaterias', {
          limit: -1,
          cache: true,
        }),
        store.dispatch('ponencias/fetchAllPonencias', {
          cache,
          limit: -1,
        }),
        store.dispatch('procesos/fetchAllProcesos', {
          limit: -1,
        }),
        store.dispatch('promoventes/fetchAllPromoventes', {
          cache,
          limit: -1,
        }),
        store.dispatch('salas/fetchAllSalas', {
          cache,
          limit: -1,
        }),
        store.dispatch('secretarios/fetchAllSecretarios', {
          cache,
          limit: -1,
        }),
        store.dispatch('estadosListados/fetchAllEstadosListados', {
          limit: -1,
        }),
        store.dispatch('tiposAcuerdo/fetchAllTiposAcuerdos', {
          cache,
          limit: -1,
        }),
        store.dispatch('tiposAnexos/fetchAllTiposAnexos', {
          cache,
          limit: -1,
        }),
        store.dispatch('tiposDemandas/fetchAllTiposDemandas', {
          limit: -1,
        }),
        store.dispatch('tiposDocumentos/fetchAllTiposDocumentos', {
          cache,
          limit: -1,
        }),
        store.dispatch('tiposJuicios/fetchAllTiposJuicios', {
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
        store.dispatch('tiposPersonas/fetchAllTiposPersonas', {
          cache,
          limit: -1,
        }),
        store.dispatch('tiposTerceros/fetchAllTiposTerceros', {
          limit: -1,
        }),
      ]);
    } catch (e) {
      errors(e);
    } finally {
      Loading.hide();
    }
  },
  async beforeMount() {
    this.$emit('leftDrawerOpen', false);
    this.fetching = true;

    try {
      await this.$store.dispatch('expedientes/fetchAllExpedientes', {
        expediente: this.uuid,
        consulta_expediente: 1,
        modulo: 'actv3_consultar_expediente',
        version: env.VERSION_CONSULTA_EXPEDIENTE,
        area_funcional: 'Actuaria',
        include: 'actores,autoridades,autorizados,representantes,terceros_perjudicados',
        limit: 1,
      });

      this.$store.dispatch('expedientes/putHistory', this.expediente);

      if ([1].includes(this.expediente.tipo_demanda_id)) {
        this.$store.dispatch('layoutsLabels/setMainColor', 'pink-10');
        this.$store.dispatch('layoutsLabels/setBgHeaderColor', 'bg-pink-2');
        this.$store.dispatch('layoutsLabels/setBgHeaderLayoutColor', 'bg-pink-10');

        this.$store.dispatch('layoutsLabels/setLabelActor', 'Actor');
        this.$store.dispatch('layoutsLabels/setLabelActores', 'Actores');
        this.$store.dispatch('layoutsLabels/setLabelAutoridad', 'Autoridad demandada');
        this.$store.dispatch('layoutsLabels/setLabelAutoridades', 'Autoridades demandadas');
        this.$store.dispatch('layoutsLabels/setLabelTercero', 'Tercero interesado');
        this.$store.dispatch('layoutsLabels/setLabelTerceros', 'Terceros interesados');
      }
      if ([2].includes(this.expediente.tipo_demanda_id)) {
        this.$store.dispatch('layoutsLabels/setMainColor', 'pink-10');
        this.$store.dispatch('layoutsLabels/setBgHeaderColor', 'bg-pink-2');
        this.$store.dispatch('layoutsLabels/setBgHeaderLayoutColor', 'bg-pink-10');

        this.$store.dispatch('layoutsLabels/setLabelActor', 'Parte demandada');
        this.$store.dispatch('layoutsLabels/setLabelActores', 'Partes demandadas');
        this.$store.dispatch('layoutsLabels/setLabelAutoridad', 'Parte demandante');
        this.$store.dispatch('layoutsLabels/setLabelAutoridades', 'Partes demandantes');
        this.$store.dispatch('layoutsLabels/setLabelTercero', 'Tercero perjudicado');
        this.$store.dispatch('layoutsLabels/setLabelTerceros', 'Terceros perjudicados');
      }
      if ([3].includes(this.expediente.tipo_demanda_id)) {
        this.$store.dispatch('layoutsLabels/setMainColor', 'yellow-10');
        this.$store.dispatch('layoutsLabels/setBgHeaderColor', 'bg-yellow-3');
        this.$store.dispatch('layoutsLabels/setBgHeaderLayoutColor', 'bg-yellow-9');

        this.$store.dispatch('layoutsLabels/setLabelActor', 'Presunto responsable');
        this.$store.dispatch('layoutsLabels/setLabelActores', 'Presuntos responsables');
        this.$store.dispatch('layoutsLabels/setLabelAutoridad', 'Autoridad investigadora');
        this.$store.dispatch('layoutsLabels/setLabelAutoridades', 'Autoridades investigadoras');
        this.$store.dispatch('layoutsLabels/setLabelTercero', 'Denunciante');
        this.$store.dispatch('layoutsLabels/setLabelTerceros', 'Denunciantes');
      }
      if ([4].includes(this.expediente.tipo_demanda_id)) {
        this.$store.dispatch('layoutsLabels/setMainColor', 'purple-10');
        this.$store.dispatch('layoutsLabels/setBgHeaderColor', 'bg-purple-2');
        this.$store.dispatch('layoutsLabels/setBgHeaderLayoutColor', 'bg-purple-5');

        this.$store.dispatch('layoutsLabels/setLabelActor', 'Recurrente');
        this.$store.dispatch('layoutsLabels/setLabelActores', 'Recurrentes');
        this.$store.dispatch('layoutsLabels/setLabelAutoridad', 'Autoridad investigadora');
        this.$store.dispatch('layoutsLabels/setLabelAutoridades', 'Autoridades investigadoras');
        this.$store.dispatch('layoutsLabels/setLabelTercero', 'Presunto responsable');
        this.$store.dispatch('layoutsLabels/setLabelTerceros', 'Presuntos responsables');
      }
      if ([5].includes(this.expediente.tipo_demanda_id)) {
        this.$store.dispatch('layoutsLabels/setMainColor', 'red-10');
        this.$store.dispatch('layoutsLabels/setBgHeaderColor', 'bg-red-2');
        this.$store.dispatch('layoutsLabels/setBgHeaderLayoutColor', 'bg-red-14');

        this.$store.dispatch('layoutsLabels/setLabelActor', 'Recurrente');
        this.$store.dispatch('layoutsLabels/setLabelActores', 'Recurrentes');
        this.$store.dispatch('layoutsLabels/setLabelAutoridad', 'Autoridad substanciadora');
        this.$store.dispatch('layoutsLabels/setLabelAutoridades', 'Autoridades substanciadoras');
        this.$store.dispatch('layoutsLabels/setLabelTercero', 'Presunto responsable');
        this.$store.dispatch('layoutsLabels/setLabelTerceros', 'Presuntos responsables');
      }
      if ([6, 7].includes(this.expediente.tipo_demanda_id)) {
        this.$store.dispatch('layoutsLabels/setMainColor', 'blue-9');
        this.$store.dispatch('layoutsLabels/setBgHeaderColor', 'bg-blue-2');
        this.$store.dispatch('layoutsLabels/setBgHeaderLayoutColor', 'bg-blue-8');

        this.$store.dispatch('layoutsLabels/setLabelActor', 'Actor');
        this.$store.dispatch('layoutsLabels/setLabelActores', 'Actores');
        this.$store.dispatch('layoutsLabels/setLabelAutoridad', 'Autoridad demandada');
        this.$store.dispatch('layoutsLabels/setLabelAutoridades', 'Autoridades demandadas');
        this.$store.dispatch('layoutsLabels/setLabelTercero', 'Tercero interesado');
        this.$store.dispatch('layoutsLabels/setLabelTerceros', 'Terceros interesados');
      }

      await this.$store.dispatch('actuaciones/fetchAllActuaciones', {
        juicio: this.expediente.expediente_id,
        include: 'actor,autoridad,terceroperjudicado,expediente',
        limit: -1,
      });

      const actIds = this.actuaciones.map(item => item.actuacion_id).join(',');

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

      if (actIds) {
        await this.$store.dispatch('acuerdos/fetchAllAcuerdos', {
          actuacion: actIds,
          limit: -1,
        });
        await this.$store.dispatch('notificaciones/fetchAllNotificaciones', {
          actuacion: actIds,
          limit: -1,
        });
        await this.$store.dispatch('anexos/fetchAllAnexos', {
          actuacion: actIds,
          limit: -1,
        });
        await this.$store.dispatch('documentos/fetchAllDocumentos', {
          actuacion: actIds,
          limit: -1,
        });
      }
    } catch (e) {
      errors(e);
    } finally {
      this.fetching = false;
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
    actuaciones() {
      return this.$store.getters['actuaciones/getActuacionesByExpedienteId'](this.expediente.expediente_id);
    },
    bgColor() {
      return this.$store.getters['layoutsLabels/getBgHeaderColor'];
    },
    expediente() {
      return this.$store.getters['expedientes/getExpedienteById'](this.uuid);
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
        .filter(i => !i.deleted_at)
        .map(i => i.id);

      const autoridades = this.$store.getters['autoridades/getAutoridadesAll']
        .filter(item => autoriadesIds.includes(item.autoridad_id));

      return _.sortBy(autoridades, item => item.created_at);
    },
    notificaciones() {
      return this.$store.getters['notificaciones/getNotificacionesAll']
        .filter(item => this.acuerdoSelected.acuerdo_id === item.acuerdo_id);
    },
    terceros() {
      return this.$store.getters['terceros/getTercerosAll'].filter(item => this.expediente.terceros_perjudicados.includes(item.id));
    },
    vistos() {
      const vistos = this.$store.getters['expedientes/getExpedienteHistory'];

      return _.orderBy(vistos, ['visited_at'], ['desc']);
    },
  },
  methods: {
    openModalNotificados(acuerdo) {
      this.acuerdoSelected = acuerdo;
      this.showModalNotificados = true;
    },
    closeModalNotificados() {
      this.acuerdoSelected = null;
      this.showModalNotificados = false;
    },
    openModalNotificacion(acuerdo) {
      this.acuerdoSelected = acuerdo;

      if (acuerdo.notificado) {
        this.notificacionSelected = acuerdo.notificado;
      }

      this.showModalNotificacionEditar = true;
    },
    openModalNotificacionEditar(notificacion) {
      this.notificacionSelected = notificacion;
      this.showModalNotificacionEditar = true;
    },
    closeModalNotificacionEditar() {
      this.showModalNotificacionEditar = false;
      this.notificacionSelected = null;
    },
  },
};
</script>
