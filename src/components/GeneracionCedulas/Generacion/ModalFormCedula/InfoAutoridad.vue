<template>
  <div id="modal-autoridad">
    <div class="row">
      <div class="col-md-12 col-xs-12">
        <q-table flat dense
          :key="tableKey"
          class="q-mx-sm q-mb-sm"
          :data="autoridadesTabla"
          :columns="columns"
          :pagination="pagination"
          :hide-pagination="true"
        >
          <template v-slot:top-left>
            <div class="titulo">Autoridades</div>
          </template>
          <template v-slot:top-right>
            <q-btn class="q-mx-lg q-ma-sm"
              color="warning"
              icon="add"
              label="Autoridad"
              @click.prevent="showForm = true"
            />

             <q-btn class="q-mx-lg q-ma-sm"
              color="green"
              icon="add"
              label="Agregar Autoridad"
              @click.prevent="showFormAutoridades = true"
            />
          </template>

          <template v-slot:body="props">
            <q-tr v-ripple :props="props">
              <q-td key="no" :props="props">
                {{ ++props.rowIndex }}
              </q-td>
              <q-td key="autoridad" :props="props">
                {{props.row.autoridad}}
              </q-td>
              <q-td key="seleccion" :props="props">
                <a href="#" v-if="props.row.autoridad_id">
                  <input type="checkbox"
                    class="puntero"
                    v-model="formData.autoridades"
                    :value="{
                      autoridad: props.row.autoridad,
                      autoridad_id: props.row.autoridad_id,
                    }"
                  />
                </a>
                <q-icon v-else name="check_circle_outline" size="1.5em" color="green"/>
              </q-td>
              <q-td key="accion" :props="props">
                <a href="#" class="q-mx-sn" v-if="!props.row.autoridad_id"
                @click.prevent="editarAutoridad(props.row)"
                >
                  <q-icon name="edit" color="black" size="1.3em"/>
                  <q-tooltip>Editar</q-tooltip>
                </a>

                <a href="#" class="q-mx-sm" v-if="!props.row.autoridad_id"
                  @click.prevent="borrarRegistro(props.row)"
                >
                  <q-icon name="delete" color="black" size="1.3em"/>
                  <q-tooltip>Borrar</q-tooltip>
                </a>
                <a v-else class="q-mx-sm">
                  <q-icon name="remove" color="black" size="1.3em"/>
                </a>

                <a href="#" v-if="props.rowIndex !== 1"
                  class="q-mx-sm"
                  @click.prevent="subir(props.row)"
                >
                  <q-icon name="expand_less" color="black" size="2em"/>
                  <q-tooltip>Subir</q-tooltip>
                </a>

                <a v-else class="q-mx-sm">
                  <q-icon name="remove" color="black" size="2em"/>
                </a>
                <a href="#" v-if="getLastIndex() !== props.rowIndex"
                  class="q-mx-sm"
                  @click.prevent="bajar(props.row)"
                >
                  <q-icon name="expand_more" color="black" size="2em"/>
                  <q-tooltip>Bajar</q-tooltip>
                </a>
                <a v-else class="q-mx-sm">
                  <q-icon name="remove" color="black" size="2em"/>
                </a>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>

    <q-separator class="q-my-md"/>

    <q-stepper-navigation class="q-pt-none row">
      <div class="text-left col-md-6">
        <q-btn class="q-ma-sm q-mx-md "
          color="pink-10"
          icon="arrow_back"
          @click="regresar"
          label="Regresar"
          :disable="fetchingSave"
        />
      </div>
      <div class="text-right col-md-6">
        <q-btn class="q-ma-sm q-mx-md "
          color="pink-10"
          icon="save"
          @click="generar"
          :loading="fetchingSave"
          label="Guardar"
        />
      </div>
    </q-stepper-navigation>

    <q-dialog
      v-model="showForm"
      @hide="showForm = false"
    >
      <form-buscar-autoridad v-if="showForm"
        @registrar="registrar"
        @close="showForm = false"
      ></form-buscar-autoridad>
    </q-dialog>
    <q-dialog
      v-model="showFormAutoridades"
      @hide="showFormAutoridades = false"
    >
      <form-autoridades-actuaria v-if="showFormAutoridades"
        :autoridad="objectSelected"
        :expediente="expediente"
        @registroAutoridad="registroAutoridad"
        @close="closeForm"
        ></form-autoridades-actuaria>
    </q-dialog>
    <q-dialog
      v-model="showEditarAutoridades"
      @hide="showEditarAutoridades = false"
    >
      <form-editar-autoridad v-if="showEditarAutoridades"
        :autoridad="objectSelected"
        :expediente="expediente"
        @saveAutoridad="saveAutoridad"
        @close="closeEditarAutoridad"
      >
      </form-editar-autoridad>
    </q-dialog>
  </div>
