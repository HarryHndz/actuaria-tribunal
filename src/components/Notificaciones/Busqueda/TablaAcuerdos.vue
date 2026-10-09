<template>
  <div class="q-ma-sm q-mx-md">
    <q-table class="q-ma-sm"
      row-key="id"
      :data="resultados"
      :columns="columns"
      hide-pagination
      :pagination="pagination"
      :expanded.sync="expanded"
    >
      <template v-slot:top-left>
        <div class="text-h6 text-weight-bold">Acuerdos</div>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
         <q-td key="proceso" :props="props">
            {{ getProceso(props.row) }} <br/>
            {{ props.row.expediente.nojuicio }}
          </q-td>
          <q-td key="tipo_acuerdo" :props="props"
            class="cursor-pointer"
            @click.prevent="props.expand = !props.expand"
          >
            {{ props.row.tipo_de_acuerdo.descripcion }} <br/>
            <div class="text-weight-bold">
              {{ props.row.acuerdo.no_folio }}
            </div>
          </q-td>
          <q-td key="notifiquese" :props="props"
            class="cursor-pointer"
            @click.prevent="props.expand = !props.expand"
          >
            {{ props.row.acuerdos_notifiquese.descripcion }}
          </q-td>
          <q-td key="fecha_elaboracion" :props="props"
            class="cursor-pointer"
            @click.prevent="props.expand = !props.expand"
          >
            {{ props.row.acuerdo.fecha_elaboracion | moment('DD MMM YYYY') }}
          </q-td>
          <q-td key="acciones" :props="props">
            <a href="#"
              class="q-mx-sm"
              @click.prevent="openModalPdf(props.row)"
            >
              <q-icon name="visibility" color="black" size="1.3em"/>
              <q-tooltip>Visualizar</q-tooltip>
            </a>

            <a href="#"
              class="q-mx-sm"
              @click.prevent="imprimir(props.row)"
            >
              <q-icon name="print" color="black" size="1.3em"/>
              <q-tooltip>Imprimir</q-tooltip>
            </a>

            <a href="#"
              class="q-mx-sm"
              @click.prevent="descargar(props.row)"
            >
              <q-icon name="get_app" color="black" size="1.3em"/>
              <q-tooltip>Descargar</q-tooltip>
            </a>

            <a href="#"
              class="q-mx-sm"
              @click.prevent="openModalInfoAcuerdo(props.row)"
            >
              <q-icon name="info" color="black" size="1.3em"/>
              <q-tooltip>Información</q-tooltip>
            </a>
            <a href="#"
              class="q-mx-sm"
              @click.prevent="props.expand = !props.expand"
            >
              <q-icon :name="props.expand ? 'remove' : 'note_add'" size="1.3em" color="black"/>
              <q-tooltip>Notificaciones</q-tooltip>
            </a>
            <a href="#"
              class="q-mx-sm"
              @click.prevent="openModalNotificados(props.row)"
            >
              <q-icon name="add_circle_outline" size="1.5em" color="black"/>
              <q-tooltip>Registrar notificación</q-tooltip>
            </a>
          </q-td>
        </q-tr>
        <transition
          appear
          enter-active-class="animated fadeInDown slow"
          leave-active-class="animated fadeOutUp slow"
        >
          <q-tr v-if="props.expand" :props="props" class="bg-grey-4">
            <q-td colspan="100%">
              <q-table
                class="q-ma-lg"
                hide-pagination
                :pagination="pagination"
                :data="props.row.notificaciones"
                :columns="columnsNotificaciones"
                :visible-columns="visibleColumns"
              >
                <template v-slot:top-left>
                  <div class="text-h6 text-weight-bold">Notificaciones</div>
                </template>

                <template v-slot:body="propsN">
                  <q-tr :props="propsN">
                    <q-td key="no_folio" :props="propsN">
                      {{ propsN.row.no_folio }}
                    </q-td>
                    <q-td key="tipo_notificacion" :props="propsN">
                      {{ getTipoNotificacion(propsN.row) }}
                    </q-td>
                    <q-td key="fecha_elaboracion" :props="propsN">
                      {{ propsN.row.fecha_elaboracion | moment('DD MMM YYYY') }}
                    </q-td>
                    <q-td key="fecha_notificacion" :props="propsN">
                      {{ propsN.row.fecha_notificacion | moment('DD MMM YYYY') }}
                    </q-td>
                    <q-td key="notificados" :props="propsN">
                      {{ propsN.row.notificados }}
                    </q-td>
                    <q-td key="relacionado" :props="propsN">
                      {{ getRelacionado(props.row, propsN.row) }}
                    </q-td>
                    <q-td key="acciones" :props="propsN">
                      <a href="#"
                        class="q-mx-sm"
                        @click.prevent="openModalNotificacionEditar(propsN.row, props.row)"
                      >
                        <q-icon name="edit" color="black" size="1.3em"/>
                        <q-tooltip>Editar</q-tooltip>
                      </a>

                      <a href="#"
                        class="q-mx-sm"
                        @click.prevent="openModalPdfN(propsN.row)"
                      >
                        <q-icon name="visibility" color="black" size="1.3em"/>
                        <q-tooltip>Visualizar</q-tooltip>
                      </a>

                      <a href="#"
                        class="q-mx-sm"
                        @click.prevent="imprimirN(propsN.row)"
                      >
                        <q-icon name="print" color="black" size="1.3em"/>
                        <q-tooltip>Imprimir</q-tooltip>
                      </a>

                      <a href="#"
                        class="q-mx-sm"
                        @click.prevent="descargarN(propsN.row)"
                      >
                        <q-icon name="get_app" color="black" size="1.3em"/>
                        <q-tooltip>Descargar</q-tooltip>
                      </a>

                      <a href="#"
                        class="q-mx-sm"
                        @click.prevent="deleteNotificacion(propsN.row)"
                      >
                        <q-icon name="delete" color="black" size="1.3em"/>
                        <q-tooltip>Eliminar</q-tooltip>
                      </a>
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-td>
          </q-tr>
        </transition>
      </template>
    </q-table>

    <q-dialog
      full-height
      @hide="closeModalPdf"
      v-model="showModalPdf"
    >
      <modal-pdf
        :base64="base64"
        :errorB64="errorB64"
        :nombreDocumento="nombreAcuerdo"
        :fetchingDocumento="fetchingAcuerdo"
        @close="closeModalPdf"
      >
      </modal-pdf>
    </q-dialog>

    <q-dialog
      @hide="closeModalInfoAcuerdo"
      v-model="showModalInfoAcuerdo"
    >
      <modal-info-acuerdo
        :acuerdo="rowSelected"
        @close="closeModalInfoAcuerdo"
      >
      </modal-info-acuerdo>
    </q-dialog>

    <q-dialog
      v-model="showModalNotificacion"
      @hide="closeModalNotificacion"
    >
      <form-notificacion
        v-if="showModalNotificacion"
        :acuerdo="rowSelected"
        :actores="actores"
        :autoridades="autoridades"
        :autoridadesSub="autoridadesSub"
        :terceros="terceros"
        :expediente="expediente"
        :notificacion="notificacionSelected"
        @updateNotificacion="updateNotificacion"
        @close="closeModalNotificacion"
      ></form-notificacion>
    </q-dialog>

    <q-dialog
      v-model="showModalNotificados"
      @hide="closeModalNotificados"
    >
      <modal-notificados
        v-if="showModalNotificados"
        :expediente="expediente"
        :acuerdo="acuerdoSelected"
        :notificaciones="notificaciones"
        @openModalNotificacion="openModalNotificacion"
        @openModalNotificacionEditar="openModalNotificacionEditar"
        @close="closeModalNotificados"
      ></modal-notificados>
    </q-dialog>
  </div>
