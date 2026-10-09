<template>
  <q-card style="width: 1200px; max-width: 120vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Tercero interesado</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="q-pt-sm">
        <div class="row">
          <div
            :class="{
              'col-md-8': [3, 4, 5, 6].includes(expediente.tipo_demanda_id),
              'col-md-12': ![3, 4, 5, 6].includes(expediente.tipo_demanda_id),
            }"
          >
            <q-select
              outlined
              clearable
              emit-value
              map-options
              stack-label
              label="Persona"
              class="q-ma-sm"
              v-model="formData.tipo_persona_id"
              :options="tipoPersonas"
              :error="$v.formData.tipo_persona_id.$error"
              error-message="Tipo de persona es un campo obligatorio"
              @blur="$v.formData.tipo_persona_id.$touch"
            >
              <template v-slot:prepend>
                <q-icon name="info" />
              </template>
            </q-select>
          </div>

          <div class="col-md-4 col-xs-12" v-if="[3, 4, 5, 6].includes(expediente.tipo_demanda_id)">
            <q-select
              outlined
              clearable
              emit-value
              stack-label
              map-options
              label="Tipo"
              class="q-ma-sm"
              :options="tiposTerceros"
              v-model="formData.tipo_id"
              :error="$v.formData.tipo_id.$error"
              @blur="$v.formData.tipo_id.$touch"
              error-message="Tipo de tercero es un campo obligatorio"
            >
              <template v-slot:prepend>
                <q-icon name="info" />
              </template>
            </q-select>
          </div>

          <template v-if="[3].indexOf(formData.tipo_persona_id) != -1">
              <div class="col-md-8">
              <q-select
                outlined
                clearable
                use-input
                stack-label
                autocomplete="off"
                label="Dependencia"
                class="q-ma-sm"
                v-model="dObject"
                :options="dFiltered"
                :error="$v.dObject.$error"
                error-message="Dependencia es un campo obligatorio"
                @blur="$v.dObject.$touch"
                @filter="filterDependenciasFn"
              >
                <template v-slot:prepend>
                  <q-icon name="info" />
                </template>
              </q-select>
            </div>

            <div class="col-md-4">
              <q-input
                outlined
                stack-label
                class="q-ma-sm"
                label="Cargo"
                v-model="formData.cargo"
                :error="$v.formData.cargo.$error"
                @blur="$v.formData.cargo.$touch"
                error-message="El cargo es un campo requerido"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
            </div>
          </template>

          <template v-if="[1,3].indexOf(formData.tipo_persona_id) != -1">
            <div class="col-md-4">
              <q-input
                outlined
                stack-label
                class="q-ma-sm"
                label="Nombre"
                v-model="formData.nombre"
                :error="$v.formData.nombre.$error"
                @blur="$v.formData.nombre.$touch"
                error-message="El nombre es un campo requerido"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
            </div>
            <div class="col-md-4">
              <q-input
                outlined
                stack-label
                class="q-ma-sm"
                label="Apellido paterno"
                v-model="formData.apellidopaterno"
                :error="$v.formData.apellidopaterno.$error"
                @blur="$v.formData.apellidopaterno.$touch"
                error-message="El apellido paterno es un campo requerido"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
            </div>
            <div class="col-md-4">
              <q-input
                outlined
                stack-label
                class="q-ma-sm"
                label="Apellido materno"
                v-model="formData.apellidomaterno"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
            </div>
          </template>

          <div class="col-md-12" v-if="[2].indexOf(formData.tipo_persona_id) != -1">
            <q-input
              outlined
              stack-label
              class="q-ma-sm"
              label="Razón social"
              v-model="formData.razonsocial"
              :error="$v.formData.razonsocial.$error"
              @blur="$v.formData.razonsocial.$touch"
              error-message="La razón social es un campo requerido"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>

          <div class="col-md-4" v-if="[1,3].indexOf(formData.tipo_persona_id) != -1">
            <q-select
              outlined
              clearable
              emit-value
              map-options
              stack-label
              label="Genero"
              class="q-ma-sm"
              v-model="formData.genero"
              :options="generos"
              :error="$v.formData.genero.$error"
              error-message="Genero es un campo obligatorio"
              @blur="$v.formData.genero.$touch"
            />
          </div>

          <div class="col-md-4">
            <q-input
              outlined
              stack-label
              class="q-ma-sm"
              label="Telefono"
              v-model="formData.telefono"
            >
              <template v-slot:prepend>
                <q-icon name="phone" />
              </template>
            </q-input>
          </div>

          <div class="col-md-4">
            <q-input
              outlined
              stack-label
              class="q-ma-sm"
              label="Correo"
              v-model="formData.correo"
              :error="$v.formData.correo.$error"
              error-message="Ingrese un correo valido"
              @blur="$v.formData.correo.$touch"
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>
          </div>

          <div class="col-md-4">
            <q-select
              outlined
              clearable
              emit-value
              map-options
              stack-label
              label="Delegación"
              class="q-ma-sm"
              v-model="formData.iddelegacion"
              :options="delegaciones"
            />
          </div>

          <div :class="{
            'col-md-8': [1,3].indexOf(formData.tipo_persona_id) != -1,
            'col-md-12': formData.tipo_persona_id == 2,
          }">
            <q-input
              outlined
              stack-label
              class="q-ma-sm"
              label="Domicilio"
              v-model="formData.domicilio"
            >
              <template v-slot:prepend>
                <q-icon name="house" />
              </template>
            </q-input>
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
  Notify,
  QSelect,
} from 'quasar';

import _ from 'lodash';

