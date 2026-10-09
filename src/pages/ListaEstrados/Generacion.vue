<template>
  <div class="q-pa-md">
    <div class="q-pa-sm q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Inicio" icon="home" to="/" />
        <q-breadcrumbs-el label="Generación" icon="input"/>
      </q-breadcrumbs>
    </div>

    <div class="q-mb-sm text-center titulo">
      <strong>LISTA DE ESTRADOS v{{env.VERSION_ESTRADOS_BOLETIN}}</strong>
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
        :to="{name: 'busqueda-listado-acuerdo'}"
      />
      <q-route-tab name="generacion"
        icon="input"
        label="Generación"
        class="text-black"
        :to="{name: 'generacion-listado'}"
      />
    </q-tabs>

    <div class="q-gutter-y-sm">
      <div class="SIDJ-box">
        <div class="row">
          <div :class="disable ? 'col-md-12' : 'col-md-10'">
            <label class="q-ma-sm" for="folioAcuerdo">Generación de listado</label>
            <q-input outlined
              autofocus
              stack-label
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

          <div class="col-md-2 text-center" v-if="!disable && listado.tipo_listado_id == 1">
            <br/>
            <q-btn color="red"
              icon="add_circle"
              label="Anterior 2014"
              class="q-mx-lg q-my-md"
              :disable="fetching"
              @click.prevent="showModalRegistroJV = true"
            />
          </div>
        </div>
      </div>

      <q-separator style="margin: 25px 1px 22px 0px;" v-if="!fetching"/>

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
            :tipoListado="tipoListado"
            @editar="editarObservacion"
            @eliminar="eliminarResultado"
            @editar-acuerdo="openModalAcuerdoJv"
          >
          </listado-resultados>
        </div>

        <div class="col-md-3">
          <listado-widget
            :disable="disable"
            :resultados="resultados"
            :listado="listado"
            @save-lista="saveLista"
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
        :requiredObservacion="requiredObservacion"
        @saveObservacion="saveObservacion"
        @cerrar="closeModalObservacion"
      ></listado-modal-observacion>
    </q-dialog>

    <q-dialog
      @hide="showModalRegistroJV = false"
      v-model="showModalRegistroJV"
    >
      <modal-registro-jv
        :acuerdo="acuerdoJvSelected"
        @agregar-acuerdo-jv="agregarAcuerdoJV"
        @cerrar="closeModalAcuerdoJv"
      ></modal-registro-jv>
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
import updateState from 'src/store/utlils';

