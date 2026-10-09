<template>
  <section class="SIDJ-results">
    <item-expediente
      v-for="item in expedientesSort"
      :key="item.id"
      :expediente="item"
    >
    </item-expediente>
  </section>
</template>

<script>
import _ from 'lodash';

import ItemExpediente from './ItemExpediente';

export default {
  name: 'contenedor-buscador-expediente',
  props: {
    resultados: {
      required: true,
      type: Array,
    },
  },
  components: {
    ItemExpediente,
  },
  computed: {
    expedientesSort() {
      return _.orderBy(this.resultados, ['fechaingreso'], ['desc']);
    },
  },
};
</script>
