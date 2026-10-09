<template>
  <q-card style="width: 330px; max-width: 35vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Fecha de publicación</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div>
        <div class="row">
          <div class="col-md-12">
            <q-date
              minimal
              :options="dateFn"
              mask="YYYY-MM-DD"
              v-model="formData.fecha_publicacion"
              :disable="fetching"
            />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {
  QCard,
  QDate,
  QSpace,
  ClosePopup,
  QSeparator,
  QCardSection,
} from 'quasar';

import moment from 'moment';

import {
  required,
} from 'vuelidate/lib/validators';

export default {
  name: 'modal-fecha',
  props: {
    acuerdo: {
      required: true,
      type: Object,
    },
    actuacion: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      listados: [],
      fetching: false,
      formData: {
        pendientes: true,
        fecha_publicacion: null,
      },
    };
  },
  components: {
    QCard,
    QDate,
    QSpace,
    QSeparator,
    QCardSection,
  },
  validations: {
    formData: {
      fecha_publicacion: {
        required,
      },
    },
  },
  directives: {
    ClosePopup,
  },
  computed: {
    listadosAcuerdos() {
      return this.$store.getters['listadosAcuerdos/getListadosAcuerdosAll'].filter(item => item.fecha_publicacion === this.formData.fecha_publicacion);
    },

    expediente() {
      return this.$store.getters['expedientes/getExpedienteByExpedienteId'](this.actuacion.juicio_id);
    },
  },
  methods: {
    dateFn(date) {
      const dayWeek = moment(new Date(date), 'YYYY-MM-DD').day();
      const dateMoment = moment(new Date(date)).add(12, 'hours').format('YYYY-MM-DD h:mm:ss a');
      const today = moment().format('YYYY-MM-DD h:mm:ss a');

      return !(dayWeek === 6 || dayWeek === 0) && moment(today).isBefore(moment(dateMoment));
    },
    consultarListado() {
      this.$v.$touch();
      if (this.formData.fecha_publicacion) {
        this.fetching = true;
        this.$store.dispatch('listadosAcuerdos/fetchAllListadosAcuerdos', this.formData)
          .then(() => {
            this.fetching = false;
            if (this.listadosAcuerdos.length > 0) {
              this.$emit('openModalListado', this.listadosAcuerdos, this.formData);
            } else {
              this.$emit('openModalForm', this.formData);
            }
            return Promise.resolve(true);
          });
      }
    },
    asignarListado(lista, id) {
      this.$emit('asignarListado', lista, id);
    },
    mensajeGuardarListado(listadoDuplicado) {
      this.$emit('mensajeGuardarListado', listadoDuplicado);
    },
  },
  watch: {
    'formData.fecha_publicacion': {
      handler() {
        this.consultarListado();
      },
      deep: true,
    },
  },
};
</script>