import ListadoModal from 'components/ListaEstrados/Generacion/ListadoModal';
import ListadoWidget from 'components/ListaEstrados/Generacion/ListadoWidget';
import ModalRegistroJv from 'components/ListaEstrados/Consulta/ModalRegistroJv';
import ListadoModalFecha from 'components/ListaEstrados/Generacion/ListadoModalFecha';
import ListadoResultados from 'components/ListaEstrados/Generacion/ListadoResultados';
import ModalInfoAcuerdoError from 'components/ListaEstrados/Consulta/ModalInfoAcuerdoError';
import ListadoModalObservacion from 'components/ListaEstrados/Generacion/ListadoModalObservacion';

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
      tipo_listado_id: null,
      listado: {
        ponencia_id: null,
        fecha_publicacion: null,
      },
      requiredObservacion: false,
      pendingAcuerdo: {},
      acuerdoJvSelected: null,
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
      showModalRegistroJV: false,
      showModalListadoFecha: false,
      showModalAcuerdoError: false,
      formData: {
        ponencia_id: null,
        tipo_listado_id: 1,
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
    ModalRegistroJv,
    ListadoResultados,
    ListadoModalFecha,
    ModalInfoAcuerdoError,
    ListadoModalObservacion,
  },
  async preFetch({ store }) {
    Loading.show({
      spinner: QSpinnerGears,
      backgroundColor: 'pink-8',
    });
    try {
      await axios.all([
        store.dispatch('ponencias/fetchAllPonencias', {
          limit: -1,
        }),
        store.dispatch('actuarios/fetchAllActuarios', {
          limit: -1,
        }),
        store.dispatch('procesos/fetchAllProcesos', {
          limit: -1,
          include: 'tipos_acuerdos',
        }),
        store.dispatch('tiposAcuerdo/fetchAllTiposAcuerdos', {
          limit: -1,
          include: 'clasificacion',
        }),
        store.dispatch('tiposDemandas/fetchAllTiposDemandas', {
          limit: -1,
        }),
        store.dispatch('tiposListados/fetchAllTiposListados', {
          limit: -1,
        }),
        store.dispatch('diasInhabiles/fetchAllDiasInhabiles', {
          limit: -1,
          anio: moment().year(),
        }),
      ]);
      Loading.hide();
      return Promise.resolve(true);
    } catch (err) {
      errors(err);
      return Promise.reject(true);
    }
  },
  async beforeMount() {
    this.enfoque();
    this.$emit('leftDrawerOpen', false);

    Loading.show({
      message: 'Cargando...',
    });

    const filtro = {
      limit: -1,
      areas: null,
    };

    if (this.permisos.some(i => i !== 1)) {
      filtro.areas = this.localizacion.area_id;
    }

    try {
      await this.$store.dispatch('tiposLeyendas/fetchAllTiposLeyendas', filtro);
      Loading.hide();
      return Promise.resolve(true);
    } catch (err) {
      errors(err);
      return Promise.reject(true);
    }
  },
  computed: {
    env() {
      return env;
    },
    ponencia() {
      return this.$store.getters['ponencias/getPonenciasAll'].find(item => item.ponencia_id === this.formData.ponencia_id);
    },
    permisos() {
      return this.$store.getters['session/getRolesById'];
    },
    localizacion() {
      return this.$store.getters['session/getLocalizacion'];
    },
    listadoDuplicado() {
      return this.$store.getters['listadosAcuerdos/getListadoAcuerdoByPF'](this.formData.ponencia_id, this.formData.fecha_publicacion, this.formData.actuario_id);
    },
    listadoTransfAcuerdo() {
      return this.$store.getters['listadosTransferenciasAcuerdos/getListadosTransferenciasAcuerdoAll'];
    },
    tipoListado() {
      return this.$store.getters['tiposListados/getTiposListadosAll'].find(i => i.tipo_listado_id === this.formData.tipo_listado_id);
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
    async fetchData() {
      this.fetching = true;
      this.requiredObservacion = false;

      if (this.folioAcuerdo === null || this.folioAcuerdo === '') {
        this.fetching = false;
        return Promise.resolve(true);
      }

      const slug = this.tipoListado.slug ?? '';
      const filterFolioAcuerdo = /^(A|PA)(-)(\d{6})(-)(\d{4})?/;
      const filterFolioListadoAcuerdo = /^(TA-)(\d{1,6})(\/(\d{4}))?/;

      let params = {
        ponencia_id: this.formData.ponencia_id,
        folioAcuerdo: this.folioAcuerdo,
        modelo: this.tipoListado.modelo,
      };

      if (!this.ponencia.valida_ponencia_boletin) {
        params = {
          folioAcuerdo: this.folioAcuerdo,
          modelo: this.tipoListado.modelo,
        };
      }

      if (filterFolioAcuerdo.exec(this.folioAcuerdo) !== null) {
        const resp = await sidjbridge.get(`/v1/searchAcuerdos/acuerdos/${slug}`, {
          params,
        });
        const resultados = resp.data.data;
        if (resultados.length === 0) {
          this.$swal({
            ...sweetAlertConfig,
            type: 'error',
            title: 'Acuerdo no encontrado',
          }).then(() => {
            this.enfoque();
            this.fetching = false;
            return Promise.resolve(true);
          });
        }
        if (resultados.length === 1) {
          return resultados.forEach((item) => {
            if (!item.fecha_boletin) {
              this.resultados = updateState(this.resultados, item);
              this.enfoque();
              this.fetching = false;
              return Promise.resolve(true);
            }

            this.$swal({
              ...sweetAlertConfig,
              type: 'error',
              showCancelButton: true,
              text: '¿Desea agregarlo?',
              title: `El acuerdo con el folio\n ${this.folioAcuerdo} ya \nse encuentra publicado`,
              cancelButtonColor: '#d33',
              cancelButtonText: 'Cancelar',
            }).then((respSweet) => {
              if (respSweet.value) {
                this.pendingAcuerdo = item;
                this.requiredObservacion = true;
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
      }
      if (filterFolioListadoAcuerdo.exec(this.folioAcuerdo) !== null) {
        Loading.show({
          message: 'Cargando listado de transferencia de acuerdo...',
        });
        try {
          await this.$store.dispatch('listadosTransferenciasAcuerdos/fetchAllListadosTransferenciasAcuerdos', {
            folio: this.folioAcuerdo,
            limit: 1,
          });
          const listado = this.listadoTransfAcuerdo.find(i => i.folio === this.folioAcuerdo);

          if (listado) {
            Loading.show({
              message: `Validando ${listado.lista.length} acuerdos`,
            });

            const promise = listado.lista.map(item1 => this.$store.dispatch('actuaciones/fetchAllActuaciones', {
              actuacion: item1.actuacion_id,
            }).then((j) => {
              const act = j.find(k => k.actuacion_id === item1.actuacion_id);

              if (act.ponenciadirigida_id === this.formData.ponencia_id) {
                this.resultados = updateState(this.resultados, item1);
              } else {
                this.errorAcuerdos.push(item1);
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
        } catch (e) {
          Loading.hide();
          this.fetching = false;
        }
      }

      this.$swal({
        ...sweetAlertConfig,
        type: 'error',
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
      this.requiredObservacion = false;
    },
    avanzar(formData) {
      this.formData = {
        ...this.formData,
        ...formData,
      };
      this.showModalListado = false;
      this.showModalListadoFecha = true;
    },
    async saveListado(formData) {
      this.fetchingListado = true;
      this.formData = {
        ...this.formData,
        ...formData,
      };

      try {
        const resp = await this.$store.dispatch('listadosAcuerdos/fetchAllListadosAcuerdos', {
          ponencia_id: this.formData.ponencia_id,
          fecha_publicacion: this.formData.fecha_publicacion,
          actuario_id: this.formData.actuario_id,
          tipo_listado_id: this.formData.tipo_listado_id,
          tipo_leyenda_id: this.formData.tipo_leyenda_id,
        });

        if (resp.length > 0) {
          this.fetchingListado = false;
          this.showModalListadoFecha = false;

          this.$swal({
            ...sweetAlertConfig,
            type: 'error',
            showCancelButton: true,
            text: '¿Desea consultarlo?',
            title: 'Ya existe un listado registrado con dicha ponencia.',
          }).then((result) => {
            if (result.value) {
              this.$router.push({
                name: 'listado-acuerdo',
                params: {
                  uuid: this.listadoDuplicado.id,
                },
              });
            }
          });
          return Promise.resolve(true);
        }
      } catch (err) {
        errors(err);
        this.showModalListadoFecha = false;
        this.fetchingListado = false;
        return Promise.reject(true);
      }

      try {
        const response = await this.$store.dispatch('listadosAcuerdos/postListadoAcuerdo', {
          ...this.formData,
        });
        this.disable = false;
        this.showModalListadoFecha = false;
        this.fetchingListado = false;
        this.listado = response;

        this.$swal({
          ...sweetAlertConfig,
          title: 'A continuacion escaneé el \ncodigo de barras de los acuerdos.',
          type: 'info',
          timer: 2000,
        }).then(() => {
          this.enfoque();
          return Promise.resolve(true);
        });
      } catch (err) {
        errors(err);
        this.disable = false;
        this.showModalListadoFecha = false;
        this.fetchingListado = false;
      }
      return Promise.resolve(true);
    },
    async saveLista() {
      this.fetchingSave = true;
      try {
        await this.$store.dispatch('listadosAcuerdos/putListadoAcuerdo', {
          ...this.formData,
          id: this.listado.id,
          lista: this.resultados,
        });

        this.$swal({
          ...sweetAlertConfig,
          timer: 2000,
        }).then(() => {
          this.$router.push({
            name: 'listado-acuerdo',
            params: {
              uuid: this.listado.id,
            },
          });
        });
      } catch (err) {
        errors(err);
      } finally {
        this.fetchingSave = false;
      }
    },
    openModalAcuerdoJv(acuerdo) {
      this.showModalRegistroJV = true;
      this.acuerdoJvSelected = acuerdo;
    },
    closeModalAcuerdoJv() {
      this.showModalRegistroJV = false;
      this.acuerdoJvSelected = null;
    },
    agregarAcuerdoJV(acuerdo) {
      this.resultados = updateState(this.resultados, acuerdo);
      this.closeModalAcuerdoJv();
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
