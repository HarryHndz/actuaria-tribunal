<template>
  <div class="SIDJ-results">
    <h6 class="q-my-sm">Acuerdos</h6>
    <q-separator />

    <item-acuerdo
      v-for="acuerdo in acuerdos.slice().reverse()"
      :key="acuerdo.id"
      :acuerdo="acuerdo"
      :actuacion="actuacion"
      :expediente="expediente"
      @imprimir="imprimir"
      @open-modal-pdf="openModalPdf"
      @openModalNotificacionEditar="openModalNotificacionEditar"
    >
    </item-acuerdo>

    <q-dialog
      full-height
      v-model="previsualizarPdf"
      @hide="closeModalPdf"
    >
      <modal-pdf
        v-if="previsualizarPdf"
        :base64="base64"
        :nombreDocumento="nombreAcuerdo"
        :fetchingDocumento="fetchingAcuerdo"
        :errorB64="errorB64"
        @close="closeModalPdf"
      >
      </modal-pdf>
    </q-dialog>

  </div>
</template>

<script>
import {
  Loading,
  QDialog,
  QSeparator,
} from 'quasar';

import moment from 'moment';
import printJS from 'print-js';

import errors from 'boot/errors';
import sidjbridge from 'boot/sidjbridge';

import ModalPdf from 'components/Generales/ModalPdf';
import ItemAcuerdo from './ItemAcuerdo';

export default {
  name: 'contenedor-acuerdos',
  props: {
    acuerdos: {
      required: true,
      type: Array,
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
      previsualizarPdf: null,
      nombreDocumento: null,
      fetchingDocumento: null,
      base64: null,
      errorB64: null,
      acuerdo: null,
    };
  },
  components: {
    QDialog,
    ModalPdf,
    QSeparator,
    ItemAcuerdo,
  },
  computed: {
    tipoAcuerdo() {
      return this.$store.getters['tiposAcuerdo/getTipoAcuerdoByTipoAcuerdoId'](this.acuerdo.tipo_id);
    },
    fechaElaboracion() {
      return this.acuerdo.fecha_elaboracion ? moment(this.acuerdo.fecha_elaboracion).format('MMM D YYYY') : '-';
    },
  },
  methods: {
    closeModalPdf() {
      this.previsualizarPdf = false;
      this.nombreAcuerdo = null;
      this.fetchingAcuerdo = false;
      this.base64 = null;
      this.acuerdo = null;
    },
    async openModalPdf(acuerdo) {
      this.acuerdo = acuerdo;
      this.fetchingAcuerdo = true;
      this.previsualizarPdf = true;
      this.nombreAcuerdo = `${this.tipoAcuerdo.descripcion} \u00A0 ${this.fechaElaboracion}`;

      try {
        const response = await sidjbridge.get(`/descargas/acuerdos/${acuerdo.id}/base-64`);
        this.base64 = response.data;
      } catch (e) {
        this.errorB64 = e;
        this.base64 = null;
        errors(e);
      } finally {
        this.fetchingAcuerdo = false;
      }
    },
    async imprimir(acuerdo) {
      Loading.show({
        message: 'Cargando...',
      });

      try {
        const response = await sidjbridge.get(`/descargas/acuerdos/${acuerdo.id}/base-64`);
        if (response.data) {
          printJS({ printable: response.data, type: 'pdf', base64: true });
        } else {
          this.$swal({
            icon: 'error',
            title: 'Error',
            text: 'Archivo no encontrado',
          });
        }
      } catch (e) {
        errors(e);
      } finally {
        Loading.hide();
      }
    },
    openModalNotificacionEditar(notificacion) {
      this.$emit('openModalNotificacionEditar', notificacion);
    },
  },
};
</script>
