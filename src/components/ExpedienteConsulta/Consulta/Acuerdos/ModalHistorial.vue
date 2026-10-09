<template>
  <q-card style="width: 1500px; max-width: 300vw">
    <q-card-section class="row items-center">
      <div class="row">
        <div class="text-h6 col-12">
          Historial de ubicación acuerdo {{acuerdo.noFolio}}
        </div>
        <div class="row">
          <div class="col-12">
            <span>Fecha elaboración:
              <strong>{{acuerdo.fecha_elaboracion | moment('MMM D YYYY')}}</strong></span>
          </div>
          <div class="col-12">
            <span>Fecha modificación:
              <strong>{{acuerdo.updated_at | moment('MMM D YYYY')}}</strong></span>
          </div>
          <div class="col-6">
            <span>Tipo: <strong>{{ getTipo(acuerdo.tipo_id) }}</strong></span>
          </div>
        </div>
      </div>
      <q-space/>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
      <q-separator/>
      <template>
        <div class="q-my-sm">
          <q-table flat dense
            class="q-pb-sm q-mb-md"
            :data="historial"
            :columns="columns"
            :hide-pagination="true"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="no" :props="props">
                  {{ ++props.rowIndex }}
                </q-td>
                <q-td key="folio" :props="props">
                  {{ props.row.folio }}
                </q-td>
                <q-td key="remite" :props="props">
                  {{ props.row.area_remitente }}<br/>
                  <strong>{{ props.row.remitente }}</strong><br/>
                  <strong>{{ props.row.fecha_remite
                    | moment('MMM D YYYY, h:mm:ss a') }}</strong>
                </q-td>
                <q-td key="destinatario" :props="props">
                  {{ props.row.area_destinataria }}<br/>
                  <strong>{{ props.row.destinatario }}</strong><br/>
                  <strong v-if="props.row.fecha_recepcion">
                    {{ props.row.fecha_recepcion | moment('MMM D YYYY, h:mm:ss a') }}
                  </strong>
                  <strong v-if="!props.row.fecha_recepcion">
                    {{ '---' }}
                  </strong>
                </q-td>
                <q-td key="estado" :props="props" v-if="props.row.estado_id === 1">
                  <q-badge color="red-6">
                    {{ getEstado(props.row.estado_id) }}
                  </q-badge>
                </q-td>
                <q-td key="estado" :props="props" v-if="props.row.estado_id === 2">
                  <q-badge color="green">
                    {{ getEstado(props.row.estado_id) }}
                  </q-badge>
                </q-td>
                <q-td key="estado" :props="props" v-if="props.row.estado_id === 3">
                  <q-badge color="amber-10">
                    {{ getEstado(props.row.estado_id) }}
                  </q-badge>
                </q-td>
              </q-tr>
            </template>

        </q-table>
        </div>
      </template>
  </q-card>
</template>

<script>
import {
  QTd,
  QTr,
  QCard,
  QSpace,
  QTable,
} from 'quasar';

export default {
  name: 'modal-historial',
  props: {
    historial: {
      required: true,
      type: Array,
    },
    acuerdo: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      columns: [
        {
          name: 'no', label: 'No.', field: 'no', sortable: false, align: 'left', style: 'width: 1%',
        },
        {
          name: 'folio', label: 'Folio', field: 'folio', sortable: false, align: 'left', style: 'width: 2%',
        },
        {
          name: 'remite', label: 'Remite', field: 'remite', sortable: false, align: 'left', style: 'width: 3%',
        },
        {
          name: 'destinatario', label: 'Destinatario', field: 'destinatario', sortable: false, align: 'left', style: 'width: 3%',
        },
        {
          name: 'estado', label: 'Estado', field: 'estado', sortable: false, align: 'left', style: 'width: 1%',
        },
      ],
    };
  },
  components: {
    QTr,
    QTd,
    QCard,
    QTable,
    QSpace,
  },
  computed: {
    tiposAcuerdos() {
      return this.$store.getters['tiposAcuerdo/getTiposAcuerdosAll'];
    },
    estadoListados() {
      return this.$store.getters['estadosListados/getEstadosListadosAll'].map(i => ({
        label: i.descripcion,
        value: i.estado_id,
      }));
    },
  },
  methods: {
    getTipo(id) {
      const tipoAcuerdo = this.tiposAcuerdos.find(i => i.tipo_acuerdo_id === id);
      return tipoAcuerdo ? tipoAcuerdo.descripcion : '--';
    },
    getEstado(id) {
      const estado = this.estadoListados.find(i => i.value === id);
      return estado ? estado.label : '--';
    },
  },
};
</script>
