<template>
  <q-card style="width: 900px; max-width: 90vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Permisos</div>
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
            label="Buscar usuario"
            class="q-ma-sm q-mx-md"
            v-model="usuario"
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

          <q-table flat dense v-if="!fetching"
            class="q-ma-sm"
            :data="usuarios"
            :columns="columns"
            :pagination="pagination"
            :hide-pagination="true"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="usuario" :props="props">
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
  name: 'form-permisos',
  props: {
    grupo: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      usuario: '',
      fetching: false,
      formData: {
        ...this.grupo,
      },
      pagination: {
        rowsPerPage: -1,
      },
      columns: [
        {
          name: 'usuario', label: 'Usuario', field: 'usuario', sortable: false, align: 'left', style: 'width: 90%',
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
    usuarios() {
      const seleccionados = this.grupo.permisos.map(item => item.user_id);
      const usuarios = this.$store.getters['usuarios/getUsuariosAll'].filter(
        i => i.localizacion.area_id === this.localizacion.area_id
        && i.nombre_completo.toUpperCase().indexOf(this.usuario.toUpperCase()) !== -1,
      ).filter(j => !seleccionados.includes(j.user_id));

      return _.orderBy(usuarios.map(item => ({
        label: item.nombre_completo.toUpperCase(),
        value: item.user_id,
      })), ['label', 'value']);
    },
  },
  methods: {
    async addUser(user) {
      this.fetching = true;

      if (this.formData.permisos.findIndex(x => x.user_id === user.value) === -1) {
        this.formData.permisos.push({
          fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
          user_id: user.value,
        });

        try {
          await this.$store.dispatch('gruposPlantillas/putGrupoPlantillas', {
            id: this.formData.id,
            permisos: this.formData.permisos,
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
        message: 'Ya existe usuario.',
        position: 'bottom',
      });
      return Promise.resolve(true);
    },
  },
};
</script>
