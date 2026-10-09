<template>
  <q-card style="width: 1200px; max-width: 120vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Actor</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="q-pt-sm">
        <div class="row">
          <div class="col-md-10 col-xs-12">
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

          <div class="col-md-2 col-xs-12">
            <q-checkbox class="q-mt-md q-ml-md"
              v-model="formData.es_publico"
              label="¿Es público?"
            />
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

          <template class="row" v-if="[1,3].indexOf(formData.tipo_persona_id) != -1">
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
  QCheckbox,
} from 'quasar';

import {
  required, email, minLength,
} from 'vuelidate/lib/validators';

import errors from 'boot/errors';

export default {
  name: 'form-actor',
  props: {
    actor: {
      required: false,
      type: Object,
    },
  },
  data() {
    return {
      fetching: false,
      showModal: true,
      dFiltered: this.dependencias,
      dObject: null,
      formData: {
        id: this.actor ? this.actor.id : '',
        cargo: this.actor ? this.actor.cargo : '',
        nombre: this.actor ? this.actor.nombre : '',
        genero: this.actor ? this.actor.genero : '',
        correo: this.actor ? this.actor.correo : '',
        telefono: this.actor ? this.actor.telefono : '',
        domicilio: this.actor ? this.actor.domicilio : '',
        created_at: this.actor ? this.actor.created_at : null,
        es_publico: this.actor ? this.actor.es_publico : true,
        razonsocial: this.actor ? this.actor.razonsocial : '',
        iddelegacion: this.actor ? this.actor.delegacion_id : '',
        dependencia_id: this.actor ? this.actor.dependencia_id : '',
        apellidomaterno: this.actor ? this.actor.apellidomaterno : '',
        tipo_persona_id: this.actor ? this.actor.tipo_persona_id : 1,
        apellidopaterno: this.actor ? this.actor.apellidopaterno : '',
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
    if (this.formData.tipo_persona_id === 1) {
      return {
        formData: {
          tipo_persona_id: {
            required,
          },
          nombre: {
            required,
          },
          apellidopaterno: {
            required,
          },
          genero: {
            required,
          },
          correo: {
            email,
          },
          domicilio: {
            minLength: minLength(3),
          },
        },
      };
    }
    if (this.formData.tipo_persona_id === 2) {
      return {
        formData: {
          tipo_persona_id: {
            required,
          },
          razonsocial: {
            required,
          },
          correo: {
            email,
          },
          domicilio: {
            minLength: minLength(3),
          },
        },
      };
    }
    return {
      formData: {
        tipo_persona_id: {
          required,
        },
        nombre: {
          required,
        },
        apellidopaterno: {
          required,
        },
        genero: {
          required,
        },
        correo: {
          email,
        },
        domicilio: {
          minLength: minLength(3),
        },
        cargo: {
          required,
        },
      },
      dObject: {
        required,
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
    QCheckbox,
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
  },
  methods: {
    async save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.fetching = true;
        const method = this.formData.created_at ? 'actores/putActor' : 'actores/postActor';
        const event = this.formData.created_at ? 'editar' : 'registrar';

        try {
          const object = await this.$store.dispatch(method, this.formData);
          this.fetching = false;
          this.$emit(event, object);
          return Promise.resolve(true);
        } catch (e) {
          errors(e);
          this.$emit('close');
          this.fetching = false;
          return Promise.reject(false);
        }
      }
      return Promise.resolve(true);
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
