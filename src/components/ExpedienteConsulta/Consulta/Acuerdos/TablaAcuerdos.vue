<template>
  <div class="q-mt-sm q-mb-lg">
    <q-separator/>

    <q-table
      flat
      dense
      class="q-ma-md"
      title="Acuerdos"
      :data="acuerdosSort"
      :columns="columns"
      :visible-columns="visibleColumns"
      :pagination="pagination"
      :hide-pagination="true"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="folio" :props="props">
            {{ props.row.noFolio }}
          </q-td>
          <q-td key="tipo_acuerdo" :props="props">
            {{ getTipoAcuerdo(props.row) }}
          </q-td>
          <q-td key="fecha_elaboracion" :props="props">
            {{ props.row.fecha_elaboracion | moment('DD MMM YYYY') }}
          </q-td>
          <q-td key="notificacion" :props="props">
            {{ getTipoNotifiquese(props.row) }}
          </q-td>
          <q-td key="observaciones" :props="props">
            {{ props.row.observaciones }}
          </q-td>
          <q-td v-if="esEspecializado" key="notificado">NA</q-td>
          <q-td key="modificado" :props="props">
            {{ props.row.updated_at | moment('DD MMM YYYY HH:mm:ss') }}
          </q-td>
          <q-td key="acciones" :props="props">
            <span
              class="q-mx-xs cursor-pointer"
              @click.prevent="openModalPdf(
                `/descargas/acuerdos/${props.row.id}/base-64`,
                props.row.noFolio,
              )"
            >
              <q-icon name="visibility" color="black" size="1.3em"/>
              <q-tooltip>Visualizar</q-tooltip>
            </span>
            <span
              class="q-mx-xs cursor-pointer"
              @click.prevent="imprimir(props.row)"
            >
              <q-icon name="print" color="black" size="1.3em"/>
              <q-tooltip>Imprimir</q-tooltip>
            </span>
            <span
              class="q-mx-xs cursor-pointer"
              @click.prevent="descargar(props.row)"
            >
              <q-icon name="get_app" color="black" size="1.3em"/>
              <q-tooltip>Descargar</q-tooltip>
            </span>
            <span
              class="q-mx-xs cursor-pointer"
              @click.prevent="openModal(props.row)"
            >
              <q-icon name="add_circle_outline" color="black" size="1.3em"/>
              <q-tooltip>Registar notificación</q-tooltip>
            </span>
            <span
              class="q-mx-xs cursor-pointer"
              @click.prevent="openModalInfoAcuerdo(props.row)"
            >
              <q-icon name="info" color="black" size="1.3em"/>
              <q-tooltip>Información acuerdo</q-tooltip>
            </span>
            <span
              class="q-mx-xs cursor-pointer"
              @click.prevent="openModalHistorial(props.row)"
            >
              <q-icon name="fa fa-crosshairs" color="black" size="1.1em"/>
              <q-tooltip>Ubicación acuerdo</q-tooltip>
            </span>
          </q-td>
        </q-tr>

        <q-tr v-for="notificacion in getNotificaciones(props.row)"
          :key="notificacion.id"
        >
          <q-td>{{ notificacion.no_folio }}</q-td>
          <q-td>{{ getTipoNotificacion(notificacion) }}</q-td>
          <q-td class="text-center">
            {{ notificacion.fecha_elaboracion | moment('DD MMM YYYY') }}
          </q-td>
          <q-td class="text-center">{{ notificacion.notificados }}</q-td>
          <q-td>{{ notificacion.observaciones }}</q-td>
          <q-td v-if="esEspecializado">{{ getRelacionado(notificacion) }}</q-td>
          <q-td>{{ notificacion.updated_at | moment('DD MMM YYYY HH:mm:ss') }}</q-td>
          <q-td class="text-left">
            <span
              class="q-mx-xs cursor-pointer"
              @click.prevent="openModalPdf(
                `/descargas/notificaciones/${notificacion.id}/base64`,
                notificacion.no_folio,
              )"
            >
              <q-icon name="visibility" color="black" size="1.3em"/>
              <q-tooltip>Visualizar</q-tooltip>
            </span>
            <span
              class="q-mx-xs cursor-pointer"
              @click.prevent="imprimir(notificacion)"
            >
              <q-icon name="print" color="black" size="1.3em"/>
              <q-tooltip>Imprimir</q-tooltip>
            </span>
            <span
              class="q-mx-xs cursor-pointer"
              @click.prevent="descargar(notificacion)"
            >
              <q-icon name="get_app" color="black" size="1.3em"/>
              <q-tooltip>Descargar</q-tooltip>
            </span>
            <span v-if="!notificacion.boletin_notificacion_generada_at"
              class="q-mx-xs cursor-pointer"
              @click.prevent="$emit('openModalNotificacionEditar', notificacion)"
            >
              <q-icon name="edit" color="black" size="1.3em"/>
              <q-tooltip>Editar</q-tooltip>
            </span>
            <span
              class="q-mx-xs cursor-pointer"
              @click.prevent="openModalInfoNotificacion(notificacion)"
            >
              <q-icon name="info" color="black" size="1.3em"/>
              <q-tooltip>Información notificación</q-tooltip>
            </span>
            <span v-if="!notificacion.boletin_notificacion_generada_at"
              class="q-mx-xs cursor-pointer"
              @click.prevent="eliminar(notificacion)"
            >
              <q-icon name="delete" color="black" size="1.3em"/>
              <q-tooltip>Eliminar</q-tooltip>
            </span>
          </q-td>
        </q-tr>
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
        :nombreDocumento="nombreArchivo"
        :fetchingDocumento="fetchingArchivo"
        @close="closeModalPdf"
      >
      </modal-pdf>
    </q-dialog>

    <q-dialog
      v-model="showInfoAcuerdo"
      @hide="closeModalInfoAcuerdo"
    >
      <modal-info-acuerdo
        :acuerdo="acuerdoSelected"
        @close="closeModalInfoAcuerdo"
      >
      </modal-info-acuerdo>
    </q-dialog>

    <q-dialog
      v-model="showInfoNotificacion"
      @hide="closeModalInfoNotificacion"
    >
      <modal-info-notificacion
        :notificacion="notificacionSelected"
        @close="closeModalInfoNotificacion"
      >
      </modal-info-notificacion>
    </q-dialog>

    <q-dialog
      v-model="showModalHistorial"
      @hide="closeModalHistorial"
      >
    <modal-historial
      :acuerdo="acuerdoSelected"
      :historial="historial"
      @close="closeModalHistorial"
    >
    </modal-historial>
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

