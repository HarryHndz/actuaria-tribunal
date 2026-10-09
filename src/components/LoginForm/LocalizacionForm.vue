<template>
  <q-form
    @submit="updateSession"
  >
    <div class="text-h6">Usuario</div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col-md-6">
        <q-select
          outlined
          use-input
          clearable
          label="Área"
          class="q-ma-sm"
          v-model="areaObject"
          :options="areasFiltered"
          :error="$v.formData.area_id.$error"
          error-message="Área es una opción obligatorio"
          @blur="$v.formData.area_id.$touch"
          @filter="filterAreaFn"
        />
      </div>
      <div class="col-md-6">
        <q-select
          outlined
          use-input
          clearable
          class="q-ma-sm"
          label="Ubicación Física"
          v-model="ubicacionObject"
          :options="ubicacionesFiltered"
          @filter="filterUbicacionFn"
        />
      </div>
    </div>

    <div class="row q-pt-md">
      <div class="col-md-6">
        <q-input
          outlined
          label="Extensión"
          class="q-ma-sm"
          v-model="formData.extension"
        />
      </div>
    </div>

    <q-btn class="q-ma-sm q-mt-lg"
      color="pink-10"
      icon="save"
      label="Guardar"
      :loading="fetching"
      @click="updateSession"
    />

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
  required,
} from 'vuelidate/lib/validators';

export default {
  name: 'localizacion-form',
  props: {
    localizacion: {
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
      areaObject: null,
      ubicacionObject: null,
      formData: {
        area_id: null,
        extension: null,
        ubicacion_id: null,
        ...this.localizacion,
      },
      areasFiltered: this.areas,
      ubicacionesFiltered: this.ubicaciones,
    };
  },
  validations: {
    formData: {
      area_id: {
        required,
      },
    },
  },
  beforeMount() {
    if (this.formData.area_id) {
      this.areaObject = this.areas.find(item => item.value === this.formData.area_id);
    }
    /* eslint max-len: ["error", { "code": 150 }] */
    if (this.formData.ubicacion_id) {
      this.ubicacionObject = this.ubicaciones.find(item => item.value === this.formData.ubicacion_id);
    }
  },
  components: {
    QForm,
    QInput,
    QSelect,
    QSeparator,
  },
  computed: {
    areas() {
      const areas = this.$store.getters['areas/getAreasAll']
        .filter(i => i.atributos.es_jurisdiccional);

      return areas.map(item => ({
        label: item.area,
        value: item.area_id,
      }));
    },
    ubicaciones() {
      const ubicacion = this.$store.getters['ubicacionesFisicas/getUbicacionesFisicasAll'].filter(item => item.area_id === this.formData.area_id);

      return ubicacion.map(item => ({
        label: item.descripcion,
        value: item.ubicacion_fisica_id,
      }));
    },
  },
  methods: {
    updateSession() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('updateSession', this.formData);
      }
    },
    filterAreaFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.areasFiltered = this.areas.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    filterUbicacionFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.ubicacionesFiltered = this.ubicaciones.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
  },
  watch: {
    areaObject(val) {
      /* eslint no-unused-expressions: [2, { allowTernary: true }] */
      val != null ? this.formData.area_id = val.value : this.formData.area_id = '';
    },
    ubicacionObject(val) {
      /* eslint no-unused-expressions: [2, { allowTernary: true }] */
      val != null ? this.formData.ubicacion_id = val.value : this.formData.ubicacion_id = '';
    },
  },
};
</script>
