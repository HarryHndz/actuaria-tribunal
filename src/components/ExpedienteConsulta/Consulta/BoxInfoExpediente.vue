<template>
  <article class="SIDJ-box col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <section class="SIDJ-box-row SIDJ-box-row-header">
      <div class="SIDJ-list SIDJ-list-header SIDJ-list-header-important">
        <div>
          <span>{{expediente.nojuicio}}</span>
          <span class="text-caption">
            {{expediente.fechaingreso | moment('DD MMM YYYY, h:mm:ss a')}}
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

        <div v-if="[1, 3, 4, 5, 6].includes(tipoDemanda.tipo_demanda_id)">
          <span v-if="actor && [1, 3].includes(actor.tipo_persona_id)">
            {{actor.nombre}} {{actor.apellidopaterno}} {{actor.apellidomaterno}}
          </span>
          <span v-if="actor && [2].includes(actor.tipo_persona_id)">
            {{actor.razonsocial}}
          </span>
          <span v-if="!actor">Sin actor</span>
        </div>
        <div v-if="[2].includes(tipoDemanda.tipo_demanda_id)">
          <span>{{autoridad ? autoridad.autoridad : 'Sin autoridad'}}</span>
        </div>
      </div>
    </section>

    <section class="SIDJ-box-row">
      <div class="SIDJ-list SIDJ-list-state">
        <div>
          <span>{{!estadoProcesal ? '--' : estadoProcesal.descripcion }}</span>
          <span class="texxt-caption">Estado procesal</span>
        </div>

        <template v-if="relacionado">
          <div class="col seccion" @click.prevent="goRelacionado">
            <span>{{ relacionado.nojuicio }}</span>
            <span>Juicio relacionado</span>
          </div>
        </template>

        <div v-if="expediente.es_acumulado">
          <span>Acumulado</span>
          <span class="texxt-caption">Estado</span>
        </div>
        <div v-if="!expediente.es_acumulado">
          <span>--</span>
          <span>--</span>
        </div>
      </div>
    </section>

    <section class="SIDJ-box-content" :class="{
      'SIDJ-box-content--open': showDetalle
    }">
      <tabla-actores v-if="menu.showTablaActores"
        :actores="actores"
        :expediente="expediente"
        @cerrar="openTable('showDetalle')"
      ></tabla-actores>

      <tabla-terceros v-if="menu.showTablaTerceros"
        :terceros="terceros"
        :expediente="expediente"
      ></tabla-terceros>

      <tabla-autoridades v-if="menu.showTablaAutoridades"
        :autoridades="autoridades"
        :expediente="expediente"
      ></tabla-autoridades>

      <tabla-autoridades-s v-if="menu.showTablaAutoridadesS"
        :autoridades="autoridadesS"
        :expediente="expediente"
      ></tabla-autoridades-s>

      <tabla-autorizados v-if="menu.showTablaAutorizados"
        :autorizados="autorizados"
        :expedienteId="expediente.id"
      ></tabla-autorizados>

      <tabla-representantes v-if="menu.showTablaRepresentantes"
        :representantes="representantes"
        :expedienteId="expediente.id"
      ></tabla-representantes>

      <form-domicilios v-if="menu.showFormDomicilio"
        :expediente="expediente"
        @cerrar="openTable('showDetalle')"
      ></form-domicilios>

      <form-ponencia v-if="menu.showFormPonencia"
        :expediente="expediente"
      ></form-ponencia>
    </section>

    <section class="SIDJ-box-row SIDJ-box-row-footer">
      <div class="SIDJ-box-row-footer-nav">
        <ul class="SIDJ-box-row-footer-nav-menu nav navbar-right">
          <li>
            <a href="#"
              @click.prevent="openTable('showFormPonencia')"
            >
              <q-icon name="gavel" color="black" size="1.4em"/>
              <q-tooltip>Ponencia</q-tooltip>
            </a>
          </li>
          <li>
            <a href="#"
              @click.prevent="openTable('showTablaActores')"
            >
              <q-icon name="person" color="black" size="1.4em"/>
              <q-tooltip>{{ labelActores }}</q-tooltip>
            </a>
          </li>
          <li>
            <a href="#"
              @click.prevent="openTable('showTablaAutoridades')"
            >
              <q-icon name="account_balance" color="black" size="1.4em"/>
              <q-tooltip>{{ labelAutoridades }}</q-tooltip>
            </a>
          </li>
          <li v-if="[3].includes(expediente.tipo_demanda_id)">
            <a href="#"
              @click.prevent="openTable('showTablaAutoridadesS')"
            >
              <q-icon name="account_circle" color="black" size="1.4em"/>
              <q-tooltip>Autoridades substanciadoras</q-tooltip>
            </a>
          </li>
          <li>
            <a href="#"
              @click.prevent="openTable('showTablaTerceros')"
            >
              <q-icon name="people" color="black" size="1.4em"/>
              <q-tooltip>{{ labelTerceros }}</q-tooltip>
            </a>
          </li>
          <li>
            <a href="#"
              @click.prevent="openTable('showTablaRepresentantes')"
            >
              <q-icon name="flag" color="black" size="1.4em"/>
              <q-tooltip>Representantes</q-tooltip>
            </a>
          </li>
          <li>
            <a href="#"
              @click.prevent="openTable('showTablaAutorizados')"
            >
              <q-icon name="person_pin" color="black" size="1.4em"/>
              <q-tooltip>Autorizados</q-tooltip>
            </a>
          </li>
          <li>
            <a href="#"
              @click.prevent="openTable('showFormDomicilio')"
            >
              <q-icon name="home" color="black" size="1.4em"/>
              <q-tooltip>Domicilio</q-tooltip>
            </a>
          </li>
          <li>
            <a href="#"
              @click.prevent="openTable('showDetalle')"
            >
              <q-icon :name="showDetalle ? 'arrow_drop_up' : 'arrow_drop_down'"
                color="black" size="1.4em"
              />
              <q-tooltip>{{showDetalle ? 'Ocultar' : 'Mostrar'}}</q-tooltip>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </article>
