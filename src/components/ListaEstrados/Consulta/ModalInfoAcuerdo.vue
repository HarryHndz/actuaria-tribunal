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
            <strong>{{acuerdo.no_folio ? acuerdo.no_folio : 'N/A'}}</strong>
          </div>
          <div class="col-md-4">
            Fecha del acuerdo: <br/>
            <strong>{{acuerdo.fecha_elaboracion | moment('DD MMM YYYY')}}</strong>
          </div>
          <div class="col-md-4">
            Tipo de acuerdo: <br/>
            <strong>{{acuerdo.tipoacuerdo}}</strong>
          </div>
        </div>

        <template v-if="tipoListado.tipo_listado_id === 1">
          <div class="row q-ma-sm q-my-md">
            <div class="col-md-4">
              No. juicio: <br/>
              <strong>{{acuerdo.expediente}}</strong>
            </div>
            <div class="col-md-4">
              Folio de actuación: <br/>
              <strong>{{folio}}</strong>
            </div>
            <div class="col-md-4">
              Proceso: <br/>
              <strong>{{acuerdo.proceso}}</strong>
            </div>
          </div>
        </template>

        <template v-if="tipoListado.tipo_listado_id === 2">
          <div class="row q-ma-sm q-my-md">
            <div class="col-md-4">
              Proceso: <br/>
              <strong>{{acuerdo.proceso}}</strong>
            </div>
            <div class="col-md-4">
              No. Consignación: <br/>
              <strong>{{acuerdo.no_consignacion}}</strong>
            </div>
            <div class="col-md-4">
              Consignante: <br/>
              <strong>{{acuerdo.actor}}</strong>
            </div>
          </div>
        </template>

        <template v-if="tipoListado.tipo_listado_id === 3">
          <div class="row q-ma-sm q-my-md">
            <div class="col-md-4">
              No. Exhorto: <br/>
              <strong>{{acuerdo.no_exhorto}}</strong>
            </div>
            <div class="col-md-4">
              No. juicio: <br/>
              <strong>{{acuerdo.no_juicio}}</strong>
            </div>
            <div class="col-md-4">
              Actor: <br/>
              <strong>{{acuerdo.actor}}</strong>
            </div>
          </div>
        </template>

        <div class="row q-ma-sm q-my-md">
          <div class="col-md-12">
            Observaciones: <br/>
            <strong>{{acuerdo.observaciones ? acuerdo.observaciones : '--'}}</strong>
          </div>
        </div>

        <div class="row q-ma-sm q-my-md" v-if="acuerdo.observacion_boletin">
          <div class="col-md-12">
            Observaciones boletin: <br/>
            <strong>{{acuerdo.observacion_boletin ? acuerdo.observacion_boletin : '--'}}</strong>
          </div>
        </div>

        <q-separator style="margin: 20px 0px 17px 0px;"/>

        <div class="row q-mb-md float-right" v-if="acuerdo.acuerdos_id">
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
    tipoListado: {
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
