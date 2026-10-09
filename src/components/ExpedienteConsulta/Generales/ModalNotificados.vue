<template>
  <q-card style="width: 70vw; max-width: 110vw">
    <q-card-section class="row items-center text-white" :class="bgColor">
      <div class="text-h6 q-ml-md">Notificados para el acuerdo {{ acuerdo.noFolio }}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="row">
        <div class="col-md-12">
          <q-table
            class="q-ma-md"
            :data="acuerdo.notificados"
            :columns="columns"
            :pagination="pagination"
            :hide-pagination="true"
          >
            <template v-slot:top-left>
              <span class="text-bold">
                {{ notificacionesNotificadas.length }} /
                {{ acuerdo.notificados.length }} notificaciones registradas
              </span>
            </template>

            <template v-slot:top-right>
              <q-btn
                color="warning"
                icon="add_circle_outline"
                label="Registrar notificación"
                @click="$emit('openModalNotificacion', acuerdo)"
              />
            </template>

            <template v-slot:body-cell-estado="props">
              <q-td :props="props">
                <q-icon v-if="getNotificacion(props.row)" name="done" color="green" size="1.4em" />
                <q-icon v-else name="close" color="red" size="1.4em" />

                <q-spinner-ios
                  color="black"
                  v-if="fetching"
                />
              </q-td>
            </template>

            <template v-slot:body-cell-tipo_id="props">
              <q-td :props="props">
                <q-select
                  flat
                  dense
                  clearable
                  emit-value
                  map-options
                  v-model="props.row.tipo_id"
                  :options="tiposNotificaciones"
                  @input="updateNotificados"
                />
              </q-td>
            </template>

            <template v-slot:body-cell-acciones="props">
              <q-td :props="props" >
                <span v-if="getNotificacion(props.row)"
                  class="q-mx-xs cursor-pointer"
                  @click.prevent="$emit('openModalNotificacionEditar', getNotificacion(props.row))"
                >
                  <q-icon name="edit" color="black" size="1.3em"/>
                  <q-tooltip>Editar</q-tooltip>
                </span>

                <span v-else
                  class="q-mx-xs cursor-pointer"
                  @click.prevent="$emit('openModalNotificacion', {
                    ...acuerdo,
                    notificado: {
                      ...props.row,
                      id: null,
                      acuerdo_id: acuerdo.acuerdo_id,
                    },
                  })"
                >
                  <q-icon name="add_circle_outline" color="black" size="1.3em"/>
                  <q-tooltip>Registrar</q-tooltip>
                </span>
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {
  QIcon,
  QSelect,
  QTooltip,
  QSpinnerIos,
} from 'quasar';
import errors from 'boot/errors';

export default {
  name: 'modal-notificados',
  props: {
    notificaciones: {
      type: Array,
      required: true,
    },
    acuerdo: {
      type: Object,
      required: true,
    },
    expediente: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fetching: false,
      pagination: {
        page: 1,
        sortBy: 'id',
        descending: false,
        rowsPerPage: -1,
      },
      columns: [
        {
          name: 'estado',
          label: '',
          align: 'center',
          style: 'width: 4%',
        },
        {
          name: 'nombre',
          label: 'Nombre',
          field: 'nombre',
          align: 'left',
          style: 'width: 30%',
          classes: 'text-weight-bold',
        },
        {
          name: 'tipo',
          label: 'Tipo',
          field: 'tipo',
          align: 'left',
          style: 'width: 19%',
        },
        {
          name: 'tipo_id',
          field: 'tipo_id',
          label: 'Tipo notificación',
          align: 'left',
          style: 'width: 40%',
        },
        {
          name: 'acciones',
          label: 'Acciones',
          align: 'center',
          style: 'width: 7%',
        },
      ],
    };
  },
  components: {
    QIcon,
    QSelect,
    QTooltip,
    QSpinnerIos,
  },
  computed: {
    bgColor() {
      return this.$store.getters['layoutsLabels/getBgHeaderLayoutColor'];
    },
    notificacionesNotificadas() {
      const { notificados } = this.acuerdo;
      return this.notificaciones.filter(i => notificados
        .some(j => j.tipo_id === i.tipo_id
          && (i.actor_id === j.actor_id
            || i.autoridad_id === j.autoridad_id
            || i.tercero_id === j.tercero_id)));
    },
    tiposNotificaciones() {
      return this.$store.getters['tiposNotificaciones/getTiposNotificacionesAll']
        .filter(item => item.tipos_demandas.includes(this.expediente.tipo_demanda_id))
        .map(i => ({
          value: i.tipo_notificacion_id,
          label: i.descripcion,
        }));
    },
  },
  methods: {
    getNotificacion(notificado) {
      return this.notificaciones.find(i => i.actor_id === notificado.actor_id
        || i.autoridad_id === notificado.autoridad_id
        || i.autoridad_substanciadora_id === notificado.autoridad_substanciadora_id
        || i.tercero_id === notificado.tercero_id);
    },
    async updateNotificados() {
      try {
        this.fetching = true;
        await this.$store.dispatch('acuerdos/putAcuerdo', {
          id: this.acuerdo.id,
          notificados: this.acuerdo.notificados,
        });
      } catch (error) {
        errors(error);
      } finally {
        this.fetching = false;
      }
    },
  },
};
</script>
