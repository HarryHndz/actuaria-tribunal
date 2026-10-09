<template>
  <q-card style="width: 1200px; max-width: 110vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">{{ titulo }}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="q-pt-sm">
        <div class="row">
          <div class="col-md-4">
            <q-input outlined
              stack-label
              class="q-ma-sm"
              mask="####-##-##"
              label="Fecha de elaboracion"
              v-model="formData.fecha_elaboracion"
              :error="$v.formData.fecha_elaboracion.$error"
              @blur="$v.formData.fecha_elaboracion.$touch"
              :error-message="mensaError(
                $v.formData.fecha_elaboracion, 'fecha de elaboración'
              )"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxyFE"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="formData.fecha_elaboracion"
                      @input="() => $refs.qDateProxyFE.hide()"
                      color="pink-10"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="col-md-4">
            <q-input outlined
              stack-label
              label="Fecha de notificación"
              class="q-ma-sm"
              v-model="formData.fecha_notificacion"
              mask="####-##-##"
              :error="$v.formData.fecha_notificacion.$error"
              @blur="$v.formData.fecha_notificacion.$touch"
              :error-message="mensaError(
                $v.formData.fecha_notificacion, 'fecha de notificación'
              )"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxyN"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="formData.fecha_notificacion"
                      @input="() => $refs.qDateProxyN.hide()"
                      color="pink-10"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="col-md-4">
            <q-input outlined
              stack-label
              label="Fecha de entrega a actuaria"
              class="q-ma-sm"
              v-model="formData.fecha_entrega_actuaria"
              mask="####-##-##"
              :error="$v.formData.fecha_entrega_actuaria.$error"
              @blur="$v.formData.fecha_entrega_actuaria.$touch"
              :error-message="mensaError(
                $v.formData.fecha_entrega_actuaria, 'fecha de actuaria'
              )"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxyEA"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="formData.fecha_entrega_actuaria"
                      @input="() => $refs.qDateProxyEA.hide()"
                      color="pink-10"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-8">
            <q-select
              outlined
              use-input
              clearable
              stack-label
              class="q-ma-sm"
              :options="tipoNF"
              v-model="tipoNObject"
              label="Tipo de notificación"
              @blur="$v.formData.tipo_id.$touch"
              @filter="filterTipoNotificacionFn"
              :error="$v.formData.tipo_id.$error"
              :error-message="mensaError(
                $v.formData.tipo_id, 'tipo de notificación'
              )"
            />
          </div>
          <div class="col-md-4">
            <q-input
              min="0"
              outlined
              stack-label
              type="number"
              class="q-ma-sm"
              label="Notificados"
              v-model="formData.notificados"
              :error="$v.formData.notificados.$error"
              @blur="$v.formData.notificados.$touch"
              :error-message="mensaError(
                $v.formData.notificados, 'notificados'
              )"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-12"
            v-if="especializadaRequired
              && tipoNObject
              && tipoNObject.required_actor"
          >
            <q-select
              outlined
              clearable
              emit-value
              map-options
              stack-label
              class="q-ma-sm q-my-md"
              :options="actoresFormated"
              v-model="formData.actor_id"
              :label="labelActor"
            />
              <!-- @blur="$v.formData.actor_id.$touch"
              :error="$v.formData.actor_id.$error"
              :error-message="mensaError(
                $v.formData.actor_id, labelActor
              )" -->
          </div>

          <div class="col-md-12"
            v-if="especializadaRequired
              && tipoNObject
              && tipoNObject.required_autoridad"
          >
            <q-select
              outlined
              clearable
              emit-value
              map-options
              stack-label
              class="q-ma-sm q-my-md"
              :options="autoridadesFormated"
              v-model="formData.autoridad_id"
              :label="labelAutoridad"
            />
              <!-- @blur="$v.formData.autoridad_id.$touch"
              :error="$v.formData.autoridad_id.$error"
              :error-message="mensaError(
                $v.formData.autoridad_id, labelAutoridad
              )" -->
          </div>

          <div class="col-md-12"
            v-if="especializadaRequired
              && tipoNObject
              && tipoNObject.required_autoridad_substanciadora"
          >
            <q-select
              outlined
              clearable
              emit-value
              map-options
              stack-label
              class="q-ma-sm q-my-md"
              :options="autoridadesSFormated"
              v-model="formData.autoridad_substanciadora_id"
              label="Autoridad substanciadora"
            />
              <!-- @blur="$v.formData.autoridad_substanciadora_id.$touch"
              :error="$v.formData.autoridad_substanciadora_id.$error"
              :error-message="mensaError(
                $v.formData.autoridad_substanciadora_id, 'autoridad substanciadora'
              )" -->
          </div>

          <div class="col-md-12"
            v-if="especializadaRequired
              && tipoNObject
              && tipoNObject.required_tercero"
          >
            <q-select
              outlined
              clearable
              emit-value
              map-options
              stack-label
              class="q-ma-sm q-my-md"
              :options="tercerosFormated"
              v-model="formData.tercero_id"
              :label="labelTercero"
            />
              <!-- @blur="$v.formData.tercero_id.$touch"
              :error="$v.formData.tercero_id.$error"
              :error-message="mensaError(
                $v.formData.tercero_id, labelTercero
              )" -->
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <q-file class="q-ma-sm q-mb-lg"
              outlined
              clearable
              stack-label
              accept=".docx,.pdf"
              v-model="file"
              @input="guardarArchivo"
              label="Archivo (.docx, .pdf)"
              @blur="$v.file.$touch"
              :error="$v.file.$error"
              :error-message="mensaError(
                $v.file, 'archivo'
              )"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <q-input
              outlined
              autogrow
              stack-label
              class="q-ma-sm"
              label="Observaciones"
              v-model="formData.observaciones"
              :error="$v.formData.observaciones.$error"
              @blur="$v.formData.observaciones.$touch"
              :error-message="mensaError(
                $v.formData.observaciones, 'observaciones'
              )"
            />
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator/>

    <q-card-actions align="right">
      <q-btn class="q-ma-md"
        color="pink-10"
        icon="save"
        label="Guardar"
        :loading="fetching"
        @click.prevent="save"
      />
    </q-card-actions>

  </q-card>
