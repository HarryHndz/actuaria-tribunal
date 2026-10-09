<template>
  <div class="q-pa-md">
    <div class="q-pa-sm q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Inicio" icon="home" to="/" />
        <q-breadcrumbs-el label="Generación de cédulas" icon="search"/>
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
          <div class="col-md-10">
            <label class="q-ma-md">Búsqueda</label>
            <q-input rounded outlined
              autofocus
              stack-label
              autocomplete="off"
              name="nojuicio"
              label="Folio acuerdo"
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
          <div class="col-md-2">
            <input
              ref="excel-upload-input"
              class="excel-upload-input"
              type="file"
              accept=".xlsx, .xls"
              @change="handleClick"
            />
            <div class="drop" @drop="handleDrop"
              @dragover="handleDragover" @dragenter="handleDragover">
              <q-btn
                :loading="loading"
                style="margin-left:16px;"
                size="mini"
                color="pink-10"
                icon="cloud_upload"
                @click="handleUpload"
              >&nbsp; Examinar
              </q-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="x_content text-center" v-if="fetching">
        <q-linear-progress
          rounded
          style="height: 6px"
          indeterminate
          color="pink-10"
          class="q-my-md"
        />
      </div>

      <div class="row q-ma-sm q-mt-lg">
        <div class="col-md-10 col-xs-12 q-mt-md">
          <tabla-acuerdos
            :resultados="resultados"
            @open-editar="openEditar"
            @updateAcuerdo="updateAcuerdo"
            @eliminar-resultado="eliminarResultado"
          ></tabla-acuerdos>
        </div>

        <div class="col-md-2 col-xs-12">
          <widget-acuerdos
            :resultados="resultados"
            :areaTrabajo="areaTrabajo"
            @save-listado="saveListado"
            @reiniciar-listado="reiniciarListado"
            @imprimir-multiples="imprimirMultiples"
          ></widget-acuerdos>
        </div>
      </div>
    </div>
    <q-dialog
      v-model="showModalExcel"
      @hide="closeModalExcel"
      persistent
    >
      <modal-excel
        :resultadosTemp="resultado"
        @closeModalExcel="closeModalExcel"
        @getResultados="getResultados"
      ></modal-excel>
    </q-dialog>

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
  QRouteTab,
  QBreadcrumbs,
  QSpinnerGears,
  QBreadcrumbsEl,
  QLinearProgress,
} from 'quasar';

import JSON2 from 'JSON2';
import axios from 'axios';
import moment from 'moment';
import * as XLSX from 'xlsx';
import { uuid } from 'vue-uuid';

import env from 'boot/env';
import errors from 'boot/errors';
import sidjbridge from 'boot/sidjbridge';

import updateState from 'src/store/utlils';

import ModalExcel from 'components/GeneracionCedulas/Generacion/ModalExcel';
import TablaAcuerdos from 'components/GeneracionCedulas/Generacion/TablaAcuerdos';
import WidgetAcuerdos from 'components/GeneracionCedulas/Generacion/WidgetAcuerdos';
import ModalFormCedula from 'components/GeneracionCedulas/Generacion/ModalFormCedula';
import ModalNotificaciones from 'components/GeneracionCedulas/Generacion/ModalNotificaciones';
import printJS from 'print-js';

const storage = window.localStorage;

