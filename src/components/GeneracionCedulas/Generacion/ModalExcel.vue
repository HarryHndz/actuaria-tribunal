<template>
   <q-card style="width: 1400px; max-width: 150vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Seleccionar Plantilla</div>
      <q-space />
      <q-btn
        icon="close"
        flat
        round
        dense
        v-close-popup
        @click.prevent="$emit('reiniciar-listado')"
      />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="row" v-if="fetching">
        <div class="col-md-12">
          <div class="x_content text-center q-ma-lg">
            <q-spinner
              size="5em"
              color="black"
              :thickness="5"
            />
          </div>
        </div>
      </div>

      <div class="q-pt-sm" v-if="!fetching && resultadosTemp.tipos_notificaciones.personal >= 1">
        <div class="text-h6">Selecciona la plantilla para las notificaciones personales</div>
          <div class="row q-ma-sm">
            <div class="col-md-4 col-xs-12">
              <q-select
                outlined
                clearable
                emit-value
                map-options
                stack-label
                class="q-ma-md"
                label="Selección"
                :options="selections"
                v-model="selection"
              />
            </div>
            <template v-if="selection == 1">
              <div class="col-md-4">
                <q-select
                  outlined
                  use-input
                  clearable
                  stack-label
                  class="q-ma-md"
                  label="Grupo de plantilla"
                  :options="gFiltered"
                  v-model="grupoObject"
                  @filter="filterGrupoFn"
                  :error="$v.formData.grupo_id.$error"
                  error-message="Grupo es un campo obligatorio"
                  @blur="$v.formData.grupo_id.$touch"
                />
            </div>
            <div class="col-md-4">
              <q-select
                outlined
                use-input
                clearable
                stack-label
                class="q-ma-md"
                label="Plantilla"
                :options="pFiltered"
                v-model="plantillaObject"
                @filter="filterPlantillaFn"
                :error="$v.formData.plantilla_id.$error"
                error-message="Plantilla es un campo obligatorio"
                @blur="$v.formData.plantilla_id.$touch"
              />
            </div>
          </template>

          <template v-if="selection == 2">
            <div class="row col-md-9">
              <q-file
                outlined
                clearable
                stack-label
                accept=".docx"
                v-model="file"
                class="q-ma-md"
                @blur="$v.file.$touch"
                @input="guardarArchivo"
                :error="$v.file.$error"
                label="Subir archivo (plantilla .docx)"
                error-message="Archivo es un campo obligatorio"
                :rules="[ (val) => !!val || 'Grupo es un campo obligatorio']"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </div>
          </template>
        </div>
      </div>

      <div class="q-pt-sm" v-if="!fetching && resultadosTemp.tipos_notificaciones.autoridad >= 1">
        <div class="text-h6">Selecciona la plantilla para las notificaciones de autoridades</div>
          <div class="row q-ma-sm">
            <div class="col-md-4 col-xs-12">
              <q-select
                outlined
                clearable
                emit-value
                map-options
                stack-label
                class="q-ma-md"
                label="Selección"
                :options="selections"
                v-model="selection"
              />
          </div>
          <template v-if="selection == 1">
            <div class="col-md-4">
              <q-select
                outlined
                use-input
                clearable
                stack-label
                class="q-ma-md"
                label="Grupo de plantilla"
                :options="gaFiltered"
                v-model="grupoaObject"
                @filter="filteraGrupoFn"
                :error="$v.formData.grupo_autoridad_id.$error"
                error-message="Grupo es un campo obligatorio"
                @blur="$v.formData.grupo_autoridad_id.$touch"
              />
            </div>
            <div class="col-md-4">
              <q-select
                outlined
                use-input
                clearable
                stack-label
                class="q-ma-md"
                label="Plantilla"
                :options="paFiltered"
                v-model="plantillaaObject"
                @filter="filteraPlantillaFn"
                :error="$v.formData.plantilla_autoridad_id.$error"
                error-message="Plantilla es un campo obligatorio"
                @blur="$v.formData.plantilla_autoridad_id.$touch"
              />
            </div>
          </template>

          <template v-if="selection == 2">
            <div class="row col-md-9">
              <q-file
                outlined
                clearable
                stack-label
                accept=".docx"
                v-model="file"
                class="q-ma-md"
                @blur="$v.file.$touch"
                @input="guardarArchivo"
                :error="$v.file.$error"
                label="Subir archivo (plantilla .docx)"
                error-message="Archivo es un campo obligatorio"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </div>
          </template>
        </div>
      </div>

      <div class="q-pt-sm" v-if="!fetching && resultadosTemp.tipos_notificaciones.tercero >= 1">
        <div class="text-h6">Selecciona la plantilla para las notificaciones de terceros</div>
          <div class="row q-ma-sm">
            <div class="col-md-4 col-xs-12">
              <q-select
                outlined
                clearable
                emit-value
                map-options
                stack-label
                class="q-ma-md"
                label="Selección"
                :options="selections"
                v-model="selection"
              />
            </div>
        <template v-if="selection == 1">
          <div class="col-md-4">
            <q-select
              outlined
              use-input
              clearable
              stack-label
              class="q-ma-md"
              label="Grupo de plantilla"
              :options="gtFiltered"
              v-model="grupotObject"
              @filter="filtertGrupoFn"
              :error="$v.formData.grupo_tercero_id.$error"
              error-message="Grupo es un campo obligatorio"
              @blur="$v.formData.grupo_tercero_id.$touch"
            />
          </div>
          <div class="col-md-4">
            <q-select
              outlined
              use-input
              clearable
              stack-label
              class="q-ma-md"
              label="Plantilla"
              :options="ptFiltered"
              v-model="plantillatObject"
              @filter="filtertPlantillaFn"
              :error="$v.formData.plantilla_tercero_id.$error"
              error-message="Grupo es un campo obligatorio"
              @blur="$v.formData.plantilla_tercero_id.$touch"
            />
          </div>
        </template>

        <template v-if="selection == 2">
          <div class="col-md-9">
            <q-file
              outlined
              clearable
              stack-label
              accept=".docx"
              v-model="file"
              class="q-ma-md"
              @blur="$v.file.$touch"
              @input="guardarArchivo"
              :error="$v.file.$error"
              label="Subir archivo (plantilla .docx)"
              error-message="Archivo es un campo obligatorio"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
        </template>
      </div>
    </div>

      <q-separator/>

      <q-stepper-navigation class="q-pt-none">
        <div class="text-right">
          <q-btn class="q-ma-md "
            @click="savePlantilla"
            color="pink-10"
            label="Guardar"
            icon="arrow_forward"
          />
        </div>
      </q-stepper-navigation>
    </q-card-section>
  </q-card>
