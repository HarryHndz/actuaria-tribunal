<template>
  <q-card style="width: 850px; max-width: 860vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Datos de la plantilla</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="q-pt-sm">
        <div class="row">
          <div class="col-md-6">
            <q-input
              outlined
              stack-label
              class="q-ma-md"
              label="Nombre de la plantilla"
              v-model="formData.nombre"
              :error="$v.formData.nombre.$error"
              @blur="$v.formData.nombre.$touch"
              :error-message="errorNombre"
            />
          </div>
          <div class="col-md-6">
            <q-input
              outlined
              readonly
              disabled
              stack-label
              class="q-ma-md"
              label="Nombre del archivo"
              v-model="formData.temp_file.archivo"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <q-input
            outlined
            autogrow
            stack-label
            class="q-ma-md"
            label="Comentarios"
            v-model="formData.comentarios"
            :error="$v.formData.comentarios.$error"
            :error-message="errorComentarios"
            @blur="$v.formData.comentarios.$touch"
          />
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
        @click.prevent="guardar"
      />
    </q-card-actions>

  </q-card>
</template>

<script>
import {
  QBtn,
  QCard,
  QInput,
  QSpace,
  Notify,
  ClosePopup,
  QSeparator,
  QCardSection,
  QCardActions,
} from 'quasar';

import {
  required, minLength, maxLength,
} from 'vuelidate/lib/validators';

import errors from 'boot/errors';

export default {
  name: 'form-plantilla',
  props: {
    plantilla_files: {
      required: false,
      type: Array,
    },
    grupo: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      fetching: false,
      formData: {
        nombre: '',
        comentarios: '',
        temp_file: {
          ...this.plantilla_files[0],
        },
      },
    };
  },
  components: {
    QBtn,
    QCard,
    QInput,
    QSpace,
    QSeparator,
    QCardSection,
    QCardActions,
  },
  directives: {
    ClosePopup,
  },
  validations() {
    return {
      formData: {
        nombre: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(50),
        },
        comentarios: {
          minLength: minLength(3),
          maxLength: maxLength(255),
        },
      },
    };
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
    errorComentarios() {
      if (!this.$v.formData.comentarios.minLength) {
        return 'Los comentarios debe de contener minimo 3 caracteres';
      }
      return 'Los comentarios no debe de contener mas de 255 caracteres';
    },
  },
  methods: {
    async guardar() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.fetching = true;

        try {
          await this.$store.dispatch('plantillas/postPlantillas', {
            grupo_id: this.grupo.grupo_id,
            user_id: this.session.user_id,
            ...this.formData,
          });
          this.fetching = false;
          this.$emit('cerrar');
          Notify.create({
            message: 'Registro actualizado exitosamente.',
            position: 'bottom',
          });
          return Promise.resolve(true);
        } catch (e) {
          errors(e);
          this.$emit('cerrar');
          this.fetching = false;
          return Promise.reject(true);
        }
      }
      return Promise.resolve(true);
    },
  },
};
</script>

<style scoped>
.q-field--with-bottom {
  padding-bottom: 0px !important;
}
</style>
