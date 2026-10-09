<template>
  <section>
    <q-table flat dense
      class="q-ma-sm"
      :data="procesosOrdered"
      :columns="columns"
      :pagination="pagination"
      :hide-pagination="true"
    >
      <template v-slot:top-left>
        <div class="titulo">Procesos</div>
      </template>

      <template v-slot:top-right>
        <q-btn class="q-mr-sm q-mt-none"
          color="yellow-9"
          icon="add"
          label="Agregar"
          @click.prevent="$emit('agregar', true)"
        />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="proceso" :props="props">
            {{ getProcesoDescripcion(props.row) }}
          </q-td>
          <q-td key="fecha" :props="props">
            {{ props.row.fecha | moment('DD MMM YYYY hh:mm:ss a') }}
          </q-td>
          <q-td key="accion" :props="props">
            <a href="#" class="q-mx-sm"
              @click.prevent="eliminar(props.row)"
            >
              <q-icon name="delete" color="black"
                size="1.5em" clickable
              />
              <q-tooltip>Eliminar</q-tooltip>
            </a>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </section>
</template>

<script>
import _ from 'lodash';
import { Loading } from 'quasar';
import errors from 'boot/errors';

export default {
  name: 'contenedor-procesos',
  props: {
    procesos: {
      required: true,
      type: Array,
    },
    id: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      pagination: {
        rowsPerPage: -1,
      },
      columns: [
        {
          name: 'proceso', label: 'Proceso', field: 'proceso', sortable: false, align: 'left', style: 'width: 45%',
        },
        {
          name: 'fecha', label: 'Fecha', field: 'fecha', sortable: true, align: 'left', style: 'width: 45%',
        },
        {
          name: 'accion', label: '', field: 'accion', sortable: false, align: 'center', style: 'width: 10%',
        },
      ],
    };
  },
  computed: {
    procesosOrdered() {
      return _.orderBy(this.procesos, ['fecha'], ['desc']);
    },
  },
  methods: {
    getProcesoDescripcion(row) {
      const proceso = this.$store.getters['procesos/getProcesosAll'].find(i => row.id === i.proceso_id);
      return proceso?.descripcion ?? '--';
    },
    eliminar(row) {
      this.$swal({
        title: '¿Está seguro de borrar el proceso?',
        text: 'Esta cambio no se podrá revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Borrar',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.value) {
          Loading.show();

          let procesosD = [];
          const index = this.procesos.findIndex(item => item.id === row.id);

          procesosD = this.procesos.slice(0, index)
            .concat(this.procesos.slice(index + 1));

          try {
            await this.$store.dispatch('gruposPlantillas/putGrupoPlantillas', {
              id: this.id,
              procesos: procesosD,
            });
            Loading.hide();
            return Promise.resolve(true);
          } catch (e) {
            errors(e);
            Loading.hide();
            return Promise.reject(true);
          }
        }
        return Promise.resolve(true);
      });
    },
  },
};
</script>
