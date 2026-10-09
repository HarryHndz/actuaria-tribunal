<template>
  <div class="historial q-mx-md">
    <span style="margin: auto;" class="text-bold text-caption">
      Búsquedas recientes:
    </span>

    <span v-for="expediente in vistos"
      :key="expediente.id"
    >
      <router-link
        class="q-ml-xs"
        :to="{
          name:'expediente-consulta',
          params: {uuid: expediente.id}
        }"
      >
        <q-chip dense outline>{{expediente.nojuicio}}</q-chip>
      </router-link>
    </span>

    <span v-if="historial.length > 3"
      style="margin: auto;"
      class="cursor-pointer"
      @click.prevent="showModal = true"
    >
      ...
    </span>

    <q-space/>

    <q-separator vertical class="q-mx-sm bg-black"/>

    <span style="margin: auto;"
      class="cursor-pointer text-bold text-caption"
      @click.prevent="showModal = true"
    >
      Historial completo
    </span>

    <q-separator vertical class="q-mx-sm bg-black"/>

    <span style="margin: auto;"
      class="cursor-pointer text-bold text-caption"
      @click.prevent="clearHistorial"
    >
      Limpiar historial
    </span>

    <q-dialog
      @hide="showModal = false"
      v-model="showModal"
    >
      <q-card style="width: 50vw; max-width: 110vw;">
        <q-card-section class="row items-center">
          <div class="text-h6 q-ml-md">Historial de búsqueda</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator/>

        <q-card-section>
          <q-table
            class="q-ma-md"
            hide-pagination
            :data="historial"
            :columns="columns"
            :pagination="pagination"
          >
            <template v-slot:body-cell-accion="props">
              <q-td :props="props">
                <router-link :to="{
                  name: 'expediente-consulta',
                  params: {
                    uuid: props.row.id,
                  },
                }">
                  <q-icon name="search" color="black" size="1.2em" />
                  <q-tooltip>Consultar expediente</q-tooltip>
                </router-link>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  QIcon,
  QSpace,
  QSeparator,
} from 'quasar';

import _ from 'lodash';
import moment from 'moment';

export default {
  name: 'historial-header',
  data() {
    return {
      showModal: false,
      pagination: {
        rowsByPage: -1,
      },
      columns: [
        {
          name: 'nojuicio',
          field: 'nojuicio',
          label: 'Expediente',
          align: 'left',
          style: 'width: 40%',
        },
        {
          name: 'visited_at',
          field: row => moment(row.visited_at).format('DD MMM YYYY HH:mm:ss'),
          label: 'Fecha de consulta',
          align: 'left',
          style: 'width: 40%',
        },
        {
          name: 'accion',
          field: 'accion',
          label: '-',
          align: 'left',
          style: 'width: 20%',
        },
      ],
    };
  },
  components: {
    QIcon,
    QSpace,
    QSeparator,
  },
  computed: {
    historial() {
      return _.orderBy(this.$store.getters['expedientes/getExpedienteHistory'], ['visited_at'], ['desc']);
    },
    vistos() {
      const vistos = _.orderBy(this.$store.getters['expedientes/getExpedienteHistory'], ['visited_at'], ['desc']);

      return vistos.slice(0, 3);
    },
  },
  methods: {
    clearHistorial() {
      this.$store.dispatch('expedientes/clearHistory');
    },
  },
};
</script>
