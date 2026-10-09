<template>
  <transition name="fade">
    <div class="row q-mr-md q-mb-sm">
      <article class="SIDJ-box col-md-12">
        <section class="SIDJ-box-row">
          <div class="SIDJ-list SIDJ-list-state">
            <div>
              <span><strong>{{acuerdo.tipoacuerdo ? acuerdo.tipoacuerdo : '--' }}</strong></span>
              <span><strong>{{acuerdo.proceso}} {{folio_actuacion}}</strong></span>
              <span>{{acuerdo.expediente}}</span>
            </div>

            <div>
              <span>{{acuerdo.no_folio}}</span>
              <span>Folio acuerdo</span>
            </div>

            <div class="col-md-1">
              <a class="cursor"
                @click.prevent="$emit('openModalPdf', acuerdo)"
              >
                <q-icon name="visibility" color="black"
                  size="3em" clickable
                />
              </a>
              <q-tooltip>Visualizar</q-tooltip>
            </div>

            <div class="col-md-1">
              <a class="cursor"
                @click.prevent="$emit('openInfoAcuerdo', acuerdo)"
              >
                <q-icon name="info" color="black"
                  size="3em" clickable
                />
              </a>
              <q-tooltip>Información</q-tooltip>
            </div>

            <div class="col-md-1">
              <a class="cursor">
                <q-icon name="edit" color="black"
                  size="3em" clickable
                  @click.prevent="$emit('editar')"
                />
              </a>
              <q-tooltip>Editar observacion</q-tooltip>
            </div>

            <div class="col-md-1">
              <a class="cursor"
                @click.prevent="$emit('eliminar')"
              >
                <q-icon name="delete" color="black"
                  size="3em" clickable
                />
              </a>
              <q-tooltip>Borrar</q-tooltip>
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
