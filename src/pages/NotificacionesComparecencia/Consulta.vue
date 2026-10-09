<template>
  <div class="q-pa-md">

    <div class="q-pa-sm q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Inicio" icon="home" to="/" />
        <q-breadcrumbs-el label="Busqueda" icon="search"
          :to="{name: 'busqueda-listado-notificaciones-comparecencia'}"
        />
        <q-breadcrumbs-el label="Generacion" icon="input"
          :to="{name: 'generacion-notificaciones-comparecencia'}"
        />
        <q-breadcrumbs-el label="Consulta" icon="view_quilt"/>
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
      <q-route-tab name="consutla"
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
      <box-info-listado v-if="!fetching"
        :listadoAcuerdo="listadoAcuerdo"
        @dar-baja="darBaja"
        @dar-alta="darAlta"
        @borrar-listado="borrarListado"
      ></box-info-listado>

      <div class="x_content text-center" v-if="fetching">
        <q-spinner
          color="black"
          size="4em"
          :thickness="5"
        />
      </div>

      <q-separator style="margin: 20px 1px 17px 0px;" v-if="!fetching && !fetchingAcuerdo"/>

      <div class="x_content text-center" v-if="fetchingAcuerdo">
        <q-linear-progress
          rounded
          style="height: 6px"
          indeterminate
          color="pink-10"
          class="q-my-md"
        />
      </div>

      <template v-if="!fetching && edicion">
        <div>
          <q-input rounded
            outlined
            autofocus
            name="nofolio"
            id="folioAcuerdo"
            autocomplete="off"
            ref="folioAcuerdo"
            v-model="folioAcuerdo"
            class="q-mx-md q-mb-md"
            label="No folio acuerdo"
            v-on:keyup.enter="fetchData"
            style="background-color: #fff;"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>

      <div class="row q-ma-sm" v-if="!fetching">
        <div class="col-md-9 q-mt-sm">
          <listado-resultados
            :edicion="edicion"
            :fetching="fetching"
            :resultados="acuerdos"
            :listadoAcuerdo="listadoAcuerdo"
            @editar="editarObservacion"
            @eliminar="eliminarResultado"
          ></listado-resultados>
        </div>

        <div class="col-md-3">
          <listado-widget
            :edicion="edicion"
            :resultados="acuerdos"
            :listadoAcuerdo="listadoAcuerdo"
            @updateListado="updateListado"
            @editarListado="editarListado"
          ></listado-widget>
        </div>
      </div>
    </div>

    <q-dialog
      @hide="closeModalObservacion"
      v-model="showModalObservacion"
    >
      <listado-modal-observacion
        v-if="showModalObservacion"
        :pendingAcuerdo="pendingAcuerdo"
        @saveObservacion="saveObservacion"
        @cerrar="closeModalObservacion"
      ></listado-modal-observacion>
    </q-dialog>

    <q-dialog
      @hide="closerModalAcuerdoError"
      v-model="showModalAcuerdoError"
    >
      <modal-info-acuerdo-error
        v-if="showModalAcuerdoError"
        :errorAcuerdos="errorAcuerdos"
        @cerrar="closerModalAcuerdoError"
      ></modal-info-acuerdo-error>
    </q-dialog>
  </div>
</template>

<script>
import {
  QTabs,
  QInput,
  Notify,
  QDialog,
  Loading,
  QSpinner,
  QRouteTab,
  QSeparator,
  QBreadcrumbs,
  QSpinnerGears,
  QBreadcrumbsEl,
  QLinearProgress,
} from 'quasar';

import env from 'boot/env';
import 'src/css/SIDJ-style.css';
import axios from 'axios';
import moment from 'moment';
import errors from 'boot/errors';
import sidjbridge from 'boot/sidjbridge';

import ListadoWidget from 'components/NotificacionesComparecencia/Consulta/ListadoWidget';
import BoxInfoListado from 'components/NotificacionesComparecencia/Consulta/BoxInfoListado';
import ListadoResultados from 'components/NotificacionesComparecencia/Consulta/ListadoResultados';
import ModalInfoAcuerdoError from 'components/NotificacionesComparecencia/Consulta/ModalInfoAcuerdoError';
import ListadoModalObservacion from 'components/NotificacionesComparecencia/Generacion/ListadoModalObservacion';
import updateState from '../../store/utlils';

const sweetAlertConfig = {
  text: '',
  type: 'success',
  showCancelButton: false,
  confirmButtonColor: '#3085d6',
  confirmButtonText: 'Ok',
};

