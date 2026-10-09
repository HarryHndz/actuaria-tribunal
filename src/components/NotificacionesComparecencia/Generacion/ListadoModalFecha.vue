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
        icon="save"
        label="Guardar"
        :loading="fetchingListado"
        @click.prevent="save"
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
} from 'quasar';

import moment from 'moment';

import {
  required,
} from 'vuelidate/lib/validators';

export default {
  name: 'listado-modal',
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
  computed: {
    diasInhabiles() {
      return this.$store.getters['diasInhabiles/getDiasInhabilesAll'];
    },
  },
  methods: {
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('saveListado', this.formData);
      }
    },
    dateFn(date) {
      const diasInhabiles = this.diasInhabiles.map(i => i.fecha.split('-').join('/'));
      const dayWeek = moment(new Date(date), 'YYYY-MM-DD').day();
      const dateMoment = moment(new Date(date)).add(17, 'hours').format('YYYY-MM-DD h:mm:ss a');
      const today = moment().format('YYYY-MM-DD h:mm:ss a');

      return !(dayWeek === 6 || dayWeek === 0)
        && moment(today).isBefore(moment(dateMoment))
        && !diasInhabiles.includes(date);
    },
  },
};
</script>
