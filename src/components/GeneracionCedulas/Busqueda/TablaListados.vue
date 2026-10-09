<template>
  <section class="q-ma-sm">
    <q-table flat dense
      class="q-ma-sm"
      :data="listadosOrdered"
      :columns="columns"
      :pagination="pagination"
      :hide-pagination="true"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="folio" :props="props">
            {{ props.row.folio }}
          </q-td>
          <q-td key="no_acuerdos" :props="props">
            {{ props.row.lista.length }}
          </q-td>
          <q-td key="fecha_creacion" :props="props">
            {{ props.row.created_at | moment('DD MMM YYYY') }}
          </q-td>
          <q-td key="accion" :props="props">
            <router-link href="#" class="q-mx-sm"
              :to="{
                name: 'generacion-cedula-detalle',
                params: {
                  uuid: props.row.id,
                }
              }"
            >
              <q-icon name="search" color="black"
                size="1.5em" clickable
              />
              <q-tooltip>Consultar</q-tooltip>
            </router-link>
            <a href="#" class="q-mx-sm"
              @click.prevent="descargarAtc(props.row)"
            >
              <q-icon name="fa fa-file-pdf" color="black" size="1.3em"/>
              <q-tooltip>Descargar</q-tooltip>
            </a>
            <a href="#" class="q-mx-sm"
              @click.prevent="descargarExcel(props.row)"
            >
              <q-icon name="fa fa-file-excel" color="black" size="1.3em"/>
              <q-tooltip>Importar excel</q-tooltip>
            </a>
            <a href="#" class="q-mx-sm"
              @click.prevent="borrar(props.row)"
            >
              <q-icon name="delete" color="black" size="1.4em"/>
              <q-tooltip>Borrar</q-tooltip>
            </a>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </section>
</template>

<script>
import { Loading, Notify } from 'quasar';

import _ from 'lodash';

import errors from 'boot/errors';

export default {
  name: 'contenedor-listados',
  props: {
    resultados: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      pagination: {
        rowsPerPage: -1,
      },
      columns: [
        {
          name: 'folio', label: 'Folio', field: 'folio', sortable: false, align: 'left', style: 'width: 25%',
        },
        {
          name: 'no_acuerdos', label: 'No de acuerdos', field: 'no_acuerdos', sortable: false, align: 'left', style: 'width: 25%',
        },
        {
          name: 'fecha_creacion', label: 'Fecha de creación', field: 'fecha_creacion', sortable: false, align: 'left', style: 'width: 25%',
        },
        {
          name: 'accion', label: '', field: 'accion', sortable: false, align: 'left', style: 'width: 25%',
        },
      ],
    };
  },
  computed: {
    listadosOrdered() {
      return _.orderBy(this.resultados, ['created_at'], ['desc']);
    },
  },
  methods: {
    descargarAtc(row) {
      window.open(
        `${window.location.protocol}//${window.location.host}/actuaria/imprimir/area-trabajo-cedulas/${row.id}`,
        '_blank',
      );
    },
    descargarExcel(row) {
      window.open(
        `${window.location.protocol}//${window.location.host}/actuaria/excel/area-trabajo-cedulas/${row.id}`,
        '_blank',
      );
    },
    borrar(row) {
      this.$swal({
        title: '¿Está seguro de borrar el listado?',
        text: 'Esta cambio no se podrá revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Borrar',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
      }).then(async (resp) => {
        if (resp.value) {
          Loading.show({
            message: 'Borrando...',
          });
          try {
            await this.$store.dispatch('areaTrabajoCedulas/deleteAreaTrabajoCedulas', { id: row.id });
            Loading.hide();
            Notify.create({
              message: 'Registro borrado correctamente.',
              position: 'bottom',
            });
            return Promise.resolve(true);
          } catch (err) {
            errors(err);
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