export default {
  name: 'listado-acuerdo',
  props: {
    uuid: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      tab: 'Consulta',
      acuerdos: [],
      edicion: false,
      fetching: false,
      errorAcuerdos: [],
      fetchingAcuerdo: false,
      folioAcuerdo: '',
      pendingAcuerdo: {},
      showModalObservacion: false,
      showModalAcuerdoError: false,
    };
  },
  components: {
    QTabs,
    QInput,
    QDialog,
    QSpinner,
    QRouteTab,
    QSeparator,
    QBreadcrumbs,
    ListadoWidget,
    QBreadcrumbsEl,
    BoxInfoListado,
    QLinearProgress,
    ListadoResultados,
    ModalInfoAcuerdoError,
    ListadoModalObservacion,
  },
  preFetch({ store }) {
    Loading.show({
      spinner: QSpinnerGears,
      backgroundColor: 'pink-8',
    });
    return axios.all([
      store.dispatch('ponencias/fetchAllPonencias', {
        limit: -1,
      }),
      store.dispatch('actuarios/fetchAllActuarios', {
        limit: -1,
      }),
      store.dispatch('diasInhabiles/fetchAllDiasInhabiles', {
        limit: -1,
        anio: moment().year(),
      }),
    ]).then(() => {
      Loading.hide();
      return Promise.resolve(true);
    }).catch((error) => {
      Loading.hide();
      errors(error);
    });
  },
  beforeMount() {
    this.$emit('leftDrawerOpen', false);
    this.fetching = true;
    return this.$store.dispatch('listadosAcuerdosComparecencia/fetchAllListadosAcuerdos', {
      uuid: this.uuid,
    }).then(() => {
      if (this.listadoAcuerdo.lista) {
        this.listadoAcuerdo.lista.forEach((item) => {
          this.acuerdos.push(item);
        });
      }

      return Promise.resolve(true);
    }).then(() => {
      this.fetching = false;
    }).catch((error) => {
      this.fetching = false;
      errors(error);
    });
  },
  computed: {
    env() {
      return env;
    },
    listadoAcuerdo() {
      return this.$store.getters['listadosAcuerdosComparecencia/getListadoAcuerdoById'](this.uuid);
    },
    listadoTransfAcuerdo() {
      return this.$store.getters['listadosTransferenciasAcuerdos/getListadosTransferenciasAcuerdoAll'];
    },
  },
  methods: {
    editarListado() {
      this.$swal({
        timer: 2000,
        icon: 'warning',
        showCancelButton: false,
        title: 'Recuerda dar click en guardar\npara salvar los cambios',
      }).then(() => {
        this.edicion = true;
      });
    },
    updateListado() {
      this.$store.dispatch('listadosAcuerdosComparecencia/putListadoAcuerdo', {
        id: this.uuid,
        lista: this.acuerdos,
      }).then(() => {
        Notify.create({
          message: 'Listado guardado exitosamente.',
          position: 'bottom',
        });
        this.edicion = false;
        return Promise.resolve(true);
      }).catch((err) => {
        errors(err);
      });
    },
    fetchData() {
      this.fetchingAcuerdo = true;

      if (this.folioAcuerdo === null || this.folioAcuerdo === '') {
        this.fetchingAcuerdo = false;
        return Promise.resolve(true);
      }

      const filterFolioAcuerdo = /^(A|PA)(-)(\d{6})(-)(\d{4})?/;
      const filterFolioListadoAcuerdo = /^(TA-)(\d{1,6})(\/(\d{4}))?/;

      if (filterFolioAcuerdo.exec(this.folioAcuerdo) !== null) {
        return sidjbridge.get('/v1/searchAcuerdos/acuerdos/', {
          params: {
            ponencia_id: this.listadoAcuerdo.ponencia_id,
            folioAcuerdo: this.folioAcuerdo,
          },
        }).then((resp) => {
          const resultados = resp.data.data;

          if (resultados.length === 0) {
            this.$swal({
              ...sweetAlertConfig,
              icon: 'error',
              title: 'Acuerdo no encontrado',
            }).then(() => {
              this.enfoque();
              this.fetchingAcuerdo = false;
              return Promise.resolve(true);
            });
          }

          if (resultados.length === 1) {
            return resultados.forEach((item) => {
              if (!item.fecha_citas_comparecencia) {
                this.acuerdos = updateState(this.acuerdos, item);
                this.enfoque();
                this.fetchingAcuerdo = false;

                return Promise.resolve(true);
              }

              this.$swal({
                ...sweetAlertConfig,
                icon: 'error',
                showCancelButton: true,
                text: '¿Desea agregarlo?',
                title: `El acuerdo con el folio\n ${this.folioAcuerdo} ya \nse encuentra publicado`,
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
              }).then((respSweet) => {
                if (respSweet.value) {
                  this.pendingAcuerdo = item;
                  this.showModalObservacion = true;
                }
                if (respSweet.dismiss === 'cancel') {
                  this.enfoque();
                  this.fetchingAcuerdo = false;
                  return Promise.resolve(true);
                }
                this.enfoque();
                this.fetchingAcuerdo = false;
                return Promise.resolve(true);
              });
              return Promise.resolve(true);
            });
          }
          return Promise.resolve(true);
        }).catch((err) => {
          this.fetchingAcuerdo = false;
          errors(err);
        });
      }

      if (filterFolioListadoAcuerdo.exec(this.folioAcuerdo) !== null) {
        Loading.show({
          message: 'Cargando listado de transferencia de acuerdo...',
        });
        return this.$store.dispatch('listadosTransferenciasAcuerdos/fetchAllListadosTransferenciasAcuerdos', {
          folio: this.folioAcuerdo,
          limit: 1,
        }).then(() => {
          const listado = this.listadoTransfAcuerdo.find(i => i.folio === this.folioAcuerdo);

          if (listado) {
            Loading.show({
              message: `Validando ${listado.lista.length} acuerdos`,
            });

            const promise = listado.lista.map(item => this.$store.dispatch('actuaciones/fetchAllActuaciones', {
              actuacion: item.actuacion_id,
            }).then((i) => {
              const act = i.find(k => k.actuacion_id === item.actuacion_id);

              if (act.ponenciadirigida_id === this.listadoAcuerdo.ponencia_id) {
                this.acuerdos = updateState(this.acuerdos, item);
              } else {
                this.errorAcuerdos.push(item);
              }

              return Promise.resolve(true);
            }));

            Promise.all(promise).then(() => {
              this.fetchingAcuerdo = false;
              this.enfoque();
              if (this.errorAcuerdos.length > 0) {
                this.showModalAcuerdoError = true;
              }
              Loading.hide();
            });
          }

          return Promise.resolve(true);
        }).catch((err) => {
          this.fetching = false;
          Loading.hide();
          errors(err);
        });
      }

      this.$swal({
        ...sweetAlertConfig,
        icon: 'error',
        title: 'Folio invalido',
      }).then(() => {
        this.enfoque();
        this.fetching = false;
        return Promise.resolve(true);
      });

      return Promise.resolve(true);
    },
    closerModalAcuerdoError() {
      this.showModalAcuerdoError = false;
      this.errorAcuerdos = [];
    },
    editarObservacion(acuerdo) {
      this.showModalObservacion = true;
      this.pendingAcuerdo = acuerdo;
    },
    closeModalObservacion() {
      this.showModalObservacion = false;
      this.pendingAcuerdo = {};
    },
    saveObservacion(pendingAcuerdo) {
      this.acuerdos = updateState(this.acuerdos, pendingAcuerdo);
      this.showModalObservacion = false;
      this.enfoque();
      this.fetching = false;
      return Promise.resolve(true);
    },
    enfoque() {
      this.folioAcuerdo = '';
      this.$nextTick(() => this.$refs.folioAcuerdo.focus());
    },
    eliminarResultado(resultadoId) {
      const index = this.acuerdos.findIndex(item => item.id === resultadoId);

      this.acuerdos = this.acuerdos.slice(0, index)
        .concat(this.acuerdos.slice(index + 1));

      this.enfoque();
    },
    borrarListado(id) {
      this.$swal({
        title: '¿Esta seguro de eliminar el listado?',
        text: 'Este cambio no se podrá revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      }).then((resp) => {
        if (resp.value) {
          this.$store.dispatch('listadosAcuerdosComparecencia/deleteListadoAcuerdo', {
            id,
          }).then(() => {
            this.$swal({
              title: 'Listado eliminado correctamente.',
              text: 'Se redirigirá a la pantalla de generación.',
              type: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok',
              timer: 2000,
            }).then(() => {
              this.$router.push({
                name: 'generacion-notificaciones-comparecencia',
              });
              return Promise.resolve(true);
            });
          }).catch((err) => {
            errors(err);
          });
        }
      });
    },
    darBaja(id) {
      this.$swal({
        title: '¿Esta seguro de dar de baja el listado publicado?',
        text: 'Este cambio no se podrá revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      }).then((resp) => {
        if (resp.value) {
          Loading.show({
            message: 'Cargando...',
          });
          this.$store.dispatch('listadosAcuerdosComparecencia/putBajaListadoAcuerdo', {
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
};
</script>
