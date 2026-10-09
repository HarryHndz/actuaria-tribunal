<template>
  <q-card style="width: 1200px; max-width: 120vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Editar Autoridades</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="q-pt-sm">
        <div class="row">
          <div class="col-md-12">
            <q-input
              outlined
              stack-label
              class="q-ma-sm"
              label="Nombre"
              v-model="formData.autoridades_actuaria"
              :error="$v.formData.autoridades_actuaria.$error"
              @blur="$v.formData.autoridades_actuaria.$touch"
              error-message="El nombre es un campo requerido"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
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
        :loading="fetching"
        @click.prevent="save"
      />
    </q-card-actions>

  </q-card>
</template>

<script>
import {
  ClosePopup,
  QCard,
  QCardActions,
  QCardSection,
  QSeparator,
  QInput,
  QSpace,
  Notify,
} from 'quasar';

import {
  required, minLength,
} from 'vuelidate/lib/validators';

import moment from 'moment';

export default {
  name: 'form-autorizado',
  props: {
    autoridad: {
      required: false,
      type: Object,
    },
    expediente: {
      required: false,
      type: Object,
    },
  },
  data() {
    return {
      fetching: false,
      autoridades: [],
      formData: {
        id: this.expediente.id,
        autoridades_actuaria: this.autoridad ? this.autoridad.autoridad : '',
        created_at: moment().format('YYYY-MM-DD'),
      },
    };
  },
  directives: {
    ClosePopup,
  },
  plugins: {
    Notify,
  },
  validations() {
    return {
      formData: {
        autoridades_actuaria: {
          required,
          minLength: minLength(3),
        },
      },
    };
  },
  components: {
    QCard,
    QCardActions,
    QCardSection,
    QSeparator,
    QInput,
    QSpace,
  },
  methods: {
    async save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('saveAutoridad', this.formData.autoridades_actuaria);
      }
      return Promise.resolve(true);
    },
  },
};
</script>
