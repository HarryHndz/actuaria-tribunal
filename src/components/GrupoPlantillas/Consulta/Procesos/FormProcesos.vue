<template>
  <q-card style="width: 900px; max-width: 90vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Procesos</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="row">
        <div class="col-md-12 col-xs-12">
          <q-input
            outlined
            autofocus
            stack-label
            label="Buscar proceso"
            class="q-ma-sm q-mx-md"
            v-model="proceso"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 col-xs-12">
          <div class="x_content text-center" v-if="fetching">
            <q-spinner class="q-ma-xl"
              color="black"
              size="4em"
              :thickness="5"
            />
          </div>

          <!-- <table class="q-table bordered striped-odd q-pa-lg" v-if="!fetching">
            <thead>
              <tr>
                <th>Proceso</th>
                <th width="10%"></th>
              </tr>
            </thead>
            <tbody>
              <template v-if="procesos.length == 0">
                <tr>
                  <td class="text-center" colspan="8">No hay coincidencias.</td>
                </tr>
              </template>
              <template v-if="procesos.length > 0">
                <tr v-for="item in procesos"
                  :key="item.id"
                >
                  <td>{{item.label}}</td>
                  <td>
                    <a href="#"
                      @click.prevent="addUser(item)"
                    >
                      <q-icon name="add_box"
                        size="1.4em"
                        color="black"
                      ></q-icon>
                    </a>
                  </td>
                </tr>
              </template>
            </tbody>
          </table> -->

          <q-table flat dense v-if="!fetching"
            class="q-ma-sm"
            :data="procesos"
            :columns="columns"
            :pagination="pagination"
            :hide-pagination="true"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="proceso" :props="props">
                  {{ props.row.label }}
                </q-td>
                <q-td key="accion" :props="props">
                  <a href="#"
                    @click.prevent="addUser(props.row)"
                  >
                    <q-icon name="add_box"
                      size="1.4em"
                      color="black"
                    ></q-icon>
                  </a>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {
  QBtn,
  QCard,
  QSpace,
  Notify,
  QInput,
  QSpinner,
  QSeparator,
  ClosePopup,
  QCardSection,
} from 'quasar';

import _ from 'lodash';
import moment from 'moment';

import errors from 'boot/errors';

export default {
  name: 'form-procesos',
  props: {
    grupo: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      proceso: '',
      fetching: false,
      formData: {
        ...this.grupo,
      },
      pagination: {
        rowsPerPage: -1,
      },
      columns: [
        {
          name: 'proceso', label: 'Proceso', field: 'proceso', sortable: false, align: 'left', style: 'width: 90%',
        },
        {
          name: 'accion', label: '', field: 'accion', sortable: false, align: 'center', style: 'width: 10%',
        },
      ],
    };
  },
  directives: {
    ClosePopup,
  },
  plugins: {
    Notify,
  },
  components: {
    QBtn,
    QCard,
    QInput,
    QSpace,
    QSpinner,
    QSeparator,
    QCardSection,
  },
  computed: {
    session() {
      return this.$store.getters['session/getUsuario'];
    },
    localizacion() {
      return this.$store.getters['session/getLocalizacion'];
    },
    procesos() {
      const seleccionados = this.grupo.procesos.map(item => item.id);
      const procesos = this.$store.getters['procesos/getProcesosAll'].filter(
        i => i.isproceso === true
        && i.descripcion.toUpperCase().indexOf(this.proceso.toUpperCase()) !== -1,
      ).filter(j => !seleccionados.includes(j.proceso_id));

      return _.orderBy(procesos.map(item => ({
        label: item.descripcion.toUpperCase(),
        value: item.proceso_id,
      })), ['label', 'value']);
    },
  },
  methods: {
    async addUser(user) {
      this.fetching = true;

      if (this.formData.procesos.findIndex(x => x.id === user.value) === -1) {
        this.formData.procesos.push({
          fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
          id: user.value,
        });

        try {
          await this.$store.dispatch('gruposPlantillas/putGrupoPlantillas', {
            id: this.formData.id,
            procesos: this.formData.procesos,
          });
          this.fetching = false;
          this.$emit('cerrar');
          Notify.create({
            message: 'Registro actualizado exitosamente.',
            position: 'bottom',
          });
          return Promise.resolve(true);
        } catch (e) {
          errors(e);
          this.$emit('cerrar');
          this.fetching = false;
          return Promise.reject(true);
        }
      }
      this.$emit('cerrar');
      this.fetching = false;
      Notify.create({
        message: 'Ya existe proceso.',
        position: 'bottom',
      });
      return Promise.resolve(true);
    },
  },
};
</script>
