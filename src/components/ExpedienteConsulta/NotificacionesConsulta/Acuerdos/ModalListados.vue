<template>
  <q-card style="width: 900px; max-width: 90vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Listados de acuerdos</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div>
        <div class="row q-ma-sm">
          <div class="col-md-12">
            <table class="q-table bordered">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Ponencia</th>
                  <th>Actuario</th>
                  <th>Fecha publicacion</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in listadosAcuerdos"
                  :key="item.id"
                >
                  <td>{{item.folio}}</td>
                  <td>{{getPonencia(item.ponencia_id)}}</td>
                  <td>{{getActuario(item.actuario_id)}}</td>
                  <td>{{item.fecha_publicacion | moment('MMM D YYYY')}}</td>
                  <td>
                    <a href="#"
                      @click.prevent="asignarListado(item.lista, item.id)"
                    >
                      <q-icon name="arrow_forward" color="black" size="2em"/>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator/>

    <q-card-actions>
      <div class="col-md-6" align="left">
        <q-btn class="q-ma-sm q-ml-md"
          color="pink-10"
          icon="arrow_back"
          label="Regresar"
          @click.prevent="$emit('openModalFecha')"
        />
      </div>
      <div class="col-md-6" align="right">
        <q-btn class="q-ma-sm q-ml-md"
          color="warning"
          icon="add_box"
          label="Nuevo"
          @click.prevent="$emit('openModalForm', formData)"
        />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import {
  QCard,
  QSpace,
  ClosePopup,
  QSeparator,
  QCardSection,
  QCardActions,
} from 'quasar';

export default {
  name: 'modal-listados',
  props: {
    formData: {
      type: Object,
      required: true,
    },
    listadosAcuerdos: {
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
    QCardActions,
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
    asignarListado(lista, id) {
      this.$emit('asignarListado', lista, id);
    },
  },
};
</script>
