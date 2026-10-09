<template>
  <article class="SIDJ-box col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <section class="SIDJ-box-row SIDJ-box-row-header">
      <div class="SIDJ-list SIDJ-list-header SIDJ-list-header-important">
        <div>
          <span><strong>{{ ponencia.ponencia }}</strong></span>
          <span>{{ listadoAcuerdo.folio }}</span>
          <span>
            Tipo:
            <b>
              {{ tipoListado.descripcion }} - {{ leyenda ? leyenda.descripcion : '-' }}
            </b>
          </span>
        </div>

        <div>
          <span>{{ actuario ? actuario.actuario : '--' }}</span>
          <span class="text-caption">Actuario</span>
        </div>

        <div v-if="fechaSurgeEfectos">
          <span>{{ fechaSurgeEfectos }}</span>
          <span class="text-caption">Fecha surge efectos</span>
        </div>

        <div>
          <span>{{ listadoAcuerdo.fecha_publicacion | moment('DD MMM YYYY') }}</span>
          <span class="text-caption">Fecha de publicación</span>
        </div>

        <div v-if="listadoAcuerdo.fecha_boletin">
          <span class="text-green text-center" v-if="listadoAcuerdo.fecha_boletin">
            <b>LISTADO PUBLICADO</b>
          </span>
        </div>
      </div>
    </section>

    <section class="SIDJ-box-row SIDJ-box-row-footer">
      <div class="SIDJ-box-row-footer-nav">
        <ul class="SIDJ-box-row-footer-nav-menu nav navbar-right">
          <li v-if="!listadoAcuerdo.fecha_boletin">
            <span class="cursor-pointer q-mx-xs"
              @click.prevent="showListadoModal = true"
            >
              <q-icon name="edit" color="black" size="1.3em"/>
              <q-tooltip>Editar</q-tooltip>
            </span>
          </li>
          <li>
            <span class="cursor-pointer q-mx-xs"
              @click.prevent="imprimir"
            >
              <q-icon name="print" color="black" size="1.3em"/>
              <q-tooltip>Imprimir listado</q-tooltip>
            </span>
          </li>
          <li>
            <span class="cursor-pointer q-mx-xs"
              @click.prevent="exportarListado"
            >
              <q-icon name="far fa-file-excel" color="black" size="1.3em"/>
              <q-tooltip>Exportar listado</q-tooltip>
            </span>
          </li>
          <li v-if="listadoAcuerdo.fecha_boletin && hasNotificacionGenerated">
            <span class="cursor-pointer q-mx-xs"
              @click.prevent="descargarNotificacionByLista"
            >
              <q-icon name="document_scanner" color="black" size="1.3em"/>
              <q-tooltip>Imprimir notificaciones por lista</q-tooltip>
            </span>
          </li>
          <li v-if="!listadoAcuerdo.fecha_boletin">
            <span class="cursor-pointer q-mx-xs"
              @click.prevent="$emit('borrar-listado', listadoAcuerdo.id)"
            >
              <q-icon name="delete" color="black" size="1.3em"/>
              <q-tooltip>Eliminar</q-tooltip>
            </span>
          </li>
        </ul>
      </div>
    </section>

    <q-dialog
      @hide="showListadoModal = false"
      v-model="showListadoModal"
    >
      <modal-listado
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
  Loading,
} from 'quasar';

import moment from 'moment';
import printJS from 'print-js';

import errors from 'boot/errors';
import sidjbridge from 'boot/sidjbridge';
import ModalListado from './ModalListado';

export default {
  name: 'box-info-listado',
  props: {
    listadoAcuerdo: {
      required: true,
      type: Object,
    },
    tipoListado: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    showListadoModal: false,
    showLeyendaModal: false,
  }),
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
    fechaSurgeEfectos() {
      if (this.listadoAcuerdo.fecha_surge_efectos) {
        return moment(this.listadoAcuerdo.fecha_surge_efectos).format('DD MMM YYYY');
      }
      return null;
    },
    ponencia() {
      return this.$store.getters['ponencias/getPonenciaByPonenciaId'](this.listadoAcuerdo.ponencia_id);
    },
    hasNotificacionGenerated() {
      return this.listadoAcuerdo.lista.some(i => i.boletin_notificacion_generada_at);
    },
    leyenda() {
      return this.$store.getters['tiposLeyendas/getTiposLeyendasAll'].find(i => i.tipo_leyenda_id === this.listadoAcuerdo.tipo_leyenda_id);
    },
  },
  methods: {
    async descargarNotificacionByLista() {
      try {
        Loading.show({
          message: 'Cargando...',
        });
        const response = await sidjbridge.post(`descargas/notificaciones/listados-acuerdos/${this.listadoAcuerdo.id}/base64`);

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
    exportarListado() {
      window.open(
        `${window.location.protocol}//${window.location.host}/actuaria/excel/listado-acuerdos/${this.listadoAcuerdo.id}`,
        '_blank',
      );
    },
    imprimir() {
      window.open(
        `${window.location.protocol}//${window.location.host}/actuaria/imprimir/listado-acuerdos/${this.listadoAcuerdo.id}`,
        '_blank',
      );
    },
    openModalLeyenda() {
      if (this.listadoAcuerdo.tipo_leyenda_id) {
        this.imprimir();
      } else {
        this.showLeyendaModal = true;
      }
    },
  },
};
</script>
