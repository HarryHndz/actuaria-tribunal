<template>
  <article class="SIDJ-box col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <section class="SIDJ-box-row SIDJ-box-row-header">
      <div class="SIDJ-list SIDJ-list-header SIDJ-list-header-important">
        <div>
          <span><strong>{{ponencia.ponencia}}</strong></span>
          <span>{{actuario ? actuario.actuario : '--'}}</span>
          <span>
            Tipo: <strong>{{tipoListado}} - {{leyenda ? leyenda.descripcion : '-'}}</strong>
          </span>
        </div>

        <div>
          <span>{{listadoAcuerdo.folio}}</span>
          <span class="text-caption">Folio</span>
        </div>

        <div>
          <span>{{listadoAcuerdo.lista ? listadoAcuerdo.lista.length : '0'}}</span>
          <span class="text-caption">Acuerdos</span>
        </div>

        <div v-if="listadoAcuerdo.fecha_surge_efectos">
          <span>{{listadoAcuerdo.fecha_surge_efectos | moment('DD MMM YYYY')}}</span>
          <span class="text-caption">Fecha surfe efectos</span>
        </div>

        <div v-if="listadoAcuerdo.fecha_publicacion">
          <span>{{listadoAcuerdo.fecha_publicacion | moment('DD MMM YYYY')}}</span>
          <span class="text-caption">Fecha publicación</span>
        </div>

        <div v-if="listadoAcuerdo.fecha_boletin">
          <span class="text-green text-center" v-if="listadoAcuerdo.fecha_boletin">
            <strong>LISTADO PUBLICADO</strong>
          </span>
        </div>
      </div>
    </section>

    <section class="SIDJ-box-row SIDJ-box-row-footer">
      <div class="SIDJ-box-row-footer-nav">
        <ul class="SIDJ-box-row-footer-nav-menu nav navbar-right">
          <li>
            <a href="#"
              @click.prevent="openModalLeyenda"
            >
              <q-icon name="print" color="black" size="1.3em"/>
              <q-tooltip>Imprimir</q-tooltip>
            </a>
          </li>
          <li>
            <a href="#"
              @click.prevent="exportarListado"
            >
              <q-icon name="far fa-file-excel" color="black" size="1.3em"/>
              <q-tooltip>Exportar</q-tooltip>
            </a>
          </li>
          <li>
            <router-link href="#"
              :to="{
                name: 'listado-acuerdo',
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
        </ul>
      </div>
    </section>

    <q-dialog
      @hide="showLeyendaModal = false"
      v-model="showLeyendaModal"
    >
      <modal-leyenda
        :lista="listadoAcuerdo"
        @imprimir="imprimir"
        @cerrar="showLeyendaModal = false"
      ></modal-leyenda>
    </q-dialog>

  </article>
</template>

<script>
import {
  QIcon,
  Notify,
  QDialog,
  QTooltip,
} from 'quasar';

import ModalLeyenda from '../Consulta/ModalLeyenda';

export default {
  name: 'item-listado',
  props: {
    listadoAcuerdo: {
      required: true,
      type: Object,
    },
  },
  data: () => ({
    showLeyendaModal: false,
  }),
  components: {
    QIcon,
    QDialog,
    QTooltip,
    ModalLeyenda,
  },
  computed: {
    actuario() {
      return this.$store.getters['actuarios/getActuarioByActuarioId'](this.listadoAcuerdo.actuario_id);
    },
    ponencia() {
      return this.$store.getters['ponencias/getPonenciaByPonenciaId'](this.listadoAcuerdo.ponencia_id);
    },
    tipoListado() {
      const tipo = this.$store.getters['tiposListados/getTiposListadosAll']
        .find(i => i.tipo_listado_id === this.listadoAcuerdo.tipo_listado_id);

      if (tipo) {
        return tipo.descripcion;
      }

      return 'ACTUACIÓN';
    },
    leyenda() {
      return this.$store.getters['tiposLeyendas/getTiposLeyendasAll'].find(i => i.tipo_leyenda_id === this.listadoAcuerdo.tipo_leyenda_id);
    },
  },
  methods: {
    imprimir() {
      window.open(
        `${window.location.protocol}//${window.location.host}/actuaria/imprimir/listado-acuerdos/${this.listadoAcuerdo.id}`,
        '_blank',
      );
    },
    exportarListado() {
      window.open(
        `${window.location.protocol}//${window.location.host}/actuaria/excel/listado-acuerdos/${this.listadoAcuerdo.id}`,
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
    borrarListado() {
      this.$swal({
        title: '¿Está seguro de eliminar el listado?',
        text: 'Este cambio no se podrá revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      }).then((resp) => {
        if (resp.value) {
          this.$store.dispatch('listadosAcuerdos/deleteListadoAcuerdo', {
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
