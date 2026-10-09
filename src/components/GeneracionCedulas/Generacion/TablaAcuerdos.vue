<template>
  <section class="q-ma-sm">
    <div class="row">
      <div class="col-11">
        <div class=" text-center subtitulo">
          <strong>ACUERDOS</strong>
        </div>
      </div>
      <div class="col-1 text-right">
        <div class="q-mb-sm">
          <a href="#"
            @click.prevent="descargarPlantilla"
          >
            <q-icon name="fas fa-file-excel" size="2em" color="black"/>
            <q-tooltip>Descargar plantilla ejemplo</q-tooltip>
          </a>
        </div>
      </div>
    </div>

    <q-separator/>

    <q-table flat dense
      wrap-cells
      class="q-ma-sm q-my-lg"
      :data="resultados"
      :columns="columns"
      :pagination="pagination"
      :hide-pagination="true"
    >
      <template v-slot:body="props">
        <q-tr :props="props"
          :class="{'tr-warning': !props.row.validated || !getActuario(props.row)}">
          <q-td key="no" :props="props">
            {{ ++props.rowIndex }}
          </q-td>
          <q-td key="folio_acuerdo" :props="props">
            {{ props.row.no_folio_acuerdo }}
            <q-popup-edit v-slot="scope" buttons
              v-model="props.row.no_folio_acuerdo"
              title="Editar folio de acuerdo"
              @save="(val, initialValue) => updateAcuerdo(val, props.row)"
              :validate="validateFolioAcuerdo"
            >
              <q-input dense autofocus counter
                v-model="scope.value"
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="actuario" :props="props" >
            {{ getActuario(props.row) }}
          </q-td>
          <q-td key="proceso" :props="props" >
            {{ getProceso(props.row) }}
          </q-td>
          <q-td key="expediente" :props="props">
            {{ getNoExpediente(props.row) }}
          </q-td>
          <q-td key="tipo_notificacion" :props="props">
            {{ getTipoNotificacion(props.row) }}
          </q-td>
          <q-td key="fecha_elaboracion_cedula" :props="props">
            {{ props.row.fecha_elaboracion_cedula | moment('DD MMM YYYY') }}
          </q-td>
          <q-td key="accion" :props="props">
            <a href="#" v-if="props.row.errors"
              class="q-mx-sm"
              @click.prevent="openModalErrores(props.row)"
            >
              <q-icon name="flag"
                :color="!props.row.validated ? 'white' : 'black'" size="1.3em"
              />
              <q-tooltip>Errores</q-tooltip>
            </a>
            <a href="#" v-if="props.row.validated"
              class="q-mx-sm"
              @click.prevent="openModalPdf(props.row)"
            >
              <q-icon name="visibility"
                :color="!props.row.validated ? 'white' : 'black'" size="1.3em"
              />
              <q-tooltip>Visualizar cedula</q-tooltip>
            </a>
            <a href="#"
              class="q-mx-sm"
              @click.prevent="$emit('open-editar', props.row)"
              v-if="props.row.actuacion_id"
            >
              <q-icon name="edit"
                :color="!props.row.validated ? 'white' : 'black'" size="1.3em"
              />
              <q-tooltip>Editar</q-tooltip>
            </a>
            <a v-else
              class="q-mx-md"
            >
              <q-icon name="reduce"
                color="white" size=".1em"
              />
            </a>
            <a href="#"
              class="q-mx-sm"
              @click.prevent="$emit('eliminar-resultado', props.row)"
            >
              <q-icon name="delete"
                :color="!props.row.validated ? 'white' : 'black'" size="1.3em"
              />
              <q-tooltip>Borrar</q-tooltip>
            </a>
            <a class="puntero q-mx-sm">
              <q-icon name="more"
                :color="!props.row.validated ? 'white' : 'black'"
                size="1.5em" clickable
              >
                <q-menu fit>
                  <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup
                      @click.prevent="download(props.row)"
                    >
                      <q-item-section>
                        <q-icon name="get_app" color="black" size="1.5em"/>
                        Descargar
                      </q-item-section>
                    </q-item>

                    <q-separator/>

                    <q-item clickable v-close-popup
                      @click.prevent="openInfo(props.row)"
                    >
                      <q-item-section>
                        <q-icon name="info" color="black" size="1.5em"/>
                        Información
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
              <q-tooltip>Más</q-tooltip>
            </a>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog
      full-height
      @hide="closeModalPdf"
      v-model="previsualizarPdf"
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

    <q-dialog
      @hide="closeInfoNotificacion"
      v-model="showInfo"
    >
      <modal-info-notificacion
        v-if="showInfo"
        :acuerdo="acuerdo"
        @close="closeInfoNotificacion"
      >
      </modal-info-notificacion>
    </q-dialog>

    <q-dialog
      @hide="closeModalErrores"
      v-model="showModalErrores"
    >
      <modal-errores
        v-if="showModalErrores"
        :acuerdo="acuerdo"
        @close="closeModalErrores"
      >
      </modal-errores>
    </q-dialog>
  </section>
</template>

<script>
import {
  Loading,
  Notify,
  QDialog,
  QSeparator,
} from 'quasar';

import errors from 'boot/errors';
import sidjbridge from 'boot/sidjbridge';
import ModalPdf from 'components/Generales/ModalPdf';

import ModalErrores from './ModalErrores';
import ModalInfoNotificacion from './ModalInfoNotificacion';

