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
        :loading="fetching"
        @click.prevent="editarListado"
      > Editar
      </q-btn>
      <q-btn color="primary" v-if="!listadoAcuerdo.fecha_boletin && edicion"
        class="q-my-sm q-mx-sm"
        icon="save"
        @click.prevent="updateListado"
      > Guardar
      </q-btn>
      <span class="text-red text-center" v-if="listadoAcuerdo.fecha_baja && !edicion">
        <strong>BAJA</strong>
      </span>
      <span class="text-green text-center" v-else-if="listadoAcuerdo.fecha_boletin && !edicion">
        <strong>PÚBLICO</strong>
      </span>
    </q-card-actions>
  </q-card>
</template>

<script>
import {
  QCard,
  QCardSection,
  QCardActions,
} from 'quasar';

import moment from 'moment';

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
    timeServer() {
      return this.$store.getters['session/getTimeServer'];
    },
  },
  methods: {
    editarListado() {
      this.fetching = true;
      return this.$store.dispatch('session/fetchTimeServer').then(() => {
        this.fetching = false;
        const dateMoment = moment(this.listadoAcuerdo.fecha_publicacion)
          .hour(16)
          .minute(59)
          .second(59);

        return moment(this.timeServer).isBefore(dateMoment);
      }).then((resp) => {
        if (resp) {
          this.$emit('editarListado');
        } else {
          this.$swal({
            title: 'Se ha terminado el tiempo para editar este listado',
            icon: 'warning',
          });
        }
      });
    },
    updateListado() {
      this.fetching = true;
      return this.$store.dispatch('session/fetchTimeServer').then(() => {
        this.fetching = false;
        const dateMoment = moment(this.listadoAcuerdo.fecha_publicacion)
          .hour(16)
          .minute(59)
          .second(59);

        return moment(this.timeServer).isBefore(dateMoment);
      }).then((resp) => {
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
      });
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
