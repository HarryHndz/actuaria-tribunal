<template>
  <q-card style="width: 800px; max-width: 90vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Grupo</div>
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
              label="Nombre"
              class="q-ma-sm"
              v-model="formData.nombre"
              :error="$v.formData.nombre.$error"
              :error-message="errorNombre"
              @blur="$v.formData.nombre.$touch"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <q-input
              outlined
              stack-label
              label="Descripción"
              class="q-ma-sm"
              v-model="formData.descripcion"
              :error="$v.formData.descripcion.$error"
              :error-message="errorDescripcion"
              @blur="$v.formData.descripcion.$touch"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <q-select
              outlined
              clearable
              emit-value
              map-options
              stack-label
              label="Clasificación"
              class="q-ma-sm"
              v-model="formData.clasificacion_id"
              :options="clasificaciones"
              :error="$v.formData.clasificacion_id.$error"
              error-message="clasificación es un campo obligatorio"
              @blur="$v.formData.clasificacion_id.$touch"
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
        label="guardar"
        :loading="fetching"
        @click.prevent="guardar"
      />
    </q-card-actions>

  </q-card>
</template>

<script>
import {
  QBtn,
  QCard,
  Notify,
  QSpace,
  QInput,
  QSelect,
  QSeparator,
  ClosePopup,
  QCardSection,
  QCardActions,
} from 'quasar';

import {
  required, minLength, maxLength,
} from 'vuelidate/lib/validators';

import errors from 'boot/errors';

export default {
  name: 'form-grupo',
  props: {
    grupo: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      fetching: false,
      clasificaciones: [
        {
          label: 'ACUERDOS',
          value: 'acuerdos',
        },
        {
          label: 'CÉDULAS DE NOTIFICACIONES',
          value: 'cedula',
        },
      ],
      formData: {
        nombre: '',
        clasificacion_id: '',
        ...this.grupo,
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
    QBtn,
    QCard,
    QInput,
    QSpace,
    QSelect,
    QSeparator,
    QCardActions,
    QCardSection,
  },
  validations: {
    formData: {
      nombre: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(50),
      },
      descripcion: {
        minLength: minLength(3),
        maxLength: maxLength(255),
      },
      clasificacion_id: {
        required,
      },
    },
  },
  computed: {
    session() {
      return this.$store.getters['session/getUsuario'];
    },
    errorNombre() {
      if (!this.$v.formData.nombre.minLength) {
        return 'El nombre debe de contener minimo 3 caracteres';
      }
      if (!this.$v.formData.nombre.maxLength) {
        return 'El nombre no debe de contener mas de 50 caracteres';
      }
      return 'El nombre es un campo requerido';
    },
    errorDescripcion() {
      if (!this.$v.formData.descripcion.minLength) {
        return 'El descripcion debe de contener minimo 3 caracteres';
      }
      return 'El descripcion no debe de contener mas de 255 caracteres';
    },
  },
  methods: {
    async guardar() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.fetching = true;
        const method = this.grupo ? 'putGrupoPlantillas' : 'postGrupoPlantillas';

        try {
          await this.$store.dispatch(`gruposPlantillas/${method}`, {
            ...this.formData,
            user_id: this.session.user_id,
          });
          this.fetching = false;
          this.$emit('cerrar');
          Notify.create({
            message: this.grupo ? 'Registro actualizado exitosamente.' : 'Registro guardado exitosamente.',
            position: 'bottom',
          });
          return Promise.resolve(true);
        } catch (e) {
          errors(e);
          this.fetching = false;
          this.$emit('cerrar');
          return Promise.reject(true);
        }
      }
      return Promise.resolve(true);
    },
  },
};
</script>
