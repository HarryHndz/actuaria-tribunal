<template>
  <q-card dark bordered class="bg-white my-card q-mx-lg q-mt-sm">
    <q-card-section class="bg-pink-10">
      <div class="text-subtitle2 text-center">Total</div>
    </q-card-section>

    <q-card-section class="q-pa-none q-ma-sm">
      <div class="contenido">
        Acuerdos <br/>
        <span class="contador">{{resultados.length}}</span>
      </div>
    </q-card-section>

    <q-card-actions vertical class="q-pt-none">
      <q-btn color="amber" v-if="!listadoAcuerdo.fecha_boletin && !edicion"
        class="q-my-sm q-mx-sm"
        icon="edit"
        label="Editar"
        :loading="fetching"
        @click.prevent="editarListado"
      />

      <q-btn color="primary" v-if="!listadoAcuerdo.fecha_boletin && edicion"
        class="q-my-sm q-mx-sm"
        icon="save"
        label="Guardar"
        @click.prevent="updateListado"
      />

      <span class="text-green text-center" v-if="listadoAcuerdo.fecha_boletin && !edicion">
        <strong>LISTADO PUBLICADO</strong>
      </span>

      <q-btn color="primary"
        v-if="listadoAcuerdo.fecha_boletin && hasNotificacionGenerated && !edicion"
        class="q-my-sm q-mx-sm"
        icon="print"
        label="Imprimir multiples cedulas"
        :loading="fetching"
        @click.prevent="descargarNotificacionByLista"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import {
  QCard,
  QCardSection,
  QCardActions,
  Loading,
} from 'quasar';

import moment from 'moment';
import printJS from 'print-js';

import errors from 'boot/errors';
import sidjbridge from 'boot/sidjbridge';

export default {
  name: 'listado-widget',
  props: {
    resultados: {
      required: true,
      type: Array,
    },
    listadoAcuerdo: {
      required: true,
      type: Object,
    },
    edicion: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      fetching: false,
    };
  },
  components: {
    QCard,
    QCardSection,
    QCardActions,
  },
  computed: {
    hasNotificacionGenerated() {
      return this.listadoAcuerdo.lista.some(i => i.boletin_notificacion_generada_at);
    },
    timeServer() {
      return this.$store.getters['session/getTimeServer'];
    },
  },
  methods: {
    async descargarNotificacionByLista() {
      try {
        Loading.show({
          message: 'Cargando...',
        });
        const response = await sidjbridge.post(`descargas/notificaciones/listados-acuerdos/${this.listadoAcuerdo.id}/base64`);
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
      } catch (e) {
        Loading.hide();
        errors(e);
        return Promise.reject(true);
      }
    },
    async editarListado() {
      this.fetching = true;
      try {
        await this.$store.dispatch('session/fetchTimeServer');
        this.fetching = false;
        const dateMoment = moment(this.listadoAcuerdo.fecha_publicacion)
          .hour(11)
          .minute(59)
          .second(59);
        const resp = moment(this.timeServer).isBefore(dateMoment);
        if (resp) {
          this.$emit('editarListado');
        } else {
          this.$swal({
            title: 'Se ha terminado el tiempo para editar este listado',
            icon: 'warning',
          });
        }
        return Promise.resolve(true);
      } catch (e) {
        Loading.hide();
        errors(e);
        return Promise.reject(true);
      }
    },
    async updateListado() {
      this.fetching = true;
      try {
        await this.$store.dispatch('session/fetchTimeServer');
        this.fetching = false;
        const dateMoment = moment(this.listadoAcuerdo.fecha_publicacion)
          .hour(11)
          .minute(59)
          .second(59);
        const resp = moment(this.timeServer).isBefore(dateMoment);
        if (resp) {
          this.$emit('updateListado');
        } else {
          this.$swal({
            title: 'Fuera de tiempo',
            text: 'Este listado no se actualizará',
            icon: 'warning',
            timer: 2000,
          }).then(() => {
            this.$router.go();
          });
        }
        return Promise.resolve(true);
      } catch (e) {
        Loading.hide();
        errors(e);
        return Promise.reject(true);
      }
    },
  },
};
</script>

<style scoped>
.contenido{
  text-align: center;
  color: black;
  font-weight: bold
}
.contador{
  font-size: 38px;
}
.my-card{
  box-shadow: 1px 1px 5px 1px #888888;
  clear: both;
}
</style>