</template>

<script>
import {
  QIcon,
  QFile,
  QSelect,
  Loading,
  ClosePopup,
  QSeparator,
  QCard,
  QCardSection,
  QStepperNavigation,
} from 'quasar';

import _ from 'lodash';

import {
  required, requiredIf,
} from 'vuelidate/lib/validators';

import env from 'boot/env';
import errors from 'boot/errors';
import infoFile from 'boot/infoFile';

export default {
  name: 'modal-excel',
  props: {
    resultadosTemp: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      file: null,
      fetching: false,
      selection: 1,
      grupoObject: null,
      grupoaObject: null,
      grupotObject: null,
      plantillaObject: null,
      plantillaaObject: null,
      plantillatObject: null,
      pFiltered: this.plantillas,
      paFiltered: this.plantillasa,
      ptFiltered: this.plantillast,
      gFiltered: this.grupos,
      gtFiltered: this.grupost,
      gaFiltered: this.gruposa,
      sizeAllowed: 4,
      formData: {
        grupo_id: null,
        plantilla_id: null,
        grupo_autoridad_id: null,
        plantilla_autoridad_id: null,
        grupo_tercero_id: null,
        plantilla_tercero_id: null,
      },
      selections: [
        {
          value: 1,
          label: 'Carpeta de archivos',
        },
        {
          value: 2,
          label: 'Subir archivo',
        },
      ],
    };
  },
  components: {
    QIcon,
    QFile,
    QSelect,
    QSeparator,
    QCard,
    QCardSection,
    QStepperNavigation,
  },
  directives: {
    ClosePopup,
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
      });

      this.fetching = false;
      return Promise.resolve(true);
    } catch (e) {
      errors(e);
      this.fetching = false;
      return Promise.reject(true);
    }
  },
  validations() {
    if (this.resultadosTemp.tipos_notificaciones.personal >= 1
      && this.resultadosTemp.tipos_notificaciones.autoridad >= 1
      && this.resultadosTemp.tipos_notificaciones.tercero >= 1) {
      return {
        formData: {
          grupo_id: {
            required,
          },
          plantilla_id: {
            required,
          },
          grupo_autoridad_id: {
            required,
          },
          plantilla_autoridad_id: {
            required,
          },
          grupo_tercero_id: {
            required,
          },
          plantilla_tercero_id: {
            required,
          },
        },
      };
    }
    if (this.resultadosTemp.tipos_notificaciones.personal >= 1
      && this.resultadosTemp.tipos_notificaciones.autoridad >= 1) {
      return {
        formData: {
          grupo_id: {
            required,
          },
          plantilla_id: {
            required,
          },
          grupo_autoridad_id: {
            required,
          },
          plantilla_autoridad_id: {
            required,
          },
        },
      };
    }
    if (this.resultadosTemp.tipos_notificaciones.personal >= 1
    && this.resultadosTemp.tipos_notificaciones.tercero >= 1) {
      return {
        formData: {
          grupo_id: {
            required,
          },
          plantilla_id: {
            required,
          },
          grupo_tercero_id: {
            required,
          },
          plantilla_tercero_id: {
            required,
          },
        },
      };
    }
    if (this.resultadosTemp.tipos_notificaciones.autoridad >= 1
      && this.resultadosTemp.tipos_notificaciones.tercero >= 1) {
      return {
        formData: {
          grupo_autoridad_id: {
            required,
          },
          plantilla_autoridad_id: {
            required,
          },
          grupo_tercero_id: {
            required,
          },
          plantilla_tercero_id: {
            required,
          },
        },
      };
    }
    if (this.resultadosTemp.tipos_notificaciones.personal >= 1) {
      return {
        formData: {
          grupo_id: {
            required,
          },
          plantilla_id: {
            required,
          },
        },
      };
    }
    if (this.resultadosTemp.tipos_notificaciones.autoridad >= 1) {
      return {
        formData: {
          grupo_autoridad_id: {
            required,
          },
          plantilla_autoridad_id: {
            required,
          },
        },
      };
    }
    if (this.resultadosTemp.tipos_notificaciones.tercero >= 1) {
      return {
        formData: {
          grupo_tercero_id: {
            required,
          },
          plantilla_tercero_id: {
            required,
          },
        },
      };
    }
    return {
      selection: {
        required,
      },
      file: {
        required: requiredIf(nestedObject => !nestedObject.formData.archivo_plantilla_id),
      },
    };
  },
  computed: {
    env() {
      return env;
    },
    session() {
      return this.$store.getters['session/getUsuario'];
    },
    usuario() {
      return this.$store.getters['session/getUsuario'];
    },
    ponenciasPermisos() {
      return this.$store.getters['session/getPermisos'];
    },
    grupos() {
      const grupos = this.$store.getters['gruposPlantillas/getGruposPlantillasVisibles'].map(item => ({
        label: item.nombre,
        value: item.grupo_id,
      }));
      return _.orderBy(grupos, ['label', 'value'], ['asc', 'asc']);
    },
    plantillas() {
      let plantillas = this.$store.getters['plantillas/getPlantillasVisibles'].map(item => ({
        label: item.nombre,
        value: item.plantilla_id,
        grupo_id: item.grupo_id,
        archivo_plantilla_id: item.archivoPlantilla.data.archivo_id,
      }));

      plantillas = plantillas.filter(i => i.grupo_id === this.formData.grupo_id);

      return _.orderBy(plantillas, ['label', 'value'], ['asc', 'asc']);
    },
    gruposa() {
      const grupost = this.$store.getters['gruposPlantillas/getGruposPlantillasVisibles'].map(item => ({
        label: item.nombre,
        value: item.grupo_id,
      }));
      return _.orderBy(grupost, ['label', 'value'], ['asc', 'asc']);
    },
    plantillasa() {
      let plantillasa = this.$store.getters['plantillas/getPlantillasVisibles'].map(item => ({
        label: item.nombre,
        value: item.plantilla_id,
        grupo_id: item.grupo_id,
        archivo_plantilla_id: item.archivoPlantilla.data.archivo_id,
      }));

      plantillasa = plantillasa.filter(i => i.grupo_id === this.formData.grupo_autoridad_id);

      return _.orderBy(plantillasa, ['label', 'value'], ['asc', 'asc']);
    },
    grupost() {
      const grupost = this.$store.getters['gruposPlantillas/getGruposPlantillasVisibles'].map(item => ({
        label: item.nombre,
        value: item.grupo_id,
      }));
      return _.orderBy(grupost, ['label', 'value'], ['asc', 'asc']);
    },
    plantillast() {
      let plantillast = this.$store.getters['plantillas/getPlantillasVisibles'].map(item => ({
        label: item.nombre,
        value: item.plantilla_id,
        grupo_id: item.grupo_id,
        archivo_plantilla_id: item.archivoPlantilla.data.archivo_id,
      }));

      plantillast = plantillast.filter(i => i.grupo_id === this.formData.grupo_tercero_id);

      return _.orderBy(plantillast, ['label', 'value'], ['asc', 'asc']);
    },
  },
  methods: {
    async savePlantilla() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        Loading.show({
          message: 'Cargando...',
        });
        const resultadoFinal = [];
        this.resultadosTemp.cedulas.forEach((i) => {
          let add;
          if (i.tipo_id === 1) {
            add = {
              grupo_id: this.formData.grupo_id,
              plantilla_id: this.formData.plantilla_id,
              archivo_plantilla_id: this.formData.archivo_plantilla_id,
            };
          }
          if (i.tipo_id === 2) {
            add = {
              grupo_id: this.formData.grupo_autoridad_id,
              plantilla_id: this.formData.plantilla_autoridad_id,
              archivo_plantilla_id: this.formData.archivo_plantilla_autoridad_id,
            };
          }
          if (i.tipo_id === 3) {
            add = {
              grupo_id: this.formData.grupo_tercero_id,
              plantilla_id: this.formData.plantilla_tercero_id,
              archivo_plantilla_id: this.formData.archivo_plantilla_tercero_id,
            };
          }
          resultadoFinal.push({
            ...i,
            ...add,
          });
          return true;
        });
        this.$emit('getResultados', resultadoFinal);
        Loading.hide();
        this.resultadoFinal = [];
      }
      return Promise.resolve(true);
    },
    filteraGrupoFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.gaFiltered = this.gruposa.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    filterGrupoFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.gFiltered = this.grupos.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    filtertGrupoFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.gtFiltered = this.grupost.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    filterPlantillaFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.pFiltered = this.plantillas.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    filteraPlantillaFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.paFiltered = this.plantillasa.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    filtertPlantillaFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.ptFiltered = this.plantillast.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    filterTipoNotificacionFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.tFiltered = this.tipoNotificaciones
          .filter(v => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    async guardarArchivo(file) {
      if (file) {
        Loading.show();

        if (file.size > this.sizeAllowed * 1024 * 1024) {
          Loading.hide();
          this.$emit('cerrar');
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

          const response = await this.$store.dispatch('archivos/postArchivosPlantillasTemporales', fd);
          Loading.hide();
          if (this.resultadoFinal.tipo_id === 1) {
            this.formData.archivo_plantilla_id = response.data.data?.id ?? null;
          }
          if (this.resultadoFinal.tipo_id === 2) {
            this.formData.archivo_plantilla_autoridad_id = response.data.data?.id ?? null;
          }
          if (this.resultadoFinal.tipo_id === 3) {
            this.formData.archivo_plantilla_tercero_id = response.data.data?.id ?? null;
          }
          this.showFormDocumento = true;

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
  },
  watch: {
    plantillaObject(val) {
      /* eslint no-unused-expressions: [2, { allowTernary: true }] */
      val != null ? this.formData.plantilla_id = val.value : this.formData.plantilla_id = null;
      val != null
        ? this.formData.archivo_plantilla_id = val.archivo_plantilla_id
        : this.formData.archivo_plantilla_id = null;
    },
    grupoObject(val, oldVal) {
      /* eslint no-unused-expressions: [2, { allowTernary: true }] */
      val != null ? this.formData.grupo_id = val.value : this.formData.grupo_id = null;

      if (oldVal) {
        this.plantillaObject = null;
        this.formData.plantilla_id = null;
        this.formData.archivo_plantilla_id = null;
      }
    },
    tipoNotificacionesObject(val) {
      /* eslint no-unused-expressions: [2, { allowTernary: true }] */
      val != null ? this.formData.tipo_id = val.value : this.formData.tipo_id = null;
    },
    plantillaaObject(val) {
      /* eslint no-unused-expressions: [2, { allowTernary: true }] */
      val != null ? this.formData.plantilla_autoridad_id = val.value
        : this.formData.plantilla_autoridad_id = null;
      val != null
        ? this.formData.archivo_plantilla_autoridad_id = val.archivo_plantilla_id
        : this.formData.archivo_plantilla_autoridad_id = null;
    },
    grupoaObject(val, oldVal) {
      /* eslint no-unused-expressions: [2, { allowTernary: true }] */
      val != null ? this.formData.grupo_autoridad_id = val.value
        : this.formData.grupo_autoridad_id = null;

      if (oldVal) {
        this.plantillaaObject = null;
        this.formData.plantilla_autoridad__id = null;
        this.formData.archivo_plantilla_autoridad_id = null;
      }
    },
    plantillatObject(val) {
      /* eslint no-unused-expressions: [2, { allowTernary: true }] */
      val != null ? this.formData.plantilla_tercero_id = val.value
        : this.formData.plantilla_tercero_id = null;
      val != null
        ? this.formData.archivo_plantilla_tercero_id = val.archivo_plantilla_id
        : this.formData.archivo_plantilla_tercero_id = null;
    },
    grupotObject(val, oldVal) {
      /* eslint no-unused-expressions: [2, { allowTernary: true }] */
      val != null ? this.formData.grupo_tercero_id = val.value
        : this.formData.grupo_tercero_id = null;

      if (oldVal) {
        this.plantillatObject = null;
        this.formData.plantilla_id = null;
        this.formData.archivo_plantilla_tercero_id = null;
      }
    },
    selection() {
      this.formData.grupo_id = null;
      this.grupotObject = null;
      this.grupoObject = null;
      this.grupoaObject = null;
      this.formData.plantilla_id = null;
      this.plantillatObject = null;
    },
  },
};
</script>

<style scoped>
  .excel-upload-input {
      display: none;
      z-index: -9999;
  }
</style>