export default {
  name: 'tabla-acuerdos',
  props: {
    resultados: {
      required: true,
      type: Array,
    },
    areaTrabajoCedulas: {
      required: false,
      type: Object,
    },
  },
  data() {
    return {
      previsualizarPdf: null,
      nombreNotificacion: null,
      errorB64: null,
      base64: null,
      acuerdo: null,
      fetchingNotificacion: false,
      showInfo: false,
      showModalErrores: false,
      pagination: {
        rowsPerPage: -1,
      },
      columns: [
        {
          name: 'no', label: 'No', field: 'no', sortable: false, align: 'left', style: 'width: 3%',
        },
        {
          name: 'folio_acuerdo', label: 'Folio acuerdo', field: 'folio_acuerdo', sortable: false, align: 'left', style: 'width: 8%',
        },
        {
          name: 'actuario', label: 'Actuario', field: 'actuario', sortable: false, align: 'left', style: 'width: 19%',
        },
        {
          name: 'proceso', label: 'Proceso (Folio)', field: 'proceso', sortable: false, align: 'left', style: 'width: 16%',
        },
        {
          name: 'expediente', label: 'No juicio.', field: 'expediente', sortable: false, align: 'left', style: 'width: 9%',
        },
        {
          name: 'tipo_notificacion', label: 'Tipo de notificación', field: 'tipo_notificacion', sortable: false, align: 'left', style: 'width: 24%',
        },
        {
          name: 'fecha_elaboracion_cedula', label: 'Fecha de elaboración', field: 'fecha_elaboracion_cedula', sortable: false, align: 'left', style: 'width: 7%',
        },
        {
          name: 'accion', label: '', field: 'accion', sortable: false, align: 'right', style: 'width: 14%',
        },
      ],
    };
  },
  components: {
    QDialog,
    ModalPdf,
    QSeparator,
    ModalErrores,
    ModalInfoNotificacion,
  },
  computed: {
    usuario() {
      return this.$store.getters['session/getUsuario'];
    },
    actuarios() {
      return this.$store.getters['actuarios/getActuariosAll'];
    },
  },
  methods: {
    descargarPlantilla() {
      window.open(
        `${window.location.protocol}//${window.location.host}/descargas/plantillas/actuaria/cedulas/excel`,
        '_blank',
      );
    },
    getProceso(row) {
      if (row.no_folio_actuacion) {
        const folio = row.no_folio_actuacion.split('/');
        return `${row.proceso} (${folio[0]})`;
      }
      return row.proceso ? row.proceso : 'N/A';
    },
    getActuario(row) {
      if (row.actuario_id != null) {
        const actuario = this.$store.getters['actuarios/getActuarioByActuarioId'](row.actuario_id);
        return actuario.actuario;
      }
      return '';
    },
    getTipoNotificacion(row) {
      const tipo = this.$store.getters['tiposNotificaciones/getTipoNotificacionByTipoNotificacionId'](row.tipo_id);
      const tipoNotificacion = row.tipo_notificacion ? row.tipo_notificacion : 'N/A';

      return tipo
        ? tipo.descripcion
        : tipoNotificacion.charAt(0).toUpperCase() + tipoNotificacion.slice(1);
    },
    getNoExpediente(row) {
      if (row.expediente) {
        return row.expediente;
      }
      return 'N/A';
    },
    closeModalPdf() {
      this.previsualizarPdf = false;
      this.nombreNotificacion = '';
      this.fetchingNotificacion = false;
      this.base64 = '';
      this.notificacion = null;
    },
    async openModalPdf(acuerdo) {
      this.fetchingNotificacion = true;
      this.previsualizarPdf = true;
      this.nombreNotificacion = `Cedula para acuerdo: ${acuerdo.no_folio_acuerdo} (Borrador)`;

      try {
        const response = await sidjbridge.post('cedulas/temporal/base64', {
          acuerdo,
          temporal: true,
        });
        this.fetchingNotificacion = false;

        if (response.data?.code === 500) {
          this.base64 = '';
          this.fetchingNotificacion = false;
          this.errorB64 = response.data?.error;

          return Promise.resolve(true);
        }

        this.base64 = response.data ?? null;

        return Promise.resolve(true);
      } catch (e) {
        errors(e);
        this.base64 = '';
        this.errorB64 = e;
        this.fetchingNotificacion = false;
        return Promise.reject(true);
      }
    },
    openInfo(acuerdo) {
      this.acuerdo = acuerdo;
      this.showInfo = true;
    },
    closeInfoNotificacion() {
      this.acuerdo = null;
      this.showInfo = false;
    },
    openModalErrores(acuerdo) {
      this.acuerdo = acuerdo;
      this.showModalErrores = true;
    },
    closeModalErrores() {
      this.showModalErrores = false;
      this.acuerdo = null;
    },
    async download(acuerdo) {
      try {
        Loading.show({
          message: 'Cargando...',
        });
        const response = await sidjbridge.post('/cedulas/temporal/base64', {
          acuerdo,
          temporal: true,
        });
        Loading.hide();

        const linkSource = `data:application/pdf;base64,${response?.data ?? null}`;
        const downloadLink = document.createElement('a');
        const fileName = `${acuerdo.no_folio_acuerdo}.pdf`;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();

        return Promise.resolve(true);
      } catch (e) {
        errors(e);
        Loading.hide();
        return Promise.reject(true);
      }
    },
    validateFolioAcuerdo(val) {
      const filter = /^(A-|PA-)(\d{6}-)(\d{4})$/;

      if (filter.exec(val) !== null) {
        return true;
      }
      Notify.create({
        message: 'El folio del acuerdo no es valido.',
        position: 'bottom',
        type: 'negative',
        timeout: 2000,
      });
      return false;
    },
    updateAcuerdo(val, row) {
      this.$emit('updateAcuerdo', {
        val,
        row,
      });
    },
  },
};
</script>

<style>
.tr-warning {
  color: white;
  background-color: #ff555f;
}
</style>
