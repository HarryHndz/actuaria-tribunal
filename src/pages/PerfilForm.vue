<template>
  <div class="q-pa-lg">
    <div class="q-gutter-y-md" >
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="perfil" label="Perfil" />
          <q-tab name="usuario" label="Usuario" />
          <q-tab name="localizacion" label="Localización" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="perfil">
            <perfil-form
              :perfil="perfil"
              :fetching="fetching"
              @updateSession="updateSession"
            ></perfil-form>
          </q-tab-panel>

          <q-tab-panel name="usuario">
            <usuario-form
              :usuario="usuario"
              :fetching="fetching"
              @updateSession="updateSession"
            ></usuario-form>
          </q-tab-panel>

          <q-tab-panel name="localizacion">
            <localizacion-form
              :fetching="fetching"
              :localizacion="localizacion"
              @updateSession="updateSession"
            ></localizacion-form>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import {
  QCard,
  QSeparator,
  QTab,
  QTabPanel,
  QTabPanels,
  QTabs,
  QSpinnerGears,
  Loading,
  Notify,
} from 'quasar';

import axios from 'axios';


import PerfilForm from '../components/LoginForm/PerfilForm';
import UsuarioForm from '../components/LoginForm/UsuarioForm';
import LocalizacionForm from '../components/LoginForm/LocalizacionForm';

export default {
  name: 'form-perfil',
  preFetch({ store }) {
    Loading.show({
      spinner: QSpinnerGears,
      backgroundColor: 'pink-8',
    });
    return axios.all([
      store.dispatch('session/fetchSession'),
      store.dispatch('areas/fetchAllAreas', {
        cache: true,
        limit: -1,
      }),
      store.dispatch('ubicacionesFisicas/fetchAllUbicacionesFisicas', {
        limit: -1,
      }),
    ]).then(() => {
      Loading.hide();
    });
  },
  data() {
    return {
      tab: 'perfil',
      showMessage: false,
      fetching: false,
    };
  },
  components: {
    QCard,
    QSeparator,
    QTab,
    QTabPanel,
    QTabPanels,
    QTabs,
    PerfilForm,
    UsuarioForm,
    LocalizacionForm,
  },
  computed: {
    usuario() {
      return this.$store.getters['session/getUsuario'];
    },
    perfil() {
      return this.usuario ? this.usuario.perfil : {};
    },
    localizacion() {
      return this.usuario.localizacion;
    },
  },
  methods: {
    updateSession(formData) {
      this.fetching = true;
      return this.$store.dispatch('session/putSession', formData)
        .then(() => {
          this.fetching = false;
          Notify.create({
            message: 'Usuario actualizado correctamente',
          });
        });
    },
  },
};
</script>
