<template>
  <q-page class="q-pa-md">
    <div class="q-pa-sm q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Inicio" icon="home" to="/" />
        <q-breadcrumbs-el label="Leyendes" icon="schedule"/>
      </q-breadcrumbs>
    </div>

    <div class="q-mb-sm text-center">
      <div class="titulo">
        <strong>ADMINISTRACIÓN DE LEYENDAS v{{env.VERSION_ADMIN_LEYENDAS}}</strong>
      </div>
    </div>

    <q-table
      wrap-cells
      class="q-ma-lg"
      :data="leyendas"
      :filter="filter"
      :columns="columnsM"
      :pagination.sync="pagination"
    >
      <template v-slot:top-right>
        <q-btn class="q-ma-sm"
          color="pink-7"
          label="Registrar"
          icon="add"
          @click.prevent="showModalForm = true"
        />
      </template>

      <template v-slot:top-left>
        <q-input dense debounce="300"
          v-model="filter"
          class="q-ma-sm"
          placeholder="Buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body="props" class="q-ma-md">
        <q-tr :props="props">
          <q-td key="descripcion" :props="props">
            {{ props.row.descripcion }}
          </q-td>
          <q-td key="tipo_listado_id" :props="props">
            {{ getTipoListado(props.row) }}
          </q-td>
          <q-td key="leyenda" :props="props" v-html="props.row.leyenda">
          </q-td>
          <q-td key="margin_header" :props="props">
            {{ props.row.margin_header }}
          </q-td>
          <q-td auto-width>
            <a href="#"
              class="q-mr-sm"
              @click.prevent="openModal(props.row)"
            >
              <q-icon name="edit" color="black" size="1.2em"/>
              <q-tooltip>Editar</q-tooltip>
            </a>
          </q-td>
          <q-td auto-width>
            <a href="#"
              class="q-ml-sm"
              @click.prevent="borrar(props.row)"
            >
              <q-icon name="delete" color="black" size="1.2em"/>
              <q-tooltip>Borrar</q-tooltip>
            </a>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog
      @hide="closeModalForm"
      v-model="showModalForm"
    >
      <form-tipo-leyenda
        :leyenda="leyenda"
        @close="closeModalForm"
      ></form-tipo-leyenda>
    </q-dialog>
  </q-page>
</template>

<script>
import {
  QTr,
  QTd,
  QInput,
  QTable,
  Loading,
  QDialog,
  QBreadcrumbs,
  QBreadcrumbsEl,
  Notify,
} from 'quasar';

import _ from 'lodash';
import axios from 'axios';
import env from 'boot/env';
import 'src/css/SIDJ-style.css';

import FormTipoLeyenda from 'components/AdminTiposLeyendas/FormTipoLeyenda';
import errors from 'boot/errors';

export default {
  name: 'admin-tipos-leyendas',
  data() {
    return {
      pagination: {
        page: 1,
        rowsPerPage: 10,
        descending: false,
        sortBy: 'tipo_leyenda_id',
      },
      columnsM: [
        {
          name: 'descripcion', align: 'left', label: 'DESCRIPCIÓN', field: 'descripcion', sortable: true, style: 'width: 20%;',
        },
        {
          name: 'tipo_listado_id', align: 'left', label: 'TIPO DE LISTADO', field: 'tipo_listado_id', sortable: true, style: 'width: 10%;',
        },
        {
          name: 'leyenda', align: 'left', label: 'LEYENDA', field: 'leyenda', sortable: true, style: 'width: 50%;',
        },
        {
          name: 'margin_header', align: 'left', label: 'MARGEN', field: 'margin_header', sortable: true, style: 'width: 10%;',
        },
        {
          align: 'left', label: '', style: 'width: 5%;',
        },
        {
          align: 'left', label: '', style: 'width: 5%;',
        },
      ],
      filter: '',
      showModalForm: false,
      leyenda: null,
    };
  },
  components: {
    QTr,
    QTd,
    QTable,
    QInput,
    QDialog,
    QBreadcrumbs,
    QBreadcrumbsEl,
    FormTipoLeyenda,
  },
  preFetch({ store }) {
    Loading.show();
    return axios.all([
      store.dispatch('tiposLeyendas/fetchAllTiposLeyendas', {
        limit: -1,
      }),
      store.dispatch('areas/fetchAllAreas', {
        limit: -1,
      }),
      store.dispatch('tiposListados/fetchAllTiposListados', {
        limit: -1,
      }),
    ]).then(() => {
      Loading.hide();
      return Promise.resolve(true);
    }).catch((error) => {
      Loading.hide();
      errors(error);
    });
  },
  beforeMount() {
    this.$emit('leftDrawerOpen', false);
  },
  computed: {
    env() {
      return env;
    },
    leyendas() {
      return _.sortBy(this.$store.getters['tiposLeyendas/getTiposLeyendasAll'], ['tipo_leyenda_id']);
    },
    tiposListados() {
      return this.$store.getters['tiposListados/getTiposListadosAll'];
    },
  },
  methods: {
    getTipoListado(leyenda) {
      const tipo = this.tiposListados.find(i => i.tipo_listado_id === leyenda.tipo_listado_id);
      return tipo ? tipo.descripcion : '';
    },
    borrar(leyenda) {
      this.$swal({
        title: '¿Esta seguro de borrar la leyenda?',
        text: 'Este cambio no se podrá revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        confirmButtonText: 'Borrar',
      }).then((resp) => {
        if (resp.value) {
          Loading.show({
            message: 'Borrando...',
          });
          this.$store.dispatch('tiposLeyendas/deleteTipoLeyenda', {
            id: leyenda.id,
          }).then(() => {
            Loading.hide();
            Notify.create({
              message: 'Leyenda eliminada correctamente.',
              position: 'bottom',
            });
            return Promise.resolve(true);
          }).catch((error) => {
            Loading.hide();
            errors(error);
          });
        }
      });
    },
    openModal(leyenda) {
      this.leyenda = leyenda;
      this.showModalForm = true;
    },
    closeModalForm() {
      this.leyenda = null;
      this.showModalForm = false;
    },
  },
};
</script>

<style scoped>
  .SIDJ-box {
    background: rgba(42, 63, 84, 0.04);
    margin: 10px;
    padding: 10px;
    background-color: #fff;
  }

  .SIDJ-box label{
    font-size: 16px;
    font-weight: 700;
  }
</style>
