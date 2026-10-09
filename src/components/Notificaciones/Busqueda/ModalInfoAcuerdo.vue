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
          <div class="col-md-4">
            Folio acuerdo: <br/>
            <strong>{{acuerdo.acuerdo.no_folio}}</strong>
          </div>
          <div class="col-md-4">
            Fecha del acuerdo: <br/>
            <strong>{{acuerdo.acuerdo.fecha_elaboracion | moment('DD MMM YYYY')}}</strong>
          </div>
          <div class="col-md-4">
            Tipo de acuerdo: <br/>
            <strong>{{acuerdo.tipo_de_acuerdo.descripcion}}</strong>
          </div>
        </div>

        <div class="row q-ma-sm q-my-md">
          <div class="col-md-4">
            No. juicio: <br/>
            <strong>{{acuerdo.expediente.nojuicio}}</strong>
          </div>
          <div class="col-md-4">
            Folio de actuación: <br/>
            <strong>{{folio}}</strong>
          </div>
          <div class="col-md-4">
            Proceso: <br/>
            <strong>{{acuerdo.proceso.descripcion}}</strong>
          </div>
        </div>

        <div class="row q-ma-sm q-my-md">
          <div class="col-md-12">
            Observaciones: <br/>
            <strong>{{acuerdo.observaciones ? acuerdo.observaciones : '--'}}</strong>
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
    QSeparator,
    QCardSection,
  },
  directives: {
    ClosePopup,
  },
  computed: {
    folio() {
      if (this.acuerdo.actuacion.no_folio) {
        const data = this.acuerdo.actuacion.no_folio.split('/');
        return data[0];
      }
      return '--';
    },
  },
};
</script>