import {
  required, email, minLength, requiredIf,
} from 'vuelidate/lib/validators';

export default {
  name: 'form-tercero',
  props: {
    tercero: {
      required: false,
      type: Object,
    },
    expediente: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      fetching: false,
      dFiltered: this.dependencias,
      dObject: null,
      formData: {
        id: this.tercero ? this.tercero.id : '',
        cargo: this.tercero ? this.tercero.cargo : '',
        nombre: this.tercero ? this.tercero.nombre : '',
        genero: this.tercero ? this.tercero.genero : '',
        correo: this.tercero ? this.tercero.correo : '',
        tipo_id: this.tercero ? this.tercero.tipo_id : null,
        telefono: this.tercero ? this.tercero.telefono : '',
        domicilio: this.tercero ? this.tercero.domicilio : '',
        created_at: this.tercero ? this.tercero.created_at : null,
        razonsocial: this.tercero ? this.tercero.razonsocial : '',
        iddelegacion: this.tercero ? this.tercero.delegacion_id : '',
        dependencia_id: this.tercero ? this.tercero.dependencia_id : '',
        apellidomaterno: this.tercero ? this.tercero.apellidomaterno : '',
        tipo_persona_id: this.tercero ? this.tercero.tipo_persona_id : 1,
        apellidopaterno: this.tercero ? this.tercero.apellidopaterno : '',
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
        tipo_persona_id: {
          required,
        },
        tipo_id: {
          required: requiredIf(() => {
            console.log(this.expediente);
            return [3, 4, 5, 6, 7].includes(this.expediente.tipo_demanda_id);
          }),
        },
        razonsocial: {
          required: requiredIf(i => [2].includes(i.tipo_persona_id)),
        },
        nombre: {
          required: requiredIf(i => [1, 3].includes(i.tipo_persona_id)),
        },
        apellidopaterno: {
          required: requiredIf(i => [1, 3].includes(i.tipo_persona_id)),
        },
        genero: {
          required: requiredIf(i => [1, 3].includes(i.tipo_persona_id)),
        },
        correo: {
          email,
        },
        domicilio: {
          minLength: minLength(3),
        },
        cargo: {
          required: requiredIf(i => [3].includes(i.tipo_persona_id)),
        },
      },
      dObject: {
        required: requiredIf(i => [3].includes(i.tipo_persona_id)),
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
    QSelect,
  },
  beforeMount() {
    if (this.formData.dependencia_id) {
      this.dObject = this.dependencias.find(item => item.value === this.formData.dependencia_id);
    }
  },
  computed: {
    generos() {
      return [
        {
          label: 'MASCULINO',
          value: false,
        },
        {
          label: 'FEMENINO',
          value: true,
        },
      ];
    },
    delegaciones() {
      const personas = this.$store.getters['delegaciones/getDelegacionesAll'];
      return personas.map(item => ({
        label: item.delegacion,
        value: item.delegacion_id,
      }));
    },
    dependencias() {
      const dependencias = this.$store.getters['dependenciasAutoridades/getDependenciasAutoridadesAll'];
      return dependencias.map(item => ({
        label: item.dependencia_autoridad,
        value: item.dependencia_autoridad_id,
      }));
    },
    tipoPersonas() {
      const personas = this.$store.getters['tiposPersonas/getTiposPersonasAll'];

      return personas.map(item => ({
        label: item.descripcion,
        value: item.tipo_persona_id,
      }));
    },
    tiposTerceros() {
      const tipos = this.$store.getters['tiposTerceros/getTiposTercerosAll'].map(i => ({
        label: i.descripcion,
        value: i.tipo_tercero_id,
        tipos_demandas: i.tipos_demandas,
      })).filter(j => j.tipos_demandas.includes(this.expediente.tipo_demanda_id));

      return _.orderBy(tipos, ['label'], ['asc']);
    },
  },
  methods: {
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.fetching = true;
        const method = this.formData.created_at ? 'terceros/putTercero' : 'terceros/postTercero';
        const event = this.formData.created_at ? 'editar' : 'registrar';

        this.$store.dispatch(method, this.formData)
          .then((object) => {
            this.$emit(event, object);
            this.fetching = false;

            return Promise.resolve(true);
          }).catch(() => {
            this.fetching = false;
            Notify.create({
              message: 'Ocurrió un error, intentalo mas tarde.',
              position: 'bottom',
            });
            this.$emit('close');
            return Promise.reject(false);
          });
      }
    },
    filterDependenciasFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.dFiltered = this.dependencias.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
  },
  watch: {
    'formData.tipo_persona_id': {
      handler(val) {
        const dataForm = this.formData;
        if (val === 1) {
          this.formData = {
            ...dataForm,
            nombre: dataForm.razonsocial,
            razonsocial: '',
            apellidomaterno: '',
            apellidopaterno: '',
            genero: '',
            cargo: '',
            dependencia_id: '',
          };
        }
        if (val === 2) {
          this.formData = {
            ...dataForm,
            nombre: '',
            razonsocial: dataForm.nombre,
            apellidomaterno: '',
            apellidopaterno: '',
            genero: '',
            cargo: '',
            dependencia_id: '',
          };
        }
        if (val === 3) {
          this.formData = {
            ...dataForm,
            nombre: dataForm.razonsocial,
            razonsocial: '',
            dependencia_id: '',
          };
        }
      },
      deep: false,
    },
    dObject(val) {
      /* eslint no-unused-expressions: [2, { allowTernary: true }] */
      val != null ? this.formData.dependencia_id = val.value : this.formData.dependencia_id = '';
    },
  },
};
</script>
