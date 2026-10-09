<template>

  <q-card style="width: 1000px; max-width: 110vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Información notificacion {{notificacion.no_folio}}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="q-ma-sm">
        <div class="row q-ma-sm">
          <div class="col-md-4">
            Folio notificacion: <br/>
            <strong>{{ notificacion.no_folio }}</strong>
          </div>
          <div class="col-md-4">
            Fecha de elaboración: <br/>
            <strong>{{ notificacion.fecha_elaboracion | moment('DD MMM YYYY') }}</strong>
          </div>
          <div class="col-md-4">
            Fecha de modificación: <br/>
            <strong>{{ notificacion.updated_at | moment('DD MMM YYYY') }}</strong>
          </div>
        </div>

        <div class="row q-ma-sm q-my-md">
          <div class="col-md-4">
            Notificados: <br/>
            <strong>{{ notificacion.notificados }}</strong>
          </div>
          <div class="col-md-4">
            Tipo de notificación: <br/>
            <strong>{{ tipoNotificacion ? tipoNotificacion.descripcion : '' }}</strong>
          </div>
          <div class="col-md-4">
            Fecha de notificación: <br/>
            <strong>{{ notificacion.fecha_notificacion | moment('DD MMM YYYY') }}</strong>
          </div>
        </div>

        <div class="row q-ma-sm q-my-md">
           <div class="col-md-4">
            Fecha de creación: <br/>
            <strong>{{ notificacion.created_at | moment('DD MMM YYYY') }}</strong>
          </div>
        </div>

        <div class="row q-ma-sm q-my-md">
          <div class="col-md-12">
            Observaciones: <br/>
            <strong>{{ notificacion.observaciones ? notificacion.observaciones : '-' }}</strong>
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
    tipoNotificacion() {
      return this.$store.getters['tiposNotificaciones/getTipoNotificacionByTipoNotificacionId'](this.notificacion.tipo_id);
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
