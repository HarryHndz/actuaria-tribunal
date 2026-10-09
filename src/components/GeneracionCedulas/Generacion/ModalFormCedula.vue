<template>
  <q-card style="width: 1450px; max-width: 150vw; ">
    <q-card-section class="row items-center">
      <div class="text-h6 q-mx-lg" v-if="tipoNotificacion">
        {{tipoNotificacion.descripcion}}
      </div>
      <div class="text-h6 q-mx-lg" v-else-if="notificacion">
        {{notificacion.no_folio_notificacion ? notificacion.no_folio_notificacion : 'Editar'}}
      </div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      header-nav
      animated
    >
      <q-step
        :name="1"
        title="General"
        icon="assignment"
        :done="done1"
        color="primary"
        done-color="green"
        active-color="black"
        inactive-color="gray"
      >
        <info-general v-if="!fetching && !fetchingPromoventes"
          :data="formData"
          :expediente="expediente"
          :fetchingSave="fetchingSave"
          :titlePromovente="titlePromovente"
          :tipoNotificacion="tipoNotificacion"
          @avanzar="avanzar2"
          @updateTitle="updateTitle"
        ></info-general>

        <div class="x_content text-center" v-if="fetching || fetchingPromoventes">
          <q-spinner
            color="black"
            size="4em"
            :thickness="5"
          />
        </div>
      </q-step>

      <q-step
        :name="2"
        title="Expediente"
        icon="gavel"
        :done="done2"
        color="gray"
        done-color="green"
        active-color="black"
        inactive-color="gray"
      >
        <info-expediente v-if="!fetching && !fetchingPromoventes"
          :data="formData"
          :expediente="expediente"
          :fetchingSave="fetchingSave"
          @avanzar="avanzar3"
          @regresar="regresar"
        ></info-expediente>

        <div class="x_content text-center" v-if="fetching || fetchingPromoventes">
          <q-spinner
            color="black"
            size="4em"
            :thickness="5"
          />
        </div>
      </q-step>

      <q-step
        :name="3"
        title="Cédula"
        icon="description"
        :done="done3"
        color="gray"
        done-color="green"
        active-color="black"
        inactive-color="gray"
      >
        <info-cedula v-if="!fetching && !fetchingPromoventes"
          :data="formData"
          :fetchingSave="fetchingSave"
          @avanzar="avanzar4"
          @regresar="regresar2"
        ></info-cedula>

        <div class="x_content text-center" v-if="fetching || fetchingPromoventes">
          <q-spinner
            color="black"
            size="4em"
            :thickness="5"
          />
        </div>
      </q-step>

      <q-step
        :name="4"
        title="Autorizados"
        icon="people"
        :done="done4"
        color="gray"
        done-color="green"
        active-color="black"
        inactive-color="gray"
      >
        <info-autorizados v-if="!fetching && !fetchingPromoventes"
          :data="formData"
          :expediente="expediente"
          :fetchingSave="fetchingSave"
          @avanzar="avanzar5"
          @regresar="regresar3"
        ></info-autorizados>

        <div class="x_content text-center" v-if="fetching || fetchingPromoventes">
          <q-spinner
            color="black"
            size="4em"
            :thickness="5"
          />
        </div>
      </q-step>

      <q-step v-if="[1, 2, 3].includes(formData.tipo_id)"
        :name="5"
        :title="titlePromovente"
        icon="people"
        :done="done5"
        color="gray"
        done-color="green"
        active-color="black"
        inactive-color="gray"
      >
        <div class="x_content text-center" v-if="fetchingPromoventes">
          <q-spinner
            color="black"
            size="4em"
            :thickness="5"
          />
        </div>
        <template v-if="!fetchingPromoventes">
          <info-actor v-if="formData.tipo_id === 1"
            :data="formData"
            :expediente="expediente"
            :fetchingSave="fetchingSave"
            @guardar="guardar"
            @regresar="regresar4"
          ></info-actor>

          <info-autoridad v-if="formData.tipo_id === 2"
            :data="formData"
            :expediente="expediente"
            :fetchingSave="fetchingSave"
            @guardar="guardar"
            @regresar="regresar4"
          ></info-autoridad>

          <info-tercero v-if="formData.tipo_id === 3"
            :data="formData"
            :expediente="expediente"
            :fetchingSave="fetchingSave"
            @guardar="guardar"
            @regresar="regresar4"
          ></info-tercero>
        </template>
      </q-step>
    </q-stepper>
  </q-card>
</template>

<script>
import {
  QStep,
  QCard,
  QSpace,
  Notify,
  QStepper,
  QSpinner,
  ClosePopup,
  QCardSection,
} from 'quasar';

import moment from 'moment';
import { uuid } from 'vue-uuid';
import errors from 'boot/errors';

