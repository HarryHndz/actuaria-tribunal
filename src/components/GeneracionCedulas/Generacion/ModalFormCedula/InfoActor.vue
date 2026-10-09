<template>
  <div id="modal-actor">
    <div class="row">
      <div class="col-md-12 col-xs-12">
        <q-table flat dense
          :key="tableKey"
          class="q-mx-sm q-mb-sm"
          :data="actoresTabla"
          :columns="columns"
          :pagination="pagination"
          :hide-pagination="true"
        >
          <template v-slot:top-left>
            <div class="titulo">Actores</div>
          </template>

          <template v-slot:top-right>
            <q-btn class="q-mx-lg q-ma-sm"
              color="warning"
              icon="add"
              label="Actor"
              @click.prevent="showForm = true"
            />
          </template>

          <template v-slot:body="props">
            <q-tr v-ripple :props="props">
              <q-td key="no" :props="props">
                {{ ++props.rowIndex }}
              </q-td>
              <q-td key="actor" :props="props">
                {{ props.row.actor }}
              </q-td>
              <q-td key="seleccion" :props="props">
                <a href="#" v-if="props.row.actor_id">
                  <input type="checkbox"
                    class="puntero"
                    style="color: green;"
                    v-model="formData.actores"
                    :value="{
                      actor: props.row.actor,
                      actor_id: props.row.actor_id,
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
                <a href="#" v-if="!props.row.actor_id"
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
        <q-btn class="q-ma-sm q-mx-lg"
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
          label="Guardar"
          :loading="fetchingSave"
        />
      </div>
    </q-stepper-navigation>

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
  Notify,
  QDialog,
  Loading,
  QStepperNavigation,
} from 'quasar';

import _ from 'lodash';

import errors from 'boot/errors';

import FormActor from 'components/ExpedienteConsulta/Consulta/Actores/FormActor';

export default {
  name: 'info-actor',
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
      actor: '',
      tableKey: 1,
      showForm: false,
      objectSelected: null,
      actoresTabla: [],
      formData: {
        actores: [],
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
          name: 'actor', label: 'Nombre', field: 'actor', sortable: false, align: 'left', style: 'width: 75%',
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
    FormActor,
    QStepperNavigation,
  },
  beforeMount() {
    this.formData.actores.forEach((i) => {
      this.actoresTabla = this.updateStateByActor(this.actoresTabla, i);
    });
    this.actoresSIDJ.forEach((i) => {
      this.actoresTabla = this.updateStateByActor(this.actoresTabla, i);
    });
  },
  computed: {
    actoresSIDJ() {
      return _.orderBy(this.$store.getters['actores/getActoresAll']
        .filter(item => this.expediente.actores.includes(item.id))
        .map((i) => {
          if (i.tipo_persona_id === 2) {
            return {
              ...i,
              actor: i.razonsocial,
            };
          }
          return {
            ...i,
            actor: `${i.nombre} ${i.apellidopaterno} ${i.apellidomaterno}`,
          };
        }), ['created_at'], ['asc']);
    },
  },
  methods: {
    getLastIndex() {
      return this.actoresTabla.length;
    },
    updateStateByActor(all = [], reg) {
      if (reg.actor === undefined) {
        return all;
      }
      const regExist = all.find(item => item.actor === reg.actor);
      if (!regExist) {
        return all.concat([reg]);
      }
      return all.map((item) => {
        if (item.actor !== reg.actor) {
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
      if (this.formData.actores.length > 0) {
        this.$emit('guardar', this.formData);
        return Promise.resolve(true);
      }
      this.$swal({
        title: 'Al menos tiene que seleccionar a un actor.',
        icon: 'warning',
        target: document.getElementById('modal-actor'),
      });
      return Promise.resolve(true);
    },
    editar(object) {
      const label = object.tipo_persona_id === 2
        ? object.razonsocial
        : `${object.nombre} ${object.apellidopaterno} ${object.apellidomaterno ?? ''}`;

      const actor = {
        ...object,
        actor: label,
      };

      const index = this.formData.actores.findIndex(item => item.actor_id === actor.actor_id);
      const indexTabla = this.actoresTabla.findIndex(item => item.actor_id === actor.actor_id);

      if (index) {
        this.formData.actores[index] = {
          actor: actor.actor,
          actor_id: actor.actor_id,
        };
      }

      if (indexTabla) {
        this.actoresTabla[indexTabla] = actor;
      }

      Notify.create({
        message: 'Actor actualizado correctamente.',
        position: 'bottom',
      });

      this.tableKey += 1;
      this.closeForm();
    },
    async registrar(object) {
      try {
        Loading.show();
        await this.$store.dispatch('expedientes/addExpedienteActor', {
          principal: this.expediente.id,
          relacionado: object.id,
        });

        const actor = object.tipo_persona_id === 2
          ? object.razonsocial
          : `${object.nombre} ${object.apellidopaterno} ${object.apellidomaterno ?? ''}`;

        this.actoresTabla.push({
          ...object,
          actor,
        });

        if (this.objectSelected) {
          const indexTabla = this.actoresTabla
            .findIndex(item => item.actor === this.objectSelected.nombre);

          const index = this.formData.actores
            .findIndex(item => item.actor === this.objectSelected.nombre);

          this.actoresTabla = this.actoresTabla.slice(0, indexTabla)
            .concat(this.actoresTabla.slice(indexTabla + 1));

          this.formData.actores = this.formData.actores.slice(0, index)
            .concat(this.formData.actores.slice(index + 1));

          this.formData.actores = this.updateStateByActor(this.formData.actores, {
            actor_id: object.actor_id,
            actor,
          });
        }

        Notify.create({
          message: 'Actor registrado correctamente.',
          position: 'bottom',
        });

        Loading.hide();
        this.closeForm();
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
        title: '¿Está seguro de borrar el actor?',
        text: 'Esta cambio no se puede revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Borrar',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        target: document.getElementById('modal-actor'),
      }).then((resp) => {
        if (resp.value) {
          const index = this.formData.actores.findIndex(item => item.actor === object.actor);

          this.formData.actores = this.formData.actores.slice(0, index)
            .concat(this.formData.actores.slice(index + 1));

          if (!object.actor_id) {
            const indexActores = this.actoresTabla.findIndex(item => item.actor === object.actor);

            this.actoresTabla = this.actoresTabla.slice(0, indexActores)
              .concat(this.actoresTabla.slice(indexActores + 1));
          }
        }
        return Promise.resolve(true);
      });
    },
    openEditar(object) {
      if (!object.id) {
        this.objectSelected = {
          es_publico: true,
          tipo_persona_id: 1,
          nombre: object.actor,
        };
      } else {
        this.objectSelected = object;
      }
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
      this.objectSelected = null;
    },
    subir(row) {
      const index = this.actoresTabla.findIndex(i => i.actor === row.actor);

      [this.actoresTabla[index], this.actoresTabla[index - 1]] = [
        this.actoresTabla[index - 1], this.actoresTabla[index],
      ];
      [this.formData.actores[index], this.formData.actores[index - 1]] = [
        this.formData.actores[index - 1], this.formData.actores[index],
      ];

      this.tableKey += 1;
    },
    bajar(row) {
      const index = this.actoresTabla.findIndex(i => i.actor === row.actor);

      [this.actoresTabla[index], this.actoresTabla[index + 1]] = [
        this.actoresTabla[index + 1], this.actoresTabla[index],
      ];
      [this.formData.actores[index], this.formData.actores[index + 1]] = [
        this.formData.actores[index + 1], this.formData.actores[index],
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
  accent-color: green;
}
tr{
  position:relative;
  transform: scale(1);
}
</style>
