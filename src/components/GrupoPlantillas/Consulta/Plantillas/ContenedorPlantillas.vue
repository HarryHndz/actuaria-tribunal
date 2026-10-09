<template>
  <section>
    <q-table flat dense
      wrap-cells
      class="q-ma-sm"
      :data="plantillasOrdered"
      :columns="columns"
      :pagination="pagination"
      :hide-pagination="true"
    >
      <template v-slot:top-left>
        <div class="titulo">Plantillas</div>
      </template>

      <template v-slot:top-right>
        <q-btn class="q-mr-sm q-mt-none"
          color="yellow-9"
          icon="add"
          label="Agregar"
          @click.prevent="$emit('agregar', true)"
        />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nombre" :props="props">
            {{ props.row.nombre }}
          </q-td>
          <q-td key="comentarios" :props="props">
            {{ props.row.comentarios ? props.row.comentarios : '--' }}
          </q-td>
          <q-td key="fecha_modificado" :props="props">
            {{ props.row.updated_at | moment('DD MMM YYYY hh:mm:ss a') }}
          </q-td>
          <q-td key="accion" :props="props">
            <a href="#" class="q-mx-sm"
              @click.prevent="openModalPdf(props.row)"
            >
              <q-icon name="visibility" color="black"
                size="1.5em" clickable
              />
              <q-tooltip>Visualizar</q-tooltip>
            </a>
            <a class="q-mx-sm puntero"
            >
              <q-icon name="more" color="black"
                size="1.5em" clickable
              >
                <q-menu fit>
                  <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup
                      @click.prevent="$emit('editar', props.row)"
                    >
                      <q-item-section>
                        <q-icon name="edit" color="black"
                          size="1.5em" clickable
                        /> Editar
                      </q-item-section>
                    </q-item>

                    <q-separator/>

                    <q-item clickable v-close-popup
                      @click.prevent="descargar(props.row)"
                    >
                      <q-item-section>
                        <q-icon name="get_app" color="black"
                          size="1.5em" clickable
                        /> Descargar
                      </q-item-section>
                    </q-item>

                    <q-separator/>

                    <q-item clickable v-close-popup
                      @click.prevent="openModalInfo(props.row)"
                    >
                      <q-item-section>
                        <q-icon name="info" color="black"
                          size="1.5em" clickable
                        /> Informacion
                      </q-item-section>
                    </q-item>

                    <q-separator/>

                    <q-item clickable v-close-popup
                      @click.prevent="eliminar(props.row)"
                    >
                      <q-item-section>
                        <q-icon name="delete" color="black"
                          size="1.5em" clickable
                        /> Borrar
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
        :nombreDocumento="nombreDocumento"
        :fetchingDocumento="fetchingDocumento"
        :errorB64="errorB64"
        @close="closeModalPdf"
      >
      </modal-pdf>
    </q-dialog>

    <q-dialog
      @hide="closeModalInfo"
      v-model="showModalInfo"
    >
      <modal-info-plantilla
        :plantilla="plantillaSelected"
        @close="closeModalPdf"
      >
      </modal-info-plantilla>
    </q-dialog>
  </section>
</template>

<script>
import {
  Loading,
  Notify,
  QDialog,
} from 'quasar';

import _ from 'lodash';

import errors from 'boot/errors';
import sidjbridge from 'boot/sidjbridge';

import ModalPdf from 'components/Generales/ModalPdf';
import ModalInfoPlantilla from './ModalInfoPlantilla';

export default {
  name: 'contenedor-grupos',
  props: {
    plantillas: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      showModalInfo: false,
      previsualizarPdf: null,
      nombreDocumento: null,
      fetchingDocumento: null,
      base64: null,
      errorB64: null,
      plantillaSelected: null,
      pagination: {
        rowsPerPage: 0,
      },
      columns: [
        {
          name: 'nombre', label: 'Nombre', field: 'nombre', sortable: false, align: 'left', style: 'width: 25%',
        },
        {
          name: 'comentarios', label: 'Comentarios', field: 'comentarios', sortable: false, align: 'left', style: 'width: 56%',
        },
        {
          name: 'fecha_modificado', label: 'Fecha modificado', field: 'fecha_modificado', sortable: true, align: 'left', style: 'width: 12%',
        },
        {
          name: 'accion', label: '', field: 'accion', sortable: false, align: 'center', style: 'width: 7%',
        },
      ],
    };
  },
  components: {
    QDialog,
    ModalPdf,
    ModalInfoPlantilla,
  },
  computed: {
    plantillasOrdered() {
      return _.orderBy(this.plantillas, ['created_at'], ['desc']);
    },
  },
  methods: {
    async descargar(row) {
      Loading.show();
      const response = await sidjbridge.get(`/descargas/plantillas/${row.id}`);
      Loading.hide();

      const linkSource = `data:${row.archivoPlantilla?.data?.mime};base64,${response.data}`;
      const downloadLink = document.createElement('a');
      const fileName = `${row.nombre}.${row.archivoPlantilla?.data?.extension}`;

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    },
    eliminar(row) {
      this.$swal({
        title: '¿Está seguro de borrar la plantilla?',
        text: 'Esta cambio no se podrá revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Borrar',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
      }).then(async (resp) => {
        if (resp.value) {
          try {
            await this.$store.dispatch('plantillas/deletePlantillas', { id: row.id });
            Notify.create({
              message: 'Registro borrado correctamente.',
              position: 'bottom',
            });
            return Promise.resolve(true);
          } catch (e) {
            errors(e);
            return Promise.reject(true);
          }
        }
        return Promise.resolve(true);
      });
    },
    closeModalPdf() {
      this.previsualizarPdf = false;
      this.nombreDocumento = '';
      this.fetchingDocumento = false;
      this.base64 = '';
    },
    openModalPdf(documento) {
      this.fetchingDocumento = true;
      this.previsualizarPdf = true;
      this.nombreDocumento = documento.nombre;

      return sidjbridge.get(`/descargas/plantillas/${documento.id}/base64`)
        .then((response) => {
          this.fetchingDocumento = false;
          this.base64 = response.data;
          return Promise.resolve(true);
        })
        .catch((e) => {
          errors(e);
          this.fetchingDocumento = false;
          this.base64 = '';
          this.errorB64 = e;
          return Promise.reject(true);
        });
    },
    openModalInfo(plantilla) {
      this.showModalInfo = true;
      this.plantillaSelected = plantilla;
    },
    closeModalInfo() {
      this.showModalInfo = false;
      this.plantillaSelected = null;
    },
  },
};
</script>
