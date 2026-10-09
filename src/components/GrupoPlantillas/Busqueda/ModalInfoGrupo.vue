<template>
  <q-card style="width: 1000px; max-width: 110vw;" id="modal-info">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Información carpeta</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="q-ma-sm">
        <div class="row q-ma-sm">
          <div class="col-md-4">
            Nombre carpeta: <br/>
            <strong>{{grupo.nombre}}</strong>
          </div>
          <div class="col-md-5">
            Propietario: <br/>
            <strong>{{usuario.nombre_completo.toUpperCase()}}</strong>
          </div>
          <div class="col-md-3">
            Modificado: <br/>
            <strong>{{grupo.updated_at | moment('DD MMM YYYY hh:mm:ss a')}}</strong>
          </div>
        </div>

        <div class="row q-ma-sm">
          <div class="col-md-4">
            Clasificación: <br/>
            <strong>{{clasificacion.label}}</strong>
          </div>
          <div class="col-md-8">
            Descripción: <br/>
            <strong>{{grupo.descripcion}}</strong>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-md-12">
            <q-table flat dense
              :data="grupo.permisos"
              :columns="columns"
              :pagination="pagination"
              :hide-pagination="true"
            >
              <template v-slot:top-left>
                <div class="titulo">Permisos</div>
              </template>

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="usuario" :props="props">
                    {{ getUsuario(props.row) }}
                  </q-td>
                  <q-td key="fecha_permiso" :props="props">
                    {{ props.row.fecha | moment('DD MMM YYYY hh:mm:ss a') }}
                  </q-td>
                  <q-td key="accion" :props="props">
                    <a href="#" class="q-mx-sm" v-if="isOwner"
                      @click.prevent="eliminar(props.row)"
                    >
                      <q-icon name="delete" color="black"
                        size="1.5em" clickable
                      />
                      <q-tooltip>Eliminar</q-tooltip>
                    </a>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
      </div>
    </q-card-section>

  </q-card>
</template>

<script>
import {
  QCard,
  QSpace,
  ClosePopup,
  QSeparator,
  QCardSection,
  Loading,
} from 'quasar';
import errors from 'boot/errors';

export default {
  name: 'modal-info-grupo',
  props: {
    grupo: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      pagination: {
        rowsPerPage: -1,
      },
      columns: [
        {
          name: 'usuario', label: 'Usuario', field: 'usuario', sortable: false, align: 'left', style: 'width: 45%',
        },
        {
          name: 'fecha_permiso', label: 'Fecha permiso', field: 'fecha_permiso', sortable: true, align: 'left', style: 'width: 45%',
        },
        {
          name: 'accion', label: '', field: 'accion', sortable: false, align: 'center', style: 'width: 10%',
        },
      ],
      clasificaciones: [
        {
          label: 'Acuerdos',
          value: 'acuerdos',
        },
        {
          label: 'Cédula de notificaciones',
          value: 'cedula',
        },
      ],
    };
  },
  components: {
    QCard,
    QSpace,
    QSeparator,
    QCardSection,
  },
  directives: {
    ClosePopup,
  },
  computed: {
    clasificacion() {
      return this.clasificaciones.find(i => i.value === this.grupo.clasificacion_id);
    },
    usuario() {
      return this.$store.getters['usuarios/getUsuarioByUsuarioId'](this.grupo.user_id);
    },
    session() {
      return this.$store.getters['session/getUsuario'];
    },
  },
  methods: {
    isOwner(row) {
      return row.user_id === this.session.user_id
        || this.session.permisos.roles.id.indexOf(1) !== -1;
    },
    getUsuario(row) {
      const usuario = this.$store.getters['usuarios/getUsuarioByUsuarioId'](row.user_id);
      return usuario?.nombre_completo.toUpperCase() ?? '--';
    },
    eliminar(userId) {
      this.$swal({
        title: '¿Está seguro de borrar el usuario?',
        text: 'Esta cambio no se podrá revertir',
        icon: 'warning',
        showCancelButton: true,
        target: '#modal-info',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Borrar',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.value) {
          Loading.show({
            message: 'Cargando...',
          });
          const index = this.grupo.permisos.findIndex(item => item.user_id === userId);

          this.grupo.permisos = this.grupo.permisos.slice(0, index)
            .concat(this.grupo.permisos.slice(index + 1));

          try {
            await this.$store.dispatch('gruposPlantillas/putGrupoPlantillas', {
              id: this.grupo.id,
              permisos: this.grupo.permisos,
            });
            Loading.hide();
            return Promise.resolve(true);
          } catch (err) {
            errors(err);
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
