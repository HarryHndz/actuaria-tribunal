<template>
  <div class="q-ma-sm">
    <q-table
      flat
      dense
      title="Autoridades Substanciadoras"
      class="q-pb-sm q-mb-md"
      :data="autoridades"
      :columns="columns"
      :hide-pagination="true"
      :pagination="pagination"
    >
      <template v-slot:top-right>
        <q-btn
          color="yellow-8"
          label="Agregar"
          icon="add_box"
          class="q-my-sm q-mb-lg"
          @click.prevent="showForm = true"
        />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="autoridad" :props="props">
            {{ props.row.autoridad }}
          </q-td>
          <q-td key="accion" :props="props">
            <a
              href="#"
              class="q-ml-sm"
              @click.prevent="borrarRegistro(props.row)"
            >
              <q-icon name="delete" color="black" size="1.4em" />
              <q-tooltip>Borrar autoridad</q-tooltip>
            </a>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="showForm" @hide="showForm = false">
      <form-buscar-autoridad
        v-if="showForm"
        @registrar="registrar"
        @close="showForm = false"
      ></form-buscar-autoridad>
    </q-dialog>

    <q-dialog v-model="showFormAutoridades" @hide="showFormAutoridades = false">
      <form-autoridades-actuaria
        v-if="showFormAutoridades"
        :autoridad="objectSelected"
        :expediente="expediente"
        @registrar="registrar"
        @close="closeForm"
      ></form-autoridades-actuaria>
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

import moment from 'moment';

import errors from 'boot/errors';
import updateState from 'src/store/utlils';

import FormBuscarAutoridad from './FormBuscarAutoridad';
import FormAutoridadesActuaria from './FormAnexoAutoridades';

const sweetAlertConfig = {
  title: '¿Está seguro de borrar la autoridad?',
  text: 'Esta cambio no se puede revertir',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  confirmButtonText: 'Borrar',
  cancelButtonColor: '#d33',
  cancelButtonText: 'Cancelar',
};

export default {
  name: 'table-autoridades-substanciadoras',
  props: {
    autoridades: {
      type: Array,
      required: true,
    },
    expediente: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showForm: false,
      showFormAutoridades: false,
      isMobile: this.$q.screen.width < 600,
      columns: [
        {
          name: 'autoridad', label: 'Nombre de autoridad', field: 'autoridad', sortable: false, align: 'left', style: 'width: 89%',
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
    FormBuscarAutoridad,
    FormAutoridadesActuaria,
  },
  methods: {
    borrarRegistro(object) {
      this.$swal(sweetAlertConfig).then(async (resp) => {
        if (resp.value) {
          Loading.show({
            message: 'Cargando...',
          });
          try {
            const autoridades = this.expediente?.autoridades_substanciadoras ?? [];
            const index = autoridades.findIndex(i => i.id === object.autoridad_id);

            if (index > -1) {
              this.expediente.autoridades_substanciadoras[index].deleted_at = moment().format('YYYY-MM-DD HH:mm:ss');

              await this.$store.dispatch('expedientes/putExpediente', {
                id: this.expediente.id,
                autoridades_substanciadoras: autoridades,
              });
            }

            Notify.create({
              message: 'Autoridad borrada correctamente.',
              position: 'bottom',
            });
          } catch (e) {
            errors(e);
          } finally {
            Loading.hide();
          }
        }
      });
    },
    async registrar(autoridad) {
      try {
        let autoridades = this.expediente?.autoridades_substanciadoras ?? [];

        autoridades = updateState(autoridades, {
          id: autoridad.autoridad_id,
          created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
          deleted_at: null,
        });

        await this.$store.dispatch('expedientes/putExpediente', {
          id: this.expediente.id,
          autoridades_substanciadoras: autoridades,
        });

        Notify.create({
          message: 'Autoridad registrada correctamente.',
          position: 'bottom',
        });
      } catch (e) {
        errors(e);
      } finally {
        this.showForm = false;
      }
    },
    closeForm() {
      this.showFormAutoridades = false;
    },
  },
};
</script>
