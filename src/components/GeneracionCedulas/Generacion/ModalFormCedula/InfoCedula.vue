<template>
  <div>
    <div class="row">
      <div class="col-md-3">
        <q-input outlined
          name="lic"
          stack-label
          label="Lic"
          class="q-ma-sm"
          v-model="formData.lic"
          :error-message="errorLic"
          @blur="$v.formData.lic.$touch"
          :error="$v.formData.lic.$error"
        />
      </div>
      <div class="col-md-9">
        <q-input outlined
          autogrow
          name="tipo_acuerdo"
          stack-label
          label="Tipo de acuerdo"
          class="q-ma-sm"
          v-model="formData.tipo_acuerdo"
          :error-message="errorTipoAcuerdo"
          @blur="$v.formData.tipo_acuerdo.$touch"
          :error="$v.formData.tipo_acuerdo.$error"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <q-input outlined
          autogrow
          name="anexo"
          stack-label
          label="Anexo"
          class="q-ma-sm"
          v-model="formData.anexo"
          :error-message="errorAnexo"
          @blur="$v.formData.anexo.$touch"
          :error="$v.formData.anexo.$error"
        />
      </div>
    </div>

    <q-separator class="q-my-md"/>

    <q-stepper-navigation class="q-pt-none row">
      <div class="text-left col-md-6">
        <q-btn class="q-ma-sm"
          color="pink-10"
          icon="arrow_back"
          @click="regresar"
          label="Regresar"
        />
      </div>
      <div class="text-right col-md-6">
        <q-btn class="q-ma-sm"
          color="pink-10"
          @click="avanzar"
          :label="[1, 2, 3].includes(data.tipo_id) ? 'Siguiente' : 'Guardar'"
          :icon="[1, 2, 3].includes(data.tipo_id) ? 'arrow_forward' : 'save'"
          :loading="fetchingSave"
        />
      </div>
    </q-stepper-navigation>
  </div>
</template>

<script>
import {
  QInput,
  QStepperNavigation,
} from 'quasar';

import {
  maxLength, minLength,
} from 'vuelidate/lib/validators';

export default {
  name: 'info-cedula',
  props: {
    data: {
      type: Object,
      required: true,
    },
    fetchingSave: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      fetching: false,
      formData: {
        lic: this.data ? this.data.lic : '',
        anexo: this.data ? this.data.anexo : '',
        tipo_acuerdo: this.data ? this.data.tipo_acuerdo : '',
      },
    };
  },
  validations() {
    return {
      formData: {
        lic: {
          minLength: minLength(1),
          maxLength: maxLength(10),
        },
        anexo: {
          minLength: minLength(3),
          maxLength: maxLength(255),
        },
        tipo_acuerdo: {
          minLength: minLength(3),
          maxLength: maxLength(255),
        },
      },
    };
  },
  components: {
    QInput,
    QStepperNavigation,
  },
  computed: {
    errorLic() {
      const { min } = this.$v.formData.lic.$params.minLength;
      const { max } = this.$v.formData.lic.$params.maxLength;

      if (!this.$v.formData.lic.minLength) {
        return `El campo lic debe tener al menos ${min} caracteres de longitud`;
      }
      if (!this.$v.formData.lic.maxLength) {
        return `El campo lic debe tener maximo ${max} caracteres de longitud`;
      }
      return '';
    },
    errorAnexo() {
      const { min } = this.$v.formData.anexo.$params.minLength;
      const { max } = this.$v.formData.anexo.$params.maxLength;

      if (!this.$v.formData.anexo.minLength) {
        return `El campo anexo debe tener al menos ${min} caracteres de longitud`;
      }
      if (!this.$v.formData.anexo.maxLength) {
        return `El campo anexo debe tener maximo ${max} caracteres de longitud`;
      }
      return '';
    },
    errorTipoAcuerdo() {
      const { min } = this.$v.formData.tipo_acuerdo.$params.minLength;
      const { max } = this.$v.formData.tipo_acuerdo.$params.maxLength;

      if (!this.$v.formData.tipo_acuerdo.minLength) {
        return `El campo tipo acuerdo debe tener al menos ${min} caracteres de longitud`;
      }
      if (!this.$v.formData.tipo_acuerdo.maxLength) {
        return `El campo tipo acuerdo debe tener maximo ${max} caracteres de longitud`;
      }
      return '';
    },
  },
  methods: {
    avanzar() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('avanzar', this.formData);
      }
    },
    regresar() {
      this.$emit('regresar', this.formData);
    },
  },
};
</script>
