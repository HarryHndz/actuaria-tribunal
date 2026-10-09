<template>
  <div>
    <listado-resultado v-show="resultados.length > 0"
      v-for="resultado in resultados.slice().reverse()"
      :key="resultado.id"
      :acuerdo="resultado"
      :edicion="edicion"
      :tipoListado="tipoListado"
      @open-modal-pdf="openModalPdf"
      @open-modal-pdf-notificacion="openModalPdfNotificacion"
      @editar="$emit('editar', resultado)"
      @open-info-acuerdo="openInfoAcuerdo"
      @eliminar="$emit('eliminar', resultado.id)"
      @editar-acuerdo="$emit('editar-acuerdo', resultado)"
    >
    </listado-resultado>

    <template v-if="resultados.length == 0 && !fetching">
      <div class="x_content">
        <h5 class="text-center">No hay registros, escaneé código de barras</h5>
      </div>
    </template>

    <q-dialog
      full-height
      @hide="closeModalPdf"
      v-model="previsualizarPdf"
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

    <q-dialog
      @hide="closeInfoAcuerdo"
      v-model="showInfoAcuerdo"
    >
      <modal-info-acuerdo
        v-if="showInfoAcuerdo"
        :acuerdo="acuerdo"
        :tipoListado="tipoListado"
        @close="closeInfoAcuerdo"
      >
      </modal-info-acuerdo>
    </q-dialog>
  </div>
</template>

<script>
import {
  QDialog,
} from 'quasar';

import errors from 'boot/errors';
import sidjbridge from 'boot/sidjbridge';

import ModalPdf from 'components/Generales/ModalPdf';

import ListadoResultado from './ListadoResultado';
import ModalInfoAcuerdo from './ModalInfoAcuerdo';

export default {
  name: 'listado-resultados',
  props: {
    resultados: {
      required: true,
      type: Array,
    },
    fetching: {
      type: Boolean,
      required: true,
    },
    edicion: {
      type: Boolean,
      required: true,
    },
    tipoListado: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      base64: null,
      nombre: null,
      acuerdo: null,
      errorB64: null,
      nombreAcuerdo: null,
      fetchingAcuerdo: false,
      previsualizarPdf: null,
      showInfoAcuerdo: false,
    };
  },
  components: {
    QDialog,
    ModalPdf,
    ListadoResultado,
    ModalInfoAcuerdo,
  },
  methods: {
    closeModalPdf() {
      this.previsualizarPdf = false;
      this.nombreAcuerdo = '';
      this.fetchingAcuerdo = false;
      this.base64 = '';
      this.acuerdo = null;
    },
    async openModalPdf(acuerdo) {
      this.acuerdo = acuerdo;
      this.fetchingAcuerdo = true;
      this.previsualizarPdf = true;
      this.nombreAcuerdo = acuerdo.no_folio;

      try {
        const response = await sidjbridge.get(`/descargas/acuerdos/${acuerdo.id}/base-64`);
        this.fetchingAcuerdo = false;
        this.base64 = response.data;
      } catch (err) {
        this.fetchingAcuerdo = false;
        this.base64 = null;
        this.errorB64 = err;
      }
    },
    async openModalPdfNotificacion(acuerdo) {
      this.fetchingAcuerdo = true;
      this.previsualizarPdf = true;

      try {
        const notificaciones = await this.$store.dispatch('notificaciones/fetchAllNotificaciones', {
          acuerdo_id: acuerdo.acuerdos_id,
          isGeneratedBoletin: true,
        });

        const notificacion = notificaciones.find(i => i.acuerdo_id === acuerdo.acuerdos_id);

        this.acuerdo = acuerdo;
        this.nombreAcuerdo = notificacion.no_folio;

        const response = await sidjbridge.get(`/descargas/notificaciones/${notificacion.id}/base64`);

        this.fetchingAcuerdo = false;
        this.base64 = response.data;
      } catch (err) {
        this.fetchingAcuerdo = false;
        this.base64 = null;
        this.errorB64 = err;
        errors(err);
      }
    },
    openInfoAcuerdo(acuerdo) {
      this.acuerdo = acuerdo;
      this.showInfoAcuerdo = true;
    },
    closeInfoAcuerdo() {
      this.acuerdo = {};
      this.showInfoAcuerdo = false;
    },
  },
};
</script>