export default {
  name: 'generacion-cedula',
  data() {
    return {
      selection: [],
      resultados: [],
      resultado: [],
      fetching: false,
      folioAcuerdo: '',
      tab: 'generacion',
      areaTrabajo: null,
      acuerdoSelected: null,
      notificacionSelected: null,
      showModalCedula: false,
      showModalExcel: false,
      showModalNotificaciones: false,
      tipoNotificacion: null,
      loading: false,
      excelData: {
        header: null,
        results: null,
      },
    };
  },
  components: {
    QTabs,
    QInput,
    QDialog,
    QRouteTab,
    ModalExcel,
    QBreadcrumbs,
    TablaAcuerdos,
    QBreadcrumbsEl,
    WidgetAcuerdos,
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
          limit: -1,
          cache,
        }),
        store.dispatch('tiposNotificaciones/fetchAllTiposNotificaciones', {
          limit: -1,
        }),
        store.dispatch('delegaciones/fetchAllDelegaciones', {
          limit: -1,
          cache,
        }),
        store.dispatch('dependenciasAutoridades/fetchAllDependenciasAutoridades', {
          limit: -1,
          cache,
        }),
        store.dispatch('tiposPersonas/fetchAllTiposPersonas', {
          limit: -1,
          cache,
        }),
      ]);
      Loading.hide();
      return Promise.resolve(true);
    } catch (e) {
      errors(e);
      Loading.hide();
      this.fetching = false;
      return Promise.reject(true);
    }
  },
  beforeMount() {
    this.$emit('leftDrawerOpen', false);

    let listadoTemp = storage.getItem('listado-generacion-cedulas');
    listadoTemp = JSON2.parse(listadoTemp);

    if (this.$store.getters['areaTrabajoCedulas/getAreaTrabajoCedulaEnviado'].length > 0) {
      this.resultados = this.$store.getters['areaTrabajoCedulas/getAreaTrabajoCedulaEnviado']
        .map(item => ({
          ...item,
        }));
    } else if (listadoTemp && listadoTemp.length > 0) {
      this.$swal({
        title: 'Hay una lista pendiente, ¿Desea continuar con el listado?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Continuar',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
      }).then((resp) => {
        if (resp.value) {
          this.resultados = listadoTemp.map(item => ({
            ...item,
          }));
        }
        if (resp.dismiss === 'cancel') {
          storage.removeItem('listado-generacion-cedulas');
        }
      });
    }

    this.enfoque();
  },
  computed: {
    env() {
      return env;
    },
    areaTrabajoCedulas() {
      return this.$store.getters['areaTrabajoCedulas/getAreasTrabajoCedulasAll'];
    },
    usuario() {
      return this.$store.getters['session/getUsuario'];
    },
    ponenciasPermisos() {
      return this.$store.getters['session/getPermisos'];
    },
  },
  methods: {
    generateData({
      header,
      results,
    }) {
      this.excelData.header = header;
      this.excelData.results = results;
      Loading.show();
      const resultadoFinal = [];
      this.excelData.results.forEach((i) => {
        let actores = i.actores ? i.actores.split(', ') : [];
        let terceros = i.terceros ? i.terceros.split(', ') : [];
        let autoridades = i.autoridades ? i.autoridades.split(', ') : [];

        actores = actores.map(j => ({
          actor_id: null,
          actor: j,
        }));
        autoridades = autoridades.map(k => ({
          autoridad_id: null,
          autoridad: k,
        }));
        terceros = terceros.map(l => ({
          tercero_id: null,
          tercero: l,
        }));

        resultadoFinal.push({
          ...i,
          actores: [
            ...actores,
          ],
          autoridades: [
            ...autoridades,
          ],
          terceros: [
            ...terceros,
          ],
          id: uuid.v4(),
          tipo_atc_id: 2,
          created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        });
        return true;
      });
      return sidjbridge.post('cedulas/temporal/datos', {
        cedulas: resultadoFinal,
      }).then((response) => {
        this.resultado = response.data;
        this.openModalExcel(this.resultado);
        Loading.hide();
      }).catch((e) => {
        errors(e);
        this.enfoque();
        this.fetching = false;
        return Promise.reject(true);
      });
    },
    getResultados(resultados) {
      this.resultados.push(...resultados);
      this.excelData.header = [];
      this.excelData.results = [];
      this.closeModalExcel();
      const sucess = resultados.filter(i => i.validated === 1).length;
      const errores = resultados.filter(i => i.validated === 0).length;
      if (errores >= 1) {
        Loading.hide();
        this.$swal({
          title: `Se cargaron ${sucess} acuerdos correctamente,
                  ${errores} acuerdos con errores.`,
          type: 'success',
          timer: 5000,
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
          html: 'Dando clic en el icono <i class="fa fa-flag"></i> se visualizarán  los errores.',
        });
      } else {
        Loading.hide();
        this.$swal({
          title: `Se cargaron ${sucess} acuerdos correctamente.`,
          timer: 5000,
          type: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        });
      }
    },
    handleDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.loading) return;

      const { files } = e.dataTransfer;

      if (files.length !== 1) {
        this.$message.error('Carga de Archivo');
        return;
      }

      const rawFile = files[0];

      if (!this.isExcel(rawFile)) {
        this.$message.error('Solo archivos.xlsx, .xls, .csv ');

        // eslint-disable-next-line consistent-return
        return false;
      }
      this.upload(rawFile);
      e.stopPropagation();
      e.preventDefault();
    },
    handleDragover(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    },
    handleUpload() {
      this.$refs['excel-upload-input'].click();
    },
    handleClick(e) {
      const { files } = e.target;
      const rawFile = files[0];

      if (!rawFile) return;

      this.upload(rawFile);
    },
    upload(rawFile) {
      this.$refs['excel-upload-input'].value = null;
      if (!this.beforeUpload) {
        this.readerData(rawFile);
        return;
      }
      const before = this.beforeUpload(rawFile);
      if (before) {
        this.readerData(rawFile);
      }
    },
    readerData(rawFile) {
      this.loading = true;
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, {
            type: 'array',
          });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const header = this.getHeaderRow(worksheet);
          const results = XLSX.utils.sheet_to_json(worksheet);
          this.generateData({
            header,
            results,
          });
          this.loading = false;
          resolve();
        };
        reader.readAsArrayBuffer(rawFile);
      });
    },
    getHeaderRow(sheet) {
      const headers = [];
      const range = XLSX.utils.decode_range(sheet['!ref']);
      let C;
      const R = range.s.r;

      for (C = range.s.c; C <= range.e.c; C += 1) {
        const cell = sheet[XLSX.utils.encode_cell({
          c: C,
          r: R,
        })];
        let hdr = `UNKNOWN ${C}`;
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers;
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name);
    },
    enfoque() {
      this.folioAcuerdo = '';
      this.$nextTick(() => this.$refs.folioAcuerdo.focus());
    },
    eliminarResultado(resultado) {
      const index = this.resultados.findIndex(item => item.id === resultado.id);

      this.resultados = this.resultados.slice(0, index)
        .concat(this.resultados.slice(index + 1));

      storage.setItem('listado-generacion-cedulas', JSON.stringify(this.resultados));

      this.enfoque();
    },
    reiniciarListado() {
      this.$swal({
        title: 'Se borrara todo el listado, ¿Desea reiniciar el listado?',
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
          storage.removeItem('listado-generacion-cedulas');
          this.enfoque();
          return Promise.resolve(true);
        }
        return Promise.resolve(true);
      });
    },
    agregarNotificacion(item) {
      this.resultados = updateState(this.resultados, {
        ...item.notificacion,
        validated: true,
        errors: null,
      });
      this.selection = updateState(this.selection, item.tipoNotificacion)
        .filter(i => !i.cedula_generacion);

      this.$store.dispatch('areaTrabajoCedulas/setAreaTrabajoEnviado', {
        ...item.notificacion,
        validated: true,
        errors: null,
      });
      storage.setItem('listado-generacion-cedulas', JSON2.stringify(this.resultados));

      this.enfoque();
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
    },
    fetchData() {
      this.fetching = true;

      if (this.folioAcuerdo === null || this.folioAcuerdo === '') {
        this.enfoque();
        this.fetching = false;
        return Promise.resolve(true);
      }

      const filterFolioAcuerdo = /^(A-|PA-)(\d{6}-)(\d{4})$/;

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
          Loading.hide();
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
    openModalExcel() {
      this.showModalExcel = true;
    },
    closeModalExcel() {
      this.showModalExcel = false;
    },
    closeExcel() {
      this.resultados = [];
      this.showModalExcel = false;
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
      this.enfoque();
      this.showModalNotificaciones = false;
    },
    siguiente(selection) {
      this.selection = selection;
      this.closeModalNotificaciones();
      this.openModalGeneracion(this.selection[0]);
      this.enfoque();
    },
    saveListado() {
      this.$swal({
        title: '¿Desea guardar el listado?',
        text: 'Esta cambio no se podrá revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Guardar listado',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
      }).then(async (resp) => {
        if (resp.value) {
          Loading.show({
            message: 'Guardando listado de generación de cedulas...',
          });
          try {
            const response = await this.$store.dispatch('areaTrabajoCedulas/postAreaTrabajoCedulasMultiples', {
              tipo_atc_id: 1,
              lista: this.resultados,
              user_id: this.usuario.user_id,
              ponencia_id: this.ponenciasPermisos.ponencias,
            });
            this.resultados = [];
            storage.removeItem('listado-generacion-cedulas');
            Notify.create({
              message: 'Listado guardado correctamente.',
              position: 'bottom',
            });
            this.$router.push({
              name: 'generacion-cedula-detalle',
              params: {
                uuid: response.id,
              },
            });
            return Promise.resolve(true);
          } catch (e) {
            errors(e);
            Loading.hide();
            this.enfoque();
            return Promise.reject(true);
          }
        }
        return Promise.resolve(true);
      });
    },
    async updateAcuerdo(object) {
      const filterFolioAcuerdo = /^(A-|PA-)(\d{6}-)(\d{4})$/;

      if (filterFolioAcuerdo.exec(object.val) !== null) {
        Loading.show({
          message: 'Cargando...',
        });
        try {
          const resp = await sidjbridge.get('/v1/searchAcuerdos/acuerdos/', {
            params: {
              modelo: 'actuacion',
              folioAcuerdo: object.val,
              ponencia_id: this.usuario.permisos.ponencias.join(','),
            },
          });

          const resultado = resp.data.data;

          if (resultado.length === 0) {
            this.resultados = updateState(this.resultados, {
              id: object.row.id,
              proceso: 'N/A',
              validated: false,
              proceso_id: null,
              acuerdo_id: null,
              expediente: 'N/A',
              actuacion_id: null,
              acuerdo_uuid: null,
              no_folio_actuacion: 'N/A',
              no_folio_acuerdo: object.row.no_folio_acuerdo,
              errors: {
                no_folio_acuerdo: [
                  'El folio del acuerdo no es un folio valido',
                ],
              },
            });

            Notify.create({
              message: 'No se ha encontrado acuerdo con ese folio.',
              position: 'bottom',
            });
            Loading.hide();
            return Promise.resolve(true);
          }

          if (resultado.length === 1) {
            let response = null;

            if (resultado[0].expediente_uuid) {
              response = await sidjbridge.get('/v1/expedientes', {
                params: {
                  expediente: resultado[0].expediente_uuid,
                },
              });
            }

            const responseExpediente = response.data.data;

            this.resultados = updateState(this.resultados, {
              id: object.row.id,
              acuerdo_uuid: resultado[0].id,
              proceso: resultado[0].proceso,
              expediente: resultado[0].expediente,
              proceso_id: resultado[0].proceso_id,
              acuerdo_id: resultado[0].acuerdos_id,
              actuacion_id: resultado[0].actuacion_id,
              no_folio_acuerdo: resultado[0].no_folio,
              actuario_id: responseExpediente[0]?.actuario_id ?? null,
              no_folio_actuacion: resultado[0].no_folio_actuacion,
            });

            const index = this.resultados.findIndex(i => i.id === object.row.id);

            if (!this.resultados[index].errors) {
              Loading.hide();
              return Promise.resolve(true);
            }

            if (Object.prototype.hasOwnProperty.call(this.resultados[index].errors, 'no_folio_acuerdo')) {
              // eslint-disable-next-line no-shadow
              const { errors } = this.resultados[index];
              delete errors.no_folio_acuerdo;

              this.resultados[index].errors = errors;

              if (Object.keys(this.resultados[index].errors).length === 0) {
                this.resultados[index].validated = true;
                this.resultados[index].errors = null;
              }
            }
          }

          Loading.hide();
          return Promise.resolve(true);
        } catch (e) {
          errors(e);
          Loading.hide();
          return Promise.reject(true);
        }
      }

      return Promise.resolve(true);
    },
    async imprimirMultiples() {
      try {
        Loading.show({
          message: 'Cargando...',
        });
        const response = await sidjbridge.post('cedulas/imprimir-multiples/base64', {
          temporal: true,
          cedulas: this.resultados,
        }, {
          timeout: 0,
        });
        Loading.hide();

        if (response.data.base64) {
          printJS({ printable: response.data.base64, type: 'pdf', base64: true });
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
  },
};
</script>

<style scoped>
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .drop {
    border: 2px dashed #bbb;
    width: 210px;
    height: 100px;
    line-height: 100px;
    margin: 0 auto;
    font-size: 10px;
    border-radius: 5px;
    text-align: center;
    color: #bbb;
  }
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
