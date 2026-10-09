<template>
  <div class="q-pa-md">
    <div class="q-pa-sm q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Inicio" icon="home" to="/" />
        <q-breadcrumbs-el label="Búsqueda de carpetas" icon="search"
          :to="{ name: 'grupo-plantillas-busqueda' }"
        />
        <q-breadcrumbs-el label="Administración de plantillas" icon="input"/>
      </q-breadcrumbs>
    </div>

    <div class="q-gutter-y-sm">
      <div class="q-mb-sm text-center titulo">
        <strong>ADMINISTRACIÓN DE PLANTILLAS v{{env.VERSION_ADMIN_PLANTILLAS}}</strong>
      </div>

      <div class="x_content text-center" v-if="fetching">
        <q-spinner
          color="black"
          size="4em"
          :thickness="5"
        />
      </div>

      <box-info-grupo
        v-if="!fetching"
        :grupo="grupo"
        @editar="showModal = true"
      ></box-info-grupo>

      <div class="row q-mt-lg" v-if="!fetching">
        <div class="col-md-9 col-xs-12">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="plantillas" label="Plantillas" />
            <q-tab name="permisos" label="Permisos" v-if="isOwner"/>
            <q-tab name="procesos" label="Procesos" v-if="isOwner"/>
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="plantillas">
              <contenedor-plantillas
                :plantillas="plantillas"
                @editar="openModalPlantillaEditar"
                @agregar="showModalPlantillaEditar = true"
              ></contenedor-plantillas>
            </q-tab-panel>

            <q-tab-panel name="permisos" v-if="isOwner">
              <contenedor-permisos
                :id="grupo.id"
                :permisos="grupo.permisos"
                @agregar="showModalPermisos = true"
              ></contenedor-permisos>
            </q-tab-panel>

            <q-tab-panel name="procesos" v-if="isOwner">
              <contenedor-procesos
                :id="grupo.id"
                :procesos="grupo.procesos"
                @agregar="showModalProcesos = true"
              ></contenedor-procesos>
            </q-tab-panel>
          </q-tab-panels>
        </div>

        <div class="col-md-3 col-xs-12" v-if="!fetching">
          <q-uploader
            url=""
            batch
            multiple
            auto-upload
            color="white"
            method="POST"
            accept=".docx"
            ref="uploader"
            text-color="black"
            class="q-ml-md"
            style="width: 92%;"
            :factory="uploadFile"
            :filter="checkFile"
            label="Subir plantilla"
            @added="addFile"
            @removed="removed"
            @failed="failed"
          />
        </div>
      </div>
    </div>

    <q-dialog
      @hide="showModalPermisos = false"
      v-model="showModalPermisos"
    >
      <form-permisos
        :grupo="grupo"
        @cerrar="showModalPermisos = false"
      ></form-permisos>
    </q-dialog>

    <q-dialog
      @hide="showModalProcesos = false"
      v-model="showModalProcesos"
    >
      <form-procesos
        :grupo="grupo"
        @cerrar="showModalProcesos = false"
      ></form-procesos>
    </q-dialog>

    <q-dialog
      @hide="showModal = false"
      v-model="showModal"
    >
      <form-grupo
        :grupo="grupo"
        @cerrar="showModal = false"
      ></form-grupo>
    </q-dialog>

    <q-dialog
      @hide="closeModalPlantilla"
      v-model="showModalPlantilla"
    >
      <form-plantilla
        :grupo="grupo"
        :plantilla_files="plantilla_files"
        @cerrar="closeModalPlantilla"
      ></form-plantilla>
    </q-dialog>

    <q-dialog
      @hide="closeModalMultiplePlantilla"
      v-model="showModalMultiplePlantilla"
    >
      <form-multiple-plantillas
        :grupo="grupo"
        :plantilla_files="plantilla_files"
        @cerrar="closeModalMultiplePlantilla"
      ></form-multiple-plantillas>
    </q-dialog>

    <q-dialog
      @hide="closeModalPlantillaEditar"
      v-model="showModalPlantillaEditar"
    >
      <form-plantilla-editar
        :grupo="grupo"
        :plantilla="plantilla"
        @cerrar="closeModalPlantillaEditar"
      ></form-plantilla-editar>
    </q-dialog>
  </div>
</template>

<script>
import {
  QTab,
  QTabs,
  QTabPanel,
  QTabPanels,
  Loading,
  QDialog,
  QSpinner,
  QUploader,
  QSeparator,
  QBreadcrumbs,
  QSpinnerGears,
  QBreadcrumbsEl,
} from 'quasar';

import axios from 'axios';
import env from 'boot/env';
import errors from 'boot/errors';
import infoFile from 'boot/infoFile';

import FormGrupo from 'components/GrupoPlantillas/Busqueda/FormGrupo';
import BoxInfoGrupo from 'components/GrupoPlantillas/Consulta/BoxInfoGrupo';
import FormPermisos from 'components/GrupoPlantillas/Consulta/Permisos/FormPermisos';
import FormProcesos from 'components/GrupoPlantillas/Consulta/Procesos/FormProcesos';
import FormPlantilla from 'components/GrupoPlantillas/Consulta/Plantillas/FormPlantilla';
import ContenedorPermisos from 'components/GrupoPlantillas/Consulta/Permisos/ContenedorPermisos';
import ContenedorProcesos from 'components/GrupoPlantillas/Consulta/Procesos/ContenedorProcesos';
import FormPlantillaEditar from 'components/GrupoPlantillas/Consulta/Plantillas/FormPlantillaEditar';
import ContenedorPlantillas from 'components/GrupoPlantillas/Consulta/Plantillas/ContenedorPlantillas';
import FormMultiplePlantillas from 'components/GrupoPlantillas/Consulta/Plantillas/FormMultiplePlantillas';

