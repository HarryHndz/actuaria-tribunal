<template>
  <div class="q-pa-md">
    <div class="q-pa-sm q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Inicio" icon="home" to="/" />
        <q-breadcrumbs-el label="Búsqueda de carpetas" icon="search"/>
      </q-breadcrumbs>
    </div>

    <div class="q-gutter-y-sm">
      <div class="q-mb-sm text-center titulo">
        <strong>ADMINISTRACIÓN DE PLANTILLAS v{{env.VERSION_ADMIN_PLANTILLAS}}</strong>
      </div>

      <div class="SIDJ-box">
        <div class="row">
          <div class="col-md-12">
            <label class="q-ma-sm" for="query">Búsqueda</label>
            <q-input outlined
              id="query"
              autofocus
              stack-label
              autocomplete="off"
              name="query"
              label="Nombre de carpeta"
              class="q-ma-sm"
              v-model="filtros.query"
              v-on:keyup.enter="busqueda"
            />
            <q-btn class="q-ma-sm q-mt-md"
              color="warning"
              icon="search"
              label="Buscar"
              :loading="fetching"
              @click.prevent="busqueda"
            />
          </div>
        </div>
      </div>

      <div class="col-md-3 col-xs-12" align="right">
        <q-btn class="col-md-3 col-xs-12"
          color="yellow-9"
          icon="add"
          label="Agregar"
          :loading="fetching"
          @click.prevent="showModal = true"
        />
      </div>

      <div class="x_content text-center" v-if="fetching">
        <q-spinner
          size="4em"
          color="black"
          :thickness="5"
        />
      </div>

      <contenedor-grupos
        v-if="!fetching && resultados.length > 0"
        :resultados="resultados"
        @editar="openModal"
        @open-modal-info="openModalInfo"
        @open-modal-permisos="openModalPermisos"
        @open-modal-plantilla="openModalPlantilla"
      >
      </contenedor-grupos>

      <template v-if="resultados.length == 0 && !fetching">
        <div class="x_content">
          <h6 class="text-center">No se encontraron resultados</h6>
        </div>
      </template>

      <div  v-if="pagination.total > 10 && !fetching"
        class="q-pa-lg flex flex-center"
      >
        <q-pagination
          v-model="filtros.page"
          color="pink-10"
          :min="1"
          :max="pagination.total_pages"
          :max-pages="6"
          :direction-links="true"
          @input="busqueda"
        >
        </q-pagination>
      </div>
    </div>

    <q-dialog
      @hide="closeModal"
      v-model="showModal"
    >
      <form-grupo
        :grupo="grupoSelected"
        @cerrar="closeModal"
      ></form-grupo>
    </q-dialog>

    <q-dialog
      @hide="closeModalInfo"
      v-model="showModalInfo"
    >
      <modal-info-grupo
        :grupo="grupoSelected"
        @cerrar="closeModalInfo"
      ></modal-info-grupo>
    </q-dialog>

    <q-dialog
      @hide="closeModalPermisos"
      v-model="showModalPermisos"
    >
      <form-permisos
        :grupo="grupoSelected"
        @cerrar="closeModalPermisos"
      ></form-permisos>
    </q-dialog>

    <q-dialog
      v-model="showModalPlantilla"
    >
      <form-plantilla-editar
        :grupo="grupoSelected"
        @cerrar="closeModalPlantilla"
      ></form-plantilla-editar>
    </q-dialog>
  </div>
</template>

<script>
import {
  QInput,
  Loading,
  QDialog,
  QSpinner,
  QPagination,
  QBreadcrumbs,
  QSpinnerGears,
  QBreadcrumbsEl,
} from 'quasar';

import axios from 'axios';
import env from 'boot/env';
import errors from 'boot/errors';

import FormGrupo from 'components/GrupoPlantillas/Busqueda/FormGrupo';
import ModalInfoGrupo from 'components/GrupoPlantillas/Busqueda/ModalInfoGrupo';
import FormPermisos from 'components/GrupoPlantillas/Consulta/Permisos/FormPermisos';
import ContenedorGrupos from 'components/GrupoPlantillas/Busqueda/ContenedorGrupos';
import FormPlantillaEditar from 'components/GrupoPlantillas/Consulta/Plantillas/FormPlantillaEditar';

import 'src/css/SIDJ-style.css';

export default {
  name: 'plantillas-busqueda',
  data() {
    return {
      fetching: false,
      showModal: false,
      showModalInfo: false,
      showModalPermisos: false,
      showModalPlantilla: false,
      grupoSelected: null,
      filtros: {
        query: '',
        page: 1,
        limit: 10,
        include: 'plantillas',
        order_by_updated_at: 'desc',
      },
    };
  },

  components: {
    QInput,
    QDialog,
    QSpinner,
    FormGrupo,
    QPagination,
    QBreadcrumbs,
    FormPermisos,
    QBreadcrumbsEl,
    ModalInfoGrupo,
    ContenedorGrupos,
    FormPlantillaEditar,
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
    this.$emit('leftDrawerOpen', false);
    this.fetching = true;
    try {
      await this.$store.dispatch('gruposPlantillas/fetchAllGruposPlantillas', {
        ...this.filtros,
        user_id: this.session.user_id,
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
    resultados() {
      return this.$store.getters['gruposPlantillas/getGruposPlantillasVisibles'];
    },
    pagination() {
      return this.$store.getters['gruposPlantillas/getGruposPlantillasPagination'];
    },
    session() {
      return this.$store.getters['session/getUsuario'];
    },
  },
  methods: {
    async busqueda(page) {
      this.fetching = true;
      if (!Number.isInteger(page)) {
        this.filtros.page = 1;
        page = 1;
      }
      try {
        await this.$store.dispatch('gruposPlantillas/fetchAllGruposPlantillas', {
          ...this.filtros,
          page,
          user_id: this.session.user_id,
        });

        if (this.pagination.total === 1) {
          this.$router.push({
            name: 'grupo-plantillas-consulta',
            params: {
              uuid: this.resultados[0].id,
            },
          });
        }

        this.fetching = false;
        return Promise.resolve(true);
      } catch (e) {
        errors(e);
        this.fetching = false;
        return Promise.reject(true);
      }
    },
    openModal(grupo) {
      this.grupoSelected = grupo;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.grupoSelected = null;
    },
    openModalInfo(grupo) {
      this.grupoSelected = grupo;
      this.showModalInfo = true;
    },
    closeModalInfo() {
      this.showModalInfo = false;
      this.grupoSelected = null;
    },
    openModalPermisos(grupo) {
      this.grupoSelected = grupo;
      this.showModalPermisos = true;
    },
    closeModalPermisos() {
      this.showModalPermisos = false;
      this.grupoSelected = null;
    },
    openModalPlantilla(grupo) {
      this.grupoSelected = grupo;
      this.showModalPlantilla = true;
    },
    async closeModalPlantilla() {
      this.fetching = true;
      this.showModalPlantilla = false;
      this.grupoSelected = null;

      try {
        await this.$store.dispatch('gruposPlantillas/fetchAllGruposPlantillas', {
          ...this.filtros,
          user_id: this.session.user_id,
        });
        this.fetching = false;
        return Promise.resolve(true);
      } catch (e) {
        errors(e);
        this.fetching = false;
        return Promise.reject(true);
      }
    },
  },
};
</script>

<style scoped>
.SIDJ-box {
  padding: 10px !important;
}
</style>
