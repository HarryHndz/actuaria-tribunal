<template>
  <article class="SIDJ-box col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <section class="SIDJ-box-row SIDJ-box-row-header">
      <div class="SIDJ-list SIDJ-list-header SIDJ-list-header-important">
        <div>
          <span
            ><strong>{{ proceso.descripcion }}</strong></span
          >
          <span
            ><strong>
              {{ expediente.nojuicio }}
            </strong></span
          >
          <span class="text-caption">
            Fecha ingreso:
            {{ actuacion.fechaingresotca | moment("MMM D YYYY, h:mm:ss a") }}
          </span>
        </div>

        <div v-if="folio">
          <span
            ><strong>{{ folio }}</strong></span
          >
          <span class="text-caption">Folio</span>
        </div>

        <div>
          <span>{{ actuacion.copiasoriginal ? actuacion.copiasoriginal : "--" }}</span>
          <span class="text-caption">Copias</span>
        </div>

        <div>
          <span>
            <strong>{{ promovente ? promovente.promovente : "--" }}</strong>
          </span>
          <span class="text-caption">Promovente</span>
        </div>
      </div>
    </section>

    <div class="SIDJ-box-content">
      <div v-if="menu.showTablaAnexos">
        <tabla-anexos
          :anexos="anexos"
          :documentos="documentos"
        ></tabla-anexos>
      </div>

      <div v-if="menu.showTablaPromociones">
        <tabla-documentos
          :documentos="promociones"
        ></tabla-documentos>
      </div>
    </div>

    <section class="SIDJ-box-row SIDJ-box-row-footer">
      <div class="SIDJ-box-row-footer-nav">
        <router-link
          :to="{
            name: 'expediente-consulta',
            params: {
              uuid: expediente.id,
            },
          }"
        >
          <q-icon name="arrow_back" color="black" size="1.3em" />
          <q-tooltip>Ir al expediente</q-tooltip>
        </router-link>
      </div>
      <div class="SIDJ-box-row-footer-nav">
        <ul class="SIDJ-box-row-footer-nav-menu nav navbar-right">
          <li v-if="proceso.isoficialiapartes || [1, 63, 64, 68].includes(proceso.proceso_id)">
            <a href="#" @click.prevent="openTable('showTablaPromociones')">
              <q-icon name="fa fa-file-alt" color="black" size="1em" />
              <q-tooltip>Promociones</q-tooltip>
            </a>
          </li>

          <li v-if="proceso.isoficialiapartes || [1, 63, 64, 68].includes(proceso.proceso_id)">
            <a href="#" @click.prevent="openTable('showTablaAnexos')">
              <q-icon name="fa fa-paperclip" color="black" size="1em" />
              <q-tooltip>Anexos</q-tooltip>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </article>
</template>

<script>
import { QTooltip } from 'quasar';

import TablaAnexos from '../Consulta/Anexos/TablaAnexos';
import TablaDocumentos from '../Consulta/Documentos/TablaDocumentos';

export default {
  name: 'box-info-actuacion',
  props: {
    actuacion: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      menu: {
        showTablaAnexos: false,
        showTablaPromociones: false,
      },
    };
  },
  components: {
    QTooltip,
    TablaAnexos,
    TablaDocumentos,
  },
  computed: {
    actor() {
      return this.$store.getters['actores/getActorByActorId'](this.actuacion.actor_id);
    },
    anexos() {
      return this.$store.getters['anexos/getAnexosByActuacionId'](this.actuacion.actuacion_id);
    },
    autoridad() {
      return this.$store.getters['autoridades/getAutoridadByAutoridadId'](this.actuacion.autoridad_id);
    },
    documentos() {
      return this.$store.getters['documentos/getDocumentosAll'].filter(item => item.actuacion_id === this.actuacion.actuacion_id && item.anexo_id);
    },
    expediente() {
      return this.$store.getters['expedientes/getExpedienteByExpedienteId'](this.actuacion.juicio_id);
    },
    folio() {
      if (this.actuacion.no_folio) {
        const data = this.actuacion.no_folio.split('/');
        return data[0];
      }
      return null;
    },
    proceso() {
      return this.$store.getters['procesos/getProcesoByProcesoId'](this.actuacion.proceso_id);
    },
    promociones() {
      return this.$store.getters['documentos/getDocumentosAll'].filter(item => item.actuacion_id === this.actuacion.actuacion_id && !item.anexo_id);
    },
    promovente() {
      return this.$store.getters['promoventes/getPromoventeByPromoventeId'](this.actuacion.promovente_id);
    },
    tercero() {
      return this.$store.getters['terceros/getTerceroByTerceroId'](this.actuacion.terceroperjudicado_id);
    },
  },
  methods: {
    openTable(value) {
      this.showDetalle = value !== 'showDetalle' ? true : !this.showDetalle;
      const menus = Object.getOwnPropertyNames(this.menu);
      menus.forEach(item => this.$set(this.$data.menu, item, item === value));
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
