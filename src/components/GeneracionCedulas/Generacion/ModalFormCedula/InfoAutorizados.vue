<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <tabla-autorizados
          :autorizados="autorizados"
          :expedienteId="expediente.id"
        ></tabla-autorizados>
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
  QStepperNavigation,
} from 'quasar';

import _ from 'lodash';

import TablaAutorizados from 'components/ExpedienteConsulta/Consulta/Autorizados/TablaAutorizados';

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
    };
  },
  components: {
    TablaAutorizados,
    QStepperNavigation,
  },
  computed: {
    autorizados() {
      const autorizados = this.$store.getters['autorizados/getAutorizadosAll'].filter(item => this.expediente.autorizados.indexOf(item.id) !== -1);
      return _.orderBy(autorizados, ['created_at'], ['asc']);
    },
  },
  methods: {
    avanzar() {
      this.$emit('avanzar');
    },
    regresar() {
      this.$emit('regresar');
    },
  },
};
</script>