</template>

<script>
import {
  QTr,
  QTd,
  QTable,
  Loading,
  Notify,
} from 'quasar';

import _ from 'lodash';
import printJS from 'print-js';

import errors from 'boot/errors';
import sidjbridge from 'boot/sidjbridge';
import updateState from 'src/store/utlils';

import ModalPdf from 'components/Generales/ModalPdf';
import ModalNotificados from 'components/ExpedienteConsulta/Generales/ModalNotificados';
import FormNotificacion from 'components/ExpedienteConsulta/NotificacionesConsulta/Notificaciones/FormNotificacionEditar';

import ModalInfoAcuerdo from './ModalInfoAcuerdo';

export default {
  name: 'tabla-acuerdos',
  props: {
    resultados: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      base64: null,
      errorB64: null,
      nombreAcuerdo: null,

      notificaciones: [],

      rowSelected: null,
      acuerdoSelected: null,
      notificacionSelected: null,

      showModalPdf: false,
      showModalInfoAcuerdo: false,
      showModalNotificados: false,
      showModalNotificacion: false,

      fetchingAcuerdo: false,
      expanded: [],

      columns: [
        {
          name: 'proceso',
          label: 'Proceso',
          field: 'proceso',
          align: 'left',
          style: 'width: 25%',
          classes: 'text-weight-bold',
        },
        {
          name: 'tipo_acuerdo',
          label: 'Tipo de acuerdo',
          field: 'tipo_acuerdo',
          align: 'left',
          style: 'width: 25%',
        },
        {
          name: 'notifiquese',
          label: 'Notifiquese',
          field: 'notifiquese',
          align: 'left',
          style: 'width: 10%',
          classes: 'text-weight-bold',
        },
        {
          name: 'fecha_elaboracion',
          label: 'Fecha de elaboración',
          field: 'fecha_elaboracion',
          align: 'left',
          style: 'width: 20%',
        },
        {
          name: 'acciones',
          label: 'Acciones',
          field: 'acciones',
          align: 'left',
          style: 'width: 20%',
        },
      ],
      visibleColumns: ['no_folio', 'tipo_notificacion', 'fecha_elaboracion', 'fecha_notificacion', 'notificados', 'relacionado', 'acciones'],
      columnsNotificaciones: [
        {
          name: 'created_at',
          field: 'created_at',
          align: 'left',
        },
        {
          name: 'no_folio',
          label: 'No folio',
          field: 'no_folio',
          align: 'left',
          style: 'width: 9%',
          classes: 'text-weight-bold',
        },
        {
          name: 'tipo_notificacion',
          label: 'Tipo de notificacion',
          field: 'tipo_notificacion',
          align: 'left',
          style: 'width: 21%',
        },
        {
          name: 'fecha_elaboracion',
          label: 'Fecha de elaboración',
          field: 'fecha_elaboracion',
          sortable: true,
          align: 'center',
          style: 'width: 12%',
          classes: 'text-weight-bold',
        },
        {
          name: 'fecha_notificacion',
          label: 'Fecha de notificación',
          field: 'fecha_notificacion',
          sortable: true,
          align: 'center',
          style: 'width: 12%',
        },
        {
          name: 'notificados',
          label: 'Notificados',
          field: 'notificados',
          align: 'center',
          style: 'width: 4%',
        },
        {
          name: 'relacionado',
          label: 'Relacionado',
          field: 'relacionado',
          align: 'left',
          style: 'width: 28%',
          classes: 'text-weight-bold',
        },
        {
          name: 'acciones',
          label: 'Acciones',
          field: 'acciones',
          align: 'center',
          style: 'width: 14%',
        },
      ],
      pagination: {
        rowsPerPage: -1,
        sortBy: 'created_at',
        descending: false,
      },
    };
  },
  components: {
    QTr,
    QTd,
    QTable,
    ModalPdf,
    ModalNotificados,
    ModalInfoAcuerdo,
    FormNotificacion,
  },
  beforeMount() {
    setTimeout(() => {
      if (this.resultados.length === 1) {
        this.expanded.push(this.resultados[0].id);
      }
    }, 200);
  },
  computed: {
    actores() {
      return this.rowSelected?.actores ?? [];
    },
    autoridades() {
      return this.rowSelected?.autoridades ?? [];
    },
    autoridadesSub() {
      const temp = this.expediente?.autoridades_substanciadoras ?? [];
      const autoridadesId = temp.map(j => j.id);
      return this.$store.getters['autoridades/getAutoridadesAll'].filter(i => autoridadesId.includes(i.autoridad_id));
    },
    acuerdosSort() {
      return _.orderBy(this.resultados, ['fechaingresotca'], 'asc');
    },
    terceros() {
      return this.rowSelected?.terceros ?? [];
    },
    expediente() {
      return this.rowSelected?.expediente ?? null;
    },
    tiposNotificaciones() {
      return this.$store.getters['tiposNotificaciones/getTiposNotificacionesAll'];
    },
  },
  methods: {
    getRelacionado(acuerdo, notificacion) {
      if (notificacion.actor_id) {
        const actor = acuerdo.actores
          .find(i => i.actor_id === notificacion.actor_id);
        return actor ? actor.nombre_completo : '-';
      }
      if (notificacion.tercero_id) {
        const tercero = acuerdo.terceros
          .find(i => i.tercero_id === notificacion.tercero_id);
        return tercero ? tercero.nombre_completo : '-';
      }
      if (notificacion.autoridad_id) {
        const autoridad = acuerdo.autoridades
          .find(i => i.autoridad_id === notificacion.autoridad_id);
        return autoridad ? autoridad.autoridad : '-';
      }
      if (notificacion.autoridad_substanciadora_id) {
        const autoridad = this.$store.getters['autoridades/getAutoridadesAll']
          .find(i => i.autoridad_id === notificacion.autoridad_substanciadora_id);
        return autoridad ? autoridad.autoridad : '-';
      }
      return 'NA';
    },
    getProceso(row) {
      const folio = row.actuacion.no_folio ? `(${row.actuacion.no_folio.split('/')[0]})` : '';
      const proceso = row.proceso.proceso_id === 18
        ? row.actuacion.referencias.ra
        : row.proceso.descripcion;

      return `${proceso} ${folio}`;
    },
    getTipoNotificacion(row) {
      const notificacion = this.tiposNotificaciones
        .find(i => i.tipo_notificacion_id === row.tipo_id);

      return notificacion ? notificacion.descripcion : '-';
    },
    openModalInfoAcuerdo(row) {
      this.rowSelected = row;
      this.showModalInfoAcuerdo = true;
    },
    closeModalInfoAcuerdo() {
      this.showModalInfoAcuerdo = false;
      this.rowSelected = null;
    },
    openModalNotificados(row) {
      this.rowSelected = row;
      this.acuerdoSelected = row.acuerdo;

      if (row?.acuerdo.notificados.length > 0) {
        this.showModalNotificados = true;
        this.notificaciones = row.notificaciones;
      } else {
        this.openModalNotificacion(row);
      }
    },
    openModalNotificacion(acuerdo) {
      this.acuerdoSelected = acuerdo;

      if (acuerdo.notificado) {
        this.notificacionSelected = acuerdo.notificado;
      } else {
        this.notificacionSelected = null;
      }

      this.showModalNotificacion = true;
    },
    openModalNotificacionEditar(notificacion, row) {
      this.rowSelected = row;
      this.notificacionSelected = notificacion;
      this.showModalNotificacion = true;
    },
    closeModalNotificados() {
      this.rowSelected = null;
      this.showModalNotificados = false;
    },
    closeModalNotificacion() {
      this.showModalNotificacion = false;
      this.notificacionSelected = null;
    },
    updateNotificacion(notificacion) {
      this.notificaciones = updateState(this.notificaciones, notificacion);
    },
    openModalPdf(row) {
      this.showModalPdf = true;
      this.fetchingAcuerdo = true;
      this.nombreAcuerdo = row.acuerdo.no_folio;

      return sidjbridge.get(`/descargas/acuerdos/${row.id}/base-64`)
        .then((response) => {
          this.fetchingAcuerdo = false;
          this.base64 = response.data;
          return Promise.resolve(true);
        })
        .catch((err) => {
          this.fetchingAcuerdo = false;
          this.base64 = '';
          this.errorB64 = err;
          errors(err);
          return Promise.reject(true);
        });
    },
    openModalPdfN(row) {
      this.showModalPdf = true;
      this.fetchingAcuerdo = true;
      this.nombreAcuerdo = row.no_folio;

      return sidjbridge.get(`/descargas/notificaciones/${row.id}/base64`)
        .then((response) => {
          this.fetchingAcuerdo = false;
          this.base64 = response.data;
          return Promise.resolve(true);
        })
        .catch((err) => {
          this.fetchingAcuerdo = false;
          this.base64 = '';
          this.errorB64 = err;
          errors(err);
          return Promise.reject(true);
        });
    },
    closeModalPdf() {
      this.base64 = null;
      this.showModalPdf = false;
      this.nombreAcuerdo = null;
      this.fetchingAcuerdo = false;
    },
    imprimir(row) {
      Loading.show();
      return sidjbridge.get(`/descargas/acuerdos/${row.id}/base-64`)
        .then((response) => {
          Loading.hide();
          if (response.data) {
            printJS({ printable: response.data, type: 'pdf', base64: true });
          } else {
            this.$swal({
              icon: 'error',
              title: 'Error',
              text: 'Archivo no encontrado',
            });
          }
          return Promise.resolve(true);
        })
        .catch((err) => {
          Loading.hide();
          errors(err);
          return Promise.reject(true);
        });
    },
    async descargar(row) {
      Loading.show();

      try {
        const response = await sidjbridge.get(`/descargas/acuerdos/${row.id}/base-64`);
        Loading.hide();

        const linkSource = `data:application/pdf;base64,${response.data}`;
        const downloadLink = document.createElement('a');
        const fileName = `${row.acuerdo.no_folio}.pdf`;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();

        return Promise.resolve(true);
      } catch (err) {
        errors(err);
        Loading.hide();
        return Promise.reject(true);
      }
    },
    imprimirN(row) {
      Loading.show();
      return sidjbridge.get(`/descargas/notificaciones/${row.id}/base64`)
        .then((response) => {
          Loading.hide();
          if (response.data) {
            printJS({ printable: response.data, type: 'pdf', base64: true });
          } else {
            this.$swal({
              icon: 'error',
              title: 'Error',
              text: 'Archivo no encontrado',
            });
          }
          return Promise.resolve(true);
        })
        .catch((err) => {
          Loading.hide();
          errors(err);
          return Promise.reject(true);
        });
    },
    async descargarN(row) {
      Loading.show();

      try {
        const response = await sidjbridge.get(`/descargas/notificaciones/${row.id}/base64`);
        Loading.hide();

        const linkSource = `data:application/pdf;base64,${response.data}`;
        const downloadLink = document.createElement('a');
        const fileName = `${row.no_folio}.pdf`;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();

        return Promise.resolve(true);
      } catch (err) {
        errors(err);
        Loading.hide();
        return Promise.reject(true);
      }
    },
    deleteNotificacion(notificacion) {
      this.$swal({
        title: '¿Está seguro de borrar la notificación?',
        text: 'Esta cambio no se podrá revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Borrar',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.value) {
          try {
            Loading.show();
            await this.$store.dispatch('notificaciones/deleteNotificacion', notificacion);
            Loading.hide();
            Notify.create({
              message: 'Notificación borrada correctamente.',
              position: 'bottom',
            });
            return Promise.resolve(true);
          } catch (e) {
            errors(e);
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

<style lang="sass" scoped>
tr:nth-child(even)
  background-color: #f5f5f5

.q-table tbody td
  white-space: normal
</style>
