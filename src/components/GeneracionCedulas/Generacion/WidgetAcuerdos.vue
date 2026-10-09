<template>
  <q-card dark bordered class="bg-white my-card q-mx-lg q-mt-lg">
    <q-card-section class="bg-pink-10">
      <div class="text-subtitle1 text-center">
        <strong>
          TOTAL
        </strong>
      </div>
    </q-card-section>

    <q-card-section class="q-pa-none q-ma-sm q-mt-md">
      <div class="contenido">
        Acuerdos <br/>
        <span class="contador">{{resultados.length}}</span>
      </div>
    </q-card-section>

    <q-card-actions vertical class="q-pt-none">
      <q-btn color="amber"
        icon="refresh"
        class="q-my-sm q-mx-sm"
        :disabled="resultados == 0"
        @click.prevent="$emit('reiniciar-listado')"
      > Borrar
      </q-btn>
      <q-btn color="primary"
        icon="print"
        class="q-my-sm q-mx-sm"
        :disabled="resultados == 0"
        @click.prevent="$emit('imprimir-multiples')"
      > Previsualizar cedulas
      </q-btn>
      <q-btn color="red"
        icon="save"
        class="q-my-sm q-mx-sm"
        :disabled="resultados == 0 || !allValidated"
        @click.prevent="$emit('save-listado')"
      > Guardar
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import {
  QCard,
  QCardSection,
  QCardActions,
} from 'quasar';

export default {
  name: 'listado-widget',
  props: {
    resultados: {
      required: true,
      type: Array,
    },
  },
  components: {
    QCard,
    QCardSection,
    QCardActions,
  },
  computed: {
    allValidated() {
      return this.resultados.every(i => i.validated);
    },
  },
};
</script>

<style scoped>
.contenido{
  text-align: center;
  color: black;
  font-weight: bold
}
.contador{
  font-size: 38px;
}
.my-card{
  box-shadow: 1px 1px 5px 1px #888888;
  clear: both;
}
</style>
