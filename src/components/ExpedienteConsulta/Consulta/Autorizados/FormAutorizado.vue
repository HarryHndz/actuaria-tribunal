<template>
  <q-card style="width: 1200px; max-width: 120vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Autorizado</div>
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
              v-model="formData.nombre"
              :error="$v.formData.nombre.$error"
              @blur="$v.formData.nombre.$touch"
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

import errors from 'boot/errors';

export default {
  name: 'form-autorizado',
  props: {
    autorizado: {
      required: false,
      type: Object,
    },
  },
  data() {
    return {
      fetching: false,
      formData: {
        id: this.autorizado ? this.autorizado.id : '',
        nombre: this.autorizado ? this.autorizado.nombre : '',
        created_at: this.autorizado ? this.autorizado.created_at : null,
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
        nombre: {
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
        this.fetching = true;
        const method = this.formData.created_at ? 'autorizados/putAutorizado' : 'autorizados/postAutorizado';
        const event = this.formData.created_at ? 'editar' : 'registrar';

        try {
          const object = await this.$store.dispatch(method, this.formData);
          this.fetching = false;
          this.$emit(event, object);
          return Promise.resolve(true);
        } catch (e) {
          errors(e);
          this.fetching = false;
          this.$emit('close');
          return Promise.reject(false);
        }
      }
      return Promise.resolve(true);
    },
  },
};
</script>
