<template>
  <q-card style="width: 900px; max-width: 90vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Observación</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="col-md-12 q-ma-sm q-my-md">
        <q-checkbox
          outlined
          size="lg"
          v-model="deja_disposicion"
          label="¿Se deja a disposición?"
        />
      </div>

      <div class="col-md-12 q-ma-sm q-my-md">
        <q-input
          outlined
          label="Observación"
          v-model="observacion"
          type="textarea"
          :error="$v.observacion.$error"
          :error-message="errorObservacion"
          @blur="$v.observacion.$touch"
        />
      </div>
    </q-card-section>

    <q-separator/>

    <q-card-actions align="right">
      <q-btn class="q-ma-sm q-mr-md"
        color="pink-10"
        icon="save"
        label="Guardar"
        @click="save"
      />
    </q-card-actions>

  </q-card>
</template>

<script>
import {
  QBtn,
  QCard,
  QSpace,
  QInput,
  QCheckbox,
  ClosePopup,
  QSeparator,
  QCardSection,
  QCardActions,
} from 'quasar';

import {
  minLength, maxLength, required,
} from 'vuelidate/lib/validators';

export default {
  name: 'listado-modal-observacion',
  props: {
    pendingAcuerdo: {
      type: Object,
      required: true,
    },
    requiredObservacion: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      showModal: true,
      observacion: this.pendingAcuerdo.observacion_boletin
        ? this.pendingAcuerdo.observacion_boletin
        : null,
      deja_disposicion: this.pendingAcuerdo.deja_disposicion
        ? this.pendingAcuerdo.deja_disposicion
        : false,
    };
  },
  components: {
    QBtn,
    QCard,
    QSpace,
    QInput,
    QCheckbox,
    QSeparator,
    QCardActions,
    QCardSection,
  },
  directives: {
    ClosePopup,
  },
  validations() {
    if (this.requiredObservacion) {
      return {
        observacion: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(255),
        },
      };
    }
    return {
      observacion: {
        minLength: minLength(3),
        maxLength: maxLength(255),
      },
    };
  },
  computed: {
    errorObservacion() {
      if (!this.$v.observacion.minLength) {
        return 'Observacion debe tener al menos 3 caracteres';
      }
      if (!this.$v.observacion.maxLength) {
        return 'Observacion no debe tener al mas de 255 caracteres';
      }
      return 'Observacion es un campo requerido';
    },
  },
  methods: {
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('saveObservacion', {
          ...this.pendingAcuerdo,
          observacion_boletin: this.observacion,
          deja_disposicion: this.deja_disposicion,
        });
      }
    },
  },
};
</script>
