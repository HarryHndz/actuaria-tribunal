<template>
  <q-card style="width: 1300px; max-width: 110vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Listados de estrados</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div>
        <div class="row q-ma-sm q-mb-lg">
          <div class="col-md-4">
            Folio acuerdo: <strong>{{acuerdo.noFolio}}</strong>
          </div>
          <div class="col-md-4">
            Fecha elaboración:
            <strong>{{acuerdo.fecha_elaboracion | moment('DD MMM YYYY')}}</strong>
          </div>
          <div class="col-md-4">
            Tipo: <strong>{{tipoAcuerdo.descripcion}}</strong>
          </div>
        </div>

        <div class="row q-ma-sm">
          <div class="col-md-12">
            <table class="q-table bordered striped-odd">
              <thead>
                <tr>
                  <th>-</th>
                  <th>Folio</th>
                  <th>Ponencia</th>
                  <th>Actuario</th>
                  <th>Fecha publicacion</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in listadosBoletin"
                  :key="item.id"
                >
                  <td>{{++index}}</td>
                  <td>{{item.folio}}</td>
                  <td>{{getPonencia(item.ponencia_id)}}</td>
                  <td>{{getActuario(item.actuario_id)}}</td>
                  <td>{{item.fecha_publicacion | moment('DD MMM YYYY')}}</td>
                  <td>
                    <router-link :to="{
                        name: 'listado-acuerdo',
                        params: {
                          uuid: item.id
                        },
                      }"
                    >
                      <q-icon name="subdirectory_arrow_right" color="black" size="2em"/>
                      <q-tooltip>Consultar listado de estrados</q-tooltip>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
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
  name: 'modal-listados-boletin',
  props: {
    acuerdo: {
      type: Object,
      required: true,
    },
    listadosBoletin: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showModalListados: true,
    };
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
    ponencias() {
      return this.$store.getters['ponencias/getPonenciasAll'];
    },
    actuarios() {
      return this.$store.getters['actuarios/getActuariosAll'];
    },
    tipoAcuerdo() {
      return this.$store.getters['tiposAcuerdo/getTipoAcuerdoByTipoAcuerdoId'](this.acuerdo.tipo_id);
    },
  },
  methods: {
    getActuario(actuarioId) {
      const actuario = this.actuarios.find(item => item.actuario_id === actuarioId);
      return actuario.actuario;
    },
    getPonencia(ponenciaId) {
      const ponencia = this.ponencias.find(item => item.ponencia_id === ponenciaId);
      return ponencia.ponencia;
    },
  },
};
</script>
