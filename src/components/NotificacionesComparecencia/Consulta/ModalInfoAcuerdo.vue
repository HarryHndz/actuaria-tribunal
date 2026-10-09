<template>
  <q-card style="width: 1000px; max-width: 110vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Información acuerdo</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="q-ma-sm">
        <div class="row q-ma-sm">
          <div class="col-md-3">
            Folio del acuerdo: <strong>{{acuerdo.no_folio}}</strong>
          </div>
          <div class="col-md-3">
            Fecha del acuerdo:
            <strong>{{acuerdo.fecha_elaboracion || moment('MMM D YYYY')}}</strong>
          </div>
          <div class="col-md-6">
            Tipo de acuerdo: <strong>{{acuerdo.tipoacuerdo}}</strong>
          </div>
        </div>
        <div class="row q-ma-sm q-my-md">
          <div class="col-md-3">
            No. juicio: <strong>{{acuerdo.expediente}}</strong>
          </div>
          <div class="col-md-3">
            Folio de actuación:
            <strong>{{folio}}</strong>
          </div>
          <div class="col-md-6">
            Proceso: <strong>{{acuerdo.proceso}}</strong>
          </div>
        </div>
        <div class="row q-ma-sm q-my-md" v-if="acuerdo.fecha_baja">
          <div class="col-md-12">
            Fecha baja acuerdo:
            <strong>{{acuerdo.fecha_baja | moment('DD MMM YYYY')}}</strong>
          </div>
        </div>
        <div class="row q-ma-sm q-my-md">
          <div class="col-md-12">
            Observaciones:
            <strong>{{acuerdo.observaciones ? acuerdo.observaciones : '--'}}</strong>
          </div>
        </div>
        <div class="row q-ma-sm q-my-md" v-if="acuerdo.observacion_boletin">
          <div class="col-md-12">
            Observaciones boletin:
            <strong>{{acuerdo.observacion_boletin ? acuerdo.observacion_boletin : '--'}}</strong>
          </div>
        </div>

        <q-separator style="margin: 20px 0px 17px 0px;"/>

        <div class="row q-mb-md float-right">
          <a href="#"
            @click.prevent="descargar"
          >
            <q-icon name="get_app" color="black" size="1.3em"/>
            <q-tooltip>Descargar</q-tooltip>
          </a>
        </div>
      </div>
    </q-card-section>

  </q-card>
</template>

<script>
import {
  QCard,
  QSpace,
  QTooltip,
  ClosePopup,
  QSeparator,
  QCardSection,
} from 'quasar';

export default {
  name: 'modal-info-acuerdo',
  props: {
    acuerdo: {
      required: true,
      type: Object,
    },
  },
  components: {
    QCard,
    QSpace,
    QTooltip,
    QSeparator,
    QCardSection,
  },
  directives: {
    ClosePopup,
  },
  computed: {
    folio() {
      if (this.acuerdo.no_folio_actuacion) {
        const data = this.acuerdo.no_folio_actuacion.split('/');
        return data[0];
      }
      return '--';
    },
  },
  methods: {
    descargar() {
      window.open(
        `${window.location.protocol}//${window.location.host}/descargas/acuerdos/${this.acuerdo.id}`,
        '_blank',
      );
    },
  },
};
</script>
