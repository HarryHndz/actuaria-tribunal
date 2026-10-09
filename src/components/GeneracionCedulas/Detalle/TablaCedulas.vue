<template>
  <section class="q-ma-sm">
    <div class="q-mb-sm text-center subtitulo">
      <strong>CEDULAS DE NOTIFICACIÓN</strong>
      <q-separator/>
    </div>
    <q-table flat dense
      wrap-cells
      class="q-ma-sm q-my-lg"
      :data="resultados"
      :columns="columns"
      :pagination="pagination"
      :hide-pagination="true"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="no" :props="props">
            {{ ++props.rowIndex }}
          </q-td>
          <q-td key="folio_notificacion" :props="props">
            {{ props.row.no_folio_notificacion ? props.row.no_folio_notificacion : '--' }}
          </q-td>
          <q-td key="folio_acuerdo" :props="props">
            {{ props.row.no_folio_acuerdo ? props.row.no_folio_acuerdo : '--' }}
          </q-td>
          <q-td key="actuario" :props="props" >
            {{ getActuario(props.row) }}
          </q-td>
          <q-td key="proceso" :props="props">
            {{ getProceso(props.row) }}
          </q-td>
          <q-td key="expediente" :props="props">
            {{ props.row.expediente ? props.row.expediente : '--' }}
          </q-td>
          <q-td key="tipo_notificacion" :props="props">
            {{ getTipoNotificacion(props.row) }}
          </q-td>
          <q-td key="fecha_elaboracion_cedula" :props="props">
            {{ props.row.fecha_elaboracion_cedula | moment('DD MMM YYYY') }}
          </q-td>
          <q-td key="accion" :props="props">
            <a href="#" v-if="props.row.cedula_generada_at"
              class="q-mx-sm"
              @click.prevent="openModalPdf(props.row)"
            >
              <q-icon name="visibility" color="black" size="1.3em"/>
              <q-tooltip>Visualizar cedula</q-tooltip>
            </a>
            <a href="#"
              class="q-mx-sm"
              @click.prevent="$emit('open-editar', props.row)"
            >
              <q-icon name="fa fa-edit" color="black" size="1.3em"/>
              <q-tooltip>Editar datos cédula</q-tooltip>
            </a>
            <a href="#"
              class="q-mx-sm"
              @click.prevent="$emit('eliminar-resultado', props.row)"
            >
              <q-icon name="delete" color="black" size="1.3em"/>
              <q-tooltip>Borrar</q-tooltip>
            </a>
            <a class="puntero q-mx-sm">
              <q-icon name="more" color="black"
                size="1.5em" clickable
              >
                <q-menu fit>
                  <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup
                      v-if="props.row.cedula_generada_at && props.row.validated"
                      @click.prevent="openFormEditar(props.row)"
                    >
                      <q-item-section>
                        <q-icon name="edit" color="black" size="1.3em"/>
                        Editar
                      </q-item-section>
                    </q-item>

                    <q-separator/>

                    <q-item clickable v-close-popup
                      v-if="props.row.cedula_generada_at && props.row.validated"
                      @click.prevent="download(props.row)"
                    >
                      <q-item-section>
                        <q-icon name="get_app" color="black" size="1.5em"/>
                        Descargar
                      </q-item-section>
                    </q-item>

                    <q-separator/>

                    <q-item clickable v-close-popup v-if="props.row.validated"
                      @click.prevent="downloadWord(props.row)"
                    >
                      <q-item-section>
                        <q-icon name="fa fa-file-word" color="black" size="1.5em"/>
                        Descargar word
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

                    <q-separator/>

                    <q-item clickable v-close-popup
                      @click.prevent="actualizarPlantilla(props.row)"
                    >
                      <q-item-section>
                        <q-icon name="refresh" color="black" size="1.5em"/>
                        Actualizar plantilla actual
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
      <modal-info-cedula
        v-if="showInfo"
        :notificacion="notificacion"
        @close="closeInfoNotificacion"
      >
      </modal-info-cedula>
    </q-dialog>

    <q-dialog
      @hide="closeFormEditar"
      v-model="showFormEditar"
    >
      <form-notificacion-editar
        v-if="showFormEditar"
        :notificacion="notificacion"
        @updateNotificacion="updateNotificacion"
        @close="closeFormEditar"
      >
      </form-notificacion-editar>
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
import ModalInfoCedula from 'components/GeneracionCedulas/Detalle/ModalInfoCedula';
import FormNotificacionEditar from 'components/ExpedienteConsulta/NotificacionesConsulta/Notificaciones/FormNotificacionEditar';

