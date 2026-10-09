<template>
  <div id="modal-tercero">
    <div class="row">
      <div class="col-md-12 col-xs-12">
        <q-table flat dense
          :key="tableKey"
          class="q-mx-sm q-mb-sm"
          :data="tercerosTabla"
          :columns="columns"
          :pagination="pagination"
          :hide-pagination="true"
        >
          <template v-slot:top-left>
            <div class="titulo">Terceros interesados</div>
          </template>

          <template v-slot:top-right>
            <q-btn class="q-mx-lg q-ma-sm"
              color="warning"
              icon="add"
              label="Tercero"
              @click.prevent="showForm = true"
            />
          </template>

          <template v-slot:body="props">
            <q-tr v-ripple :props="props">
              <q-td key="no" :props="props">
                {{ ++props.rowIndex }}
              </q-td>
              <q-td key="tercero" :props="props">
                {{ props.row.tercero }}
              </q-td>
              <q-td key="seleccion" :props="props">
                <a href="#" v-if="props.row.tercero_id">
                  <input type="checkbox"
                    class="puntero"
                    v-model="formData.terceros"
                    :value="{
                      tercero: props.row.tercero,
                      tercero_id: props.row.tercero_id,
                    }"
                  />
                </a>
                <q-icon v-else name="check_circle_outline" size="1.5em" color="green"/>
              </q-td>
              <q-td key="accion" :props="props">
                <a href="#" class="q-mx-sm"
                  @click.prevent="openEditar(props.row)"
                >
                  <q-icon name="edit" color="black" size="1.4em"/>
                  <q-tooltip>Editar</q-tooltip>
                </a>
                <a href="#" v-if="!props.row.tercero_id"
                  class="q-mx-sm"
                  @click.prevent="borrarRegistro(props.row)"
                >
                  <q-icon name="delete" color="black" size="1.3em"/>
                  <q-tooltip>Borrar</q-tooltip>
                </a>
                <a v-else class="q-mx-md">
                  <q-icon name="remove" color="black" size=".1em"/>
                </a>

                <a href="#" v-if="props.rowIndex !== 1"
                  class="q-mx-sm"
                  @click.prevent="subir(props.row)"
                >
                  <q-icon name="expand_less" color="black" size="2em"/>
                  <q-tooltip>Subir</q-tooltip>
                </a>
                <a v-else class="q-mx-md">
                  <q-icon name="remove" color="black" size=".7em"/>
                </a>
                <a href="#" v-if="getLastIndex() !== props.rowIndex"
                  class="q-mx-sm"
                  @click.prevent="bajar(props.row)"
                >
                  <q-icon name="expand_more" color="black" size="2em"/>
                  <q-tooltip>Bajar</q-tooltip>
                </a>
                <a v-else class="q-mx-md">
                  <q-icon name="remove" color="black" size=".7em"/>
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
        <q-btn class="q-ma-sm q-mx-lg "
          color="pink-10"
          icon="arrow_back"
          @click="regresar"
          label="Regresar"
          :disable="fetchingSave"
        />
      </div>
      <div class="text-right col-md-6">
        <q-btn class="q-ma-sm q-mx-lg "
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
      @hide="closeForm"
    >
      <form-tercero v-if="showForm"
        :tercero="objectSelected"
        @registrar="registrar"
        @editar="editar"
        @close="closeForm"
      ></form-tercero>
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

import FormTercero from 'components/ExpedienteConsulta/Consulta/Terceros/FormTercero';

