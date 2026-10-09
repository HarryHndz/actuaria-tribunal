<template>
  <q-card dark bordered class="bg-white my-card q-mx-lg q-mt-sm">
    <q-card-section class="bg-pink-10">
      <div class="text-subtitle1 text-center">
        <strong>
          {{
            ponencia ?
            `${ponencia.ponencia}`
            : 'Listado de acuerdos'
          }}
        </strong>
      </div>
      <div class="text-subtitle5 text-center" v-if="listado.fecha_publicacion">
        Fecha publicación: {{fechaPublicacion}}
      </div>
    </q-card-section>

    <q-card-section class="q-pa-none q-ma-sm q-mt-md">
      <div class="contenido" v-if="ponencia">
        Acuerdos <br/>
        <span class="contador">{{resultados.length}}</span>
      </div>
    </q-card-section>

    <q-card-actions vertical class="q-pt-none">
      <q-btn color="red" v-if="disable"
        class="q-mb-sm q-mx-sm"
        icon="arrow_forward"
        @click.prevent="$emit('comenzar-listado')"
      > Comenzar
      </q-btn>

      <q-btn color="primary" v-if="!disable"
        class="q-mb-sm q-mx-sm"
        icon="save"
        :loading="fetching"
        :disabled="resultados.length === 0"
        @click.prevent="saveLista"
      > Guardar
      </q-btn>

      <q-btn color="amber" v-if="!disable"
        class="q-my-sm q-mx-sm"
        icon="refresh"
        @click.prevent="$emit('reiniciar-listado')"
      > Reiniciar
      </q-btn>
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
    disable: {
      required: true,
      type: Boolean,
    },
    listado: {
      required: false,
      type: Object,
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
    ponencia() {
      return this.$store.getters['ponencias/getPonenciaByPonenciaId'](this.listado.ponencia_id);
    },
    timeServer() {
      return this.$store.getters['session/getTimeServer'];
    },
    fechaPublicacion() {
      return this.listado.fecha_publicacion ? moment(this.listado.fecha_publicacion).format('MMM DD Y') : '--';
    },
  },
  methods: {
    saveLista() {
      this.fetching = true;
      return this.$store.dispatch('session/fetchTimeServer').then(() => {
        this.fetching = false;
        const dateMoment = moment(this.listado.fecha_publicacion)
          .hour(16)
          .minute(59)
          .second(59);

        return moment(this.timeServer).isBefore(dateMoment);
      }).then((resp) => {
        if (resp) {
          this.$emit('saveLista');
        } else {
          this.$swal({
            title: 'Fuera de tiempo',
            text: 'Este listado no se actualizará',
            icon: 'warning',
            timer: 2000,
          }).then(() => {
            this.$router.push({
              name: 'listado-notificaciones-comparecencia',
              params: {
                uuid: this.listado.id,
              },
            });
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
