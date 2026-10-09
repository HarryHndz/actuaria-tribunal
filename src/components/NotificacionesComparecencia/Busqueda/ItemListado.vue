<template>
  <article class="SIDJ-box col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <section class="SIDJ-box-row SIDJ-box-row-header">
      <div class="SIDJ-list SIDJ-list-header SIDJ-list-header-important">
        <div>
          <span><strong>{{ponencia.ponencia}}</strong></span>
          <span>{{actuario ? actuario.actuario : '--'}}</span>
        </div>

        <div>
          <span>{{listadoAcuerdo.folio}}</span>
          <span>Folio</span>
        </div>

        <div>
          <span>{{listadoAcuerdo.lista ? listadoAcuerdo.lista.length : '0'}}</span>
          <span>Acuerdos</span>
        </div>

        <div v-if="listadoAcuerdo.fecha_publicacion">
          <span>{{listadoAcuerdo.fecha_publicacion | moment('MMM D YYYY')}}</span>
          <span>Fecha publicación</span>
        </div>

        <div v-if="listadoAcuerdo.fecha_baja">
          <span>
            <strong class="text-red"> BAJA </strong>
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
          <li>
            <router-link href="#"
              :to="{
                name: 'listado-notificaciones-comparecencia',
                params: {
                  uuid: listadoAcuerdo.id,
                }
              }"
            >
              <q-icon name="search" color="black" size="1.3em"/>
              <q-tooltip>Consultar</q-tooltip>
            </router-link>
          </li>
          <li v-if="!listadoAcuerdo.fecha_boletin">
            <a href="#"
              @click.prevent="borrarListado"
            >
              <q-icon name="delete" color="black" size="1.3em"/>
              <q-tooltip>Eliminar listado</q-tooltip>
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

  </article>
</template>

<script>
import {
  QIcon,
  Notify,
  QTooltip,
} from 'quasar';

export default {
  name: 'item-listado',
  props: {
    listadoAcuerdo: {
      required: true,
      type: Object,
    },
  },
  components: {
    QIcon,
    QTooltip,
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
    borrarListado() {
      this.$swal({
        title: '¿Esta seguro de eliminar el listado?',
        text: 'Este cambio no se podrá revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      }).then((resp) => {
        if (resp.value) {
          this.$store.dispatch('listadosAcuerdosComparecencia/deleteListadoAcuerdo', {
            id: this.listadoAcuerdo.id,
          }).then(() => {
            Notify.create({
              message: 'Listado eliminado correctamente.',
              position: 'bottom',
            });
            return Promise.resolve(true);
          });
        }
      }).catch(() => {
        Notify.create({
          message: 'Ocurrió un error...',
          position: 'bottom',
        });

        return Promise.reject(false);
      });
    },
  },
};
</script>
