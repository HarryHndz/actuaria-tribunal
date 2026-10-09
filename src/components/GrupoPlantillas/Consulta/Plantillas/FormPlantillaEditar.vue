<template>
  <q-card style="width: 1000px; max-width: 110vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Datos de la plantilla</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="q-pt-sm">
        <div class="row">
          <div class="col-md-6">
            <q-input
              outlined
              stack-label
              class="q-ma-md"
              label="Nombre de la plantilla"
              v-model="formData.nombre"
              :error="$v.formData.nombre.$error"
              @blur="$v.formData.nombre.$touch"
              :error-message="errorNombre"
            />
          </div>

          <div class="col-md-6">
            <q-file
              outlined
              clearable
              stack-label
              accept=".docx"
              v-model="file"
              class="q-ma-md"
              @input="guardarArchivo"
              label="Subir archivo (plantilla .docx)"
              error-message="Archivo es un campo obligatorio"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
        </div>
      </div>

      <div class="row" v-if="isAllowed(['admin'])">
        <div class="col-md-12 col-xs-12">
          <q-select
            outlined
            clearable
            stack-label
            label="Leyenda - Tipo listado"
            class="q-ma-md"
            :options="leyendas"
            v-model="leyendaObject"
            error-message="Leyenda es una opción obligatorio"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <q-input
            outlined
            autogrow
            stack-label
            class="q-ma-md"
            label="Comentarios"
            v-model="formData.comentarios"
            :error="$v.formData.comentarios.$error"
            :error-message="errorComentarios"
            @blur="$v.formData.comentarios.$touch"
          />
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
        @click.prevent="guardar"
      />
    </q-card-actions>

  </q-card>
</template>

<script>
import {
  QBtn,
  QCard,
  QInput,
  QSpace,
  Notify,
  Loading,
  ClosePopup,
  QSeparator,
  QCardSection,
  QCardActions,
} from 'quasar';

import {
  required, minLength, maxLength,
} from 'vuelidate/lib/validators';

import _ from 'lodash';
import errors from 'boot/errors';
import infoFile from 'boot/infoFile';

export default {
  name: 'form-plantilla-editar',
  props: {
    plantilla: {
      required: false,
      type: Object,
    },
    grupo: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      file: null,
      sizeAllowed: 5,
      fetching: false,
      leyendaObject: null,
      formData: {
        nombre: '',
        comentarios: '',
        created_at: null,
        tipo_leyenda_id: null,
        ...this.plantilla,
        temp_file: null,
      },
    };
  },
  components: {
    QBtn,
    QCard,
    QInput,
    QSpace,
    QSeparator,
    QCardSection,
    QCardActions,
  },
  directives: {
    ClosePopup,
  },
  validations() {
    return {
      formData: {
        nombre: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(50),
        },
        comentarios: {
          minLength: minLength(3),
          maxLength: maxLength(255),
        },
      },
    };
  },
  beforeMount() {
    if (this.formData.tipo_leyenda_id) {
      this.leyendaObject = this.leyendas.find(item => item.value === this.formData.tipo_leyenda_id);
    }
  },
  computed: {
    session() {
      return this.$store.getters['session/getUsuario'];
    },
    errorNombre() {
      if (!this.$v.formData.nombre.minLength) {
        return 'El nombre debe de contener minimo 3 caracteres';
      }
      if (!this.$v.formData.nombre.maxLength) {
        return 'El nombre no debe de contener mas de 50 caracteres';
      }
      return 'El nombre es un campo requerido';
    },
    errorComentarios() {
      if (!this.$v.formData.comentarios.minLength) {
        return 'Los comentarios debe de contener minimo 3 caracteres';
      }
      return 'Los comentarios no debe de contener mas de 255 caracteres';
    },
    permisos() {
      return this.$store.getters['session/getPermisos'].roles.name;
    },
    leyendas() {
      const listado = _.sortBy(this.$store.getters['tiposLeyendas/getTiposLeyendasAll'].map(item => ({
        leyenda: item.leyenda,
        label: item.descripcion,
        value: item.tipo_leyenda_id,
        descripcion: item.descripcion,
        tipo_listado_id: item.tipo_listado_id,
      }), ['value', 'label']));

      return listado;
    },
  },
  methods: {
    isAllowed(roles) {
      return roles.some(i => this.permisos.some(j => i === j));
    },
    async guardar() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.fetching = true;
        const method = this.formData.created_at ? 'putPlantillas' : 'postPlantillas';

        try {
          await this.$store.dispatch(`plantillas/${method}`, {
            grupo_id: this.grupo.grupo_id,
            user_id: this.session.user_id,
            ...this.formData,
          });
          this.fetching = false;
          this.$emit('cerrar');
          Notify.create({
            message: method ? 'Registro actualizado exitosamente.' : 'Registrado correctamente',
            position: 'bottom',
          });
          return Promise.resolve(true);
        } catch (e) {
          errors(e);
          this.$emit('cerrar');
          this.fetching = false;
          return Promise.reject(true);
        }
      }
      return Promise.resolve(true);
    },
    async guardarArchivo(file) {
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

        const response = await this.$store.dispatch('archivos/postArchivosTemporales', fd);
        Loading.hide();
        this.formData.temp_file = response.data.data;

        return Promise.resolve(true);
      } catch (e) {
        errors(e);
        Loading.hide();
        return Promise.reject(true);
      }
    },
  },
  watch: {
    leyendaObject(val) {
      /* eslint no-unused-expressions: [2, { allowTernary: true }] */
      val != null ? this.formData.tipo_leyenda_id = val.value : this.formData.tipo_leyenda_id = '';
    },
  },
};
</script>

<style scoped>
.q-field--with-bottom {
  padding-bottom: 0px !important;
}
</style>
