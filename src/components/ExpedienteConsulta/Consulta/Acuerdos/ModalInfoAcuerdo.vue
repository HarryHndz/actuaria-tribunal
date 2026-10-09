<template>

  <q-card style="width: 1000px; max-width: 110vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Información acuerdo {{acuerdo.noFolio}}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="q-ma-sm">
        <div class="row q-ma-sm">
          <div class="col-md-4">
            Folio acuerdo: <br/>
            <strong>{{ acuerdo.noFolio }}</strong>
          </div>
          <div class="col-md-4">
            Fecha acuerdo: <br/>
            <strong>{{ acuerdo.fecha_elaboracion | moment('DD MMM YYYY') }}</strong>
          </div>
          <div class="col-md-4">
            Fecha de modificación: <br/>
            <strong>{{ acuerdo.updated_at | moment('DD MMM YYYY') }}</strong>
          </div>
        </div>

        <div class="row q-ma-sm q-my-md">
          <div class="col-md-4">
            Tipo de acuerdo: <br/>
            <strong>{{ tipoAcuerdo.descripcion }}</strong>
          </div>
          <div class="col-md-4">
            Notifiquese: <br/>
            <strong>{{ tipoNotifiquese ? tipoNotifiquese.descripcion : '' }}</strong>
          </div>
        </div>

        <div class="row q-ma-sm q-my-md">
           <div class="col-md-4">
            Fecha de creación: <br/>
            <strong>{{ acuerdo.created_at | moment('DD MMM YYYY') }}</strong>
          </div>
          <div class="col-md-4" v-if="fechaBoletin">
            Fecha publicación boletin: <br/>
            <strong>{{ fechaBoletin }}</strong>
          </div>
        </div>

        <div class="row q-ma-sm q-my-md">
          <div class="col-md-12">
            Observaciones: <br/>
            <strong>{{ acuerdo.observaciones ? acuerdo.observaciones : '-' }}</strong>
          </div>
        </div>

        <q-separator style="margin: 20px 0px 17px 0px;"/>

        <div class="row q-mb-md float-right">
          <a href="#" v-if="listadosAcuerdos.length > 0"
            class="q-mx-sm"
            @click.prevent="$emit('open-modal-listado-boletin')"
          >
            <q-icon name="assignment_turned_in" color="black" size="1.4em"/>
            <q-tooltip>Consultar listado de estrados</q-tooltip>
          </a>

          <a href="#" v-if="listadosAcuerdosComparecencia.length > 0"
            class="q-mx-sm"
            @click.prevent="$emit('open-modal-listado-comparecencia')"
          >
            <q-icon name="reorder" color="black" size="1.4em"/>
            <q-tooltip>Consultar listado comparecencias</q-tooltip>
          </a>

          <a href="#" class="q-mx-sm"
            @click.prevent="descargar"
          >
            <q-icon name="get_app" color="black" size="1.4em"/>
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

import moment from 'moment';

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
    fechaBoletin() {
      return this.acuerdo.fecha_boletin ? moment(this.acuerdo.fecha_boletin).format('DD MMM YYYY') : null;
    },
    folio() {
      if (this.acuerdo.no_folio_actuacion) {
        const data = this.acuerdo.no_folio_actuacion.split('/');
        return data[0];
      }
      return '--';
    },
    listadosAcuerdos() {
      return this.$store.getters['listadosAcuerdos/getListadosAcuerdosAll']
        .filter(item => item.lista.find(x => x.no_folio === this.acuerdo.noFolio));
    },
    listadosAcuerdosComparecencia() {
      return this.$store.getters['listadosAcuerdosComparecencia/getListadosAcuerdosAll']
        .filter(item => item.lista.find(x => x.no_folio === this.acuerdo.noFolio));
    },
    tipoAcuerdo() {
      return this.$store.getters['tiposAcuerdo/getTipoAcuerdoByTipoAcuerdoId'](this.acuerdo.tipo_id);
    },
    tipoNotifiquese() {
      return this.$store.getters['tiposNotifiquese/getTipoNotifiqueseByTipoNotifiqueseId'](this.acuerdo.notifiquese_id);
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
