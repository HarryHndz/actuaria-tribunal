<template>
  <div class="q-ma-sm">
    <q-table flat dense
      :title="labelActores"
      class="q-pb-sm q-mb-md"
      :data="actores"
      :columns="columns"
      :hide-pagination="true"
      :pagination="pagination"
    >
      <template v-slot:top-right>
        <q-btn color="yellow-8"
          label="Agregar"
          icon="add_box"
          class="q-my-sm q-mb-lg"
          :class="{'q-my-sm': isMobile}"
          @click.prevent="showForm = true"
        />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="no" :props="props">
            {{ ++props.rowIndex }}
          </q-td>
          <q-td key="nombre" :props="props" v-if="[1, 3].includes(props.row.tipo_persona_id)">
            {{ props.row.nombre }}
          </q-td>
          <q-td key="apellidopaterno" :props="props"
            v-if="[1, 3].includes(props.row.tipo_persona_id)"
          >
            {{ props.row.apellidopaterno }}
          </q-td>
          <q-td key="apellidomaterno" :props="props"
            v-if="[1, 3].includes(props.row.tipo_persona_id)"
          >
            {{ props.row.apellidomaterno }}
          </q-td>
          <q-td key="nombre" colspan="3" :props="props" v-if="props.row.tipo_persona_id === 2">
            {{ props.row.razonsocial }}
          </q-td>
          <q-td key="telefono" :props="props">
            {{ props.row.telefono }}
          </q-td>
          <q-td key="tipo_persona_id" :props="props">
            {{ getTipoPersona(props.row.tipo_persona_id) }}
          </q-td>
          <q-td key="accion" :props="props">
            <a href="#"
              class="q-mr-sm"
              @click.prevent="editarRegistro(props.row)"
            >
              <q-icon name="edit" color="black" size="1.2em"/>
              <q-tooltip>Editar</q-tooltip>
            </a>

            <a href="#"
              class="q-ml-sm"
              @click.prevent="borrarRegistro(props.row)"
            >
              <q-icon name="delete" color="black" size="1.2em"/>
              <q-tooltip>Borrar</q-tooltip>
            </a>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog
      v-model="showForm"
      @hide="closeForm"
    >
      <form-actor v-if="showForm"
        :actor="objectSelected"
        @editar="editar"
        @registrar="registrar"
        @close="closeForm"
      ></form-actor>
    </q-dialog>
  </div>
</template>

<script>
import {
  QTr,
  QTd,
  QTable,
  Notify,
  QDialog,
  Loading,
} from 'quasar';

import errors from 'boot/errors';

import FormActor from './FormActor';

const sweetAlertConfig = {
  title: '¿Está seguro de borrar el actor?',
  text: 'Esta cambio no se puede revertir',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  confirmButtonText: 'Borrar',
  cancelButtonColor: '#d33',
  cancelButtonText: 'Cancelar',
};

export default {
  name: 'table-actores',
  props: {
    actores: {
      type: Array,
      required: true,
    },
    expediente: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showForm: false,
      objectSelected: null,
      isMobile: this.$q.screen.width < 600,
      columns: [
        {
          name: 'no', label: 'No', field: 'no', sortable: false, align: 'left', style: 'width: 1%',
        },
        {
          name: 'nombre', label: 'Nombre / Razon social', field: 'nombre', sortable: false, align: 'left', style: 'width: 20%',
        },
        {
          name: 'apellidopaterno', label: 'Apellido paterno', field: 'apellidopaterno', sortable: false, align: 'left', style: 'width: 21%',
        },
        {
          name: 'apellidomaterno', label: 'Apellido materno', field: 'apellidomaterno', sortable: false, align: 'left', style: 'width: 21%',
        },
        {
          name: 'telefono', label: 'Telefono', field: 'telefono', sortable: false, align: 'left', style: 'width: 20%',
        },
        {
          name: 'tipo_persona_id', label: 'Tipo persona', field: 'tipo_persona_id', sortable: false, align: 'left', style: 'width: 6%',
        },
        {
          name: 'accion', label: '', field: 'accion', sortable: false, align: 'center', style: 'width: 11%',
        },
      ],
      pagination: {
        rowsPerPage: -1,
      },
    };
  },
  components: {
    QTr,
    QTd,
    QTable,
    QDialog,
    FormActor,
  },
  computed: {
    labelActores() {
      return this.$store.getters['layoutsLabels/getLabelActores'];
    },
    tipoPersonas() {
      return this.$store.getters['tiposPersonas/getTiposPersonasAll'].map(i => ({
        label: i.descripcion,
        value: i.tipo_persona_id,
      }));
    },
  },
  methods: {
    getTipoPersona(id) {
      return this.tipoPersonas.find(i => i.value === id).label;
    },
    editar() {
      Notify.create({
        message: 'Actor actualizado correctamente.',
        position: 'bottom',
      });
      this.closeForm();
    },
    async registrar(object) {
      try {
        await this.$store.dispatch('expedientes/addExpedienteActor', {
          principal: this.expediente.id,
          relacionado: object.id,
        });
        Notify.create({
          message: 'Actor registrado correctamente.',
          position: 'bottom',
        });
        this.closeForm();
        return Promise.resolve(true);
      } catch (e) {
        errors(e);
        this.closeForm();
        return Promise.reject(false);
      }
    },
    borrarRegistro(object) {
      this.$swal(sweetAlertConfig).then(async (resp) => {
        if (resp.value) {
          Loading.show({
            message: 'Cargando...',
          });
          await this.$store.dispatch('expedientes/deleteExpedienteActor', {
            principal: this.expediente.id,
            relacionado: object.id,
          });
          try {
            await this.$store.dispatch('actores/deleteActor', object);
            Notify.create({
              message: 'Actor borrado correctamente.',
              position: 'bottom',
            });
            Loading.hide();
            return Promise.resolve(true);
          } catch (e) {
            errors(e);
            return Promise.reject(false);
          }
        }
        return Promise.resolve(true);
      });
    },
    editarRegistro(object) {
      this.objectSelected = object;
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
      this.objectSelected = null;
    },
  },
};
</script>
