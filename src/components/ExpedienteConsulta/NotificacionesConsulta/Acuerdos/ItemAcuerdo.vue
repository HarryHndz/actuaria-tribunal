<template>
  <div>
    <div class="row">
      <article class="SIDJ-box col-md-9">
        <section class="SIDJ-box-row SIDJ-box-row-header">
          <div class="SIDJ-list SIDJ-list-header SIDJ-list-header-important">
            <div>
              <span><strong>{{tipoAcuerdo.descripcion}}</strong></span>
              <span class="text-caption">
                Notifíquese: {{tipoNotifiquese ? tipoNotifiquese.descripcion : '-'}}
              </span>
              <span class="text-caption">
                Fecha elaboración: {{fechaElaboracion}}
              </span>
            </div>

            <div>
              <span><strong>{{acuerdo.noFolio}}</strong></span>
              <span class="text-caption">Folio</span>
            </div>

            <div :class="{
              'green': notificaciones.length > 0,
              'red': notificaciones.length == 0
            }">
              <span>
                {{notificaciones.length}}
              </span>
              <span class="text-caption">Notificaciones</span>
            </div>
          </div>
        </section>

        <div class="SIDJ-box-content">
          <tabla-notificaciones
            v-if="showTablaNotificaciones"
            :expediente="expediente"
            :notificaciones="notificaciones"
            @openModalNotificacionEditar="openModalNotificacionEditar"
          >
          </tabla-notificaciones>
        </div>

        <section class="SIDJ-box-row SIDJ-box-row-footer">
          <div class="SIDJ-box-row-footer-nav">
            <ul class="SIDJ-box-row-footer-nav-menu nav navbar-right">
              <li>
                <a href="#"
                  @click.prevent="openInfoAcuerdo"
                >
                  <q-icon name="info" color="black" size="1.3em"/>
                  <q-tooltip>Información</q-tooltip>
                </a>
              </li>
              <li>
                <a href="#"
                  @click.prevent="showModalFecha = true"
                >
                  <q-icon name="far fa-plus-square" color="black" size="1.3em"/>
                  <q-tooltip>Agregar listado</q-tooltip>
                </a>
              </li>
              <li>
                <a href="#"
                  @click.prevent="showTablaNotificaciones = !showTablaNotificaciones"
                >
                  <q-icon name="assignment" color="black" size="1.3em"/>
                  <q-tooltip>Notificaciones</q-tooltip>
                </a>
              </li>
              <li>
                <a href="#"
                  @click.prevent="$emit('open-modal-pdf', acuerdo)"
                >
                  <q-icon name="visibility" color="black" size="1.3em"/>
                  <q-tooltip>Visualizar acuerdo</q-tooltip>
                </a>
              </li>
              <li>
                <a href="#"
                  @click.prevent="$emit('imprimir', acuerdo)"
                >
                  <q-icon name="print" color="black" size="1.3em"/>
                  <q-tooltip>Imprimir</q-tooltip>
                </a>
              </li>
              <li>
                <a href="#"
                  @click.prevent="descargarAcuerdo"
                >
                  <q-icon name="get_app" color="black" size="1.3em"/>
                  <q-tooltip>Descargar original</q-tooltip>
                </a>
              </li>
            </ul>
          </div>
        </section>
      </article>

      <div class="col-md-3">
        <div class="uplouder">
          <q-uploader
            url=""
            auto-upload
            color="white"
            method="POST"
            accept=".pdf,.docx,.doc"
            ref="uploader"
            text-color="black"
            style="width: 100%"
            :factory="uploadFile"
            label="Subir notificación"
            @added="addFile"
            @failed="failed"
            @finish="finished"
            @removed="removed"
            :filter="checkFileSize"
          />
        </div>
      </div>
    </div>

    <q-dialog
      v-model="showModalN"
      @hide="showModalN = false"
    >
      <form-notificacion-crear
        v-if="showModalN"
        :data="formData"
        :actores="actores"
        :autoridades="autoridades"
        :autoridadesSub="autoridadesSub"
        :terceros="terceros"
        :expediente="expediente"
        @cleanBuffer="cleanBuffer"
        @close="showModalN = false"
      >
      </form-notificacion-crear>
    </q-dialog>

    <q-dialog
      v-model="showModalNotificados"
      @hide="closeModalNotificados"
    >
      <modal-notificados
        v-if="showModalNotificados"
        :expediente="expediente"
        :acuerdo="acuerdo"
        :notificaciones="notificaciones"
        @openModalNotificacion="openModalNotificacion"
        @openModalNotificacionEditar="openModalNotificacionEditar"
        @close="closeModalNotificados"
      ></modal-notificados>
    </q-dialog>

    <q-dialog
      v-model="showInfoAcuerdo"
      @hide="showInfoAcuerdo = false"
    >
      <modal-info-acuerdo
        :acuerdo="acuerdo"
        @open-modal-listado-boletin="openModalListadoBoletin"
        @open-modal-listado-comparecencia="openModalListadoComparecencia"
        @close="showInfoAcuerdo = false"
      >
      </modal-info-acuerdo>
    </q-dialog>

    <q-dialog
      v-model="showListadoBoletin"
      @hide="showListadoBoletin = false"
    >
      <modal-listados-boletin
        :acuerdo="acuerdo"
        :listadosBoletin="listadosBoletin"
        @close="showListadoBoletin = false"
      >
      </modal-listados-boletin>
    </q-dialog>

    <q-dialog
      v-model="showListadoComparecencia"
      @hide="showListadoComparecencia = false"
    >
      <modal-listados-comparecencia
        :acuerdo="acuerdo"
        :listadosComparecencia="listadosComparecencia"
        @close="showListadoComparecencia = false"
      >
      </modal-listados-comparecencia>
    </q-dialog>

    <q-dialog
      v-model="showModalFecha"
      @hide="showModalFecha = false"
    >
      <modal-fecha
        v-if="showModalFecha"
        :acuerdo="acuerdo"
        :actuacion="actuacion"
        @openModalListado="openModalListado"
        @openModalForm="openModalForm"

        @asignarListado="asignarListado"
        @mensajeGuardarListado="mensajeGuardarListado"
        @close="showModalFecha = false"
      >
      </modal-fecha>
    </q-dialog>

    <q-dialog
      v-model="showModalListados"
      @hide="showModalListados = false"
    >
      <modal-listados
        v-if="showModalListados"
        :formData="formDataL"
        :listadosAcuerdos="listadosAcuerdos"
        @openModalForm="openModalForm"
        @openModalFecha="openModalFecha"

        @asignarListado="asignarListado"
        @close="showModalListados = false"
      ></modal-listados>
    </q-dialog>

    <q-dialog
      v-model="showModalFormListado"
      @hide="showModalFormListado = false"
    >
      <modal-form-listado
        v-if="showModalFormListado"
        :acuerdo="acuerdo"
        :formData="formDataL"
        @openModalListado="openModalListado"
        @openModalFecha="openModalFecha"

        @mensajeGuardarListado="mensajeGuardarListado"
        @close="showModalFormListado = false"
      ></modal-form-listado>
    </q-dialog>

    <q-dialog
      v-model="showModalObservacion"
      @hide="closeModalObservacion"
    >
      <listado-modal-observacion
        v-if="showModalObservacion"
        :pendingAcuerdo="pendingAcuerdo"
        @saveObservacion="saveObservacion"
        @cerrar="closeModalObservacion"
      ></listado-modal-observacion>
    </q-dialog>
  </div>
