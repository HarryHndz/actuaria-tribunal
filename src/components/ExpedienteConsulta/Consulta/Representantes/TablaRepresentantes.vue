<template>
  <div class="q-ma-md">
    <q-table flat dense
      title="Representantes"
      class="q-pb-sm q-mb-md"
      :data="representantes"
      :columns="columns"
      :hide-pagination="true"
      :pagination="pagination"
    >
      <template v-slot:top-right>
        <q-btn color="yellow-8"
          label="Agregar"
          icon="add_box"
          class="q-my-sm q-mb-lg"
          @click.prevent="showForm = true"
        />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="no" :props="props">
            {{ ++props.rowIndex }}
          </q-td>
          <q-td key="representante" :props="props">
            {{ props.row.nombre }}
          </q-td>
          <q-td key="correo" :props="props">
            {{ props.row.correo }}
          </q-td>
          <q-td key="accion" :props="props">
            <a href="#" class="q-mx-sm"
              @click.prevent="editarRegistro(props.row)"
            >
              <q-icon name="edit" color="black" size="1.2em"/>
              <q-tooltip>Editar representante</q-tooltip>
            </a>
            <a href="#" class="q-mx-sm"
              @click.prevent="borrarRegistro(props.row)"
            >
              <q-icon name="delete" color="black" size="1.2em"/>
              <q-tooltip>Borrar representante</q-tooltip>
            </a>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog
      v-model="showForm"
      @hide="closeForm"
    >
      <form-representante v-if="showForm"
        :representante="objectSelected"
        @registrar="registrar"
        @editar="editar"
        @close="closeForm"
      ></form-representante>
    </q-dialog>
  </div>
</template>

<script>
import {
  QTooltip,
  Notify,
  QDialog,
  Loading,
} from 'quasar';

import errors from 'boot/errors';

import FormRepresentante from './FormRepresentante';

const sweetAlertConfig = {
  title: '¿Está seguro de borrar el representante?',
  text: 'Esta cambio no se puede revertir',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  confirmButtonText: 'Borrar',
  cancelButtonColor: '#d33',
  cancelButtonText: 'Cancelar',
};

export default {
  name: 'table-representantes',
  props: {
    representantes: {
      type: Array,
      required: true,
    },
    expedienteId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showForm: false,
      objectSelected: null,
      columns: [
        {
          name: 'no', label: 'No', field: 'no', sortable: false, align: 'left', style: 'width: 1%',
        },
        {
          name: 'representante', label: 'Representante', field: 'representante', sortable: false, align: 'left', style: 'width: 70%',
        },
        {
          name: 'correo', label: 'Correo', field: 'correo', sortable: false, align: 'left', style: 'width: 18%',
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
    QDialog,
    QTooltip,
    FormRepresentante,
  },
  methods: {
    editar() {
      Notify.create({
        message: 'Representante actualizado correctamente.',
        position: 'bottom',
      });
      this.closeForm();
    },
    async registrar(object) {
      try {
        await this.$store.dispatch('expedientes/addExpedienteRepresentante', {
          principal: this.expedienteId,
          relacionado: object.id,
        });
        Notify.create({
          message: 'Representante registrado correctamente.',
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
          Loading.show();
          try {
            await this.$store.dispatch('expedientes/deleteExpedienteRepresentante', {
              principal: this.expedienteId,
              relacionado: object.id,
            });
            await this.$store.dispatch('representantes/deleteRepresentante', object);
            Loading.hide();
            Notify.create({
              message: 'Representante borrada correctamente.',
              position: 'bottom',
            });
            return Promise.resolve(true);
          } catch (e) {
            errors(e);
            Loading.hide();
            return Promise.reject(false);
          }
        }
        return Promise.resolve(true);
      });
    },
    editarRegistro(object) {
      this.showForm = true;
      this.objectSelected = object;
    },
    closeForm() {
      this.showForm = false;
      this.objectSelected = null;
    },
  },
};
</script>
