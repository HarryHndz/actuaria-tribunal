<template>
  <q-card style="width: 1200px; max-width: 130vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Información plantilla</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="q-ma-sm">
        <div class="row q-ma-sm">
          <div class="col-md-4">
            Nombre de la plantilla <br/>
            <strong>
              {{plantilla.nombre ? plantilla.nombre : '--'}}
            </strong>
          </div>
          <div class="col-md-4">
            Nombre del archivo <br/>
            <strong>
              {{plantilla.archivoPlantilla ? plantilla.archivoPlantilla.data.archivo : '--'}}
            </strong>
          </div>
          <div class="col-md-4">
            Fecha modificado <br/>
            <strong>
              {{plantilla.updated_at | moment('DD MMM YYYY hh:mm a')}}
            </strong>
          </div>
        </div>
        <div class="row q-ma-sm q-mt-lg">
          <div class="col-md-12">
            Comentarios: <br/>
            <strong>{{plantilla.comentarios ? plantilla.comentarios : '--'}}</strong>
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
  name: 'modal-info-plantilla',
  props: {
    plantilla: {
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
};
</script>