import InfoActor from './ModalFormCedula/InfoActor';
import InfoCedula from './ModalFormCedula/InfoCedula';
import InfoGeneral from './ModalFormCedula/InfoGeneral';
import InfoTercero from './ModalFormCedula/InfoTercero';
import InfoAutoridad from './ModalFormCedula/InfoAutoridad';
import InfoExpediente from './ModalFormCedula/InfoExpediente';
import InfoAutorizados from './ModalFormCedula/InfoAutorizados';

export default {
  name: 'modal-form-cedula',
  props: {
    acuerdo: {
      type: Object,
      required: false,
    },
    notificacion: {
      type: Object,
      required: false,
    },
    tipoNotificacion: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      titlePromovente: 'Actores',
      plantillaObject: null,
      pFiltered: this.plantillas,
      fetching: false,
      fetchingSave: false,
      fetchingPromoventes: false,
      expediente: null,
      step: 1,
      done1: false,
      done2: false,
      done3: false,
      done4: false,
      done5: false,
      formData: {
        validated: 1,
        tipo_atc_id: this.notificacion ? this.notificacion.tipo_atc_id : 1,
        proceso: this.acuerdo ? this.acuerdo.proceso : this.notificacion.proceso,
        expediente: this.acuerdo ? this.acuerdo.expediente : this.notificacion.expediente,
        proceso_id: this.acuerdo ? this.acuerdo.proceso_id : this.notificacion.proceso_id,
        acuerdo_id: this.acuerdo ? this.acuerdo.acuerdos_id : this.notificacion.acuerdo_id,
        acuerdo_uuid: this.acuerdo ? this.acuerdo.id : this.notificacion.acuerdo_uuid,
        actuacion_id: this.acuerdo ? this.acuerdo.actuacion_id : this.notificacion.actuacion_id,
        no_folio_acuerdo: this.acuerdo ? this.acuerdo.no_folio : this.notificacion.no_folio_acuerdo,
        no_folio_actuacion: this.acuerdo
          ? this.acuerdo.no_folio_actuacion
          : this.notificacion.no_folio_actuacion,

        tipo_id: this.tipoNotificacion
          ? this.tipoNotificacion.tipo_notificacion_id
          : this.notificacion.tipo_id,
        tipo_notificacion: this.tipoNotificacion
          ? this.tipoNotificacion.slug
          : this.notificacion.tipo_notificacion,
        id: this.notificacion ? this.notificacion.id : uuid.v4(),
        lic: this.notificacion ? this.notificacion.lic : null,
        anexo: this.notificacion ? this.notificacion.anexo : null,
        oficio: this.notificacion ? this.notificacion.oficio : null,
        actores: this.notificacion ? this.notificacion.actores : [],
        terceros: this.notificacion ? this.notificacion.terceros : [],
        grupo_id: this.notificacion ? this.notificacion.grupo_id : null,
        no_oficio: this.notificacion ? this.notificacion.no_oficio : null,
        notificados: this.notificacion ? this.notificacion.notificados : 1,
        created_at: this.notificacion ? this.notificacion.created_at : null,
        autoridades: this.notificacion ? this.notificacion.autoridades : [],
        autorizados: this.notificacion ? this.notificacion.autorizados : null,
        tipo_acuerdo: this.notificacion ? this.notificacion.tipo_acuerdo : null,
        observaciones: this.notificacion ? this.notificacion.observaciones : '',
        plantilla_id: this.notificacion ? this.notificacion.plantilla_id : null,
        autoridades_actuaria: this.notificacion ? this.notificacion.autoridades_actuaria : [],
        email_expediente: this.notificacion ? this.notificacion.email_expediente : null,
        telefonos_expediente: this.notificacion ? this.notificacion.telefonos_expediente : null,
        archivo_plantilla_id: this.notificacion ? this.notificacion.archivo_plantilla_id : null,
        domicilio_notificaciones: this.notificacion
          ? this.notificacion.domicilio_notificaciones
          : null,
        fecha_entrega_actuaria: this.notificacion ? this.notificacion.fecha_entrega_actuaria : moment().format('YYYY-MM-DD'),
        fecha_elaboracion_cedula: this.notificacion ? this.notificacion.fecha_elaboracion_cedula : moment().format('YYYY-MM-DD'),
      },
    };
  },
  async beforeMount() {
    this.fetching = true;
    try {
      await this.$store.dispatch('gruposPlantillas/fetchAllGruposPlantillas', {
        limit: -1,
        user_id: this.session.user_id,
        clasificacion_id: 'cedula',
      });
      await this.$store.dispatch('plantillas/fetchAllPlantillas', {
        limit: -1,
        include: 'archivoPlantilla',
        grupoId: this.grupos.map(i => i.grupo_id).join(','),
      });

      this.fetching = false;
      this.fetchingPromoventes = true;
      const actID = this.acuerdo ? this.acuerdo.actuacion_id : this.notificacion.actuacion_id;

      await this.$store.dispatch('actuaciones/fetchAllActuaciones', {
        limit: 1,
        actuacion: actID,
      });
      const actuacion = this.actuaciones.find(i => i.actuacion_id === actID);

      await this.$store.dispatch('expedientes/fetchAllExpedientes', {
        limit: 1,
        juicio: actuacion.juicio_id,
        include: 'actores,autoridades,terceros_perjudicados,autorizados,autoridades_actuaria',
      });

      this.expediente = this.expedientes.find(i => i.expediente_id === actuacion.juicio_id);
      this.fetchingPromoventes = false;

      return Promise.resolve(true);
    } catch (e) {
      errors(e);
      this.fetchingPromoventes = false;
      return Promise.reject(true);
    }
  },
  components: {
    QStep,
    QCard,
    QSpace,
    QStepper,
    QSpinner,
    InfoActor,
    InfoCedula,
    InfoGeneral,
    InfoTercero,
    QCardSection,
    InfoAutoridad,
    InfoExpediente,
    InfoAutorizados,
  },
  directives: {
    ClosePopup,
  },
  computed: {
    actuaciones() {
      return this.$store.getters['actuaciones/getAllActuaciones'];
    },
    expedientes() {
      return this.$store.getters['expedientes/getExpedientesAll'];
    },
    grupos() {
      return this.$store.getters['gruposPlantillas/getGruposPlantillasVisibles'].filter(i => (i.user_id === this.session.user_id
        || i.permisos.filter(j => j.id === this.session.user_id))
        && i.clasificacion_id === 'cedula');
    },
    session() {
      return this.$store.getters['session/getUsuario'];
    },
  },
  methods: {
    updateTitle(title) {
      this.titlePromovente = title;
    },
    avanzar2(formData) {
      this.formData = {
        ...this.formData,
        ...formData,
      };
      this.done1 = true;
      this.step = 2;
    },
    avanzar3(formData) {
      this.formData = {
        ...this.formData,
        ...formData,
      };
      this.done2 = true;
      this.step = 3;
    },
    avanzar4(formData) {
      this.formData = {
        ...this.formData,
        ...formData,
      };
      this.done3 = true;
      this.step = 4;
    },
    avanzar5(formData) {
      this.formData = {
        ...this.formData,
        ...formData,
      };
      if ([1, 2, 3].indexOf(this.formData.tipo_id) !== -1) {
        this.done4 = true;
        this.step = 5;
      } else {
        this.guardar();
      }
    },
    regresar(formData) {
      this.formData = {
        ...this.formData,
        ...formData,
      };
      this.step = 1;
    },
    regresar2(formData) {
      this.formData = {
        ...this.formData,
        ...formData,
      };
      this.step = 2;
    },
    regresar3(formData) {
      this.formData = {
        ...this.formData,
        ...formData,
      };
      this.step = 3;
    },
    regresar4(formData) {
      this.formData = {
        ...this.formData,
        ...formData,
      };
      this.step = 4;
    },
    async guardar(formData) {
      this.fetchingSave = true;
      this.formData = {
        ...this.formData,
        ...formData,
      };

      try {
        const email = this.formData.email_expediente
          ? this.formData.email_expediente
          : this.expediente.email;
        const telefonos = this.formData.telefonos_expediente
          ? this.formData.telefonos_expediente
          : this.expediente.telefonos;
        const domicilionotificacion = this.formData.domicilio_notificaciones
          ? this.formData.domicilio_notificaciones
          : this.expediente.domicilionotificacion;

        await this.$store.dispatch('expedientes/putExpediente', {
          email,
          telefonos,
          domicilionotificacion,
          id: this.expediente.id,
          idactuario: this.formData.actuario_id,
          autoridades_actuaria: this.formData.autoridades,
        });

        this.fetchingSave = false;

        this.$emit('agregar', {
          notificacion: {
            ...this.formData,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
          },
          tipoNotificacion: {
            ...this.tipoNotificacion,
            cedula_generacion: true,
          },
        });

        if (this.formData.created_at) {
          Notify.create({
            message: 'Cédula actualizada correctemente.',
            position: 'bottom',
          });

          return Promise.resolve(true);
        }

        Notify.create({
          message: 'Cédula registrada correctemente.',
          position: 'bottom',
        });

        return Promise.resolve(true);
      } catch (e) {
        errors(e);
        this.fetchingSave = false;
        return Promise.reject(true);
      }
    },
  },
};
</script>
