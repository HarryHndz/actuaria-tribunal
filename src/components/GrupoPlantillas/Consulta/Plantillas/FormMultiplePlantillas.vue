<template>
  <q-card style="width: 93%; max-width: 140vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">
        {{plantilla_files.length}} notificaciones a validar
      </div>

      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="q-pb-sm">
        <div class="row">
          <div class="col-md-12">
            <table class="q-table">
              <thead>
                <tr class="text-left">
                  <th style="width: 25%;">Archivo</th>
                  <th style="width: 35%;">Nombre<i style="color: red;">(*)</i></th>
                  <th style="width: 35%;">Comentarios</th>
                  <th style="width: 5%;">-</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="plantilla_files.length == 0">
                  <tr>
                    <td class="text-center" colspan="5">Sin plantillas</td>
                  </tr>
                </template>
                <template v-if="plantilla_files.length > 0">
                  <tr v-for="(item, index) in plantilla_files"
                    :key="item.id"
                  >
                    <td>{{item.archivo}}</td>
                    <td>
                      <q-input
                        placeholder="Nombre"
                        v-model="item.nombre"
                        :error="$v.plantilla_files.$each[index].nombre.$error"
                        @blur="$v.plantilla_files.$each[index].nombre.$touch"
                        :error-message="errorNombre(index)"
                      />
                    </td>
                    <td>
                      <q-input
                        placeholder="Comentarios"
                        v-model="item.comentarios"
                        :error="$v.plantilla_files.$each[index].comentarios.$error"
                        @blur="$v.plantilla_files.$each[index].comentarios.$touch"
                        :error-message="errorComentarios(index)"
                      />
                    </td>
                    <td>
                      <a href="#"
                        @click.prevent="borrarDocumento(item)"
                      >
                        <q-icon name="delete" color="black" size="1.8em"/>
                        <q-tooltip>Borrar</q-tooltip>
                      </a>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
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
  Loading,
  Notify,
  QCard,
  QCardSection,
  QBtn,
  QCardActions,
  QSeparator,
  QSpace,
  QInput,
  QIcon,
  QTooltip,
} from 'quasar';

import {
  required, minLength, maxLength,
} from 'vuelidate/lib/validators';

export default {
  name: 'tabla-notificaciones-temporales',
  props: {
    plantilla_files: {
      required: true,
      type: Array,
    },
    grupo: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      fetching: false,
    };
  },
  directives: {
    ClosePopup,
  },
  plugins: {
    Notify,
  },
  components: {
    QCard,
    QCardSection,
    QBtn,
    QCardActions,
    QSeparator,
    QSpace,
    QInput,
    QIcon,
    QTooltip,
  },
  validations() {
    return {
      plantilla_files: {
        $each: {
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
      },
    };
  },
  computed: {
    session() {
      return this.$store.getters['session/getUsuario'];
    },
  },
  methods: {
    errorNombre(index) {
      if (!this.$v.plantilla_files.$each[index].nombre.minLength) {
        return 'El nombre debe de contener minimo 3 caracteres';
      }
      if (!this.$v.plantilla_files.$each[index].nombre.maxLength) {
        return 'El nombre no debe de contener mas de 50 caracteres';
      }
      return 'El nombre es un campo requerido';
    },
    errorComentarios(index) {
      if (!this.$v.plantilla_files.$each[index].comentarios.minLength) {
        return 'Los comentarios debe de contener minimo 3 caracteres';
      }
      return 'Los comentarios no debe de contener mas de 255 caracteres';
    },
    save() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.fetching = true;
        Loading.show();
        let noDocumentos = 0;

        const promise = this.plantilla_files.map((item) => {
          noDocumentos += 1;
          return this.$store.dispatch('plantillas/postPlantillas', {
            nombre: item.nombre,
            comentarios: item.comentarios,
            user_id: this.session.user_id,
            grupo_id: this.grupo.grupo_id,
            temp_file: {
              ...item,
            },
          });
        });

        if (promise) {
          Promise.all(promise).then(() => {
            Notify.create({
              message: `${noDocumentos} plantillas registradas correctamente.`,
              position: 'bottom',
            });

            Loading.hide();
            this.fetching = false;
            this.$emit('cerrar');

            return Promise.resolve(true);
          }).catch(() => {
            Loading.hide();
            this.fetching = false;
            this.$emit('cerrar');

            Notify.create({
              message: 'Ocurrió un error, intentalo mas tarde.',
              position: 'bottom',
            });

            return Promise.reject(false);
          });
        }
      }
    },
    borrarDocumento(item) {
      const index = this.plantilla_files.findIndex(x => x.id === item.id);
      this.plantilla_files.splice(index, 1);
    },
  },
  watch: {
    plantilla_files(val) {
      if (val.length === 0) {
        this.$emit('cerrar');
      }
    },
  },
};
</script>
