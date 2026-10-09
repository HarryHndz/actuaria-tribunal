<template>
  <div class="SIDJ-results">
    <div class="text-center titulo">
      <q-separator class="q-my-lg"/>
    </div>

    <item-actuacion v-show="actuacionesSort.length > 0"
      v-for="actuacion in actuacionesSort"
      :key="actuacion.id"
      :actuacion="actuacion"
      :expediente="expediente"
      @openModalNotificados="openModalNotificados"
      @openModalNotificacion="openModalNotificacion"
      @openModalNotificacionEditar="openModalNotificacionEditar"
    >
    </item-actuacion>

    <template v-if="actuacionesSort.length == 0">
      <div class="x_content">
        <h5 class="text-center">No hay registros</h5>
      </div>
    </template>
  </div>
</template>

<script>
import {
  QSeparator,
} from 'quasar';

import _ from 'lodash';

import ItemActuacion from './ItemActuacion';

export default {
  name: 'contenedor-actuaciones',
  props: {
    actuaciones: {
      type: Array,
      required: true,
    },
    expediente: {
      type: Object,
      required: true,
    },
  },
  components: {
    QSeparator,
    ItemActuacion,
  },
  computed: {
    actuacionesSort() {
      return _.sortBy(this.actuaciones, ['created_at'], ['desc']);
    },
  },
  methods: {
    openModalNotificados(acuerdo) {
      this.$emit('openModalNotificados', acuerdo);
    },
    openModalNotificacion(acuerdo) {
      this.$emit('openModalNotificacion', acuerdo);
    },
    openModalNotificacionEditar(notificacion) {
      this.$emit('openModalNotificacionEditar', notificacion);
    },
  },
};
</script>