</template>

<script>
import {
  QIcon,
  QTooltip,
} from 'quasar';

import _ from 'lodash';

import TablaActores from './Actores/TablaActores';
import TablaTerceros from './Terceros/TablaTerceros';
import TablaAutoridades from './Autoridades/TablaAutoridades';
import TablaAutoridadesS from './Autoridades/TablaAutoridadesS';
import TablaAutorizados from './Autorizados/TablaAutorizados';
import TablaRepresentantes from './Representantes/TablaRepresentantes';
import FormDomicilios from './ExpedienteForms/FormDomicilios';
import FormPonencia from './ExpedienteForms/FormPonencia';

export default {
  name: 'box-info-expediente',
  props: {
    expediente: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      showDetalle: false,
      menu: {
        showTablaActores: false,
        showFormPonencia: false,
        showFormDomicilio: false,
        showTablaTerceros: false,
        showTablaAutorizados: false,
        showTablaAutoridades: false,
        showTablaAutoridadesS: false,
        showTablaRepresentantes: false,
      },
    };
  },
  components: {
    QIcon,
    QTooltip,
    FormPonencia,
    TablaActores,
    TablaTerceros,
    FormDomicilios,
    TablaAutorizados,
    TablaAutoridades,
    TablaAutoridadesS,
    TablaRepresentantes,
  },
  computed: {
    actor() {
      return this.actores[0];
    },
    actores() {
      const actores = this.$store.getters['actores/getActoresAll'].filter(item => this.expediente.actores.indexOf(item.id) !== -1);
      return _.sortBy(actores, item => item.created_at);
    },
    autoridad() {
      return this.autoridades[0];
    },
    autoridades() {
      const autoridades = this.$store.getters['autoridades/getAutoridadesAll'].filter(item => this.expediente.autoridades.indexOf(item.id) !== -1);
      return _.sortBy(autoridades, item => item.created_at);
    },
    autoridadesS() {
      const autoridadesTemp = this.expediente.autoridades_substanciadoras
        .filter(i => !i.deleted_at) ?? [];

      const autoriadesIds = autoridadesTemp
        .map(i => i.id);

      return this.$store.getters['autoridades/getAutoridadesAll']
        .filter(item => autoriadesIds.includes(item.autoridad_id));
    },
    autorizados() {
      const autorizados = this.$store.getters['autorizados/getAutorizadosAll'].filter(item => this.expediente.autorizados.indexOf(item.id) !== -1);
      return _.sortBy(autorizados, item => item.created_at);
    },
    estadoProcesal() {
      return this.$store.getters['procesos/getProcesoByProcesoId'](this.expediente.estadoprocesal_id);
    },
    labelActores() {
      return this.$store.getters['layoutsLabels/getLabelActores'];
    },
    labelAutoridades() {
      return this.$store.getters['layoutsLabels/getLabelAutoridades'];
    },
    labelTerceros() {
      return this.$store.getters['layoutsLabels/getLabelTerceros'];
    },
    materia() {
      return this.$store.getters['materias/getMateriaByMateriaId'](this.expediente.materia_id);
    },
    ponencia() {
      return this.$store.getters['ponencias/getPonenciaByPonenciaId'](this.expediente.ponencia_id);
    },
    relacionado() {
      return this.$store.getters['expedientes/getExpedientesAll'].find(item => item.expediente_id === this.expediente.juicio_id_rel);
    },
    representantes() {
      const representantes = this.$store.getters['representantes/getRepresentantesAll'].filter(item => this.expediente.representantes.indexOf(item.id) !== -1);
      return _.sortBy(representantes, item => item.created_at);
    },
    terceros() {
      const terceros = this.$store.getters['terceros/getTercerosAll'].filter(item => this.expediente.terceros_perjudicados.indexOf(item.id) !== -1);
      return _.sortBy(terceros, item => item.created_at);
    },
    tipoJuicio() {
      return this.$store.getters['tiposJuicios/getTipoJuicioByTipoJuicioId'](this.expediente.tipo_juicio_id);
    },
    tipoDemanda() {
      return this.$store.getters['tiposDemandas/getTipoDemandaByTipoDemandaId'](this.expediente.tipo_demanda_id);
    },
  },
  methods: {
    openTable(value) {
      this.showDetalle = value !== 'showDetalle' ? true : !this.showDetalle;
      const menus = Object.getOwnPropertyNames(this.menu);
      menus.forEach(item => this.$set(this.$data.menu, item, item === value));
    },
    goRelacionado() {
      window.location = `${window.location.protocol}//${window.location.host}/apps/sala-ordinaria/consultar-expediente-v3#/consultar-expediente/${this.relacionado.id}`;
    },
  },
};
</script>
