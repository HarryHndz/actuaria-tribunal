<template>
  <q-card style="width: 1200px; max-width: 130vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Registro Juicio anterior 2014</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="q-pt-sm">
        <div class="row">
          <div class="col-md-4 col-xs-12">
            <q-select
              outlined
              use-input
              clearable
              stack-label
              class="q-ma-sm"
              label="Tipo de demanda"
              :options="tdFiltered"
              v-model="tipoDemandaObject"
              @filter="filterTipoDemandaFn"
              @blur="$v.formData.tipodemanda.$touch"
              :error="$v.formData.tipodemanda.$error"
              error-message="Tipo de demanda es una opción obligatorio"
            />
          </div>

          <div class="col-md-3 col-xs-12">
            <q-input outlined
              class="q-ma-sm"
              label="No juicio"
              stack-label
              v-model="formData.expediente"
              @blur="$v.formData.expediente.$touch"
              :error="$v.formData.expediente.$error"
              error-message="El campo expediente es un campo obligatorio"
            />
          </div>

          <div class="col-md-5 col-xs-12">
            <q-select
              outlined
              use-input
              clearable
              class="q-ma-sm"
              label="Proceso"
              stack-label
              :options="pFiltered"
              v-model="procesoObject"
              @filter="filterProcesoFn"
              @blur="$v.formData.proceso.$touch"
              :error="$v.formData.proceso.$error"
              error-message="Proceso es una opción obligatorio"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 col-xs-12">
            <q-select
              outlined
              use-input
              clearable
              stack-label
              class="q-ma-sm"
              label="Tipo de acuerdo"
              :options="taFiltered"
              @new-value="createValue"
              v-model="tipoAcuerdoObject"
              @filter="filterTiposAcuerdosFn"
              @blur="$v.formData.tipoacuerdo.$touch"
              :error="$v.formData.tipoacuerdo.$error"
              error-message="El campo tipo acuerdo es un campo obligatorio"
            />
          </div>

          <div class="col-md-6 col-xs-12">
            <q-input outlined
              stack-label
              class="q-ma-sm"
              mask="####-##-##"
              label="Fecha de elaboración"
              v-model="formData.fecha_elaboracion"
              @blur="$v.formData.fecha_elaboracion.$touch"
              :error="$v.formData.fecha_elaboracion.$error"
              :error-message="errorFechaElaboracion"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      color="pink-10"
                      v-model="formData.fecha_elaboracion"
                      @input="() => $refs.qDateProxy.hide()"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 col-xs-12">
            <q-input outlined
              stack-label
              class="q-ma-sm"
              label="Actor/Razón social"
              v-model="formData.actores"
              @blur="$v.formData.actores.$touch"
              :error="$v.formData.actores.$error"
              error-message="El campo actor es un campo obligatorio"
            />
          </div>
          <div class="col-md-6 col-xs-12">
            <q-input outlined
              stack-label
              class="q-ma-sm"
              label="Autoridades"
              v-model="formData.autoridades"
              @blur="$v.formData.autoridades.$touch"
              :error="$v.formData.autoridades.$error"
              error-message="El campo autoridades es un campo obligatorio"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 col-xs-12">
            <q-input
              outlined
              autogrow
              stack-label
              type="textarea"
              class="q-ma-sm"
              label="Observaciones"
              v-model="formData.observaciones"
              @blur="$v.formData.observaciones.$touch"
              :error="$v.formData.observaciones.$error"
              :error-message="errorObservaciones"
            />
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator/>

    <q-card-actions align="right">
      <q-btn class="q-ma-md"
        icon="save"
        color="pink-10"
        label="Guardar"
        :loading="fetching"
        @click.prevent="agregar"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import {
  QBtn,
  QDate,
  QCard,
  QInput,
  QSpace,
  QSelect,
  ClosePopup,
  QSeparator,
  QPopupProxy,
  QCardActions,
  QCardSection,
} from 'quasar';

import {
  required, minLength, maxLength,
} from 'vuelidate/lib/validators';

import _ from 'lodash';
import moment from 'moment';
import { uuid } from 'vue-uuid';

