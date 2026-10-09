<template>
  <q-card style="width: 1200px; max-width: 130vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Errores para {{acuerdo.no_folio_acuerdo}}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="q-ma-sm">
        <div class="row">
          <div class="col-md-12 col-xs-12">
            <ul v-for="(item, index) in acuerdo.errors"
              :key="index"
            >
              <li>{{item[0]}}</li>
            </ul>
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
  name: 'modal-errores',
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
      if (this.acuerdo.no_folio_actuacion) {
        const data = this.acuerdo.no_folio_actuacion.split('/');
        return data[0];
      }
      return '--';
    },
    tipoNotificacion() {
      return this.$store.getters['tiposNotificaciones/getTiposNotificacionesAll'].find(i => i.tipo_notificacion_id === this.acuerdo.tipo_id);
    },
  },
};
</script>