export default {
  name: 'tabla-cedulas',
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
      notificacion: null,
      fetchingNotificacion: false,
      showInfo: false,
      showFormEditar: false,
      pagination: {
        rowsPerPage: -1,
      },
      columns: [
        {
          name: 'no', label: 'No', field: 'no', sortable: false, align: 'left', style: 'width: 3%',
        },
        {
          name: 'folio_notificacion', label: 'Folio notificación', field: 'folio_notificacion', sortable: false, align: 'left', style: 'width: 8%',
        },
        {
          name: 'folio_acuerdo', label: 'Folio acuerdo', field: 'folio_acuerdo', sortable: false, align: 'left', style: 'width: 8%',
        },
        {
          name: 'actuario', label: 'Actuario', field: 'actuario', sortable: false, align: 'left', style: 'width: 13%',
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
          name: 'accion', label: '', field: 'accion', sortable: false, align: 'right', style: 'width: 12%',
        },
      ],
    };
  },
  components: {
    QDialog,
    ModalPdf,
    QSeparator,
    ModalInfoCedula,
    FormNotificacionEditar,
  },
  computed: {
    actuarios() {
      return this.$store.getters['actuarios/getActuariosAll'];
    },
  },
  methods: {
    getActuario(row) {
      if (row.actuario_id != null) {
        const actuario = this.$store.getters['actuarios/getActuarioByActuarioId'](row.actuario_id);
        return actuario.actuario;
      }
      return '';
    },
    getProceso(row) {
      if (row.no_folio_actuacion) {
        const folio = row.no_folio_actuacion.split('/');
        return `${row.proceso} (${folio[0]})`;
      }
      return row.proceso;
    },
    getTipoNotificacion(row) {
      const tipo = this.$store.getters['tiposNotificaciones/getTipoNotificacionByTipoNotificacionId'](row.tipo_id);
      return tipo
        ? tipo.descripcion
        : row.tipo_notificacion.charAt(0).toUpperCase() + row.tipo_notificacion.slice(1);
    },
    closeModalPdf() {
      this.previsualizarPdf = false;
      this.nombreNotificacion = '';
      this.fetchingNotificacion = false;
      this.base64 = '';
      this.notificacion = null;
    },
    async actualizarPlantilla(row) {
      try {
        Loading.show();
        await this.$store.dispatch('areaTrabajoCedulas/addUpdateCedula', {
          uuid: this.areaTrabajoCedulas.id,
          notificacion: row,
          actualizar_plantilla: true,
        });
        Loading.hide();
        Notify.create({
          message: 'Plantilla actualizada correctemente.',
          position: 'bottom',
        });
        return Promise.resolve(true);
      } catch (e) {
        errors(e);
        Loading.hide();
        return Promise.reject(true);
      }
    },
    async openModalPdf(row) {
      this.fetchingNotificacion = true;
      this.previsualizarPdf = true;
      this.nombreNotificacion = row.no_folio_notificacion;

      try {
        const response = await sidjbridge.get(`/descargas/notificaciones/${row.id}/base64`);
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
    openFormEditar(row) {
      this.notificacion = {
        ...row,
        fecha_elaboracion: row.fecha_elaboracion_cedula,
      };
      this.showFormEditar = true;
    },
    closeFormEditar() {
      this.notificacion = null;
      this.showFormEditar = false;
    },
    updateNotificacion(row) {
      this.$emit('updateNotificacion', row);
    },
    openInfo(row) {
      this.notificacion = row;
      this.showInfo = true;
    },
    closeInfoNotificacion() {
      this.notificacion = null;
      this.showInfo = false;
    },
    async download(row) {
      try {
        Loading.show({
          message: 'Cargando...',
        });
        const response = await sidjbridge.get(`descargas/notificaciones/${row.id}/base64`);
        Loading.hide();

        const linkSource = `data:application/pdf;base64,${response.data}`;
        const downloadLink = document.createElement('a');
        const fileName = `${row.no_folio_notificacion}.pdf`;

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
    async downloadWord(row) {
      try {
        Loading.show({
          message: 'Cargando...',
        });
        const resp = await sidjbridge.post(
          '/cedulas/temporal-word/base64', {
            uuid_atc: this.areaTrabajoCedulas.id,
            uuid_notificacion: row.id,
            downloadWord: true,
          },
        );
        Loading.hide();

        const linkSource = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${resp.data}`;
        const downloadLink = document.createElement('a');
        const fileName = `${row.no_folio_notificacion}.docx`;

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
  },
};
</script>
