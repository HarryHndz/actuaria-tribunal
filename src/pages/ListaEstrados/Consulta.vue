<template>
  <div class="q-pa-md">
    <div class="q-pa-sm q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Inicio" icon="home" to="/" />
        <q-breadcrumbs-el label="Busqueda" icon="search" :to="{name: 'busqueda-listado-acuerdo'}"/>
        <q-breadcrumbs-el label="Generación" icon="input" :to="{name: 'generacion-listado'}"/>
        <q-breadcrumbs-el label="Consulta" icon="view_quilt"/>
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
      <box-info-listado v-if="!fetching"
        :tipoListado="tipoListado"
        :listadoAcuerdo="listadoAcuerdo"
        @borrar-listado="borrarListado"
      ></box-info-listado>

      <div class="x_content text-center" v-if="fetching">
        <q-spinner
          color="black"
          size="4em"
          :thickness="5"
        />
      </div>

      <q-separator style="margin: 25px 1px 22px 0px;" v-if="!fetching && !fetchingAcuerdo"/>

      <div class="x_content text-center" v-if="fetchingAcuerdo">
        <q-linear-progress
          rounded
          style="height: 6px"
          indeterminate
          color="pink-10"
          class="q-my-md"
        />
      </div>

      <div class="row" v-if="!fetching && edicion">
        <div class="col-md-10">
          <q-input
            rounded
            outlined
            autofocus
            stack-label
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

        <div class="col-md-2">
          <q-btn color="red"
            v-if="!listadoAcuerdo.fecha_boletin && edicion && tipoListado.tipo_listado_id == 1"
            icon="add_circle"
            label="Anterior 2014"
            class="q-my-sm q-mx-sm"
            @click.prevent="showModalRegistroJV = true"
          />
        </div>
      </div>

      <div class="row q-ma-sm" v-if="!fetching">
        <div class="col-md-9 q-mt-sm">
          <listado-resultados
            :edicion="edicion"
            :fetching="fetching"
            :resultados="acuerdos"
            :tipoListado="tipoListado"
            @editar="editarObservacion"
            @eliminar="eliminarResultado"
            @editar-acuerdo="openModalAcuerdoJv"
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
        :requiredObservacion="requiredObservacion"
        @saveObservacion="saveObservacion"
        @cerrar="closeModalObservacion"
      ></listado-modal-observacion>
    </q-dialog>

    <q-dialog
      @hide="closeModalAcuerdoJv"
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

// import '../css/SIDJ-style.css';
import axios from 'axios';
import moment from 'moment';
import env from 'boot/env';
import errors from 'boot/errors';
import sidjbridge from 'boot/sidjbridge';
import updateState from 'src/store/utlils';

