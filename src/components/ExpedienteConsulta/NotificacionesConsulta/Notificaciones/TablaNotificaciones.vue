<template>
  <div class="q-ma-md">
    <q-table flat dense
      hide-pagination
      title="Notificaciones"
      class="q-pb-sm q-mb-md"
      :columns="columns"
      :data="notificaciones"
      :pagination="pagination"
      :visible-columns="visibleColumns"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="folio" :props="props">
            {{ props.row.no_folio }}
          </q-td>
          <q-td key="tipo_notificacion" :props="props">
            {{ getTipoNotificacion(props.row) }}
          </q-td>
          <q-td key="fecha_elaboracion" :props="props">
            {{ props.row.fecha_elaboracion | moment('DD MMM YYYY') }}
          </q-td>
          <q-td key="fecha_notificacion" :props="props">
            {{ props.row.fecha_notificacion | moment('DD MMM YYYY') }}
          </q-td>
          <q-td key="notificados" :props="props">
            {{ props.row.notificados }}
          </q-td>
          <q-td key="relacionado" :props="props">
            {{ getRelacionado(props.row) }}
          </q-td>
          <q-td key="accion" :props="props">
            <span class="cursor-pointer q-mr-sm"
              @click.prevent="openModalPdf(props.row)"
            >
              <q-icon name="visibility" color="black" size="1.3em"/>
              <q-tooltip>Visualizar</q-tooltip>
            </span>
            <span class="cursor-pointer q-mx-sm"
              @click.prevent="imprimir(props.row)"
            >
              <q-icon name="print" color="black" size="1.3em"/>
              <q-tooltip>Imprimir</q-tooltip>
            </span>
            <span class="cursor-pointer q-mx-sm"
              v-if="!notificacionGeneradaAt"
              @click.prevent="openModalNotificacionEditar(props.row)"
            >
              <q-icon name="edit" color="black" size="1.3em"/>
              <q-tooltip>Editar</q-tooltip>
            </span>
            <q-btn size="1em" flat dense round icon="more_vert" color="text-grey-8">
              <q-menu auto-close
                transition-show="scale"
                transition-hide="scale"
              >
                <q-list style="min-width: 200px">
                  <q-item clickable>
                    <q-item-section
                      @click.prevent="downloadDocumento(props.row)"
                    >
                      <div>
                        <q-icon name="get_app" color="black" size="1.5em"/>
                        <span class="q-ml-sm text-subtitle2">
                          Descargar original
                        </span>
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section v-if="!notificacionGeneradaAt"
                      @click.prevent="deleteNotificacion(props.row)"
                    >
                      <div>
                        <q-icon name="delete" color="black" size="1.5em"/>
                        <span class="q-ml-sm text-subtitle2">
                          Borrar
                        </span>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
              <q-tooltip anchor="top middle" self="center middle">
                Mas opciones
              </q-tooltip>
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog
      full-height
      v-model="previsualizarPdf"
      @hide="closeModalPdf"
    >
      <modal-pdf
        v-if="previsualizarPdf"
        :base64="base64"
        :nombreDocumento="nombreNotificacion"
        :fetchingDocumento="fetchingNotificacion"
        :errorB64="errorB64"
        @close="closeModalPdf"
      >
      </modal-pdf>
    </q-dialog>
  </div>
</template>

<script>
import {
  Notify,
  QDialog,
  ClosePopup,
  Loading,
  QItem,
} from 'quasar';

import _ from 'lodash';
import moment from 'moment';
import printJS from 'print-js';

import errors from 'boot/errors';
import sidjbridge from 'boot/sidjbridge';

import ModalPdf from 'components/Generales/ModalPdf';

const sweetAlertConfig = {
  title: '¿Está seguro de borrar la notificación?',
  text: 'Esta cambio no se podrá revertir',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  confirmButtonText: 'Borrar',
  cancelButtonColor: '#d33',
  cancelButtonText: 'Cancelar',
};

