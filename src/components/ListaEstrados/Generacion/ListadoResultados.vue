<template>
  <div>
    <listado-resultado v-show="resultados.length > 0"
      v-for="resultado in resultados.slice().reverse()"
      :key="resultado.id"
      :acuerdo="resultado"
      :tipoListado="tipoListado"
      @open-modal-pdf="openModalPdf"
      @open-info-acuerdo="openInfoAcuerdo"
      @editar="$emit('editar', resultado)"
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

import sidjbridge from 'boot/sidjbridge';

import ModalPdf from 'components/Generales/ModalPdf';
import ModalInfoAcuerdo from 'components/ListaEstrados/Consulta/ModalInfoAcuerdo';

import ListadoResultado from './ListadoResultado';

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
    tipoListado: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      base64: null,
      nombre: null,
      acuerdo: null,
      errorB64: null,
      fetchingAcuerdo: false,
      previsualizarPdf: null,
      showInfoAcuerdo: false,
    };
  },
  components: {
    QDialog,
    ModalPdf,
    ModalInfoAcuerdo,
    ListadoResultado,
  },
  methods: {
    closeModalPdf() {
      this.previsualizarPdf = false;
      this.nombreAcuerdo = '';
      this.fetchingAcuerdo = false;
      this.base64 = '';
      this.acuerdo = null;
    },
    openModalPdf(acuerdo) {
      this.acuerdo = acuerdo;
      this.fetchingAcuerdo = true;
      this.previsualizarPdf = true;
      this.nombreAcuerdo = acuerdo.no_folio;

      return sidjbridge.get(`/descargas/acuerdos/${acuerdo.id}/base-64`)
        .then((response) => {
          this.fetchingAcuerdo = false;
          this.base64 = response.data;
          return Promise.resolve(true);
        })
        .catch((err) => {
          this.fetchingAcuerdo = false;
          this.base64 = null;
          this.errorB64 = err;
          return Promise.reject(true);
        });
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