import ListadoWidget from 'components/ListaEstrados/Consulta/ListadoWidget';
import BoxInfoListado from 'components/ListaEstrados/Consulta/BoxInfoListado';
import ModalRegistroJv from 'components/ListaEstrados/Consulta/ModalRegistroJv';
import ListadoResultados from 'components/ListaEstrados/Consulta/ListadoResultados';
import ModalInfoAcuerdoError from 'components/ListaEstrados/Consulta/ModalInfoAcuerdoError';
import ListadoModalObservacion from 'components/ListaEstrados/Generacion/ListadoModalObservacion';

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
      tab: 'a',
      acuerdos: [],
      edicion: false,
      fetching: false,
      errorAcuerdos: [],
      fetchingAcuerdo: false,
      folioAcuerdo: '',
      pendingAcuerdo: {},
      acuerdoJvSelected: null,
      showModalRegistroJV: false,
      requiredObservacion: false,
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
    ModalRegistroJv,
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
    ]).then(() => {
      Loading.hide();
    }).catch((error) => {
      Loading.hide();
      errors(error);
    });
  },
  async beforeMount() {
    this.$emit('leftDrawerOpen', false);
    this.fetching = true;

    const filtro = {
      limit: -1,
    };

    if (this.permisos.some(i => i !== 1)) {
      filtro.areas = this.localizacion.area_id;
    }

    try {
      await this.$store.dispatch('tiposLeyendas/fetchAllTiposLeyendas', filtro);
      await this.$store.dispatch('listadosAcuerdos/fetchAllListadosAcuerdos', {
        uuid: this.uuid,
      });

      if (this.listadoAcuerdo.lista) {
        this.listadoAcuerdo.lista.forEach((item) => {
          this.acuerdos.push(item);
        });
      }

      this.fetching = false;
      return Promise.resolve(true);
    } catch (error) {
      errors(error);
      this.fetching = false;
      return Promise.reject(true);
    }
  },
  computed: {
    env() {
      return env;
    },
    ponencia() {
      return this.$store.getters['ponencias/getPonenciasAll'].find(item => item.ponencia_id === this.listadoAcuerdo.ponencia_id);
    },
    permisos() {
      return this.$store.getters['session/getRolesById'];
    },
    localizacion() {
      return this.$store.getters['session/getLocalizacion'];
    },
    listadoAcuerdo() {
      return this.$store.getters['listadosAcuerdos/getListadoAcuerdoById'](this.uuid);
    },
    listadoTransfAcuerdo() {
      return this.$store.getters['listadosTransferenciasAcuerdos/getListadosTransferenciasAcuerdoAll'];
    },
    tipoListado() {
      if (this.listadoAcuerdo.tipo_listado_id) {
        return this.$store.getters['tiposListados/getTiposListadosAll']
          .find(i => i.tipo_listado_id === this.listadoAcuerdo.tipo_listado_id);
      }
      return this.$store.getters['tiposListados/getTiposListadosAll']
        .find(i => i.tipo_listado_id === 1);
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
      this.$store.dispatch('listadosAcuerdos/putListadoAcuerdo', {
        id: this.uuid,
        lista: this.acuerdos,
      }).then(() => {
        Notify.create({
          message: 'Listado guardado exitosamente.',
          position: 'bottom',
        });
        this.edicion = false;
        return Promise.resolve(true);
      });
    },
    fetchData() {
      this.fetchingAcuerdo = true;
      this.requiredObservacion = false;

      if (this.folioAcuerdo === null || this.folioAcuerdo === '') {
        this.fetchingAcuerdo = false;
        return Promise.resolve(true);
      }

      const slug = this.tipoListado.slug ?? '';
      const filterFolioAcuerdo = /^(A|PA)(-)(\d{6})(-)(\d{4})?/;
      const filterFolioListadoAcuerdo = /^(TA-)(\d{1,6})(\/(\d{4}))?/;

      let params = {
        ponencia_id: this.listadoAcuerdo.ponencia_id,
        folioAcuerdo: this.folioAcuerdo,
        modelo: this.tipoListado.modelo ?? 'actuacion',
      };

      if (!this.ponencia.valida_ponencia_boletin) {
        params = {
          folioAcuerdo: this.folioAcuerdo,
          modelo: this.tipoListado.modelo ?? 'actuacion',
        };
      }

      if (filterFolioAcuerdo.exec(this.folioAcuerdo) !== null) {
        return sidjbridge.get(`/v1/searchAcuerdos/acuerdos/${slug}`, {
          params,
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
              if (!item.fecha_boletin) {
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
                  this.requiredObservacion = true;
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
        }).catch((error) => {
          this.fetchingAcuerdo = false;
          errors(error);
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
        }).catch((error) => {
          this.fetchingAcuerdo = false;
          errors(error);
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
      this.requiredObservacion = false;
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
        confirmButtonColor: 'red',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      }).then(async (resp) => {
        if (resp.value) {
          try {
            await this.$store.dispatch('listadosAcuerdos/deleteListadoAcuerdo', {
              id,
            });
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
                name: 'generacion-listado',
              });
              return Promise.resolve(true);
            });
          } catch (e) {
            errors(e);
            return Promise.reject(true);
          }
        }
        return Promise.resolve(true);
      }).catch((error) => {
        errors(error);
      });
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
      this.acuerdos = updateState(this.acuerdos, acuerdo);
      this.closeModalAcuerdoJv();
    },
  },
};
</script>