export default {
  name: 'grupo-plantillas-consulta',
  props: {
    uuid: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      tab: 'plantillas',
      sizeAllowed: 4,
      fetching: false,
      showModal: false,
      filesUploaded: 0,
      filesUploadedTotal: 0,
      showModalPermisos: false,
      showModalProcesos: false,
      showModalPlantilla: false,
      showModalPlantillaEditar: false,
      showModalMultiplePlantilla: false,
      plantilla: null,
      plantilla_files: [],
    };
  },
  components: {
    QTab,
    QTabs,
    QTabPanel,
    QTabPanels,
    QDialog,
    QSpinner,
    QUploader,
    FormGrupo,
    QSeparator,
    FormPermisos,
    FormProcesos,
    QBreadcrumbs,
    BoxInfoGrupo,
    FormPlantilla,
    QBreadcrumbsEl,
    ContenedorProcesos,
    ContenedorPermisos,
    FormPlantillaEditar,
    ContenedorPlantillas,
    FormMultiplePlantillas,
  },
  async preFetch({ store }) {
    Loading.show({
      spinner: QSpinnerGears,
      backgroundColor: 'pink-8',
    });
    try {
      await axios.all([
        store.dispatch('session/fetchSession'),
        store.dispatch('usuarios/fetchAllUsuarios', {
          limit: -1,
        }),
        store.dispatch('procesos/fetchAllProcesos', {
          isproceso: true,
          limit: -1,
        }),
        store.dispatch('tiposLeyendas/fetchAllTiposLeyendas', {
          limit: -1,
        }),
      ]);
      Loading.hide();
      return Promise.resolve(true);
    } catch (e) {
      errors(e);
      Loading.hide();
      return Promise.reject(true);
    }
  },
  async beforeMount() {
    this.fetching = true;
    this.$emit('leftDrawerOpen', false);
    try {
      await this.$store.dispatch('gruposPlantillas/fetchGrupoPlantillas', {
        uuid: this.uuid,
      });
      await this.$store.dispatch('plantillas/fetchAllPlantillas', {
        grupoId: this.grupo.grupo_id,
        include: 'archivoPlantilla',
        limit: -1,
      });
      this.fetching = false;
      return Promise.resolve(true);
    } catch (e) {
      errors(e);
      this.fetching = false;
      return Promise.reject(true);
    }
  },
  computed: {
    env() {
      return env;
    },
    grupo() {
      return this.$store.getters['gruposPlantillas/getGrupoPlantillasById'](this.uuid);
    },
    plantillas() {
      return this.$store.getters['plantillas/getGrupoPlantillasByGrupoId'](this.grupo.grupo_id);
    },
    isOwner() {
      return this.grupo.user_id === this.session.user_id
        || this.session.permisos.roles.id.indexOf(1) !== -1;
    },
    session() {
      return this.$store.getters['session/getUsuario'];
    },
  },
  methods: {
    addFile(file) {
      this.filesUploadedTotal += file.length;
      this.filesUploaded = file.length;
    },
    removed(file) {
      this.filesUploadedTotal -= file.length;
    },
    failed(info) {
      console.log(info);
    },
    checkFile(files) {
      const re = /(?:\.([^.]+))?$/;
      let array = files.filter(file => file.size < this.sizeAllowed * 1024 * 1024);
      if (array.length === 0) {
        this.$swal({
          title: `No está permitido subir\n archivos de más de ${this.sizeAllowed}mb`,
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        });
      }
      array = array.filter(file => re.exec(file.name)[1] === 'docx');
      if (array.length === 0) {
        this.$swal({
          title: 'Solo estan permitidos archivos .docx',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        });
      }
      return array;
    },
    async uploadFile(files) {
      if (files.length > 0) {
        Loading.show();
        this.plantilla_files = [];

        files.forEach(async (file) => {
          try {
            const res = await infoFile(file);
            const fd = new FormData();
            fd.append('file', file);
            fd.append('hash', res.hash);

            const response = await this.$store.dispatch('archivos/postArchivosTemporales', fd);
            Loading.hide();
            this.plantilla_files.push(response.data.data);

            if (this.filesUploaded === 1) {
              this.showModalPlantilla = true;
            }
            if (this.filesUploaded > 1) {
              this.showModalMultiplePlantilla = true;
            }

            return Promise.resolve(response.data.data);
          } catch (e) {
            errors(e);
            Loading.hide();
            return Promise.reject(true);
          }
        });
        return Promise.resolve(true);
      }
      return Promise.resolve(true);
    },
    closeModalPlantilla() {
      this.$refs.uploader.reset();
      this.showModalPlantilla = false;
      this.plantilla_files = null;
    },
    closeModalMultiplePlantilla() {
      this.$refs.uploader.reset();
      this.showModalMultiplePlantilla = false;
      this.plantilla_files = null;
    },
    openModalPlantillaEditar(plantilla) {
      this.plantilla = plantilla;
      this.showModalPlantillaEditar = true;
    },
    closeModalPlantillaEditar() {
      this.plantilla = null;
      this.showModalPlantillaEditar = false;
    },
  },
};
</script>

<style scoped>
.SIDJ-box {
  padding: 0px !important;
}
</style>
