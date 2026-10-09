<template>
  <q-card style="width: 60vw; max-width: 110vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Registro de notificación</div>
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
              label="Fecha de elaboracion"
              class="q-ma-sm"
              v-model="formData.fecha_elaboracion"
              mask="####-##-##"
              :error="$v.formData.fecha_elaboracion.$error"
              @blur="$v.formData.fecha_elaboracion.$touch"
              :error-message="mensaError(
                $v.formData.fecha_elaboracion, 'fecha de elaboración'
              )"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateE"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="formData.fecha_elaboracion"
                      @input="() => $refs.qDateE.hide()"
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
                  <q-popup-proxy ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="formData.fecha_notificacion"
                      @input="() => $refs.qDateProxy.hide()"
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
              @blur="$v.formData.fecha_entrega_actuaria.$touch"
              :error="$v.formData.fecha_entrega_actuaria.$error"
              :error-message="mensaError(
                $v.formData.fecha_entrega_actuaria, 'fecha de actuaria'
              )"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxyE"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="formData.fecha_entrega_actuaria"
                      @input="() => $refs.qDateProxyE.hide()"
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
              label="Tipo de notificación"
              class="q-ma-sm"
              v-model="tipoNObject"
              :options="tipoNotificacion"
              :error="$v.formData.tipo_id.$error"
              @blur="$v.formData.tipo_id.$touch"
              @filter="filterTipoNotificacionFn"
              :error-message="mensaError(
                $v.formData.tipo_id, 'tipo de notificación'
              )"
            />
          </div>
          <div class="col-md-4">
            <q-input
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
              class="q-ma-sm"
              :options="actoresFormated"
              v-model="formData.actor_id"
              label="Presunto responsable"
            />
              <!-- @blur="$v.formData.actor_id.$touch"
              :error="$v.formData.actor_id.$error"
              :error-message="mensaError(
                $v.formData.actor_id, 'presunto responsable'
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
              class="q-ma-sm"
              :options="autoridadesFormated"
              v-model="formData.autoridad_id"
              label="Autoridad investigadora"
            />
              <!-- @blur="$v.formData.autoridad_id.$touch"
              :error="$v.formData.autoridad_id.$error"
              :error-message="mensaError(
                $v.formData.autoridad_id, 'autoridad investigadora'
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
              class="q-ma-sm"
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
              class="q-ma-sm"
              :options="tercerosFormated"
              v-model="formData.tercero_id"
              label="Recurrente / Tercero perjudicado"
            />
              <!-- @blur="$v.formData.tercero_id.$touch"
              :error="$v.formData.tercero_id.$error"
              :error-message="mensaError(
                $v.formData.tercero_id, 'autoridad substanciadora'
              )" -->
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
} from 'quasar';

import {
  required, maxLength, minLength,
  // requiredIf,
} from 'vuelidate/lib/validators';

import _ from 'lodash';

import errors from 'boot/errors';
import { validaciones, mensajes } from 'boot/validaciones';

export default {
  name: 'form-documento-crear',
  props: {
    data: {
      required: false,
      type: Object,
    },
    expediente: {
      required: false,
      type: Object,
    },
    actores: {
      required: true,
      type: Array,
    },
    terceros: {
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
  },
  data() {
    return {
      fetching: false,
      tipoNObject: null,
      tipoNF: this.tipoNotificacion,
      formData: {
        notificados: '',
        observaciones: '',
        fecha_elaboracion: '',
        fecha_notificacion: '',
        fecha_entrega_actuaria: '',
        actor_id: this.data?.actor_id ?? null,
        tercero_id: this.data?.tercero_id ?? null,
        autoridad_id: this.data?.autoridad_id ?? null,
        autoridad_substanciadora_id: this.data?.autoridad_substanciadora_id ?? null,

        acuerdo_id: this.data.acuerdo_id,
        tipo_id: this.data?.tipo_id ?? null,
        temp_file: this.data?.temp_files[0] ?? null,
      },
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
      formData: {
        notificados: {
          required,
          maxLength: maxLength(2),
        },
        fecha_elaboracion: {
          required,
          validateDate: validaciones.validateDate,
        },
        fecha_notificacion: {
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
    async save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          this.fetching = true;

          await this.$store.dispatch('notificaciones/postNotificacion', this.formData);

          Notify.create({
            message: 'Notificación registrada correctamente.',
            position: 'bottom',
          });

          this.$emit('openTablaDocumentos');
          this.$emit('cleanBuffer');
          this.$emit('close');
        } catch (error) {
          errors(error);
        } finally {
          this.fetching = false;
        }
      }
    },
    close() {
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
