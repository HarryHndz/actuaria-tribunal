<template>
  <q-page class="flex flex-center">
    <q-card inline style="width: 500px">
      <q-card-section
        class="q-pt-lg flex flex-center"
      >
        <img
          alt="Tribunal de Justicia Administrativa"
          src="~assets/logo-tribunal-tabasco.png"
          style="width: 50%;"
        >
      </q-card-section>

      <q-card-section>
        <div class="text-center q-py-sm">
          <span class="text-h6">Inicio de sesión</span>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="q-px-lg">
          <q-form
            @submit="login"
          >
            <q-input
              ref="username"
              label="Correo electrónico"
              v-on:keyup.enter="login"
              v-model="credentials.username"
              :error="$v.credentials.username.$error"
              @blur="$v.credentials.username.$touch"
              error-message="Ingresa una cuenta de correo válida"
            >
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>

            <q-input
              label="Contraseña"
              ref="password"
              type="password"
              v-on:keyup.enter="login"
              v-model="credentials.password"
              :error="$v.credentials.password.$error"
              @blur="$v.credentials.password.$touch"
              error-message="Ingrese una contraseña valida"
            >
              <template v-slot:prepend>
                <q-icon name="vpn_key" />
              </template>
            </q-input>

          </q-form>
        </div>
      </q-card-section>

      <q-card-actions
        align="center"
      >
        <q-btn
          color="pink-10"
          @click="login"
        >
          Ingresar
        </q-btn>
      </q-card-actions>
    </q-card>

    <q-ajax-bar
      ref="bar"
      position="bottom"
      color="pink-10"
      size="10px"
      skip-hijack
    />
  </q-page>
</template>

<script>
import {
  QAjaxBar,
  QForm,
  QInput,
  QCard,
  QCardActions,
  QCardSection,
  Notify,
} from 'quasar';

import {
  required, minLength, email,
} from 'vuelidate/lib/validators';

export default {
  name: 'LoginForm',
  data() {
    return {
      credentials: {
        username: '',
        password: '',
      },
    };
  },
  components: {
    QAjaxBar,
    QForm,
    QInput,
    QCard,
    QCardActions,
    QCardSection,
  },
  validations: {
    credentials: {
      username: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  methods: {
    login() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$refs.bar.start();

        this.$store.dispatch('session/fetchToken', {
          username: this.credentials.username,
          password: this.credentials.password,
        }).then(() => {
          this.$refs.bar.stop();
          this.$router.push('/inicio');
        }).catch((error) => {
          this.$refs.bar.stop();
          console.log(error);
          Notify.create({
            message: error.data,
            position: 'bottom',
          });
        });
      }
    },
  },
};
</script>

<style>
</style>
