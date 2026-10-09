<template>
  <q-card style="width: 1000px; max-width: 110vw;">
    <q-card-section class="row items-center">
      <q-icon name="warning" color="yellow-8" size="2em"/>
      <div class="text-h6 q-ml-md">Información</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="q-ma-sm">
        <table class="q-table bordered striped-odd">
          <caption class="text-left q-mb-md">
            <strong>Han salido detalles con los siguientes acuerdos</strong>
          </caption>
          <thead>
            <tr>
              <th>Folio acuerdo</th>
              <th>Tipo acuerdo</th>
              <th>Fecha elaboración</th>
              <th>Promocion</th>
              <th>No juicio</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="errorAcuerdos.length == 0">
              <tr>
                <td class="text-center" colspan="8">Sin ubicacion registradas</td>
              </tr>
            </template>
            <template v-if="errorAcuerdos.length > 0">
              <tr v-for="item in errorAcuerdos"
                :key="item.id"
              >
                <td>{{item.no_folio}}</td>
                <td>{{item.tipoacuerdo}}</td>
                <td>{{item.fecha_elaboracion | moment('D MMM YYYY')}}</td>
                <td>{{item.proceso}}</td>
                <td>{{item.expediente}}</td>
              </tr>
            </template>
          </tbody>
        </table>
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
  name: 'modal-info-acuerdo-error',
  props: {
    errorAcuerdos: {
      required: true,
      type: Array,
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
};
</script>