export default {
  name: 'tabla-notificaciones',
  props: {
    expediente: {
      required: true,
      type: Object,
    },
    notificaciones: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      showModalN: false,
      previsualizarPdf: null,
      nombreNotificacion: null,
      fetchingNotificacion: null,
      base64: null,
      errorB64: null,
      notificacion: null,
      columns: [
        {
          name: 'created_at',
          field: 'created_at',
          align: 'left',
        },
        {
          name: 'folio',
          label: 'Folio',
          field: 'folio',
          align: 'left',
          style: 'width: 9%',
          classes: 'text-weight-bold',
        },
        {
          name: 'tipo_notificacion',
          label: 'Tipo de notificación',
          field: 'tipo_notificacion',
          align: 'left',
          style: 'width: 25%',
        },
        {
          name: 'fecha_elaboracion',
          label: 'Fecha de elaboración',
          field: 'fecha_elaboracion',
          sortable: true,
          align: 'center',
          style: 'width: 11%',
          classes: 'text-weight-bold',
        },
        {
          name: 'fecha_notificacion',
          label: 'Fecha de notificación',
          field: 'fecha_notificacion',
          sortable: true,
          align: 'center',
          style: 'width: 11%',
        },
        {
          name: 'notificados',
          label: 'Notificados',
          field: 'notificados',
          align: 'center',
          style: 'width: 5%',
        },
        {
          name: 'relacionado',
          label: 'Notificados',
          field: 'relacionado',
          align: 'left',
          style: 'width: 26%',
          classes: 'text-weight-bold',
        },
        {
          name: 'accion',
          label: 'Acciones',
          field: 'accion',
          align: 'center',
          style: 'width: 13%',
        },
      ],
      visibleColumns: ['folio', 'tipo_notificacion', 'fecha_elaboracion', 'fecha_notificacion', 'notificados', 'relacionado', 'accion'],
      pagination: {
        sortBy: 'created_at',
        descending: false,
        rowsPerPage: -1,
      },
    };
  },
  directives: {
    ClosePopup,
  },
  components: {
    QItem,
    QDialog,
    ModalPdf,
  },
  computed: {
    actores() {
      return this.$store.getters['actores/getActoresAll'].filter(item => this.expediente.actores.includes(item.id));
    },
    autoridades() {
      return this.$store.getters['autoridades/getAutoridadesAll'].filter(item => this.expediente.autoridades.includes(item.id));
    },
    autoridadesSub() {
      if (!this.expediente.autoridades_substanciadoras) {
        return [];
      }

      const autoriadesIds = this.expediente.autoridades_substanciadoras
        .map(i => i.id);

      const autoridades = this.$store.getters['autoridades/getAutoridadesAll']
        .filter(item => autoriadesIds.includes(item.autoridad_id));

      return _.sortBy(autoridades, item => item.created_at);
    },
    terceros() {
      return this.$store.getters['terceros/getTercerosAll'].filter(item => this.expediente.terceros_perjudicados.includes(item.id));
    },
    notificacionGeneradaAt() {
      return this.notificacion?.boletin?.notificacion_generada_at ?? false;
    },
    tipoNotificacion() {
      return this.$store.getters['tiposNotificaciones/getTipoNotificacionByTipoNotificacionId'](this.notificacion.tipo_id);
    },
    fechaElaboracion() {
      return this.notificacion.fecha_elaboracion ? moment(this.notificacion.fecha_elaboracion).format('MMM D YYYY') : '-';
    },
  },
  methods: {
    getRelacionado(row) {
      if (row.actor_id) {
        const actor = this.actores.find(i => i.actor_id === row.actor_id);
        return actor ? actor.nombre_completo : '-';
      }
      if (row.autoridad_id) {
        const autoridad = this.autoridades.find(i => i.autoridad_id === row.autoridad_id);
        return autoridad ? autoridad.autoridad : '-';
      }
      if (row.tercero_id) {
        const tercero = this.terceros.find(i => i.tercero_id === row.tercero_id);
        return tercero ? tercero.nombre_completo : '-';
      }
      if (row.autoridad_substanciadora_id) {
        const autoridad = this.autoridadesSub
          .find(i => i.autoridad_id === row.autoridad_substanciadora_id);
        return autoridad ? autoridad.autoridad : '-';
      }
      return 'NA';
    },
    getTipoNotificacion(row) {
      const tipo = this.$store.getters['tiposNotificaciones/getTipoNotificacionByTipoNotificacionId'](row.tipo_id);
      return tipo?.descripcion ?? null;
    },
    deleteNotificacion(notificacion) {
      this.$swal(sweetAlertConfig).then(async (result) => {
        if (result.value) {
          try {
            await this.$store.dispatch('notificaciones/deleteNotificacion', notificacion);
            Notify.create({
              message: 'Notificación borrada correctamente.',
              position: 'bottom',
            });
            return Promise.resolve(true);
          } catch (e) {
            Notify.create({
              message: 'Ocurrió un error, intentalo mas tarde...',
              position: 'bottom',
            });
            return Promise.reject(false);
          }
        }
        return Promise.resolve(true);
      });
    },
    openModalNotificacionEditar(notificacion) {
      this.$emit('openModalNotificacionEditar', notificacion);
    },
    downloadDocumento(row) {
      window.open(
        `${window.location.protocol}//${window.location.host}/descargas/notificaciones/${row.id}`,
        '_blank',
      );
    },
    closeModalPdf() {
      this.previsualizarPdf = false;
      this.nombreNotificacion = '';
      this.fetchingNotificacion = false;
      this.base64 = '';
      this.notificacion = null;
    },
    async openModalPdf(notificacion) {
      this.notificacion = notificacion;
      this.fetchingNotificacion = true;
      this.previsualizarPdf = true;
      this.nombreNotificacion = `${this.tipoNotificacion.descripcion} \u00A0 ${this.fechaElaboracion}`;

      try {
        const response = await sidjbridge.get(`/descargas/notificaciones/${notificacion.id}/base64`);
        this.fetchingNotificacion = false;
        this.base64 = response.data;
        return Promise.resolve(true);
      } catch (e) {
        errors(e);
        this.base64 = '';
        this.errorB64 = e;
        this.fetchingNotificacion = false;
        return Promise.reject(true);
      }
    },
    async imprimir(notificacion) {
      Loading.show({
        message: 'Cargando...',
      });

      try {
        const response = await sidjbridge.get(`/descargas/notificaciones/${notificacion.id}/base64`);
        if (response.data) {
          printJS({ printable: response.data, type: 'pdf', base64: true });
        } else {
          this.$swal({
            icon: 'error',
            title: 'Error',
            text: 'Archivo no encontrado',
          });
        }
        Loading.hide();
        return Promise.resolve(true);
      } catch (e) {
        errors(e);
        Loading.hide();
        return Promise.reject(true);
      }
    },
  },
};
</script>

<style>
table{
  border-color: black;
}
.q-table tbody td {
  white-space: normal;
}
</style>
