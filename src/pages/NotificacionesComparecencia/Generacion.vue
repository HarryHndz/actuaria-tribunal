<template>
  <div class="q-pa-md">
    <div class="q-pa-sm q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Inicio" icon="home" to="/" />
        <q-breadcrumbs-el label="Generación" icon="input"/>
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
      <div class="SIDJ-box">
        <div class="row">
          <div class="col-md-12">
            <label class="q-ma-sm" for="folioAcuerdo">Generación de listado</label>
            <q-input outlined
              autofocus
              class="q-ma-sm"
              id="folioAcuerdo"
              ref="folioAcuerdo"
              autocomplete="off"
              :disable="disable"
              name="folioAcuerdo"
              v-model="folioAcuerdo"
              label="No folio del acuerdo"
              v-on:keyup.enter="fetchData"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>

        </div>
      </div>

      <q-separator style="margin: 20px 1px 17px 0px;" v-if="!fetching"/>

      <div class="x_content text-center" v-if="fetching">
        <q-linear-progress
          rounded
          style="height: 6px"
          indeterminate
          color="pink-10"
          class="q-my-md"
        />
      </div>

      <div class="row q-ma-sm">
        <div class="col-md-9">
          <listado-resultados
            :resultados="resultados"
            :fetching="fetching"
            @editar="editarObservacion"
            @eliminar="eliminarResultado"
          >
          </listado-resultados>
        </div>

        <div class="col-md-3">
          <listado-widget
            :disable="disable"
            :resultados="resultados"
            :listado="listado"
            @saveLista="saveLista"
            @reiniciar-listado="reiniciarListado"
            @comenzar-listado="showModalListado = true"
          >
          </listado-widget>
        </div>
      </div>
    </div>

    <q-dialog
      @hide="showModalListado = false"
      v-model="showModalListado"
    >
      <listado-modal
        v-if="showModalListado"
        @avanzar="avanzar"
        @cerrar="showModalListado = false"
      >
      </listado-modal>
    </q-dialog>

    <q-dialog
      @hide="showModalListadoFecha = false"
      v-model="showModalListadoFecha"
    >
      <listado-modal-fecha
        v-if="showModalListadoFecha"
        :fetchingListado="fetchingListado"
        @saveListado="saveListado"
        @cerrar="showModalListadoFecha = false"
      >
      </listado-modal-fecha>
    </q-dialog>

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
  QDialog,
  Loading,
  QRouteTab,
  QSeparator,
  QBreadcrumbs,
  QSpinnerGears,
  QBreadcrumbsEl,
  QLinearProgress,
} from 'quasar';

// import '../css/SIDJ-style.css';
import axios from 'axios';
import moment from 'moment';
import env from 'boot/env';
import errors from 'boot/errors';

import sidjbridge from 'boot/sidjbridge';
import ListadoModal from 'components/NotificacionesComparecencia/Generacion/ListadoModal';
import ListadoWidget from 'components/NotificacionesComparecencia/Generacion/ListadoWidget';
import ListadoModalFecha from 'components/NotificacionesComparecencia/Generacion/ListadoModalFecha';
import ListadoResultados from 'components/NotificacionesComparecencia/Generacion/ListadoResultados';
import ModalInfoAcuerdoError from 'components/NotificacionesComparecencia/Consulta/ModalInfoAcuerdoError';
import ListadoModalObservacion from 'components/NotificacionesComparecencia/Generacion/ListadoModalObservacion';
import updateState from '../../store/utlils';

const sweetAlertConfig = {
  title: 'Listado guardado correctamente',
  text: '',
  type: 'success',
  showCancelButton: false,
  confirmButtonColor: '#3085d6',
  confirmButtonText: 'Ok',
};

