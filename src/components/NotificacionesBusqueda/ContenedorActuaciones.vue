<template>
  <section class="SIDJ-results">
    <item-actuacion
      v-for="item in actuacionesSort"
      :key="item.id"
      :actuacion="item"
    >
    </item-actuacion>
  </section>
</template>

<script>
import ItemActuacion from './ItemActuacion';

export default {
  name: 'contenedor-buscador-actuacion',
  props: {
    resultados: {
      required: true,
      type: Array,
    },
  },
  components: {
    ItemActuacion,
  },
  computed: {
    actuacionesSort() {
      return this.resultados;
    },
  },
};
</script>
