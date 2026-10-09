<template>
  <article class="SIDJ-box col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <section class="SIDJ-box-row SIDJ-box-row-header">
      <div class="SIDJ-list SIDJ-list-header SIDJ-list-header-important">
        <div>
          <span><strong>{{ponencia.ponencia}}</strong></span>
          <span>{{listadoAcuerdo.folio}}</span>
        </div>

        <div>
          <span>{{actuario ? actuario.actuario : '--'}}</span>
          <span>Actuario</span>
        </div>

        <div>
          <span>{{listadoAcuerdo.fecha_publicacion | moment('MMM D YYYY')}}</span>
          <span>Fecha de publicación</span>
        </div>

        <div v-if="listadoAcuerdo.fecha_baja">
          <span>
            <strong class="text-red">BAJA</strong>
          </span>
          <span>{{listadoAcuerdo.fecha_baja | moment('DD MMM YYYY')}}</span>
        </div>

        <div v-else-if="listadoAcuerdo.fecha_boletin">
          <span class="text-green text-center" v-if="listadoAcuerdo.fecha_boletin">
            <strong>PÚBLICO</strong>
          </span>
          <span>{{listadoAcuerdo.fecha_boletin | moment('DD MMM YYYY')}}</span>
        </div>
      </div>
    </section>

    <section class="SIDJ-box-row SIDJ-box-row-footer">
      <div class="SIDJ-box-row-footer-nav">
        <ul class="SIDJ-box-row-footer-nav-menu nav navbar-right">
          <li v-if="!listadoAcuerdo.fecha_boletin">
            <a href="#"
              @click.prevent="showListadoModal = true"
            >
              <q-icon name="edit" color="black"/>
              <q-tooltip>Editar</q-tooltip>
            </a>
          </li>
          <li>
            <a href="#"
              @click.prevent="imprimirListado"
            >
              <q-icon name="print" color="black"/>
              <q-tooltip>Imprimir</q-tooltip>
            </a>
          </li>
          <li>
            <a href="#"
              @click.prevent="exportarListado"
            >
              <q-icon name="far fa-file-excel" color="black"/>
              <q-tooltip>Exportar</q-tooltip>
            </a>
          </li>
          <li v-if="!listadoAcuerdo.fecha_boletin">
            <a href="#"
              @click.prevent="$emit('borrar-listado', listadoAcuerdo.id)"
            >
              <q-icon name="delete" color="black"/>
              <q-tooltip>Eliminar</q-tooltip>
            </a>
          </li>
          <li v-if="listadoAcuerdo.fecha_boletin && !listadoAcuerdo.fecha_baja">
            <a href="#"
              @click.prevent="$emit('dar-baja', listadoAcuerdo.id)"
            >
              <q-icon name="public_off" color="black" size="1.3em"/>
              <q-tooltip>Dar de baja</q-tooltip>
            </a>
          </li>
          <li v-if="listadoAcuerdo.fecha_boletin && listadoAcuerdo.fecha_baja">
            <a href="#"
              @click.prevent="$emit('dar-alta', listadoAcuerdo.id)"
            >
              <q-icon name="public" color="black" size="1.3em"/>
              <q-tooltip>Publicar</q-tooltip>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <q-dialog
      @hide="showListadoModal = false"
      v-model="showListadoModal"
    >
      <modal-listado
        v-if="showListadoModal"
        :lista="listadoAcuerdo"
        @cerrar="showListadoModal = false"
      ></modal-listado>
    </q-dialog>
  </article>
</template>

<script>
import {
  QIcon,
  QDialog,
  QTooltip,
} from 'quasar';

import ModalListado from './ModalListado';

export default {
  name: 'box-info-listado',
  props: {
    listadoAcuerdo: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      showListadoModal: false,
    };
  },
  components: {
    QIcon,
    QDialog,
    QTooltip,
    ModalListado,
  },
  computed: {
    actuario() {
      return this.$store.getters['actuarios/getActuarioByActuarioId'](this.listadoAcuerdo.actuario_id);
    },
    ponencia() {
      return this.$store.getters['ponencias/getPonenciaByPonenciaId'](this.listadoAcuerdo.ponencia_id);
    },
  },
  methods: {
    imprimirListado() {
      window.open(
        `${window.location.protocol}//${window.location.host}/actuaria/imprimir/comparecencia/${this.listadoAcuerdo.id}`,
        '_blank',
      );
    },
    exportarListado() {
      window.open(
        `${window.location.protocol}//${window.location.host}/actuaria/excel/comparecencia/${this.listadoAcuerdo.id}`,
        '_blank',
      );
    },
  },
};
</script>
