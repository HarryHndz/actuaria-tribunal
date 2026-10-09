<template>
  <div>
    <listado-resultado v-show="resultados.length > 0"
      v-for="resultado in resultados.slice().reverse()"
      :edicion="edicion"
      :key="resultado.id"
      :acuerdo="resultado"
      :listadoAcuerdo="listadoAcuerdo"
      @open-modal-pdf="openModalPdf"
      @open-info-acuerdo="openInfoAcuerdo"
      @dar-baja-acuerdo="darBajaAcuerdo"
      @dar-alta-acuerdo="darAltaAcuerdo"
      @editar="$emit('editar', resultado)"
      @eliminar="$emit('eliminar', resultado.id)"
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
        @close="closeInfoAcuerdo"
      >
      </modal-info-acuerdo>
    </q-dialog>
  </div>
</template>

<script>
import {
  Loading,
  Notify,
  QDialog,
} from 'quasar';

import moment from 'moment';
import errors from '../../../boot/errors';

import ModalPdf from '../../Generales/ModalPdf';
import ListadoResultado from './ListadoResultado';
import ModalInfoAcuerdo from './ModalInfoAcuerdo';
import sidjbridge from '../../../boot/sidjbridge';

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
    listadoAcuerdo: {
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
    openModalPdf(acuerdo) {
      this.acuerdo = acuerdo;
      this.fetchingAcuerdo = true;
      this.previsualizarPdf = true;
      this.nombreAcuerdo = acuerdo.no_folio;

      sidjbridge.get(`/descargas/acuerdos/${acuerdo.id}/base-64`)
        .then((response) => {
          this.fetchingAcuerdo = false;
          this.base64 = response.data;
        })
        .catch((err) => {
          this.fetchingAcuerdo = false;
          this.base64 = null;
          this.errorB64 = err;
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
    darBajaAcuerdo(id) {
      this.$swal({
        title: '¿Esta seguro de dar de baja el acuerdo publicado?',
        text: 'Este cambio no se podrá revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Dar de baja',
      }).then((resp) => {
        if (resp.value) {
          Loading.show({
            message: 'Dando de baja acuerdo...',
          });
          this.resultados.map((element) => {
            if (element.id === id) {
              element.fecha_baja = moment().format('YYYY-MM-DD');
            }
            return element;
          });

          return this.$store.dispatch('listadosAcuerdosComparecencia/putBajaListadoAcuerdo', {
            id: this.listadoAcuerdo.id,
            lista: this.resultados,
          }).then(() => {
            Loading.hide();
            Notify.create({
              message: 'Acuerdo dado de baja',
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
    darAltaAcuerdo(id) {
      this.$swal({
        title: '¿Esta seguro volver a publicar el acuerdo?',
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
          this.resultados.map((element) => {
            if (element.id === id) {
              element.fecha_baja = null;
            }
            return element;
          });

          return this.$store.dispatch('listadosAcuerdosComparecencia/putAltaListadoAcuerdo', {
            id: this.listadoAcuerdo.id,
            lista: this.resultados,
          }).then(() => {
            Loading.hide();
            Notify.create({
              message: 'Acuerdo publicado',
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
