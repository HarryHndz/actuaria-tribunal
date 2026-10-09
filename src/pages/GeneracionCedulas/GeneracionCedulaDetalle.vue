<template>
  <div class="q-pa-md">
    <div class="q-pa-sm q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Inicio" icon="home" to="/" />
        <q-breadcrumbs-el label="Generación" icon="search" :to="{name: 'generacion-cedula'}"/>
        <q-breadcrumbs-el label="Consulta" icon="input"/>
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

    <div class="x_content text-center" v-if="fetchingLoad">
      <q-spinner
        color="black"
        size="4em"
        :thickness="5"
      />
    </div>

    <div class="q-gutter-y-sm q-my-sm" v-if="!fetchingLoad">
      <box-info-atc
        :areaTrabajoCedulas="areaTrabajoCedulas"
      ></box-info-atc>

      <div class="row">
        <div class="col-md-12 col-xs-12">
          <div class="q-mt-lg q-mx-sm" v-if="!fetching">
            <q-input rounded outlined
              autofocus
              stack-label
              autocomplete="off"
              name="nojuicio"
              label="Folio"
              ref="folioAcuerdo"
              class="q-ma-sm"
              v-model="folioAcuerdo"
              v-on:keyup.enter="fetchData"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>

          <div class="x_content text-center q-mx-sm" v-if="fetching">
            <q-linear-progress
              rounded
              style="height: 6px"
              indeterminate
              color="pink-10"
              class="q-mt-lg"
            />
          </div>
        </div>
      </div>

      <div class="row q-ma-sm">
        <div class="col-md-9 col-xs-12 q-mt-md">
          <tabla-cedulas
            :resultados="resultados"
            :areaTrabajoCedulas="areaTrabajoCedulas"
            @open-editar="openEditar"
            @eliminar-resultado="eliminarResultado"
            @updateNotificacion="updateNotificacion"
          ></tabla-cedulas>
        </div>

        <div class="col-md-3 col-xs-12">
          <widget-cedulas
            :resultados="resultados"
            :areaTrabajo="areaTrabajoCedulas"
            @reiniciar-listado="reiniciarListado"
            @open-modal-imprimir="imprimir"
          ></widget-cedulas>
        </div>
      </div>
    </div>

    <q-dialog
      v-model="showModalNotificaciones"
      @hide="closeModalNotificaciones"
    >
      <modal-notificaciones
        :acuerdo="acuerdoSelected"
        @siguiente="siguiente"
        @close="closeModalNotificaciones"
      ></modal-notificaciones>
    </q-dialog>

    <q-dialog
      v-model="showModalCedula"
      @hide="closeModalGeneracion"
    >
      <modal-form-cedula
        :acuerdo="acuerdoSelected"
        :notificacion="notificacionSelected"
        :tipoNotificacion="tipoNotificacion"
        @agregar="agregarNotificacion"
        @close="closeModalGeneracion"
      ></modal-form-cedula>
    </q-dialog>
  </div>
</template>

<script>
import {
  QTabs,
  QInput,
  Notify,
  Loading,
  QDialog,
  QSpinner,
  QRouteTab,
  QBreadcrumbs,
  QSpinnerGears,
  QBreadcrumbsEl,
  QLinearProgress,
} from 'quasar';

import axios from 'axios';
import moment from 'moment';
import printJS from 'print-js';

import env from 'boot/env';
import errors from 'boot/errors';
import sidjbridge from 'boot/sidjbridge';
import updateState from 'src/store/utlils';

import BoxInfoAtc from 'components/GeneracionCedulas/Detalle/BoxInfoAtc';
import TablaCedulas from 'components/GeneracionCedulas/Detalle/TablaCedulas';
import WidgetCedulas from 'components/GeneracionCedulas/Detalle/WidgetCedulas';
import ModalFormCedula from 'components/GeneracionCedulas/Generacion/ModalFormCedula';
import ModalNotificaciones from 'components/GeneracionCedulas/Generacion/ModalNotificaciones';

