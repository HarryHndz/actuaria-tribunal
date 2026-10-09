<template>
  <transition name="fade">
    <div class="row q-mr-md q-mb-sm">
      <article class="SIDJ-box col-md-12">
        <section class="SIDJ-box-row">
          <div class="SIDJ-list SIDJ-list-state">
            <div>
              <span><strong>{{acuerdo.tipoacuerdo ? acuerdo.tipoacuerdo : '--' }}</strong></span>
              <span>
                <strong>{{acuerdo.proceso ? acuerdo.proceso : ''}} {{folio_actuacion}}</strong>
              </span>
              <span>{{expediente(acuerdo)}}</span>
            </div>

            <div>
              <span>{{acuerdo.no_folio ? acuerdo.no_folio : 'N/A'}}</span>
              <span class="text-caption">Folio acuerdo</span>
            </div>

            <div class="col-md-1" v-if="acuerdo.acuerdos_id">
              <a class="cursor"
                @click.prevent="$emit('open-modal-pdf', acuerdo)"
              >
                <q-icon
                  clickable
                  size="3em"
                  color="black"
                  name="visibility"
                />
              </a>
              <q-tooltip>Visualizar</q-tooltip>
            </div>

            <div class="col-md-1">
              <a class="cursor"
                @click.prevent="$emit('open-info-acuerdo', acuerdo)"
              >
                <q-icon
                  clickable
                  size="3em"
                  name="info"
                  color="black"
                />
              </a>
              <q-tooltip>Información</q-tooltip>
            </div>

            <div class="col-md-1" v-if="acuerdo.boletin_notificacion_generada_at">
              <a class="cursor"
                @click.prevent="$emit('open-modal-pdf-notificacion', acuerdo)"
              >
                <q-icon
                  clickable
                  size="3em"
                  name="print"
                  color="black"
                />
              </a>
              <q-tooltip>Notificación por lista</q-tooltip>
            </div>

            <div v-if="edicion">
              <a class="cursor"
                @click.prevent="$emit(acuerdo.acuerdos_id ? 'editar' : 'editar-acuerdo')"
              >
                <q-icon
                  clickable
                  size="3em"
                  name="edit"
                  color="black"
                />
              </a>
              <q-tooltip>{{acuerdo.acuerdos_id ? 'Editar observaciones' : 'Editar'}}</q-tooltip>
            </div>

            <div v-if="edicion">
              <a class="cursor"
                @click.prevent="$emit('eliminar')"
              >
                <q-icon
                  clickable
                  size="3em"
                  color="black"
                  name="delete"
                />
              </a>
              <q-tooltip>Borrar acuerdo</q-tooltip>
            </div>
          </div>
        </section>
      </article>
    </div>
  </transition>
</template>

<script>
import {
  QIcon,
  QTooltip,
} from 'quasar';

export default {
  name: 'listado-resultado',
  props: {
    acuerdo: {
      type: Object,
      required: true,
    },
    edicion: {
      type: Boolean,
      required: true,
    },
    tipoListado: {
      type: Object,
      required: true,
    },
  },
  components: {
    QIcon,
    QTooltip,
  },
  computed: {
    folio_actuacion() {
      if (this.acuerdo.no_folio_actuacion) {
        const data = this.acuerdo.no_folio_actuacion.split('/');
        return `(${data[0]})`;
      }
      return null;
    },
  },
  methods: {
    expediente(acuerdo) {
      if (this.tipoListado.tipo_listado_id === 2) {
        return acuerdo.no_consignacion;
      }
      if (this.tipoListado.tipo_listado_id === 3) {
        return acuerdo.no_exhorto;
      }
      return acuerdo.expediente ?? '--';
    },
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  visibility: visible;
  opacity: 1;
  transition: opacity .5s linear;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s .5s, opacity .5s linear;
}
.cursor{
  cursor: pointer;
}
</style>