export default {
  name: 'modal-registro-jv',
  props: {
    acuerdo: {
      required: false,
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      fetching: false,
      procesoObject: null,
      tipoAcuerdoObject: null,
      tipoDemandaObject: null,
      pFiltered: this.procesos,
      tdFiltered: this.tiposDemandas,
      taFiltered: this.tiposAcuerdos,
      formData: {
        id: this.acuerdo ? this.acuerdo.id : uuid.v4(),
        actores: this.acuerdo ? this.acuerdo.actores : '',
        proceso: this.acuerdo ? this.acuerdo.proceso : '',
        proceso_id: this.acuerdo ? this.acuerdo.proceso_id : '',
        expediente: this.acuerdo ? this.acuerdo.expediente : '',
        autoridades: this.acuerdo ? this.acuerdo.autoridades : '',
        tipoacuerdo: this.acuerdo ? this.acuerdo.tipoacuerdo : '',
        tipodemanda: this.acuerdo ? this.acuerdo.tipodemanda : '',
        observaciones: this.acuerdo ? this.acuerdo.observaciones : '',
        tipoacuerdo_id: this.acuerdo ? this.acuerdo.tipoacuerdo_id : '',
        tipodemanda_id: this.acuerdo ? this.acuerdo.tipodemanda_id : '',
        fecha_elaboracion: this.acuerdo ? this.acuerdo.fecha_elaboracion : '',
      },
    };
  },
  validations() {
    return {
      formData: {
        actores: {
          required,
        },
        autoridades: {
          required,
        },
        expediente: {
          required,
        },
        fecha_elaboracion: {
          required,
          validDate: ((nested) => {
            const date = moment(nested, 'YYYY-MM-DD');
            return date.isValid();
          }),
        },
        observaciones: {
          minLength: minLength(3),
          maxLength: maxLength(255),
        },
        proceso: {
          required,
        },
        tipoacuerdo: {
          required,
        },
        tipodemanda: {
          required,
        },
      },
    };
  },
  directives: {
    ClosePopup,
  },
  components: {
    QBtn,
    QDate,
    QCard,
    QSpace,
    QInput,
    QSelect,
    QSeparator,
    QPopupProxy,
    QCardActions,
    QCardSection,
  },
  beforeMount() {
    if (this.formData.proceso_id) {
      this.procesoObject = this.procesos
        .find(item => item.value === this.formData.proceso_id);
    }
    if (this.formData.tipodemanda_id) {
      this.tipoDemandaObject = this.tiposDemandas
        .find(item => item.value === this.formData.tipodemanda_id);
    }
    if (this.formData.tipoacuerdo_id) {
      this.tipoAcuerdoObject = this.tiposAcuerdos
        .find(item => item.value === this.formData.tipoacuerdo_id);
    } else {
      this.tipoAcuerdoObject = this.formData.tipoacuerdo;
    }
  },
  computed: {
    errorObservaciones() {
      if (!this.$v.formData.observaciones.minLength) {
        return 'Observacion debe tener al menos 3 caracteres';
      }
      if (!this.$v.formData.observaciones.maxLength) {
        return 'Observacion no debe tener al mas de 255 caracteres';
      }
      return '';
    },
    errorFechaElaboracion() {
      if (!this.$v.formData.fecha_elaboracion.validDate) {
        return 'Fecha de elaboración tiene que ser una fecha valida';
      }
      return 'El campo fecha de elaboración es un campo obligatorio';
    },
    tiposDemandas() {
      const tiposDemandas = this.$store.getters['tiposDemandas/getTiposDemandasAll'].map(item => ({
        label: item.descripcion,
        value: item.tipo_demanda_id,
      }));

      return _.sortBy(tiposDemandas, ['label']);
    },
    procesos() {
      const procesos = this.$store.getters['procesos/getProcesosAll'].map(item => ({
        id: item.id,
        label: item.descripcion,
        value: item.proceso_id,
        tipos_acuerdos: item.tipos_acuerdos,
        tipos_demandas: item.tipos_demandas,
      })).filter(item => item.tipos_demandas.includes(this.formData.tipodemanda_id));

      return _.sortBy(procesos, ['label']);
    },
    tiposAcuerdos() {
      let tiposAcuerdos = [];
      if (this.procesoObject) {
        tiposAcuerdos = this.$store.getters['tiposAcuerdo/getTiposAcuerdosAll'].map(item => ({
          id: item.id,
          label: `${String(item.clasificacion.data.descripcion).toUpperCase()} - ${item.descripcion}`,
          value: item.tipo_acuerdo_id,
        })).filter(item => this.procesoObject.tipos_acuerdos.includes(item.id));
      }

      return _.sortBy(tiposAcuerdos, ['label']);
    },
  },
  methods: {
    createValue(val, done) {
      if (val.length > 2) {
        done(val, 'add-unique');
      }
    },
    filterProcesoFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.pFiltered = this.procesos.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    filterTipoDemandaFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.tdFiltered = this.tiposDemandas
          .filter(v => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    filterTiposAcuerdosFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.taFiltered = this.tiposAcuerdos
          .filter(v => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    agregar() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('agregar-acuerdo-jv', this.formData);
      }
    },
  },
  watch: {
    procesoObject(val) {
      /* eslint no-unused-expressions: [2, { allowTernary: true }] */
      val != null ? this.formData.proceso = val.label : this.formData.proceso = '';
      val != null ? this.formData.proceso_id = val.value : this.formData.proceso_id = '';
    },
    tipoAcuerdoObject(val) {
      if (val != null) {
        if (typeof val === 'object') {
          this.formData.tipoacuerdo = val.label;
          this.formData.tipoacuerdo_id = val.value;
        }
        if (typeof val === 'string') {
          this.formData.tipoacuerdo = val.toUpperCase();
          this.formData.tipoacuerdo_id = null;
        }
      } else {
        this.formData.tipoacuerdo = '';
      }
    },
    tipoDemandaObject(val) {
      /* eslint no-unused-expressions: [2, { allowTernary: true }] */
      val != null ? this.formData.tipodemanda = val.label : this.formData.tipodemanda = '';
      val != null ? this.formData.tipodemanda_id = val.value : this.formData.tipodemanda_id = '';
    },
  },
};
</script>