export default {
  name: 'info-tercero',
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
      tercero: '',
      tableKey: 1,
      showForm: false,
      objectSelected: null,
      tercerosTabla: [],
      formData: {
        terceros: [],
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
          name: 'tercero', label: 'Nombre', field: 'tercero', sortable: false, align: 'left', style: 'width: 75%',
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
    FormTercero,
    QStepperNavigation,
  },
  beforeMount() {
    this.formData.terceros.forEach((i) => {
      this.tercerosTabla = this.updateStateByTercero(this.tercerosTabla, i);
    });
    this.tercerosSIDJ.forEach((i) => {
      this.tercerosTabla = this.updateStateByTercero(this.tercerosTabla, i);
    });
  },
  computed: {
    tercerosSIDJ() {
      return _.orderBy(this.$store.getters['terceros/getTercerosAll']
        .filter(item => this.expediente.terceros_perjudicados.includes(item.id))
        .map((i) => {
          if (i.tipo_persona_id === 2) {
            return {
              ...i,
              tercero: i.razonsocial,
            };
          }
          return {
            ...i,
            tercero: `${i.nombre} ${i.apellidopaterno} ${i.apellidomaterno}`,
          };
        }), ['created_at'], ['asc']);
    },
  },
  methods: {
    getLastIndex() {
      return this.tercerosTabla.length;
    },
    updateStateByTercero(all = [], reg) {
      if (reg.tercero === undefined) {
        return all;
      }
      const regExist = all.find(item => item.tercero === reg.tercero);
      if (!regExist) {
        return all.concat([reg]);
      }
      return all.map((item) => {
        if (item.tercero !== reg.tercero) {
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
    generar() {
      if (this.formData.terceros.length > 0) {
        this.$emit('guardar', this.formData);
        return Promise.resolve(true);
      }
      this.$swal({
        title: 'Al menos tiene que seleccionar a un tercero.',
        icon: 'warning',
        target: document.getElementById('modal-tercero'),
      });
      return Promise.resolve(true);
    },
    closeForm() {
      this.objectSelected = null;
      this.showForm = false;
    },
    openEditar(object) {
      if (!object.id) {
        this.objectSelected = {
          es_publico: true,
          tipo_persona_id: 1,
          nombre: object.tercero,
        };
      } else {
        this.objectSelected = object;
      }
      this.showForm = true;
    },
    editar(object) {
      const label = object.tipo_persona_id === 2
        ? object.razonsocial
        : `${object.nombre} ${object.apellidopaterno} ${object.apellidomaterno ?? ''}`;

      const tercero = {
        ...object,
        tercero: label,
      };

      const index = this.formData.terceros
        .findIndex(item => item.tercero_id === tercero.tercero_id);
      const indexTabla = this.tercerosTabla
        .findIndex(item => item.tercero_id === tercero.tercero_id);

      if (index) {
        this.formData.terceros[index] = {
          tercero: tercero.tercero,
          tercero_id: tercero.tercero_id,
        };
      }

      if (indexTabla) {
        this.tercerosTabla[indexTabla] = tercero;
      }

      Notify.create({
        message: 'Tercero interesado actualizado correctamente.',
        position: 'bottom',
      });

      this.tableKey += 1;
      this.closeForm();
    },
    async registrar(object) {
      try {
        Loading.show();
        await this.$store.dispatch('expedientes/addExpedienteTercero', {
          principal: this.expediente.id,
          relacionado: object.id,
        });

        const tercero = object.tipo_persona_id === 2
          ? object.razonsocial
          : `${object.nombre} ${object.apellidopaterno} ${object.apellidomaterno ?? ''}`;

        this.tercerosTabla.push({
          ...object,
          tercero,
        });

        if (this.objectSelected) {
          const indexTabla = this.tercerosTabla
            .findIndex(item => item.tercero === this.objectSelected.nombre);

          const index = this.formData.terceros
            .findIndex(item => item.tercero === this.objectSelected.nombre);

          this.tercerosTabla = this.tercerosTabla.slice(0, indexTabla)
            .concat(this.tercerosTabla.slice(indexTabla + 1));

          this.formData.terceros = this.formData.terceros.slice(0, index)
            .concat(this.formData.terceros.slice(index + 1));

          this.formData.terceros = this.updateStateByTercero(this.formData.terceros, {
            tercero_id: object.tercero_id,
            tercero,
          });
        }

        Notify.create({
          message: 'Tercero interesado registrado correctamente.',
          position: 'bottom',
        });
        this.closeForm();
        Loading.hide();
        return Promise.resolve(true);
      } catch (e) {
        errors(e);
        Loading.hide();
        this.closeForm();
        return Promise.reject(false);
      }
    },
    borrarRegistro(object) {
      this.$swal({
        title: '¿Está seguro de borrar el tercero interesado?',
        text: 'Esta cambio no se puede revertir',
        icon: 'warning',
        target: document.getElementById('modal-tercero'),
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Borrar',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
      }).then(async (resp) => {
        if (resp.value) {
          const index = this.formData.terceros.findIndex(item => item.tercero === object.tercero);

          this.formData.terceros = this.formData.terceros.slice(0, index)
            .concat(this.formData.terceros.slice(index + 1));

          if (!object.tercero_id) {
            const indexTerceros = this.tercerosTabla
              .findIndex(item => item.tercero === object.tercero);

            this.tercerosTabla = this.tercerosTabla.slice(0, indexTerceros)
              .concat(this.tercerosTabla.slice(indexTerceros + 1));
          }
        }
        return Promise.resolve(true);
      });
    },
    subir(row) {
      const index = this.tercerosTabla.findIndex(i => i.tercero === row.tercero);

      [this.tercerosTabla[index], this.tercerosTabla[index - 1]] = [
        this.tercerosTabla[index - 1], this.tercerosTabla[index],
      ];
      [this.formData.terceros[index], this.formData.terceros[index - 1]] = [
        this.formData.terceros[index - 1], this.formData.terceros[index],
      ];

      this.tableKey += 1;
    },
    bajar(row) {
      const index = this.tercerosTabla.findIndex(i => i.tercero === row.tercero);

      [this.tercerosTabla[index], this.tercerosTabla[index + 1]] = [
        this.tercerosTabla[index + 1], this.tercerosTabla[index],
      ];
      [this.formData.terceros[index], this.formData.terceros[index + 1]] = [
        this.formData.terceros[index + 1], this.formData.terceros[index],
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
