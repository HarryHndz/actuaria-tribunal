<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <q-input outlined
          autogrow
          stack-label
          name="telefonos_expediente"
          class="q-ma-sm q-pa-sm"
          label="Telefonos"
          v-model="formData.telefonos_expediente"
          :error-message="errorTelefono"
          @blur="$v.formData.telefonos_expediente.$touch"
          :error="$v.formData.telefonos_expediente.$error"
        >
          <template v-slot:prepend>
            <q-icon name="phone" />
          </template>
        </q-input>
      </div>

      <div class="col-md-6">
        <q-input outlined
          autogrow
          stack-label
          class="q-ma-sm q-pa-sm"
          name="email_expediente"
          label="Correo electrónico"
          v-model="formData.email_expediente"
          :error-message="errorCorreo"
          @blur="$v.formData.email_expediente.$touch"
          :error="$v.formData.email_expediente.$error"
        >
          <template v-slot:prepend>
            <q-icon name="alternate_email" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <q-input outlined
          autogrow
          stack-label
          type="textarea"
          class="q-ma-md"
          name="domicilio_acto_notificaciones"
          label="Domicilio para recibir notificaciones (*)"
          :error-message="errorDomicilio"
          v-model="formData.domicilio_notificaciones"
          @blur="$v.formData.domicilio_notificaciones.$touch"
          :error="$v.formData.domicilio_notificaciones.$error"
        >
          <template v-slot:prepend>
            <q-icon name="home" />
          </template>
        </q-input>
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
  maxLength, minLength, email,
} from 'vuelidate/lib/validators';

export default {
  name: 'info-expediente',
  props: {
    expediente: {
      type: Object,
      required: true,
    },
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
        telefonos_expediente: this.expediente
          ? this.expediente.telefonos
          : '',
        email_expediente: this.expediente
          ? this.expediente.email
          : '',
        domicilio_notificaciones: this.expediente
          ? this.expediente.domicilionotificacion
          : '',
      },
    };
  },
  validations() {
    return {
      formData: {
        email_expediente: {
          email,
        },
        telefonos_expediente: {
          minLength: minLength(3),
          maxLength: maxLength(50),
        },
        domicilio_notificaciones: {
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
    errorCorreo() {
      if (!this.$v.formData.email_expediente.email_expediente) {
        return 'El campo email_expediente debe ser un correo valido';
      }
      return '';
    },
    errorTelefono() {
      const { min } = this.$v.formData.telefonos_expediente.$params.minLength;
      const { max } = this.$v.formData.telefonos_expediente.$params.maxLength;

      if (!this.$v.formData.telefonos_expediente.minLength) {
        return `El campo telefonos debe tener al menos ${min} caracteres de longitud`;
      }
      if (!this.$v.formData.telefonos_expediente.maxLength) {
        return `El campo telefonos debe tener maximo ${max} caracteres de longitud`;
      }
      return '';
    },
    errorDomicilio() {
      const { min } = this.$v.formData.domicilio_notificaciones.$params.minLength;
      const { max } = this.$v.formData.domicilio_notificaciones.$params.maxLength;

      if (!this.$v.formData.domicilio_notificaciones.minLength) {
        return `El campo domicilio debe tener al menos ${min} caracteres de longitud`;
      }
      if (!this.$v.formData.domicilio_notificaciones.maxLength) {
        return `El campo domicilio debe tener maximo ${max} caracteres de longitud`;
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
