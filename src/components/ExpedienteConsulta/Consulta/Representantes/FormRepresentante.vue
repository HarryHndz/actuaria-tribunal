<template>
  <q-card style="width: 1200px; max-width: 120vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Representante</div>
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

          <div class="col-md-12">
            <q-input
              outlined
              stack-label
              class="q-ma-sm"
              label="Correo"
              v-model="formData.correo"
              :error="$v.formData.correo.$error"
              error-message="Ingrese un correo valido"
              @blur="$v.formData.correo.$touch"
            >
              <template v-slot:prepend>
                <q-icon name="email" />
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
  required, email, minLength,
} from 'vuelidate/lib/validators';
import errors from 'boot/errors';

export default {
  name: 'form-representante',
  props: {
    representante: {
      required: false,
      type: Object,
    },
  },
  data() {
    return {
      fetching: false,
      showModal: true,
      formData: {
        id: this.representante ? this.representante.id : '',
        nombre: this.representante ? this.representante.nombre : '',
        correo: this.representante ? this.representante.correo : '',
        created_at: this.representante ? this.representante.created_at : null,
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
        correo: {
          email,
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
        const method = this.formData.created_at ? 'representantes/putRepresentante' : 'representantes/postRepresentante';
        const event = this.formData.created_at ? 'editar' : 'registrar';

        try {
          const object = await this.$store.dispatch(method, this.formData);
          this.fetching = false;
          this.$emit(event, object);
          return Promise.resolve(true);
        } catch (e) {
          this.fetching = false;
          errors(e);
          this.$emit('close');
          return Promise.reject(false);
        }
      }
      return Promise.resolve(true);
    },
  },
};
</script>
