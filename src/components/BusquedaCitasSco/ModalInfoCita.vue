<template>
  <q-card style="width: 900px; max-width: 950px;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">CITA {{cita.no_folio}}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="q-ma-sm">
        <div class="row q-ma-sm q-py-sm">
          <div class="col-md-4">
            No folio: <br/>
            <strong>{{cita.no_folio}}</strong>
          </div>
          <div class="col-md-4">
            Tramite: <br/>
            <strong>{{tramite.descripcion}}</strong>
          </div>
          <div class="col-md-4">
            Fecha cita: <br/>
            <strong>{{cita.fecha_cita | moment('DD MMM YYYY hh:mm a')}}</strong>
          </div>
        </div>

        <div class="row q-ma-sm q-py-sm">
          <div class="col-md-4">
            Promovente: <br/>
            <strong>{{cita.nombre}} {{cita.primer_apellido}} {{cita.segundo_apellido}}</strong>
          </div>
          <div class="col-md-4">
            Correo: <br/>
            <strong>{{cita.email}}</strong>
          </div>
          <div class="col-md-4">
            Telefono: <br/>
            <strong>{{cita.telefono}}</strong>
          </div>
        </div>


        <div class="row q-ma-sm q-py-sm">
          <div class="col-md-4">
            Referencia: <br/>
            <strong>{{cita.referencia ? cita.referencia : '-'}}</strong>
          </div>
          <div class="col-md-8">
            Observaciones: <br/>
            <strong>{{cita.observaciones}}</strong>
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
  name: 'modal-info-cita',
  props: {
    cita: {
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
    tramite() {
      return this.$store.getters['tiposTramitesSco/getTiposTramitesScoAll'].find(i => i.tipo_id === this.cita.tramite_id);
    },
  },
};
</script>


<style scoped>
a {
  color: unset;
  text-decoration: unset;
}
.main-text{
  margin: 0px;
}
.secondary-text{
  font-size: 0.95em;
  margin: -4px 0 16px;
}
</style>
