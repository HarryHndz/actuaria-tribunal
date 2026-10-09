<template>
  <section class="SIDJ-results">
    <item-listado
      v-for="item in listadosOrdered"
      :key="item.id"
      :listadoAcuerdo="item"
      @dar-alta="$emit('dar-alta', item.id)"
      @dar-baja="$emit('dar-baja', item.id)"
    >
    </item-listado>
  </section>
</template>

<script>
import _ from 'lodash';
import ItemListado from './ItemListado';

export default {
  name: 'contenedor-listados',
  props: {
    resultados: {
      required: true,
      type: Array,
    },
  },
  components: {
    ItemListado,
  },
  computed: {
    listadosOrdered() {
      return _.orderBy(this.resultados, ['fecha_publicacion', 'id'], ['desc', 'desc']);
    },
  },
};
</script>
