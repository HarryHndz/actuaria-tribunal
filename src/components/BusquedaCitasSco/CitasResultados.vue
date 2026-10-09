<template>
  <div style="width: 98%;">
    <q-table bordered
      class="sticky-header q-ml-md"
      style="height: 400px"
      :columns="columns"
      :hide-pagination="true"
      :data="resultadosSortBy"
      :pagination="pagination"
      :loading="fetchingLoading"
    >
      <template v-slot:top-left>
        <div style="font-size: 21px;">
          <strong>Citas para el dia {{filtros.fecha_cita | moment('DD MMM YYYY')}}</strong>
        </div>
      </template>

      <template v-slot:no-data>
        <div class="full-width row flex-center">
          <span style="font-size: 1.5em; color: #880e4f">
            <strong>
              <q-icon name="warning"/>
              No hay citas registradas para la fecha {{filtros.fecha_cita | moment('DD MMM YYYY')}}
            </strong>
          </span>
        </div>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="folio" :props="props">
            {{ props.row.no_folio }}
          </q-td>
          <q-td key="fecha_cita" :props="props">
            {{ props.row.fecha_cita | moment('hh:mm a') }}
          </q-td>
          <q-td key="tramite" :props="props">
            {{ getTramite(props.row) }}
          </q-td>
          <q-td key="promovente" :props="props">
            {{ `${props.row.nombre} ${props.row.primer_apellido} ${props.row.segundo_apellido}` }}
          </q-td>
          <q-td key="accion" :props="props">
            <a href="#"
              class="q-mx-sm"
              @click.prevent="openInfoModal(props.row)"
            >
              <q-icon name="info" color="black" size="1.3em"/>
              <q-tooltip>Información</q-tooltip>
            </a>
            <a href="#"
              class="q-mx-sm"
              @click.prevent="imprimirAcuse(props.row)"
            >
              <q-icon name="print" color="black" size="1.3em"/>
              <q-tooltip>Imprimir acuses</q-tooltip>
            </a>
            <a href="#"
              class="q-mx-sm"
              @click.prevent="downloadAcuse(props.row)"
            >
              <q-icon name="get_app" color="black" size="1.3em"/>
              <q-tooltip>Descargar acuse</q-tooltip>
            </a>
            <a href="#"
              class="q-mx-sm"
              @click.prevent="cancelarCita(props.row)"
            >
              <q-icon name="cancel" color="black" size="1.3em"/>
              <q-tooltip>Cancelar cita</q-tooltip>
            </a>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog
      v-model="showInfoModal"
      @hide="closeInfoModal"
    >
      <modal-info-cita
        :cita="citaSelected"
        @close="closeInfoModal"
      ></modal-info-cita>
    </q-dialog>
  </div>
</template>

<script>
import {
  Loading,
  Notify,
  QDialog,
} from 'quasar';

import _ from 'lodash';

import moment from 'moment';
import printJS from 'print-js';

import errors from 'boot/errors';
import scobridge from 'boot/scobridge';

import ModalInfoCita from './ModalInfoCita';

export default {
  name: 'listado-resultados',
  props: {
    resultados: {
      required: true,
      type: Array,
    },
    filtros: {
      required: true,
      type: Object,
    },
    fetchingLoading: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      citaSelected: null,
      showInfoModal: false,
      isMobile: this.$q.screen.width < 600,
      columns: [
        {
          name: 'folio', label: 'Folio', field: 'folio', sortable: false, align: 'left', style: 'width: 5%',
        },
        {
          name: 'fecha_cita', label: 'Fecha de cita', field: 'fecha_cita', sortable: false, align: 'left', style: 'width: 10%',
        },
        {
          name: 'tramite', label: 'Tramite', field: 'tramite', sortable: false, align: 'left', style: 'width: 20%',
        },
        {
          name: 'promovente', label: 'Promovente', field: 'promovente', sortable: false, align: 'left', style: 'width: 45%',
        },
        {
          name: 'accion', label: '', field: 'accion', sortable: false, align: 'center', style: 'width: 20%',
        },
      ],
      pagination: {
        rowsPerPage: -1,
      },
    };
  },
  components: {
    QDialog,
    ModalInfoCita,
  },
  computed: {
    noDataMessage() {
      return `No hay citas registradas para la fecha ${moment(this.filtros.fecha_cita).format('DD MMM YYYY')}`;
    },
    resultadosSortBy() {
      return _.orderBy(this.resultados, ['fecha_cita', 'horario_id'], ['asc', 'asc']);
    },
  },
  methods: {
    getTramite(cita) {
      const tramite = this.$store.getters['tiposTramitesSco/getTiposTramitesScoAll'].find(i => i.tipo_id === cita.tramite_id);
      return tramite ? tramite.descripcion : '--';
    },
    async imprimirAcuse(cita) {
      try {
        Loading.show();
        const response = await scobridge.get(`/v1/acuse-cita/${cita.id}`);
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
      } catch (error) {
        errors(error);
        Loading.hide();
        return Promise.reject(true);
      }
    },
    async downloadAcuse(cita) {
      try {
        Loading.show();
        const response = await scobridge.get(`/v1/acuse-cita/${cita.id}`);

        Loading.hide();
        const linkSource = `data:application/pdf;base64,${response.data}`;
        const downloadLink = document.createElement('a');
        const fileName = `acuse_${cita.no_folio}.pdf`;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();

        return Promise.resolve(true);
      } catch (error) {
        errors(error);
        Loading.hide();
        return Promise.reject(true);
      }
    },
    cancelarCita(cita) {
      this.$swal({
        title: `¿Esta seguro de cancelar la cita ${cita.no_folio}?`,
        text: 'Este cambio no se podrá revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      }).then(async (resp) => {
        if (resp.value) {
          try {
            await this.$store.dispatch('oficialiaCitas/deleteOficialiaCita', {
              id: cita.id,
            });
            Notify.create({
              message: 'Listado eliminado correctamente.',
              position: 'bottom',
            });
            return Promise.resolve(true);
          } catch (error) {
            errors(error);
            return Promise.reject(false);
          }
        }
        return Promise.resolve(true);
      });
    },
    openInfoModal(cita) {
      this.showInfoModal = true;
      this.citaSelected = cita;
    },
    closeInfoModal() {
      this.showInfoModal = false;
      this.citaSelected = null;
    },
  },
};
</script>

<style lang="sass">
.sticky-header
  /* height or max-height is important */
  height: 410px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0
</style>