export default {
  name: 'generacion-cedula-detalle',
  props: {
    uuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selection: [],
      resultados: [],
      fetching: false,
      folioAcuerdo: '',
      tab: 'consulta',
      fetchingLoad: false,
      showModalCedula: false,
      acuerdoSelected: null,
      notificacionSelected: null,
      showModalNotificaciones: false,
      tipoNotificacion: null,
    };
  },
  components: {
    QTabs,
    QInput,
    QDialog,
    QSpinner,
    QRouteTab,
    BoxInfoAtc,
    QBreadcrumbs,
    TablaCedulas,
    QBreadcrumbsEl,
    WidgetCedulas,
    QLinearProgress,
    ModalFormCedula,
    ModalNotificaciones,
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
        store.dispatch('session/fetchSession'),
        store.dispatch('actuarios/fetchAllActuarios', {
          limit: -1,
        }),
        store.dispatch('tiposNotifiquese/fetchAllTiposNotifiquese', {
          cache,
          limit: -1,
        }),
        store.dispatch('tiposNotificaciones/fetchAllTiposNotificaciones', {
          limit: -1,
        }),
        store.dispatch('delegaciones/fetchAllDelegaciones', {
          cache,
          limit: -1,
        }),
        store.dispatch('dependenciasAutoridades/fetchAllDependenciasAutoridades', {
          cache,
          limit: -1,
        }),
        store.dispatch('tiposPersonas/fetchAllTiposPersonas', {
          cache,
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
  async beforeMount() {
    this.$emit('leftDrawerOpen', false);

    this.fetchingLoad = true;
    try {
      await this.$store.dispatch('areaTrabajoCedulas/fetchAllAreasTrabajoCedulas', {
        uuid: this.uuid,
      });
      this.fetchingLoad = false;
      this.resultados = this.areaTrabajoCedulas.lista.map(i => ({ ...i }));
      return Promise.resolve(true);
    } catch (e) {
      errors(e);
      Loading.hide();
      this.fetchingLoad = false;
      return Promise.reject(true);
    }
  },
  computed: {
    env() {
      return env;
    },
    listadoTransfAcuerdo() {
      return this.$store.getters['listadosTransferenciasAcuerdos/getListadosTransferenciasAcuerdoAll'];
    },
    areaTrabajoCedulas() {
      return this.$store.getters['areaTrabajoCedulas/getAreasTrabajoCedulasAll'].find(i => i.id === this.uuid);
    },
    usuario() {
      return this.$store.getters['session/getUsuario'];
    },
  },
  methods: {
    enfoque() {
      this.folioAcuerdo = '';
      this.$nextTick(() => this.$refs.folioAcuerdo.focus());
    },
    async updateNotificacion(row) {
      try {
        this.resultados = updateState(this.resultados, {
          id: row.id,
          tipo_id: row.tipo_id,
          notificados: row.notificados,
          observaciones: row.observaciones,
          fecha_notificacion: row.fecha_notificacion,
          fecha_elaboracion_cedula: row.fecha_elaboracion,
          fecha_entrega_actuaria: row.fecha_entrega_actuaria,
        });

        await this.saveListado();
        return Promise.resolve(true);
      } catch (e) {
        errors(e);
        return Promise.reject(true);
      }
    },
    async eliminarResultado(resultado) {
      this.$swal({
        title: '¿Esta seguro de borrar la cédula?',
        text: 'Esta cambio no se podrá revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Borrar',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
      }).then(async (resp) => {
        if (resp.value) {
          Loading.show();
          try {
            const index = this.resultados.findIndex(item => item.id === resultado.id);

            this.resultados = this.resultados.slice(0, index)
              .concat(this.resultados.slice(index + 1));

            await this.saveListado();

            await this.$store.dispatch('notificaciones/deleteNotificacion', { id: resultado.id });

            Notify.create({
              message: 'Cédula eliminada correctamente.',
              position: 'bottom',
            });

            this.enfoque();
            Loading.hide();
            return Promise.resolve(true);
          } catch (e) {
            errors(e);
            Loading.hide();
            return Promise.reject(true);
          }
        }
        return Promise.resolve(true);
      });
    },
    reiniciarListado() {
      this.$swal({
        title: 'Se borrara todo el listado\n¿Desea reiniciar el listado?',
        text: 'Esta cambio no se podrá revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Reiniciar listado',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
      }).then((resp) => {
        if (resp.value) {
          this.resultados = [];
          this.enfoque();
          return Promise.resolve(true);
        }
        return Promise.resolve(true);
      });
    },
    fetchData() {
      this.fetching = true;

      if (this.folioAcuerdo === null || this.folioAcuerdo === '') {
        this.enfoque();
        this.fetching = false;
        return Promise.resolve(true);
      }

      const filterFolioAcuerdo = /^(A|PA)(-)(\d{6})(-)(\d{4})?/;

      if (filterFolioAcuerdo.exec(this.folioAcuerdo) !== null) {
        return sidjbridge.get('/v1/searchAcuerdos/acuerdos/', {
          params: {
            modelo: 'actuacion',
            folioAcuerdo: this.folioAcuerdo,
            ponencia_id: this.usuario.permisos.ponencias.join(','),
          },
        }).then((resp) => {
          const resultados = resp.data.data;

          if (resultados.length === 0) {
            Notify.create({
              message: 'No se ha encontrado acuerdo con ese folio.',
              position: 'bottom',
            });
            this.enfoque();
            this.fetching = false;
            return Promise.resolve(true);
          }

          if (resultados.length === 1) {
            this.fetching = false;
            this.openModalNotificaciones(resultados[0]);
          }
          return Promise.resolve(true);
        }).catch((e) => {
          errors(e);
          this.enfoque();
          this.fetching = false;
          return Promise.reject(true);
        });
      }

      this.$swal({
        icon: 'error',
        title: 'Folio invalido',
      }).then(() => {
        this.enfoque();
        this.fetching = false;
        return Promise.resolve(true);
      });

      return Promise.resolve(true);
    },
    openModalGeneracion(tipoNotificacion) {
      this.showModalCedula = true;
      this.tipoNotificacion = tipoNotificacion;
    },
    closeModalGeneracion() {
      this.showModalCedula = false;
      this.notificacionSelected = null;
      this.enfoque();
    },
    openEditar(notificacion) {
      this.showModalCedula = true;
      this.notificacionSelected = notificacion;
    },
    openModalNotificaciones(acuerdo) {
      this.acuerdoSelected = acuerdo;
      this.showModalNotificaciones = true;
    },
    closeModalNotificaciones() {
      this.showModalNotificaciones = false;
    },
    siguiente(selection) {
      this.selection = selection;
      this.closeModalNotificaciones();
      this.openModalGeneracion(this.selection[0]);
      this.enfoque();
    },
    async imprimir() {
      try {
        Loading.show({
          message: 'Cargando...',
        });
        const response = await sidjbridge.post(`cedulas/imprimir/area-trabajo/cedulas-notificaciones/${this.areaTrabajoCedulas.id}`);
        Loading.hide();

        if (response.data) {
          printJS({ printable: response.data, type: 'pdf', base64: true });
        } else {
          this.$swal({
            icon: 'error',
            title: 'Error',
            text: 'Archivo no encontrado',
          });
        }
        return Promise.resolve(true);
      } catch (e) {
        errors(e);
        Loading.hide();
        return Promise.reject(true);
      }
    },
    saveListado() {
      Loading.show({
        message: 'Guardando listado...',
      });
      return this.$store.dispatch('areaTrabajoCedulas/putAreaTrabajoCedulas', {
        id: this.uuid,
        lista: this.resultados,
      }).then(() => {
        Loading.hide();
        return Promise.resolve(true);
      }).catch((e) => {
        errors(e);
        this.enfoque();
        Loading.hide();
        return Promise.reject(true);
      });
    },
    async agregarNotificacion(item) {
      Loading.show();
      try {
        const resp = await this.$store.dispatch('areaTrabajoCedulas/addUpdateCedula', {
          uuid: this.uuid,
          notificacion: item.notificacion,
          tipo_atc_id: 1,
        });

        this.resultados = updateState(this.resultados, resp.data);
        this.selection = updateState(this.selection, item.tipoNotificacion)
          .filter(i => !i.cedula_generacion);

        Loading.hide();

        this.enfoque();

        Notify.create({
          message: 'Listado guardado correctamente.',
          position: 'bottom',
        });

        this.fetching = false;
        this.closeModalGeneracion();

        if (this.selection.length > 0) {
          setTimeout(() => {
            [this.tipoNotificacion] = this.selection;
            this.openModalGeneracion(this.tipoNotificacion);
          }, 200);
        } else {
          this.acuerdoSelected = null;
          this.tipoNotificacion = null;
        }

        return Promise.resolve(true);
      } catch (e) {
        errors(e);
        Loading.hide();
        return Promise.reject(true);
      }
    },
  },
};
</script>
