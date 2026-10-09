<template>
  <q-card style="width: 1200px; max-width: 130vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Información notificación</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="q-ma-md">
        <div class="row q-ma-sm">
          <div class="col-md-4">
            Folio del notificacion: <br/>
            <strong>{{notificacion.no_folio_notificacion}}</strong>
          </div>
          <div class="col-md-4">
            Fecha elaboración de notificación <br/>
            <strong>{{notificacion.fecha_elaboracion_cedula | moment('DD MMM YYYY')}}</strong>
          </div>
          <div class="col-md-4">
            Tipo de notificación <br/>
            <strong>{{tipoNotificacion.descripcion}}</strong>
          </div>
        </div>
        <div class="row q-ma-sm q-my-md">
          <div class="col-md-4">
            No. juicio <br/>
            <strong>{{notificacion.expediente}}</strong>
          </div>
          <div class="col-md-4">
            Folio de actuación:<br/>
            <strong>{{folio}}</strong>
          </div>
          <div class="col-md-4">
            Proceso <br/>
            <strong>{{notificacion.proceso}}</strong>
          </div>
        </div>
        <div class="row q-ma-sm q-my-md">
          <div class="col-md-12">
            Observaciones de la notificación<br/>
            <strong>{{notificacion.observaciones ? notificacion.observaciones : '--'}}</strong>
          </div>
        </div>
      </div>
    </q-card-section>

  </q-card>
</template>

<script>
import {
  QCard,
  QSpace,
  ClosePopup,
  QSeparator,
  QCardSection,
} from 'quasar';

export default {
  name: 'modal-info-notificacion',
  props: {
    notificacion: {
      required: true,
      type: Object,
    },
  },
  components: {
    QCard,
    QSpace,
    QSeparator,
    QCardSection,
  },
  directives: {
    ClosePopup,
  },
  computed: {
    folio() {
      if (this.notificacion.no_folio_actuacion) {
        const data = this.notificacion.no_folio_actuacion.split('/');
        return data[0];
      }
      return '--';
    },
    tipoNotificacion() {
      return this.$store.getters['tiposNotificaciones/getTiposNotificacionesAll'].find(i => i.tipo_notificacion_id === this.notificacion.tipo_id);
    },
  },
  methods: {
    descargar() {
      window.open(
        `${window.location.protocol}//${window.location.host}/descargas/notificacions/${this.notificacion.id}`,
        '_blank',
      );
    },
  },
};
</script>
