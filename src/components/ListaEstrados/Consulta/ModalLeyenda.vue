<template>
  <q-card style="width: 1200px; max-width: 120vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Seleccionar leyenda</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="q-pt-sm">
        <div class="row q-mx-lg q-my-sm">
          <div class="col-md-4">
            Folio listado: <br/>
            <strong>{{lista.folio ? lista.folio : '-'}}</strong>
          </div>
          <div class="col-md-4">
            Fecha publicación: <br/>
            <strong>{{lista.fecha_publicacion ? lista.fecha_publicacion : '-'}}</strong>
          </div>
          <div class="col-md-4">
            Leyenda: <br/>
            <strong>{{tipoLeyenda ? tipoLeyenda.descripcion : '-'}}</strong>
          </div>
        </div>

        <div class="row q-mx-lg q-my-md">
          <div class="col-md-4">
            Ponencia: <br/>
            <strong>{{ponencia ? ponencia.ponencia : '-'}}</strong>
          </div>
          <div class="col-md-4">
            Actuario: <br/>
            <strong>{{actuario ? actuario.actuario : '-'}}</strong>
          </div>
        </div>

        <div class="row q-my-md">
          <div class="col-md-12 col-xs-12">
            <q-table
              flat
              wrap-cells
              class="q-ma-sm"
              :data="tiposLeyendas"
              :filter="filter"
              :columns="columnsM"
            >
              <template v-slot:body="props" class="q-ma-md">
                <q-tr :props="props">
                  <q-td key="descripcion" :props="props">
                    {{ props.row.descripcion }}
                  </q-td>
                  <q-td key="leyenda" :props="props" v-html="props.row.leyenda">
                  </q-td>
                  <q-td auto-width>
                    <a href="#"
                      class="q-mr-sm"
                      @click.prevent="save(props.row)"
                    >
                      <q-icon name="add_box" color="black" size="2em"/>
                      <q-tooltip>Seleccionar</q-tooltip>
                    </a>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {
  QTr,
  QTd,
  QBtn,
  QCard,
  Notify,
  QSpace,
  QTable,
  ClosePopup,
  QSeparator,
  QCardSection,
  Loading,
} from 'quasar';

import _ from 'lodash';

import errors from 'boot/errors';

export default {
  name: 'modal-leyenda',
  props: {
    lista: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fetching: false,
      formData: {
        id: this.lista.id,
        tipo_leyenda_id: this.lista.tipo_leyenda_id,
      },
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
          name: 'leyenda', align: 'left', label: 'LEYENDA', field: 'leyenda', sortable: true, style: 'width: 75%;',
        },
        {
          align: 'left', label: '-', style: 'width: 5%;',
        },
      ],
      filter: '',
    };
  },
  directives: {
    ClosePopup,
  },
  components: {
    QTr,
    QTd,
    QBtn,
    QCard,
    QSpace,
    QTable,
    QSeparator,
    QCardSection,
  },
  computed: {
    tiposLeyendas() {
      return _.sortBy(this.$store.getters['tiposLeyendas/getTiposLeyendasAll']);
    },
    actuario() {
      return this.$store.getters['actuarios/getActuariosAll']
        .find(i => i.actuario_id === this.lista.actuario_id);
    },
    tipoLeyenda() {
      return this.tiposLeyendas.find(i => i.tipo_leyenda_id === this.lista.tipo_leyenda_id);
    },
    ponencia() {
      return this.$store.getters['ponencias/getPonenciasAll']
        .find(i => i.ponencia_id === this.lista.ponencia_id);
    },
  },
  methods: {
    save(row) {
      Loading.show({
        message: 'Actualizando...',
      });
      this.fetching = true;
      this.$store.dispatch('listadosAcuerdos/putListadoAcuerdo', {
        id: this.lista.id,
        tipo_leyenda_id: row.tipo_leyenda_id,
      }).then(() => {
        Loading.hide();
        this.fetching = false;
        Notify.create({
          message: 'Listado actualizado correctamente.',
          position: 'bottom',
        });
        this.$emit('imprimir');
        this.$emit('cerrar');
        return Promise.resolve(true);
      }).catch((error) => {
        Loading.hide();
        this.fetching = false;
        errors(error);
      });
    },
  },
};
</script>