export default {
  name: 'generacion-listado',
  data() {
    return {
      listado: {
        ponencia_id: null,
        fecha_publicacion: null,
      },
      pendingAcuerdo: {},
      showModalObservacion: false,
      disable: true,
      tab: 'Generacion',
      resultados: [],
      errorAcuerdos: [],
      fetching: false,
      fetchingSave: false,
      fetchingListado: false,
      folioAcuerdo: null,
      showModalListado: false,
      showModalListadoFecha: false,
      showModalAcuerdoError: false,
      formData: {
        ponencia_id: null,
      },
    };
  },
  components: {
    QTabs,
    QInput,
    QDialog,
    QRouteTab,
    QSeparator,
    QBreadcrumbs,
    ListadoModal,
    ListadoWidget,
    QBreadcrumbsEl,
    QLinearProgress,
    ListadoResultados,
    ListadoModalFecha,
    ModalInfoAcuerdoError,
    ListadoModalObservacion,
  },
  preFetch({ store }) {
    Loading.show({
      spinner: QSpinnerGears,
      backgroundColor: 'pink-8',
    });
    return axios.all([
      store.dispatch('session/fetchSession'),
      store.dispatch('areas/fetchAllAreas', {
        limit: -1,
      }),
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
    this.enfoque();
    this.$emit('leftDrawerOpen', false);
  },
  computed: {
    env() {
      return env;
    },
    listadoDuplicado() {
      return this.$store.getters['listadosAcuerdosComparecencia/getListadoAcuerdoByPF'](this.formData.ponencia_id, this.formData.fecha_publicacion, this.formData.actuario_id);
    },
    listadoTransfAcuerdo() {
      return this.$store.getters['listadosTransferenciasAcuerdos/getListadosTransferenciasAcuerdoAll'];
    },
  },
  methods: {
    enfoque() {
      this.folioAcuerdo = '';
      this.$nextTick(() => this.$refs.folioAcuerdo.focus());
    },
    comenzarListado() {
      this.showModalListado = true;
    },
    reiniciarListado() {
      this.resultados = [];
      this.enfoque();
    },
    eliminarResultado(resultadoId) {
      const index = this.resultados.findIndex(item => item.id === resultadoId);

      this.resultados = this.resultados.slice(0, index)
        .concat(this.resultados.slice(index + 1));

      this.enfoque();
    },
    fetchData() {
      this.fetching = true;

      if (this.folioAcuerdo === null || this.folioAcuerdo === '') {
        this.fetching = false;
        return Promise.resolve(true);
      }

      const filterFolioAcuerdo = /^(A|PA)(-)(\d{6})(-)(\d{4})?/;
      const filterFolioListadoAcuerdo = /^(TA-)(\d{1,6})(\/(\d{4}))?/;

      if (filterFolioAcuerdo.exec(this.folioAcuerdo) !== null) {
        return sidjbridge.get('/v1/searchAcuerdos/acuerdos/', {
          params: {
            ponencia_id: this.formData.ponencia_id,
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
              this.fetching = false;
              return Promise.resolve(true);
            });
          }

          if (resultados.length === 1) {
            return resultados.forEach((item) => {
              if (!item.fecha_citas_comparecencia) {
                this.resultados = updateState(this.resultados, item);
                this.enfoque();
                this.fetching = false;
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
                  this.fetching = false;
                  return Promise.resolve(true);
                }
                this.enfoque();
                this.fetching = false;
                return Promise.resolve(true);
              });
              return Promise.resolve(true);
            });
          }
          return Promise.resolve(true);
        }).catch((err) => {
          this.fetching = false;
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

              if (act.ponenciadirigida_id === this.formData.ponencia_id) {
                this.resultados = updateState(this.resultados, item);
              } else {
                this.errorAcuerdos.push(item);
              }

              return Promise.resolve(true);
            }));

            Promise.all(promise).then(() => {
              this.fetching = false;
              this.enfoque();
              if (this.errorAcuerdos.length > 0) {
                this.showModalAcuerdoError = true;
              }
              Loading.hide();
            });
          }

          return Promise.resolve(true);
        }).catch((err) => {
          Loading.hide();
          this.fetching = false;
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
    editarObservacion(acuerdo) {
      this.pendingAcuerdo = acuerdo;
      this.showModalObservacion = true;
    },
    closerModalAcuerdoError() {
      this.showModalAcuerdoError = false;
      this.errorAcuerdos = [];
    },
    closeModalObservacion() {
      this.showModalObservacion = false;
      this.pendingAcuerdo = {};
      this.enfoque();
    },
    saveObservacion(pendingAcuerdo) {
      this.resultados = updateState(this.resultados, pendingAcuerdo);
      this.showModalObservacion = false;
      this.enfoque();
      this.fetching = false;
    },
    avanzar(formData) {
      this.formData = {
        ...this.formData,
        ...formData,
      };
      this.showModalListado = false;
      this.showModalListadoFecha = true;
    },
    saveListado(formData) {
      this.fetchingListado = true;
      this.formData = {
        ...this.formData,
        ...formData,
      };
      return this.$store.dispatch('listadosAcuerdosComparecencia/fetchAllListadosAcuerdos', {
        ponencia_id: this.formData.ponencia_id,
        fecha_publicacion: this.formData.fecha_publicacion,
        actuario_id: this.formData.actuario_id,
      }).then((resp) => {
        if (resp.length > 0) {
          this.showModalListadoFecha = false;
          this.fetchingListado = false;
          this.$swal({
            ...sweetAlertConfig,
            icon: 'error',
            showCancelButton: true,
            text: '¿Desea consultarlo?',
            title: 'Ya existe un listado registrado con dicha ponencia.',
          }).then((result) => {
            if (result.value) {
              this.$router.push({
                name: 'listado-notificaciones-comparecencia',
                params: {
                  uuid: this.listadoDuplicado.id,
                },
              });
            }
          });
        } else {
          this.$store.dispatch('listadosAcuerdosComparecencia/postListadoAcuerdo', {
            ...this.formData,
          }).then((response) => {
            this.disable = false;
            this.showModalListadoFecha = false;
            this.fetchingListado = false;
            this.listado = response;

            this.$swal({
              ...sweetAlertConfig,
              title: 'A continuacion escaneé el \ncodigo de barras de los acuerdos.',
              icon: 'info',
              timer: 2000,
            }).then(() => {
              this.enfoque();
            });
          }).catch((err) => {
            this.fetchingListado = false;
            errors(err);
          });
        }
      }).catch((err) => {
        this.fetchingListado = false;
        errors(err);
      });
    },
    saveLista() {
      this.fetchingSave = true;
      this.$store.dispatch('listadosAcuerdosComparecencia/putListadoAcuerdo', {
        ...this.formData,
        id: this.listado.id,
        lista: this.resultados,
      }).then(() => {
        this.fetchingSave = false;
        this.$swal({
          ...sweetAlertConfig,
          timer: 2000,
        }).then(() => {
          this.$router.push({
            name: 'listado-notificaciones-comparecencia',
            params: {
              uuid: this.listado.id,
            },
          });
        });
      }).catch((err) => {
        this.fetchingSave = false;
        errors(err);
      });
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