</template>

<script>
import {
  Notify,
  Loading,
  QDialog,
  QTooltip,
  QUploader,
} from 'quasar';

import _ from 'lodash';
import moment from 'moment';

import errors from 'boot/errors';
import infoFile from 'boot/infoFile';
import sidjbridge from 'boot/sidjbridge';
import updateState from 'src/store/utlils';

import ModalNotificados from 'components/ExpedienteConsulta/Generales/ModalNotificados';
import ListadoModalObservacion from 'components/ListaEstrados/Generacion/ListadoModalObservacion';

import ModalListados from './ModalListados';
import ModalFecha from './ModalFecha';
import ModalFormListado from './ModalFormListado';
import ModalInfoAcuerdo from './ModalInfoAcuerdo';
import ModalListadosBoletin from './InfoListados/ModalListadosBoletin';
import ModalListadosComparecencia from './InfoListados/ModalListadosComparecencia';
import TablaNotificaciones from '../Notificaciones/TablaNotificaciones';
import FormNotificacionCrear from '../Notificaciones/FormNotificacionCrear';

const sweetAlertConfig = {
  type: 'success',
  showCancelButton: false,
  confirmButtonColor: '#3085d6',
  confirmButtonText: 'Ok',
};

export default {
  name: 'item-acuerdo',
  props: {
    acuerdo: {
      required: true,
      type: Object,
    },
    actuacion: {
      required: true,
      type: Object,
    },
    expediente: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      formData: {
        temp_files: [],
        acuerdo_id: this.acuerdo.acuerdo_id,
      },
      formDataL: {
        fecha_publicacion: null,
      },
      listado: {
        id: null,
        lista: [],
      },
      showModalObservacion: false,
      pendingAcuerdo: {},
      listadosAcuerdos: null,
      sizeAllowed: 50,
      filesUploaded: 0,

      showModalN: false,
      showModalFecha: false,
      showInfoAcuerdo: false,
      showModalNTemporal: false,
      showModalNotificados: false,
      showTablaNotificaciones: false,
      showModalListados: false,
      showModalFormListado: false,
      showListadoBoletin: false,
      showListadoComparecencia: false,
    };
  },
  components: {
    QDialog,
    QTooltip,
    QUploader,
    ModalFecha,
    ModalListados,
    ModalNotificados,
    ModalFormListado,
    ModalInfoAcuerdo,
    TablaNotificaciones,
    ModalListadosBoletin,
    FormNotificacionCrear,
    ListadoModalObservacion,
    ModalListadosComparecencia,
  },
  plugins: {
    Notify,
  },
  computed: {
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
    terceros() {
      return this.$store.getters['terceros/getTercerosAll'].filter(item => this.expediente.terceros_perjudicados.includes(item.id));
    },
    fechaElaboracion() {
      return this.acuerdo.fecha_elaboracion ? moment(this.acuerdo.fecha_elaboracion).format('MMM D YYYY') : '-';
    },
    notificaciones() {
      return this.$store.getters['notificaciones/getNotificacionesByAcuerdoId'](this.acuerdo.acuerdo_id);
    },
    listadosBoletin() {
      return this.$store.getters['listadosAcuerdos/getListadosAcuerdosAll']
        .filter(item => item.lista.find(x => x.no_folio === this.acuerdo.noFolio));
    },
    listadosComparecencia() {
      return this.$store.getters['listadosAcuerdosComparecencia/getListadosAcuerdosAll']
        .filter(item => item.lista.find(x => x.no_folio === this.acuerdo.noFolio));
    },
    tipoAcuerdo() {
      return this.$store.getters['tiposAcuerdo/getTipoAcuerdoByTipoAcuerdoId'](this.acuerdo.tipo_id);
    },
    tipoNotifiquese() {
      return this.$store.getters['tiposNotifiquese/getTipoNotifiqueseByTipoNotifiqueseId'](this.acuerdo.notifiquese_id);
    },
  },
  methods: {
    descargarAcuerdo() {
      window.open(
        `${window.location.protocol}//${window.location.host}/descargas/acuerdos/${this.acuerdo.id}`,
        '_blank',
      );
    },
    failed(info) {
      console.log(info);
    },
    addFile(file) {
      this.filesUploaded = file.length;
    },
    cleanBuffer() {
      this.formData.temp_files = [];
    },
    removed(file) {
      this.filesUploadedTotal -= file.length;
      this.formData.temp_files = [];
    },
    checkFileSize(files) {
      const array = files.filter(file => file.size < this.sizeAllowed * 1024 * 1024);
      if (array.length === 0) {
        this.$swal({
          title: `No está permitido subir\n archivos de más de ${this.sizeAllowed}mb`,
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        });
      }
      return array;
    },
    async uploadFile(file) {
      Loading.show();
      this.formData.temp_files = [];

      try {
        const res = await infoFile(file[0]);
        const fd = new FormData();

        fd.append('file', file[0]);
        fd.append('hash', res.hash);

        const response = await this.$store.dispatch('archivos/postArchivosTemporales', fd);

        Loading.hide();
        this.formData.temp_files.push(response.data.data);
        return Promise.resolve(response.data.data);
      } catch (err) {
        Loading.hide();
        this.showModalN = false;

        Notify.create({
          message: `Ocurrió un error con el archivo ${file[0].name}.`,
          position: 'bottom',
        });
        return Promise.reject(err);
      }
    },
    asignarListado(lista, id) {
      this.showModalListados = false;
      this.$swal({
        type: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ingresar',
        cancelButtonText: 'Cancelar',
        title: '¿Esta seguro de ingresar el acuerdo a este listado?',
      }).then((result) => {
        if (result.value) {
          Loading.show();
          return sidjbridge.get('/v1/searchAcuerdos/acuerdos/', {
            params: {
              folioAcuerdo: this.acuerdo.noFolio,
            },
          }).then((resp) => {
            const acuerdo = resp.data.data[0];
            this.pendingAcuerdo = acuerdo;
            if (!this.pendingAcuerdo.fecha_boletin) {
              this.putListadoAcuerdo(lista, id);
              Loading.hide();
              return Promise.resolve(true);
            }

            this.$swal({
              ...sweetAlertConfig,
              icon: 'error',
              showCancelButton: true,
              text: '¿Desea agregarlo?',
              title: `El acuerdo con el folio\n ${this.acuerdo.noFolio} ya \nse encuentra publicado`,
              cancelButtonColor: '#d33',
              cancelButtonText: 'Cancelar',
            }).then((respSweet) => {
              if (respSweet.value) {
                Loading.hide();
                this.showModalObservacion = true;
                this.listado = {
                  lista,
                  id,
                };
              }
              if (respSweet.dismiss === 'cancel') {
                Loading.hide();
                return Promise.resolve(true);
              }
              return Promise.resolve(true);
            });

            Loading.hide();

            return Promise.resolve(true);
          }).catch((err) => {
            console.log(err);
            Loading.hide();

            return Promise.reject(false);
          });
        }
        return Promise.resolve(true);
      });
    },
    closeModalObservacion() {
      this.showModalObservacion = false;
      this.pendingAcuerdo = {};
      this.listado.id = null;
      this.listado.lista = [];
    },
    saveObservacion(pendingAcuerdo) {
      this.listado.lista = updateState(this.listado.lista, pendingAcuerdo);
      this.putListadoAcuerdo(this.listado.lista, this.listado.id);
      this.closeModalObservacion();
    },
    async putListadoAcuerdo(lista, id) {
      lista = updateState(lista, this.pendingAcuerdo);

      try {
        await this.$store.dispatch('listadosAcuerdos/putListadoAcuerdo', {
          id,
          lista,
        });

        Notify.create({
          message: 'Acuerdo agregado al listado.',
          position: 'bottom',
        });
      } catch (err) {
        errors(err);
      } finally {
        Loading.hide();
      }
    },
    mensajeGuardarListado(listadoDuplicado) {
      this.showModalFormListado = false;
      this.$swal({
        ...sweetAlertConfig,
        icon: 'error',
        showCancelButton: true,
        text: '¿Desea consultarlo?',
        title: 'Ya existe un listado registrado con dicha ponencia.',
      }).then((result) => {
        if (result.value) {
          this.$router.push({
            name: 'listado-acuerdo',
            params: {
              uuid: listadoDuplicado.id,
            },
          });
        }
      });
    },
    openModalListado(listadosAcuerdos, formDataL) {
      this.showModalFecha = false;
      this.showModalListados = true;
      this.showModalFormListado = false;
      this.listadosAcuerdos = listadosAcuerdos;
      this.formDataL = formDataL;
    },
    openModalForm(formDataL) {
      this.showModalFecha = false;
      this.showModalListados = false;
      this.showModalFormListado = true;
      this.formDataL = formDataL;
    },
    openModalFecha() {
      this.showModalFecha = true;
      this.showModalListados = false;
      this.showModalFormListado = false;
    },
    async openInfoAcuerdo() {
      Loading.show({
        message: 'Cargando...',
      });
      try {
        await this.$store.dispatch('listadosAcuerdos/fetchAllListadosAcuerdos', {
          folio_acuerdo: this.acuerdo.noFolio,
        });

        this.showInfoAcuerdo = true;
      } catch (err) {
        errors(err);
      } finally {
        Loading.hide();
      }
    },
    openModalListadoBoletin() {
      this.showInfoAcuerdo = !this.showInfoAcuerdo;
      this.showListadoBoletin = true;
    },
    openModalListadoComparecencia() {
      this.showInfoAcuerdo = !this.showInfoAcuerdo;
      this.showListadoComparecencia = true;
    },
    finished() {
      if (this.acuerdo.notificados.length > 0) {
        this.showModalNotificados = true;
      } else {
        this.showModalN = true;
      }
    },
    openModalNotificacion(acuerdo) {
      let notificacion = null;

      this.acuerdoSelected = acuerdo;

      if (acuerdo.notificado) {
        notificacion = acuerdo.notificado;
      }

      this.formData = {
        ...notificacion,
        temp_files: this.formData.temp_files ?? [],
      };

      this.showModalN = true;
    },

    openModalNotificacionEditar(notificacion) {
      this.$emit('openModalNotificacionEditar', notificacion);
    },
    closeModalNotificados() {
      this.showModalNotificados = false;
      this.showTablaNotificaciones = true;
      this.cleanBuffer();
      this.$refs.uploader.reset();
    },
  },
};
</script>

<style>
.uplouder{
  margin: 20px;
}
.q-btn--rectangle .q-btn__content i {
  font-size: 2em !important;
}
</style>
