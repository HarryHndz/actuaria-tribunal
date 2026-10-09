<template>
  <section class="q-mt-lg">
    <q-table flat dense
      class="q-ma-sm"
      :data="grupos"
      :columns="columns"
      :pagination="pagination"
      :hide-pagination="true"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nombre" :props="props">
            {{ props.row.nombre }}
          </q-td>
          <q-td key="clasificacion" :props="props">
            {{ getClasificacion(props.row) }}
          </q-td>
          <q-td key="descripcion" :props="props">
            {{ props.row.descripcion }}
          </q-td>
          <q-td key="total_plantillas" :props="props">
            {{ props.row.plantillas ? props.row.plantillas.data.length : 0 }}
          </q-td>
          <q-td key="fecha" :props="props">
            {{ props.row.updated_at | moment('DD MMM YYYY hh:mm:ss a') }}
          </q-td>
          <q-td key="accion" :props="props">
            <router-link
              :to="{
                name: 'grupo-plantillas-consulta',
                params: {
                  uuid: props.row.id,
                },
              }"
              class="q-mx-sm"
            >
              <q-icon name="search"
                size="1.5em"
                color="black"
              ></q-icon>
              <q-tooltip>Consultar</q-tooltip>
            </router-link>

            <a class="q-mx-sm" href="#"
              @click.prevent="$emit('open-modal-plantilla', props.row)"
            >
              <q-icon name="add"
                size="1.5em"
                color="black"
              ></q-icon>
              <q-tooltip>Añadir plantilla</q-tooltip>
            </a>

            <a v-if="isOwner(props.row)"
              class="q-mx-sm" href="#"
              @click.prevent="$emit('open-modal-permisos', props.row)"
            >
              <q-icon name="fa fa-user-lock"
                size="1.2em"
                color="black"
              ></q-icon>
              <q-tooltip>Agregar permisos</q-tooltip>
            </a>

            <a class="q-mx-sm puntero">
              <q-icon name="more" color="black"
                size="1.5em" clickable
              >
                <q-menu fit>
                  <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup
                      @click.prevent="$emit('open-modal-info', props.row)"
                    >
                      <q-item-section>
                        <q-icon name="info"
                          size="1.5em"
                          color="black"
                        /> Información
                      </q-item-section>
                    </q-item>

                    <q-separator/>

                    <q-item clickable v-close-popup
                      v-if="isOwner(props.row)"
                      @click.prevent="$emit('editar', props.row)"
                    >
                      <q-item-section>
                        <q-icon name="edit"
                          size="1.5em"
                          color="black"
                        /> Editar
                      </q-item-section>
                    </q-item>

                    <q-separator/>

                    <q-item clickable v-close-popup
                      v-if="isOwner(props.row)"
                      @click.prevent="eliminar(props.row)"
                    >
                      <q-item-section>
                        <q-icon name="delete" color="black"
                          size="1.5em" clickable
                        /> Eliminar
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
              <q-tooltip>Más</q-tooltip>
            </a>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </section>
</template>

<script>
import {
  Loading,
  Notify,
} from 'quasar';

import _ from 'lodash';
import errors from 'boot/errors';

export default {
  name: 'contenedor-grupos',
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
          name: 'nombre', label: 'Nombre', field: 'nombre', sortable: false, align: 'left', style: 'width: 20%',
        },
        {
          name: 'clasificacion', label: 'Clasificación', field: 'clasificacion', sortable: false, align: 'left', style: 'width: 13%',
        },
        {
          name: 'descripcion', label: 'Descripción', field: 'descripcion', sortable: false, align: 'left', style: 'width: 32%',
        },
        {
          name: 'total_plantillas', label: 'Total de plantillas', field: 'total_plantillas', sortable: false, align: 'center', style: 'width: 10%',
        },
        {
          name: 'fecha', label: 'Fecha modificado', field: 'fecha', sortable: true, align: 'left', style: 'width: 10%',
        },
        {
          name: 'accion', label: '', field: 'accion', sortable: false, align: 'center', style: 'width: 15%',
        },
      ],
    };
  },
  computed: {
    grupos() {
      return _.orderBy(this.resultados, ['updated_at'], ['desc']);
    },
    session() {
      return this.$store.getters['session/getUsuario'];
    },
    clasificaciones() {
      return [
        {
          label: 'ACUERDOS',
          value: 'acuerdos',
        },
        {
          label: 'CÉDULAS DE NOTIFICACIONES',
          value: 'cedula',
        },
      ];
    },
  },
  methods: {
    getClasificacion(row) {
      const clasificacion = this.clasificaciones.find(i => i.value === row.clasificacion_id);
      return clasificacion?.label ?? '--';
    },
    isOwner(row) {
      return row.user_id === this.session.user_id
        || this.session.permisos.roles.id.indexOf(1) !== -1;
    },
    eliminar(row) {
      this.$swal({
        title: '¿Está seguro de borrar el grupo?',
        text: 'Esta cambio no se podrá revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Borrar',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
      }).then(async (resp) => {
        if (resp.value) {
          Loading.show();
          try {
            await this.$store.dispatch('gruposPlantillas/deleteGrupoPlantillas', { id: row.id });
            Notify.create({
              message: 'Registro borrado correctamente.',
              position: 'bottom',
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
