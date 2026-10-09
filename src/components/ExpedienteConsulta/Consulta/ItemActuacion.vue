<template>
  <article class="SIDJ-box col-lg-12 col-md-12 col-sm-12 col-xs-12"
    :id="'act-'+actuacion.id"
    key="actuacion.id"
  >
    <div class="SIDJ-box-row">
      <div class="SIDJ-list SIDJ-list-state">
        <div>
          <span v-if="![18, 70].includes(actuacion.proceso_id)">
            {{ !proceso ? '--' : proceso.descripcion }}
          </span>
          <span v-if="[18, 70].includes(actuacion.proceso_id) && actuacion.ra">
            {{ actuacion.ra }}
          </span>
          <span class="text-caption">
            {{ actuacion.fechaingresotca | moment('DD MMM YYYY, h:mm:ss a') }}
          </span>
          <span v-if="tramite" class="text-caption">
            Folio SPR: <strong>{{ tramite ? tramite.folio : '' }}</strong>
          </span>

          <template v-if="proceso.isoficialiapartes">
            <span class="text-caption">
              <template v-if="promovente">
                <span class="text-weight-bolder">{{ promovente.promovente }}</span>
              </template>
              <template v-if="actuacion.actor_id
                && actor && [1, 3].includes(actor.tipo_persona_id)"
              >
                {{ actor.nombre }} {{ actor.apellidopaterno }} {{ actor.apellidomaterno }}
              </template>
              <template v-if="actuacion.actor_id && actor && ![2].includes(actor.tipo_persona_id)"
              >
                {{ actor.razonsocial }}
              </template>

              <template v-if="actuacion.autoridad_id">
                {{ autoridad ? autoridad.autoridad : '' }}
              </template>
              <template v-if="actuacion.terceroperjudicado_id &&
                tercero && [1, 3].includes(tercero.tipo_persona_id)"
              >
                {{ tercero.nombre }} {{ tercero.apellidopaterno }} {{ tercero.apellidomaterno }}
              </template>
              <template v-if="actuacion.terceroperjudicado_id &&
                tercero && [2].includes(tercero.tipo_persona_id)"
              >
                {{ tercero.razonsocial }}
              </template>
            </span>
          </template>
        </div>

        <div v-if="[2, 3, 44, 55, 78, 79].includes(actuacion.proceso_id)">
          <span>
            {{ actuacion.poderjudicial ? actuacion.poderjudicial : '-' }}
          </span>
          <span class="text-caption">Referencia</span>
        </div>

        <div v-if="folio">
          <span>{{ folio }}</span>
          <span class="text-caption">Folio</span>
        </div>

        <template v-if="!estaAcumulado">
          <div :class="{
            'green': acuerdos.length > 0,
            'red': acuerdos.length == 0
          }">
            <span>{{ acuerdos.length }}</span>
            <span class="text-caption">Acuerdos</span>
          </div>

          <div :class="{
            'green': notificaciones.length > 0,
            'red': notificacionesAcuerdosPersonalesPendientes.length > 0
          }">
            <span>{{ notificaciones.length }}</span>
            <span class="text-caption">Notificaciones</span>
          </div>
        </template>

        <template v-else>
          <div>
            <span>{{ getTituloActuacion(actuacionAcumulado) }}</span>
            <span>Actuación relacionada</span>
          </div>
        </template>
      </div>
    </div>

    <div class="SIDJ-box-content">
      <div v-if="menu.showTablaAnexos">
        <tabla-anexos
          :anexos="anexos"
          :documentos="documentos"
        ></tabla-anexos>
      </div>

      <div v-if="menu.showTablaAcuerdos">
        <tabla-acuerdos
          :acuerdos="acuerdos"
          :expediente="expediente"
          @openModalNotificados="openModalNotificados"
          @openModalNotificacion="openModalNotificacion"
          @openModalNotificacionEditar="openModalNotificacionEditar"
        ></tabla-acuerdos>
      </div>

      <div v-if="menu.showTablaPromociones">
        <tabla-documentos
          :documentos="promociones"
        ></tabla-documentos>
      </div>
    </div>

    <section class="SIDJ-box-row SIDJ-box-row-footer">
      <div class="SIDJ-box-row-footer-nav">
        <ul class="SIDJ-box-row-footer-nav-menu nav navbar-right">
          <li v-if="proceso.isoficialiapartes || [1, 63, 64, 68].includes(proceso.proceso_id)">
            <span class="q-mx-sm cursor-pointer"
              @click.prevent="openTable('showTablaPromociones')"
            >
              <q-icon name="fa fa-file-alt" color="black" size="1em"/>
              <q-tooltip>Promociones</q-tooltip>
            </span>
          </li>
          <li v-if="proceso.isoficialiapartes || [1, 63, 64, 68].includes(proceso.proceso_id)">
            <span class="q-mx-sm cursor-pointer"
              @click.prevent="openTable('showTablaAnexos')"
            >
              <q-icon name="fa fa-paperclip" color="black" size="1em"/>
              <q-tooltip>Anexos</q-tooltip>
            </span>
          </li>
          <li>
            <span class="q-mx-sm cursor-pointer"
              @click.prevent="openTable('showTablaAcuerdos')"
            >
              <q-icon name="file_copy" color="black" size="1.2em"/>
              <q-tooltip>Acuerdos</q-tooltip>
            </span>
          </li>
          <li>
            <router-link :to="{
              name: 'expediente-notificaciones-consulta',
              params: {
                uuid: actuacion.id,
              },
            }">
              <q-icon name="search" color="black" size="1.4em"/>
              <q-tooltip>Consulta</q-tooltip>
            </router-link>
          </li>
          <li>
            <span class="q-mx-sm cursor-pointer"
              @click.prevent="openTable('showDetalle')"
            >
              <q-icon :name="showDetalle ? 'arrow_drop_up' : 'arrow_drop_down'"
                color="black" size="1.4em"
              />
              <q-tooltip>{{showDetalle ? 'Ocultar' : 'Mostrar'}}</q-tooltip>
            </span>
          </li>
        </ul>
      </div>
    </section>
  </article>
