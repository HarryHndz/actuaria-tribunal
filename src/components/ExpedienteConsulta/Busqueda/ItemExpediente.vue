<template>
  <article class="SIDJ-box col-lg-12 col-md-12 col-sm-12 col-xs-12"
    :id="'act-'+expediente.id"
    key="expediente.id"
  >
    <div class="SIDJ-box-row SIDJ-box-row-header">
      <div class="SIDJ-list SIDJ-list-header SIDJ-list-header-important">
        <div>
          <span>{{expediente.nojuicio}}</span>
          <span class="text-caption">
            {{expediente.fechaingreso | moment('MMM D YYYY, h:mm:ss a')}}
          </span>
        </div>

        <div>
          <span>{{materia.materia}}</span>
          <span class="text-caption">Materia</span>
        </div>

        <div>
          <span v-if="expediente.materia_id !== 3">
            {{tipoJuicio ? tipoJuicio.descripcion : '--'}}
          </span>
          <span>{{tipoDemanda ? tipoDemanda.descripcion : '--'}}</span>
          <span v-if="expediente.materia_id == 3">Procedimiento</span>
        </div>

        <div v-if="expediente.suspensionsolicitada">
          <span v-if="expediente.suspensionconcedida === true">{{'CONCEDIDA'}}</span>
          <span v-if="expediente.suspensionconcedida === false">{{'NEGADA'}}</span>
          <span v-if="expediente.suspensionconcedida === null">--</span>
          <span class="text-caption">Suspensión</span>
        </div>

        <template v-if="actor">
          <div v-if="actor.ispersonafisica">
            <span>{{actor.nombre}} {{actor.apellidopaterno}} {{actor.apellidomaterno}}</span>
          </div>
          <div v-if="!actor.ispersonafisica">
            <span>{{actor.razonsocial}}</span>
          </div>
        </template>
        <template v-if="!actor">
          <div>
            <span>--</span>
          </div>
        </template>
      </div>
    </div>

    <section class="SIDJ-box-row SIDJ-box-row-footer">
      <div class="SIDJ-box-row-footer-nav">
        <ul class="SIDJ-box-row-footer-nav-menu nav navbar-right">
          <li>
            <router-link :to="{
              name: 'expediente-consulta',
              params: {
                uuid: expediente.id,
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
import _ from 'lodash';

export default {
  name: 'item-expediente',
  props: {
    expediente: {
      type: Object,
      required: true,
    },
  },
  computed: {
    actor() {
      return this.actores[0];
    },
    actores() {
      const actores = this.$store.getters['actores/getActoresAll'].filter(item => this.expediente.actores.indexOf(item.id) !== -1);
      return _.sortBy(actores, item => item.created_at);
    },
    autoridades() {
      const autoridades = this.$store.getters['autoridades/getAutoridadesAll'].filter(item => this.expediente.autoridades.indexOf(item.id) !== -1);
      return _.sortBy(autoridades, item => item.created_at);
    },
    materia() {
      return this.$store.getters['materias/getMateriaByMateriaId'](this.expediente.materia_id);
    },
    proceso() {
      return this.$store.getters['procesos/getProcesoByProcesoId'](this.expediente.proceso_id);
    },
    tipoJuicio() {
      return this.$store.getters['tiposJuicios/getTipoJuicioByTipoJuicioId'](this.expediente.tipo_juicio_id);
    },
    tipoDemanda() {
      return this.$store.getters['tiposDemandas/getTipoDemandaByTipoDemandaId'](this.expediente.tipo_demanda_id);
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
