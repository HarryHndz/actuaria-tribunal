<template>
  <tr class="text-left">
    <td>{{notificacion.no_folio}}</td>
    <td>{{tipoNotificacion.descripcion}}</td>
    <td>{{notificacion.fecha_elaboracion}}</td>
    <td>{{notificacion.fecha_notificacion}}</td>
    <td>{{notificacion.notificados}}</td>
    <td>
      <a href="#"
        @click.prevent="$emit('openModalPdf', notificacion)"
      >
        <q-icon name="visibility" color="black" size="1.3em"/>
        <q-tooltip>Visualizar</q-tooltip>
      </a>
      <a href="#"
        @click.prevent="$emit('imprimir', notificacion)"
      >
        <q-icon name="print" color="black" size="1.3em"/>
        <q-tooltip>Imprimir</q-tooltip>
      </a>
      <a href="#"
        @click.prevent="downloadDocumento"
      >
        <q-icon name="get_app" color="black" size="1.3em"/>
        <q-tooltip>Descargar original</q-tooltip>
      </a>
      <a href="#" v-if="!notificacion.boletin.notificacion_generada_at"
        @click.prevent="openModalNotificacionEditar"
      >
        <q-icon name="edit" color="black" size="1.3em"/>
        <q-tooltip>Editar</q-tooltip>
      </a>
      <a href="#" v-if="!notificacion.boletin.notificacion_generada_at"
        @click.prevent="$emit('deleteNotificacion', notificacion)"
      >
        <q-icon name="delete" color="black" size="1.3em"/>
        <q-tooltip>Borrar</q-tooltip>
      </a>
    </td>
  </tr>
</template>

<script>
import {
  QTooltip,
} from 'quasar';

export default {
  name: 'row-notificacion',
  props: {
    notificacion: {
      type: Object,
      required: true,
    },
  },
  components: {
    QTooltip,
  },
  computed: {
    tipoNotificacion() {
      return this.$store.getters['tiposNotificaciones/getTipoNotificacionByTipoNotificacionId'](this.notificacion.tipo_id);
    },
  },
  methods: {
    openModalNotificacionEditar() {
      this.$emit('openModalNotificacionEditar', this.notificacion);
    },
    downloadDocumento() {
      window.open(
        `${window.location.protocol}//${window.location.host}/descargas/notificaciones/${this.notificacion.id}`,
        '_blank',
      );
    },
  },
};
</script>

<style scoped>
a{
  padding: 0px 10px;
}
</style>