</template>

<script>
/* eslint-disable no-nested-ternary */
import {
  ClosePopup,
  QCard,
  QCardActions,
  QCardSection,
  QSeparator,
  QInput,
  QSpace,
  QDate,
  QIcon,
  QPopupProxy,
  Notify,
  QSelect,
  Loading,
} from 'quasar';

import _ from 'lodash';
import {
  required, maxLength, minLength, requiredIf,
} from 'vuelidate/lib/validators';

import errors from 'boot/errors';
import infoFile from 'boot/infoFile';
import { validaciones, mensajes } from 'boot/validaciones';

export default {
  name: 'form-documento-editar',
  props: {
    notificacion: {
      required: false,
      type: Object,
    },
    acuerdo: {
      required: false,
      type: Object,
    },
    actores: {
      required: true,
      type: Array,
    },
    autoridades: {
      required: true,
      type: Array,
    },
    autoridadesSub: {
      required: true,
      type: Array,
    },
    terceros: {
      required: true,
      type: Array,
    },
    expediente: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      file: null,
      fetching: false,
      tipoNObject: null,
      tipoNF: this.tipoNotificacion,
      sizeAllowed: 50,
      formData: {
        id: this.notificacion ? this.notificacion.id : '',
        created_at: this.notificacion ? this.notificacion.created_at : null,
        actor_id: this.notificacion ? this.notificacion.actor_id : null,
        tercero_id: this.notificacion ? this.notificacion.tercero_id : null,
        autoridad_id: this.notificacion ? this.notificacion.autoridad_id : null,
        tipo_atc_id: this.notificacion ? this.notificacion.tipo_atc_id : '',
        tipo_id: this.notificacion ? this.notificacion.tipo_id : '',
        acuerdo_id: this.notificacion
          ? this.notificacion.acuerdo_id : this.acuerdo
            ? this.acuerdo.acuerdo_id : null,
        notificados: this.notificacion ? this.notificacion.notificados : '',
        observaciones: this.notificacion ? this.notificacion.observaciones : '',
        fecha_elaboracion: this.notificacion ? this.notificacion.fecha_elaboracion : '',
        fecha_notificacion: this.notificacion ? this.notificacion.fecha_notificacion : '',
        fecha_entrega_actuaria: this.notificacion ? this.notificacion.fecha_entrega_actuaria : '',
        autoridad_substanciadora_id: this.notificacion
          ? this.notificacion.autoridad_substanciadora_id
          : null,
      },
      labelActor: 'Actor',
      labelAutoridad: 'Autoridad demandada',
      labelTercero: 'Tercero interesado',
    };
  },
  directives: {
    ClosePopup,
  },
  plugins: {
    Notify,
  },
  validations() {
    return {
      file: {
        required: requiredIf(i => !i.formData.created_at),
      },
      formData: {
        notificados: {
          required,
          maxLength: maxLength(2),
        },
        fecha_notificacion: {
          required,
          validateDate: validaciones.validateDate,
        },
        fecha_elaboracion: {
          required,
          validateDate: validaciones.validateDate,
        },
        fecha_entrega_actuaria: {
          validateDateNullable: validaciones.validateDateNullable,
        },
        tipo_id: {
          required,
        },
        // actor_id: {
        //   required: requiredIf(() => this.especializadaRequired
        //     && this.tipoNObject
        //     && this.tipoNObject.required_actor),
        // },
        // autoridad_id: {
        //   required: requiredIf(() => this.especializadaRequired
        //     && this.tipoNObject
        //     && this.tipoNObject.required_autoridad),
        // },
        // autoridad_substanciadora_id: {
        //   required: requiredIf(() => this.especializadaRequired
        //     && this.tipoNObject
        //     && this.tipoNObject.required_autoridad_substanciadora),
        // },
        // tercero_id: {
        //   required: requiredIf(() => this.especializadaRequired
        //     && this.tipoNObject
        //     && this.tipoNObject.required_tercero),
        // },
        observaciones: {
          minLength: minLength(3),
        },
      },
    };
  },
  components: {
    QCard,
    QCardActions,
    QCardSection,
    QSeparator,
    QInput,
    QSpace,
    QDate,
    QIcon,
    QPopupProxy,
    QSelect,
  },
  beforeMount() {
    if (this.formData.tipo_id) {
      this.tipoNObject = this.tipoNotificacion.find(item => item.value === this.formData.tipo_id);
    }

    if ([1].includes(this.expediente.tipo_demanda_id)) {
      this.labelActor = 'Actor';
      this.labelAutoridad = 'Autoridad demandada';
      this.labelTercero = 'Tercero interesado';
    }
    if ([2].includes(this.expediente.tipo_demanda_id)) {
      this.labelActor = 'Parte demandada';
      this.labelAutoridad = 'Parte demandante';
      this.labelTercero = 'Tercero perjudicado';
    }
    if ([3].includes(this.expediente.tipo_demanda_id)) {
      this.labelActor = 'Presunto responsable';
      this.labelAutoridad = 'Autoridad investigadora';
      this.labelTercero = 'Tercero interesado';
    }
    if ([4].includes(this.expediente.tipo_demanda_id)) {
      this.labelActor = 'Recurrente';
      this.labelAutoridad = 'Autoridad investigadora';
      this.labelTercero = 'Presunto responsable';
    }
    if ([5].includes(this.expediente.tipo_demanda_id)) {
      this.labelActor = 'Recurrente';
      this.labelAutoridad = 'Autoridad investigadora';
      this.labelTercero = 'Presunto responsable';
    }
    if ([6, 7].includes(this.expediente.tipo_demanda_id)) {
      this.labelActor = 'Actor';
      this.labelAutoridad = 'Autoridad demandada';
      this.labelTercero = 'Tercero interesado';
    }
  },
  computed: {
    autoridadesFormated() {
      return this.autoridades.map(i => ({
        label: i.autoridad,
        value: i.autoridad_id,
      }));
    },
    autoridadesSFormated() {
      return this.autoridadesSub.map(i => ({
        label: i.autoridad,
        value: i.autoridad_id,
      }));
    },
    actoresFormated() {
      return this.actores.map((i) => {
        if (i.tipo_persona_id === 2) {
          return {
            label: i.razonsocial,
            value: i.actor_id,
          };
        }
        return {
          label: `${i.nombre} ${i.apellidopaterno} ${i.apellidomaterno ?? ''}`,
          value: i.actor_id,
        };
      });
    },
    tercerosFormated() {
      return this.terceros.map((i) => {
        if (i.tipo_persona_id === 2) {
          return {
            label: i.razonsocial,
            value: i.tercero_id,
          };
        }
        return {
          label: `${i.nombre} ${i.apellidopaterno} ${i.apellidomaterno ?? ''}`,
          value: i.tercero_id,
        };
      });
    },
    especializadaRequired() {
      return [3].includes(this.expediente.materia_id)
        && [3, 4, 5, 6].includes(this.expediente.tipo_demanda_id);
    },
    especializadaIpraRequired() {
      return [3].includes(this.expediente.materia_id)
        && [3].includes(this.expediente.tipo_demanda_id);
    },
    titulo() {
      if (this.notificacion?.no_folio) {
        return `Editar notificación ${this.notificacion.no_folio}`;
      }
      return 'Registrar notificación';
    },
    tipoNotificacion() {
      const tipos = this.$store.getters['tiposNotificaciones/getTiposNotificacionesAll']
        .filter(item => item.tipos_demandas.includes(this.expediente.tipo_demanda_id));

      return _.orderBy(tipos.map(item => ({
        label: item.descripcion,
        value: item.tipo_notificacion_id,
        required_actor: item.required_actor,
        required_tercero: item.required_tercero,
        required_autoridad: item.required_autoridad,
        required_autoridad_substanciadora: item.required_autoridad_substanciadora,
      })), ['label'], ['asc']);
    },
    validaciones() {
      return validaciones;
    },
  },
  methods: {
    mensaError(validacion, campo) {
      return mensajes(validacion, campo);
    },
    filterTipoNotificacionFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.tipoNF = this.tipoNotificacion.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    async guardarArchivo(file) {
      if (file) {
        Loading.show();

        if (file.size > this.sizeAllowed * 1024 * 1024) {
          Loading.hide();
          this.$emit('cleanBuffer');
          this.$emit('close');
          this.$swal({
            title: `No está permitido subir\n archivos de más de ${this.sizeAllowed}mb`,
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
          });
          return Promise.resolve(false);
        }

        try {
          const res = await infoFile(file);
          const fd = new FormData();
          fd.append('file', file);
          fd.append('hash', res.hash);

          const response = await this.$store.dispatch('archivos/postArchivosTemporales', fd);
          this.formData.temp_file = response.data.data;
          Loading.hide();

          return Promise.resolve(response.data.data);
        } catch (e) {
          errors(e);
          Loading.hide();
          this.$refs.filePickerDocument.removeAtIndex(0);
          return Promise.reject(true);
        }
      }
      return Promise.resolve(true);
    },
    async save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.fetching = true;

        try {
          const method = this.formData.id ? 'putNotificacion' : 'postNotificacion';
          const msg = this.formData.id ? 'actualizada' : 'registrada';
          const resp = await this.$store.dispatch(`notificaciones/${method}`, this.formData);

          Notify.create({
            message: `Notificación ${msg} correctamente.`,
            position: 'bottom',
          });

          this.$emit('cleanBuffer');
          this.$emit('close');

          this.$emit('updateNotificacion', resp);
        } catch (e) {
          errors(e);
        } finally {
          this.fetching = false;
          this.formData.temp_file = {};
        }
      }
      return Promise.resolve(true);
    },
    close() {
      this.formData.temp_file = {};
      this.$emit('cleanBuffer');
      this.$emit('close');
    },
  },
  watch: {
    tipoNObject(val, oldVal) {
      /* eslint no-unused-expressions: [2, { allowTernary: true }] */
      val != null ? this.formData.tipo_id = val.value : this.formData.tipo_id = '';

      if (oldVal) {
        this.formData.actor_id = null;
        this.formData.tercero_id = null;
        this.formData.autoridad_id = null;
        this.formData.autoridad_substanciadora_id = null;
      }
    },
    'formData.actor_id': {
      handle(val, oldVal) {
        if (val && oldVal) {
          this.formData.tercero_id = null;
          this.formData.autoridad_id = null;
          this.formData.autoridad_substanciadora_id = null;
        }
      },
      deep: true,
    },
    'formData.tercero_id': {
      handle(val, oldVal) {
        if (val && oldVal) {
          this.formData.actor_id = null;
          this.formData.autoridad_id = null;
          this.formData.autoridad_substanciadora_id = null;
        }
      },
      deep: true,
    },
    'formData.autoridad_id': {
      handle(val, oldVal) {
        if (val && oldVal) {
          this.formData.actor_id = null;
          this.formData.tercero_id = null;
          this.formData.autoridad_substanciadora_id = null;
        }
      },
      deep: true,
    },
    'formData.autoridad_substanciadora_id': {
      handle(val, oldVal) {
        if (val && oldVal) {
          this.formData.actor_id = null;
          this.formData.tercero_id = null;
          this.formData.autoridad_id = null;
        }
      },
      deep: true,
    },
  },
};
</script>

<style scopd>
input[type="file"]{
  padding: 16px !important;
}
</style>