</template>

<script>
import {
  QTooltip,
} from 'quasar';

import TablaAnexos from './Anexos/TablaAnexos';
import TablaAcuerdos from './Acuerdos/TablaAcuerdos';
import TablaDocumentos from './Documentos/TablaDocumentos';

export default {
  name: 'item-actuacion',
  props: {
    actuacion: {
      type: Object,
      required: true,
    },
    expediente: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showDetalle: false,

      menu: {
        showTablaAnexos: false,
        showTablaAcuerdos: false,
        showTablaPromociones: false,
      },
    };
  },
  components: {
    QTooltip,
    TablaAnexos,
    TablaAcuerdos,
    TablaDocumentos,
  },
  computed: {
    anexos() {
      return this.$store.getters['anexos/getAnexosByActuacionId'](this.actuacion.actuacion_id);
    },
    actuaciones() {
      return this.$store.getters['actuaciones/getAllActuaciones'].filter(item => item.juicio_id === this.actuacion.juicio_id);
    },
    acuerdos() {
      return this.$store.getters['acuerdos/getAcuerdosByActuacionId'](this.actuacion.actuacion_id);
    },
    actor() {
      return this.$store.getters['actores/getActorByActorId'](this.actuacion.actor_id);
    },
    autoridad() {
      return this.$store.getters['autoridades/getAutoridadByAutoridadId'](this.actuacion.autoridad_id);
    },
    documentos() {
      return this.$store.getters['documentos/getDocumentosAll'].filter(item => item.actuacion_id === this.actuacion.actuacion_id && item.anexo_id);
    },
    folio() {
      if (this.actuacion.no_folio) {
        const data = this.actuacion.no_folio.split('/');
        return data[0];
      }
      return null;
    },
    notificaciones() {
      const acuerdosIds = this.acuerdos.map(i => i.acuerdo_id);
      const notificaciones = this.$store.getters['notificaciones/getNotificacionesAll'];

      return notificaciones.filter(item => acuerdosIds.includes(item.acuerdo_id));
    },
    notificacionesAcuerdosPersonalesPendientes() {
      const acuerdosIds = this.acuerdos.filter(item => item.notifiquese_id === 1)
        .map(item => item.acuerdo_id);

      const acuerdosConNotificacion = new Set(this.notificaciones.map(n => n.acuerdo_id));

      return acuerdosIds.filter(id => !acuerdosConNotificacion.has(id));
    },
    proceso() {
      return this.$store.getters['procesos/getProcesoByProcesoId'](this.actuacion.proceso_id);
    },
    procesos() {
      return this.$store.getters['procesos/getProcesosAll'];
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
    tramite() {
      if (this.actuacion.tramite) {
        return this.actuacion.tramite;
      }
      return null;
    },
    actuacionAcumulado() {
      if (this.estaAcumulado) {
        return this.actuaciones
          .find(i => i.actuacion_id === this.actuacion.actuacion_relacionada_id);
      }

      return null;
    },
    estaAcumulado() {
      return !!this.actuacion.actuacion_relacionada_id;
    },
  },
  methods: {
    openTable(value) {
      this.showDetalle = value !== 'showDetalle' ? true : !this.showDetalle;
      const menus = Object.getOwnPropertyNames(this.menu);
      menus.forEach(item => this.$set(this.$data.menu, item, item === value));
    },
    openModalNotificados(acuerdo) {
      this.$emit('openModalNotificados', acuerdo);
    },
    openModalNotificacion(acuerdo) {
      this.$emit('openModalNotificacion', acuerdo);
    },
    openModalNotificacionEditar(notificacion) {
      this.$emit('openModalNotificacionEditar', notificacion);
    },
    getTituloActuacion(actuacion) {
      const proceso = this.getProceso(actuacion);
      const folio = this.getFolio(actuacion);

      const descripcion = proceso && proceso.descripcion ? proceso.descripcion : 'Sin proceso';
      const folioText = folio ? ` (${folio})` : '';

      return `${descripcion}${folioText}`;
    },
    getFolio(actuacion) {
      if (actuacion.no_folio) {
        const data = actuacion.no_folio.split('/');
        return data[0];
      }
      return null;
    },
    getProceso(actuacion) {
      return this.procesos.find(i => i.proceso_id === actuacion.proceso_id);
    },
  },
};
</script>

<style scoped>
.green{
  color: green !important;
}
.red{
  color: red !important;
}
</style>