import ModalPdf from 'components/Generales/ModalPdf';
import ModalInfoAcuerdo from './ModalInfoAcuerdo';
import ModalHistorial from './ModalHistorial';
import ModalInfoNotificacion from './ModalInfoNotificacion';

export default {
  name: 'tabla-acuerdos',
  props: {
    acuerdos: {
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
      pagination: {
        page: 1,
        sortBy: 'id',
        descending: false,
        rowsPerPage: -1,
      },
      columns: [
        {
          name: 'folio',
          label: 'Folio',
          align: 'left',
          style: 'width: 7%',
          classes: 'text-bold',
        },
        {
          name: 'tipo_acuerdo',
          label: 'Tipo de acuerdo',
          align: 'left',
          style: 'width: 21%',
          classes: 'text-bold',
        },
        {
          name: 'fecha_elaboracion',
          label: 'Fecha de elaboración',
          align: 'center',
          style: 'width: 10%',
          classes: 'text-bold',
        },
        {
          name: 'notificacion',
          label: 'Notificacion/Notificados',
          align: 'center',
          style: 'width: 10%',
          classes: 'text-bold',
        },
        {
          name: 'observaciones',
          label: 'Observaciones',
          align: 'left',
          style: 'width: 21%',
          classes: 'text-bold',
        },
        {
          name: 'notificado',
          label: 'Notificado',
          align: 'left',
          style: 'width: 10%',
          classes: 'text-bold',
        },
        {
          name: 'modificado',
          label: 'Modificado',
          align: 'left',
          style: 'width: 10%',
          classes: 'text-bold',
        },
        {
          name: 'acciones',
          label: 'Acciones',
          align: 'left',
          style: 'width: 11%',
        },
      ],
      visibleColumns: [
        'folio',
        'tipo_acuerdo',
        'fecha_elaboracion',
        'notificacion',
        'observaciones',
        'modificado',
        'acciones',
      ],
      showModalPdf: false,
      showModalHistorial: false,
      fetchingArchivo: false,
      fetching: false,

      showInfoAcuerdo: false,
      showInfoNotificacion: false,

      acuerdoSelected: null,
      notificacionSelected: null,

      historial: [],
      nombreArchivo: false,
      base64: null,
      errorB64: null,
    };
  },
  components: {
    QTr,
    QTd,
    QTable,
    ModalPdf,
    ModalHistorial,
    ModalInfoAcuerdo,
    ModalInfoNotificacion,
  },
  beforeMount() {
    if (this.esEspecializado) {
      this.visibleColumns.push('notificado');
    }
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
    acuerdosSort() {
      return _.orderBy(this.acuerdos, ['created_at'], ['asc']);
    },
    tiposAcuerdos() {
      return this.$store.getters['tiposAcuerdo/getTiposAcuerdosAll'];
    },
    tiposNotifiquese() {
      return this.$store.getters['tiposNotifiquese/getTiposNotifiqueseAll'];
    },
    tiposNotificaciones() {
      return this.$store.getters['tiposNotificaciones/getTiposNotificacionesAll'];
    },
    esEspecializado() {
      return [3].includes(this.expediente.materia_id);
    },
  },
  methods: {
    openModalInfoAcuerdo(acuerdo) {
      this.acuerdoSelected = acuerdo;
      this.showInfoAcuerdo = true;
    },
    closeModalInfoAcuerdo() {
      this.acuerdoSelected = null;
      this.showInfoAcuerdo = false;
    },
    openModalInfoNotificacion(notificacion) {
      this.notificacionSelected = notificacion;
      this.showInfoNotificacion = true;
    },
    closeModalInfoNotificacion() {
      this.notificacionSelected = null;
      this.showInfoNotificacion = false;
    },
    async openModalHistorial(acuerdo) {
      this.fetching = true;
      this.acuerdoSelected = acuerdo;

      try {
        Loading.show({
          message: 'Buscando ubicaciones...',
        });

        const response = await sidjbridge.get('/v1/searchAcuerdos/acuerdos-historico/', {
          params: {
            uuid: acuerdo.id,
          },
        });

        this.historial = response.data;

        if (this.historial.length > 0) {
          this.showModalHistorial = true;
        } else {
          this.$swal.fire({
            text: 'No se han encontrado registros.',
            icon: 'warning',
          });
        }
      } catch (err) {
        errors(err);
      } finally {
        this.fetching = false;
        Loading.hide();
      }
    },
    closeModalHistorial() {
      this.historial = [];
      this.acuerdoSelected = {};
      this.showModalHistorial = false;
    },
    getRelacionado(notificacion) {
      if (notificacion.actor_id) {
        const actor = this.actores.find(i => i.actor_id === notificacion.actor_id);
        return actor ? actor.nombre_completo : '-';
      }
      if (notificacion.autoridad_id) {
        const autoridad = this.autoridades.find(i => i.autoridad_id === notificacion.autoridad_id);
        return autoridad ? autoridad.autoridad : '-';
      }
      if (notificacion.tercero_id) {
        const tercero = this.terceros.find(i => i.tercero_id === notificacion.tercero_id);
        return tercero ? tercero.nombre_completo : '-';
      }
      if (notificacion.autoridad_substanciadora_id) {
        const autoridad = this.autoridadesSub
          .find(i => i.autoridad_id === notificacion.autoridad_substanciadora_id);
        return autoridad ? autoridad.autoridad : '-';
      }
      return 'NA';
    },
    getTipoAcuerdo(row) {
      const tipo = this.tiposAcuerdos.find(i => i.tipo_acuerdo_id === row.tipo_id);
      return tipo ? tipo.descripcion : '--';
    },
    getTipoNotifiquese(row) {
      const tipo = this.tiposNotifiquese.find(i => i.tipo_id === row.notifiquese_id);
      return tipo ? tipo.descripcion : '--';
    },
    getTipoNotificacion(row) {
      const tipo = this.tiposNotificaciones.find(i => i.tipo_notificacion_id === row.tipo_id);
      return tipo ? tipo.descripcion : '--';
    },
    getNotificaciones(row) {
      const notificaciones = this.$store.getters['notificaciones/getNotificacionesAll'];
      return notificaciones.filter(i => i.acuerdo_id === row.acuerdo_id);
    },
    async imprimir(row) {
      try {
        Loading.show();
        const response = await sidjbridge.get(`/descargas/acuerdos/${row.id}/base-64`);

        if (response.data) {
          printJS({ printable: response.data, type: 'pdf', base64: true });
        } else {
          this.$swal({
            icon: 'error',
            title: 'Error',
            text: 'Archivo no encontrado',
          });
        }
      } catch (error) {
        errors(error);
      } finally {
        Loading.hide();
      }
    },
    async descargar(acuerdo) {
      try {
        Loading.show();
        const response = await sidjbridge.get(`/descargas/acuerdos/${acuerdo.id}/base-64`);

        const linkSource = `data:application/pdf;base64,${response.data}`;
        const downloadLink = document.createElement('a');
        const fileName = `${acuerdo.noFolio}.pdf`;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      } catch (err) {
        errors(err);
      } finally {
        Loading.hide();
      }
    },
    async openModalPdf(url = '', nombre = '') {
      this.showModalPdf = true;
      this.fetchingArchivo = true;
      this.nombreArchivo = nombre;

      try {
        const response = await sidjbridge.get(url);
        this.base64 = response.data;
      } catch (error) {
        this.base64 = '';
        this.errorB64 = error;
        errors(error);
      } finally {
        this.fetchingArchivo = false;
      }
    },
    closeModalPdf() {
      this.errorB64 = null;
      this.base64 = null;
      this.showModalPdf = false;
      this.fetchingArchivo = false;
    },
    eliminar(notificacion) {
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

            Notify.create({
              message: 'Notificación borrada correctamente.',
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
    openModal(acuerdo) {
      if (acuerdo.notificados.length > 0) {
        this.$emit('openModalNotificados', acuerdo);
      } else {
        this.$emit('openModalNotificacion', acuerdo);
      }
    },
  },
};
</script>
