<template>
  <q-form
    @submit="updateSession"
  >
    <div class="text-h6">Usuario</div>

    <q-separator />

    <div class="row q-pt-md">
      <div class="col-md-6">
        <q-input
          disable
          filled
          label="Usuario"
          class="q-ma-sm"
          v-model="usuario.name"
        />
      </div>
      <div class="col-md-6">
        <q-input
          disable
          filled
          class="q-ma-sm"
          label="Correo"
          v-model="usuario.email"
        />
      </div>
    </div>

    <div class="row q-pt-md">
      <div class="col-md-12">
        <q-input
          outlined
          name="password"
          class="q-ma-sm"
          label="Contraseña"
          v-model="formData.password"
          v-on:keyup.enter="updateSession"
          :type="isPwd ? 'password' : 'text'"
          :error="$v.formData.password.$error"
          @blur="$v.formData.password.$touch"
          error-message="Ingrese una contraseña valida"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
    </div>

    <q-btn class="q-ma-sm"
      color="pink-10"
      icon="save"
      label="Guardar"
      :loading="fetching"
      @click="updateSession"
    />

  </q-form>
</template>

<script>
import {
  QForm,
  QInput,
  QSeparator,
} from 'quasar';

import {
  required, minLength,
} from 'vuelidate/lib/validators';

export default {
  name: 'usuario-form',
  props: {
    usuario: {
      required: true,
      type: Object,
    },
    fetching: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      formData: {
        password: '',
      },
      isPwd: true,
    };
  },
  validations: {
    formData: {
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  components: {
    QForm,
    QInput,
    QSeparator,
  },
  methods: {
    updateSession() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('updateSession', this.formData);
      }
    },
  },
};
</script>
