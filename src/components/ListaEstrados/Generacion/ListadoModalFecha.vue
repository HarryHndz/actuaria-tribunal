<template>
  <q-card style="width: 340px; max-width: 35vw;">
    <q-card-section class="row items-center">
      <div class="text-h5 text-weight-bolder">Fecha de publicación</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div>
        <div class="row">
          <div class="col-md-12 text-center">
            <q-date
              minimal
              color="pink-10"
              :options="dateFn"
              mask="YYYY-MM-DD"
              v-model="formData.fecha_publicacion"
            />
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator/>

    <q-card-actions align="right">
      <q-btn class="q-ma-md"
        color="pink-10"
        icon="arrow_forward"
        label="Siguiente"
        :loading="fetchingListado"
        @click.prevent="avanzar"
      />
    </q-card-actions>

  </q-card>
</template>

<script>
import {
  ClosePopup,
  Notify,
  QDate,
  QCard,
  QCardSection,
  QBtn,
  QCardActions,
  QSeparator,
  QSpace,
  Loading,
} from 'quasar';

import moment from 'moment';

import {
  required,
} from 'vuelidate/lib/validators';

export default {
  name: 'listado-modal-fecha',
  props: {
    fetchingListado: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      fetching: false,
      formData: {
        fecha_publicacion: null,
      },
    };
  },
  directives: {
    ClosePopup,
  },
  plugins: {
    Notify,
  },
  components: {
    QCard,
    QCardSection,
    QBtn,
    QCardActions,
    QSeparator,
    QSpace,
    QDate,
  },
  validations: {
    formData: {
      fecha_publicacion: {
        required,
      },
    },
  },
  async beforeMount() {
    Loading.show();
    await this.$store.dispatch('session/fetchTimeServer');
    Loading.hide();
  },
  computed: {
    timeServer() {
      return this.$store.getters['session/getTimeServer'];
    },
    diasInhabiles() {
      return this.$store.getters['diasInhabiles/getDiasInhabilesAll'];
    },
  },
  methods: {
    avanzar() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('saveListado', this.formData);
      }
    },
    dateFn(date) {
      const diasInhabiles = this.diasInhabiles.map(i => i.fecha.split('-').join('/'));
      const dayWeek = moment(new Date(date), 'YYYY-MM-DD').day();
      const dateMoment = moment(new Date(date)).add(12, 'hours').format('YYYY-MM-DD h:mm:ss a');

      const today = moment(this.timeServer).format('YYYY-MM-DD h:mm:ss a');
      const dateLimit = moment(this.timeServer).add(30, 'days').format('YYYY-MM-DD');

      return !(dayWeek === 6 || dayWeek === 0)
        && moment(today).isBefore(moment(dateMoment))
        && moment(date).isBefore(moment(dateLimit))
        && !diasInhabiles.includes(date);
    },
  },
};
</script>
