<template>
  <q-card style="width: 900px; max-width: 90vw;" id="modal">
    <q-card-section class="row items-center q-mx-sm">
      <div class="text-h6">Notificaciones para el acuerdo {{acuerdo.no_folio}}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section class="q-mx-sm">
      <q-table flat dense
        :data="tiposNotificaciones"
        :columns="columns"
        :pagination="pagination"
        :hide-pagination="true"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="notificacion" :props="props">
              {{props.row.descripcion}}
            </q-td>
            <q-td key="accion" :props="props">
                <a href="#"
                  @click.prevent="addUser(props.row)"
                >
                  <q-checkbox
                    dense
                    :val="props.row"
                    color="pink-8"
                    v-model="selection"
                  />
                </a>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>

    <q-separator class="q-my-md"/>

    <q-card-actions>
      <div class="text-right col-md-12">
        <q-btn class="q-mx-lg q-mb-sm"
          color="pink-10"
          icon="forward"
          @click="siguiente"
          label="Siguiente"
        />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import {
  QCard,
  QSpace,
  QCheckbox,
  ClosePopup,
  QSeparator,
  QCardSection,
  QCardActions,
} from 'quasar';

import _ from 'lodash';

export default {
  name: 'modal-notificaciones',
  props: {
    acuerdo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selection: [],
      pagination: {
        rowsPerPage: -1,
      },
      columns: [
        {
          name: 'notificacion', label: 'Notificación', field: 'notificacion', sortable: false, align: 'left', style: 'width: 90%',
        },
        {
          name: 'accion', label: '', field: 'accion', sortable: false, align: 'center', style: 'width: 10%',
        },
      ],
    };
  },
  components: {
    QCard,
    QSpace,
    QCheckbox,
    QSeparator,
    QCardSection,
    QCardActions,
  },
  directives: {
    ClosePopup,
  },
  computed: {
    tiposNotificaciones() {
      return _.sortBy(
        this.$store.getters['tiposNotificaciones/getTiposNotificacionesAll']
          .filter(i => i.generar_cedula), ['descripcion'],
      );
    },
  },
  methods: {
    siguiente() {
      if (this.selection.length > 0) {
        this.$emit('siguiente', this.selection);
      }
      this.$swal({
        title: 'Es necesario elegir al menos una notificación',
        icon: 'warning',
        target: '#modal',
      });
    },
  },
};
</script>
