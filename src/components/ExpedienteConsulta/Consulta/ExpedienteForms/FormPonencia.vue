<template>
  <div class="q-pa-sm">
    <div class="row">
      <div class="col-md-4">
        <q-input outlined
          readonly
          name="sala"
          label="Sala"
          class="q-ma-sm q-pa-sm"
          v-model="sala"
        />
      </div>

      <div class="col-md-4">
        <q-input outlined
          readonly
          name="Ponencia"
          label="Ponencia"
          class="q-ma-sm q-pa-sm"
          v-model="ponencia"
        />
      </div>

      <div class="col-md-4">
        <q-input outlined
          readonly
          name="magistrado"
          label="Magistrado"
          class="q-ma-sm q-pa-sm"
          v-model="magistrado"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <q-input outlined
          readonly
          name="secretario"
          label="Secretario"
          class="q-ma-sm q-pa-sm"
          v-model="secretario"
        />
      </div>

      <div class="col-md-6">
        <q-input outlined
          readonly
          name="actuario"
          label="Actuario"
          class="q-ma-sm q-pa-sm"
          v-model="actuario"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  QInput,
} from 'quasar';

export default {
  name: 'form-ponencia',
  props: {
    expediente: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fetching: false,
    };
  },
  components: {
    QInput,
  },
  computed: {
    actuario() {
      const actuario = this.$store.getters['actuarios/getActuarioByActuarioId'](this.expediente.actuario_id);
      return actuario ? actuario.actuario : '';
    },
    magistrado() {
      const magistrado = this.$store.getters['magistrados/getMagistradoByMagistradoId'](this.expediente.magistrado_id);
      return magistrado ? magistrado.magistrado : '';
    },
    ponencia() {
      const ponencia = this.$store.getters['ponencias/getPonenciaByPonenciaId'](this.expediente.ponencia_id);
      return ponencia ? ponencia.ponencia : '';
    },
    sala() {
      const sala = this.$store.getters['salas/getSalaBySalaId'](this.expediente.sala_id);
      return sala ? sala.sala : '';
    },
    secretario() {
      const secretario = this.$store.getters['secretarios/getSecretarioBySecretarioId'](this.expediente.secretario_id);
      return secretario ? secretario.secretario : '';
    },
  },
};
</script>