</template>

<script>
import {
  Notify,
  QDialog,
  Loading,
  QStepperNavigation,
} from 'quasar';

import _ from 'lodash';

import errors from 'boot/errors';

import FormBuscarAutoridad from 'components/ExpedienteConsulta/Consulta/Autoridades/FormBuscarAutoridad';
import FormAutoridadesActuaria from 'components/ExpedienteConsulta/Consulta/Autoridades/FormAnexoAutoridades';
import FormEditarAutoridad from 'components/ExpedienteConsulta/Consulta/Autoridades/FormEditarAutoridades';


export default {
  name: 'info-autoridad',
  props: {
    data: {
      required: true,
      type: Object,
    },
    expediente: {
      required: true,
      type: Object,
    },
    fetchingSave: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      tableKey: 1,
      autoridad: '',
      showForm: false,
      objectSelected: null,
      showFormAutoridades: false,
      showEditarAutoridades: false,
      autoridadesTabla: [],
      formData: {
        expediente_id: this.expediente.id,
        autoridades: [],
        ...this.data,
      },
      pagination: {
        rowsPerPage: -1,
      },
      columns: [
        {
          name: 'no', label: 'No', field: 'no', sortable: false, align: 'left', style: 'width: 5%',
        },
        {
          name: 'autoridad', label: 'Nombre', field: 'autoridad', sortable: false, align: 'left', style: 'width: 75%',
        },
        {
          name: 'seleccion', label: 'Seleccionar', field: 'seleccion', sortable: false, align: 'center', style: 'width: 10%',
        },
        {
          name: 'accion', label: '', field: 'accion', sortable: false, align: 'left', style: 'width: 10%',
        },
      ],
    };
  },
  components: {
    QDialog,
    QStepperNavigation,
    FormBuscarAutoridad,
    FormAutoridadesActuaria,
    FormEditarAutoridad,
  },
  beforeMount() {
    this.formData.autoridades.forEach((i) => {
      this.autoridadesTabla = this.updateStateByAutoridad(this.autoridadesTabla, i);
    });
    this.autoridadesSIDJ.forEach((i) => {
      this.autoridadesTabla = this.updateStateByAutoridad(this.autoridadesTabla, i);
    });
    this.expediente.autoridades_actuaria.forEach((i) => {
      this.autoridadesTabla = this.updateStateByAutoridad(this.autoridadesTabla, i);
      this.formData.autoridades = this.updateStateByAutoridad(this.formData.autoridades, i);
    });
  },
  computed: {
    autoridades() {
      return this.$store.getters['autoridades/getAutoridadesAll']
        .filter(item => this.expediente.autoridades.indexOf(item.id) !== -1)
        .filter(i => i.autoridad.toUpperCase().indexOf(this.autoridad.toUpperCase()) !== -1);
    },
    autoridadesSIDJ() {
      return _.orderBy(this.$store.getters['autoridades/getAutoridadesAll']
        .filter(item => this.expediente.autoridades.includes(item.id))
        .map(i => ({
          ...i,
          autoridad: i.autoridad,
          autoridad_id: i.autoridad_id,
        }), ['created_at'], ['asc']));
    },
  },
  methods: {
    editarAutoridad(object) {
      this.showEditarAutoridades = true;
      this.objectSelected = object;
    },
    saveAutoridad(object) {
      const index = this.autoridadesTabla.findIndex(i => i.autoridad
        === this.objectSelected.autoridad);
      this.autoridadesTabla[index] = {
        autoridad: object,
        autoridad_id: null,
      };

      const indexF = this.formData.autoridades.findIndex(i => i.autoridad
        === this.objectSelected.autoridad);
      this.formData.autoridades[indexF] = {
        autoridad: object,
        autoridad_id: null,
      };

      this.tableKey += 1;
      this.objectSelected = '';
      this.showEditarAutoridades = false;
    },
    registroAutoridad(autoridad) {
      this.formData.autoridades.push({
        autoridad,
        autoridad_id: null,
      });
      this.autoridadesTabla.push({
        autoridad,
        autoridad_id: null,
      });
      this.tableKey += 1;
      this.showFormAutoridades = false;
      Notify.create({
        message: 'Autoridad agregada correctamente.',
        position: 'bottom',
      });
    },
    getLastIndex() {
      return this.autoridadesTabla.length;
    },
    updateStateByAutoridad(all = [], reg) {
      if (reg.autoridad === undefined) {
        return all;
      }
      const regExist = all.find(item => item.autoridad === reg.autoridad);
      if (!regExist) {
        return all.concat([reg]);
      }
      return all.map((item) => {
        if (item.autoridad !== reg.autoridad) {
          return item;
        }
        return {
          ...item,
          ...reg,
        };
      });
    },
    updateState(all = [], reg) {
      if (reg.id === undefined) {
        return all;
      }
      const regExist = all.find(item => item.id === reg.id);

      if (!regExist) {
        return all.concat([reg]);
      }
      return all.map((item) => {
        if (item.id !== reg.id) {
          return item;
        }
        return {
          ...item,
          ...reg,
        };
      });
    },
    regresar() {
      this.$emit('regresar', this.formData);
    },
    async generar() {
      if (this.formData.autoridades.length > 0) {
        this.$emit('guardar', this.formData);
        return Promise.resolve(true);
      }
      this.$swal({
        title: 'Al menos tiene que seleccionar a una autoridad.',
        icon: 'warning',
        target: document.getElementById('modal-autoridad'),
      });
      return Promise.resolve(true);
    },
    async registrar(object) {
      try {
        Loading.show();
        await this.$store.dispatch('expedientes/addExpedienteAutoridad', {
          principal: this.expediente.id,
          relacionado: object.id,
        });

        this.autoridadesTabla.push({
          ...object,
          autoridad: object.autoridad,
        });

        this.showForm = false;
        Notify.create({
          message: 'Autoridad registrada correctamente.',
          position: 'bottom',
        });
        Loading.hide();
        return Promise.resolve(true);
      } catch (e) {
        errors(e);
        Loading.hide();
        this.showForm = false;
        return Promise.reject(false);
      }
    },
    borrarRegistro(object) {
      this.$swal({
        title: '¿Está seguro de borrar la autoridad?',
        text: 'Esta cambio no se puede revertir',
        icon: 'warning',
        target: document.getElementById('modal-autoridad'),
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Borrar',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
      }).then(async (resp) => {
        if (resp.value) {
          const index = this.formData.autoridades
            .findIndex(item => item.autoridad === object.autoridad);

          this.formData.autoridades = this.formData.autoridades.slice(0, index)
            .concat(this.formData.autoridades.slice(index + 1));

          if (!object.autoridad_id) {
            const indexAutoridades = this.autoridadesTabla
              .findIndex(item => item.autoridad === object.autoridad);

            this.autoridadesTabla = this.autoridadesTabla.slice(0, indexAutoridades)
              .concat(this.autoridadesTabla.slice(indexAutoridades + 1));
          }
        }
        return Promise.resolve(true);
      });
    },
    closeForm() {
      this.showFormAutoridades = false;
      this.objectSelected = {};
    },
    closeEditarAutoridad() {
      this.showEditarAutoridades = false;
      this.objectSelected = {};
    },
    subir(row) {
      const index = this.autoridadesTabla.findIndex(i => i.autoridad === row.autoridad);

      [this.autoridadesTabla[index], this.autoridadesTabla[index - 1]] = [
        this.autoridadesTabla[index - 1], this.autoridadesTabla[index],
      ];
      [this.formData.autoridades[index], this.formData.autoridades[index - 1]] = [
        this.formData.autoridades[index - 1], this.formData.autoridades[index],
      ];

      this.tableKey += 1;
    },
    bajar(row) {
      const index = this.autoridadesTabla.findIndex(i => i.autoridad === row.autoridad);

      [this.autoridadesTabla[index], this.autoridadesTabla[index + 1]] = [
        this.autoridadesTabla[index + 1], this.autoridadesTabla[index],
      ];
      [this.formData.autoridades[index], this.formData.autoridades[index + 1]] = [
        this.formData.autoridades[index + 1], this.formData.autoridades[index],
      ];

      this.tableKey += 1;
    },
  },
};
</script>

<style>
input[type="checkbox"] {
  width: 1.3em;
  height: 1.3em;
}
tr{
  position:relative;
  transform: scale(1);
}
.flip-list-move {
  transition: transform 1s;
}
</style>
