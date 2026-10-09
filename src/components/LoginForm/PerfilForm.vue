<template>
  <q-form
    @submit="updateSession"
  >
    <div class="text-h6">Datos personales</div>

    <q-separator />

    <div class="q-pt-md">
      <div class="row">
        <div class="col-md-12">
          <q-input outlined
            name="cargo"
            label="Cargo"
            class="q-ma-sm"
            v-model="formData.cargo"
            :error="$v.formData.cargo.$error"
            @blur="$v.formData.cargo.$touch"
            error-message="El campo Cargo es obligatorio"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <q-input
            outlined
            label="Nombre"
            class="q-ma-sm"
            v-model="formData.nombre"
            :error="$v.formData.nombre.$error"
            @blur="$v.formData.nombre.$touch"
            error-message="El campo Nombre es obligatorio"
          />
        </div>
        <div class="col-md-6">
          <q-input
            outlined
            class="q-ma-sm"
            label="Apellido paterno"
            v-model="formData.primer_apellido"
            :error="$v.formData.primer_apellido.$error"
            @blur="$v.formData.primer_apellido.$touch"
            error-message="El campo de Apellido paterno es obligatorio"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <q-input
            outlined
            label="Apellido materno"
            class="q-ma-sm"
            v-model="formData.segundo_apellido"
            :error="$v.formData.segundo_apellido.$error"
            @blur="$v.formData.segundo_apellido.$touch"
            error-message="El campo de Apellido materno es obligatorio"
          />
        </div>
        <div class="col-md-6">
          <q-select
            outlined
            emit-value
            map-options
            label="Género"
            class="q-ma-sm"
            v-model="formData.genero"
            :options="generoOptions"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <q-input
            outlined
            label="CURP"
            class="q-ma-sm"
            v-model="formData.curp"
            :error="$v.formData.curp.$error"
            @blur="$v.formData.curp.$touch"
            error-message="Ingrese una CURP valida"
          />
        </div>
        <div class="col-md-6">
          <q-input
            outlined
            label="RFC"
            class="q-ma-sm"
            v-model="formData.rfc"
            :error="$v.formData.rfc.$error"
            @blur="$v.formData.rfc.$touch"
            error-message="Ingrese una RFC valida"
          />
        </div>
      </div>

      <q-btn class="q-ma-sm q-mt-md"
        color="pink-10"
        icon="save"
        label="Guardar"
        :loading="fetching"
        @click="updateSession"
      />
    </div>

  </q-form>
</template>

<script>
import {
  QForm,
  QInput,
  QSelect,
  QSeparator,
} from 'quasar';

import {
  required, minLength, helpers,
} from 'vuelidate/lib/validators';

const curp = helpers.regex('alpha', /^([A-Z][AEIOUX][A-Z]{2})(\d{2})(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])([HM])(?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)([B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/);
const rfc = helpers.regex('alpha', /^([A-ZÑ&]{3,4})(\d{2})(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])?([A-Z\d]{2})([A\d])$/);

export default {
  name: 'perfil-form',
  props: {
    perfil: {
      required: true,
      type: Object,
    },
    fetching: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      formData: {
        cargo: null,
        curp: null,
        genero: null,
        nombre: null,
        primer_apellido: null,
        rfc: null,
        segundo_apellido: null,
        ...this.perfil,
      },
      generoOptions: [
        {
          label: 'FEMENINO',
          value: true,
        },
        {
          label: 'MASCULINO',
          value: false,
        },
      ],
    };
  },
  validations: {
    formData: {
      nombre: {
        required,
        minLength: minLength(3),
      },
      primer_apellido: {
        required,
        minLength: minLength(3),
      },
      segundo_apellido: {
        required,
        minLength: minLength(3),
      },
      cargo: {
        required,
        minLength: minLength(3),
      },
      rfc: {
        rfc,
      },
      curp: {
        curp,
      },
    },
  },
  components: {
    QForm,
    QInput,
    QSelect,
    QSeparator,
  },
  methods: {
    updateSession() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('updateSession', this.formData);
      }
    },
  },
  watch: {
    'formData.curp': {
      handler(val) {
        this.formData.curp = val.toUpperCase();
      },
      deep: true,
    },
    'formData.rfc': {
      handler(val) {
        this.formData.rfc = val.toUpperCase();
      },
      deep: true,
    },
  },
};
</script>
