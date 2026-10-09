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
              <span>Folio</span>
            </div>

            <div class="col-md-1">
              <a class="cursor"
                @click.prevent="$emit('open-modal-pdf', acuerdo)"
              >
                <q-icon name="visibility" color="black"
                  size="3em" clickable
                />
              </a>
              <q-tooltip>Visualizar</q-tooltip>
            </div>

            <div class="col-md-1">
              <a class="cursor"
                @click.prevent="$emit('open-info-acuerdo', acuerdo)"
              >
                <q-icon name="info" color="black"
                  size="3em" clickable
                />
              </a>
              <q-tooltip>Información</q-tooltip>
            </div>

            <div v-if="edicion">
              <a class="cursor">
                <q-icon name="edit" color="black"
                  size="3em" clickable
                  @click.prevent="$emit('editar')"
                />
              </a>
              <q-tooltip>Editar observacion</q-tooltip>
            </div>

            <div v-if="edicion">
              <a class="cursor">
                <q-icon name="delete" color="black"
                  size="3em" clickable
                  @click.prevent="$emit('eliminar')"
                />
              </a>
              <q-tooltip>Borrar acuerdo</q-tooltip>
            </div>

            <div v-if="listadoAcuerdo.fecha_boletin
              && !acuerdo.fecha_baja"
            >
              <a class="cursor">
                <q-icon name="public_off" color="black"
                  size="3em" clickable
                  @click.prevent="$emit('dar-baja-acuerdo', acuerdo.id)"
                />
              </a>
              <q-tooltip>Dar de baja acuerdo</q-tooltip>
            </div>

            <div v-if="listadoAcuerdo.fecha_boletin
              && acuerdo.fecha_baja"
            >
              <a class="cursor">
                <q-icon name="public" color="black"
                  size="3em" clickable
                  @click.prevent="$emit('dar-alta-acuerdo', acuerdo.id)"
                />
              </a>
              <q-tooltip>Publicar</q-tooltip>
            </div>

            <!-- <div v-if="acuerdo.fecha_baja">
              <span>
                <strong class="text-red"> BAJA </strong>
              </span>
              <span>{{acuerdo.fecha_baja | moment('DD MMM YYYY')}}</span>
            </div> -->
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
    listadoAcuerdo: {
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
.text-danger {
  color: red
}
</style>
