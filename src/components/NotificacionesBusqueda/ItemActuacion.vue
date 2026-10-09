<template>
  <article class="SIDJ-box col-lg-12 col-md-12 col-sm-12 col-xs-12"
    :id="'act-'+actuacion.id"
    key="actuacion.id"
  >
    <div class="SIDJ-box-row">
      <div class="SIDJ-list SIDJ-list-state">
        <div>
          <span>{{proceso ? proceso.descripcion : ''}}</span>
          <span><strong>{{expediente.nojuicio}}</strong></span>
          <span>
            Fecha ingreso: {{actuacion.fechaingresotca | moment('MMM D YYYY, h:mm:ss a')}}
          </span>
          <span v-if="promovente" style="font-size: 13px;">
            <strong>{{promovente.promovente}}</strong>
            <template v-if="actor">:
              {{
                !actor.ispersonafisica ? actor.razonsocial :
                  actor.nombre+' '+actor.apellidopaterno+' '+actor.apellidomaterno
              }}
            </template>
            <template v-if="autoridad">: {{autoridad.autoridad}}</template>
            <template v-if="tercero">
              {{
                !tercero.ispersonafisica ? tercero.razonsocial :
                  tercero.nombre+' '+tercero.apellidopaterno+' '+tercero.apellidomaterno
              }}
            </template>
          </span>
        </div>

        <div v-if="folio">
          <span>{{folio}}</span>
          <span>Folio</span>
        </div>

        <div :class="{
          'green': acuerdos.length > 0,
          'red': acuerdos.length == 0
        }">
          <span>{{acuerdos.length}}</span>
          <span>Acuerdos</span>
        </div>

        <div :class="{
          'green': notificaciones.length > 0,
          'red': notificaciones.length == 0
        }">
          <span>{{notificaciones.length}}</span>
          <span>Notificaciones</span>
        </div>
      </div>
    </div>

    <section class="SIDJ-box-row SIDJ-box-row-footer">
      <div class="SIDJ-box-row-footer-nav">
        <ul class="SIDJ-box-row-footer-nav-menu nav navbar-right">
          <li>
            <router-link :to="{
              name: 'notificaciones-consulta',
              params: {
                uuid: actuacion.id,
              },
            }">
              <q-icon name="search" color="black" size="1.3em"/>
            </router-link>
          </li>
        </ul>
      </div>
    </section>

  </article>
</template>

<script>
export default {
  name: 'item-actuacion',
  props: {
    actuacion: {
      type: Object,
      required: true,
    },
  },
  computed: {
    actor() {
      return this.$store.getters['actores/getActorByActorId'](this.actuacion.actor_id);
    },
    autoridad() {
      return this.$store.getters['autoridades/getAutoridadByAutoridadId'](this.actuacion.autoridad_id);
    },
    acuerdos() {
      return this.$store.getters['acuerdos/getAcuerdosByActuacionId'](this.actuacion.actuacion_id).map(i => i.acuerdo_id);
    },
    folio() {
      if (this.actuacion.no_folio) {
        const data = this.actuacion.no_folio.split('/');
        return data[0];
      }
      return null;
    },
    expediente() {
      return this.actuacion.expediente ? this.actuacion.expediente.data : {};
    },
    notificaciones() {
      const notificaciones = this.$store.getters['notificaciones/getNotificacionesAll'];
      return notificaciones.filter(item => this.acuerdos.indexOf(item.acuerdo_id) !== -1);
    },
    proceso() {
      return this.$store.getters['procesos/getProcesoByProcesoId'](this.actuacion.proceso_id);
    },
    promovente() {
      return this.$store.getters['promoventes/getPromoventeByPromoventeId'](this.actuacion.promovente_id);
    },
    tercero() {
      return this.$store.getters['terceros/getTerceroByTerceroId'](this.actuacion.terceroperjudicado_id);
    },
  },
};
</script>

<style>
.green {
 color: green !important;
}
.red {
 color: red !important;
}
</style>
