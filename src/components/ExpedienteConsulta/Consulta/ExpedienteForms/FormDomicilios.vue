<template>
  <div class="q-pa-sm">
    <div class="row">
      <div class="col-md-6">
        <q-input outlined
          autogrow
          stack-label
          name="telefonos"
          class="q-ma-sm q-pa-sm"
          label="Telefonos"
          v-model="formData.telefonos"
        >
          <template v-slot:prepend>
            <q-icon name="phone" />
          </template>
        </q-input>
      </div>

      <div class="col-md-6">
        <q-input outlined
          autogrow
          stack-label
          class="q-ma-sm q-pa-sm"
          name="email"
          label="Correo electrónico"
          v-model="formData.email"
        >
          <template v-slot:prepend>
            <q-icon name="alternate_email" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <q-input outlined
          autogrow
          stack-label
          type="textarea"
          name="domicilio_acto"
          class="q-ma-sm q-pa-sm"
          label="Domicilio del acto (*)"
          v-model="formData.domicilioacto"
        >
          <template v-slot:prepend>
            <q-icon name="house" />
          </template>
        </q-input>
      </div>

      <div class="col-md-12">
        <q-input outlined
          autogrow
          stack-label
          type="textarea"
          class="q-ma-sm q-pa-sm"
          name="domicilio_acto_notificaciones"
          label="Domicilio para recibir notificaciones (*)"
          v-model="formData.domicilionotificacion"
        >
          <template v-slot:prepend>
            <q-icon name="maps_home_work" />
          </template>
        </q-input>
      </div>
    </div>

    <div align="right" class="q-mr-md">
      <q-btn class="q-ma-sm"
        color="pink-10"
        icon="save"
        label="Guardar"
        :loading="fetching"
        @click="guardar"
      />
    </div>
  </div>
</template>

<script>
import {
  QInput, Notify,
} from 'quasar';
import errors from 'boot/errors';

export default {
  name: 'form-domicilios',
  props: {
    expediente: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fetching: false,
      formData: {
        id: this.expediente.id,
        email: this.expediente.email,
        telefonos: this.expediente.telefonos,
        domicilioacto: this.expediente.domicilioacto,
        domicilionotificacion: this.expediente.domicilionotificacion,
      },
    };
  },
  components: {
    QInput,
  },
  methods: {
    async guardar() {
      this.fetching = true;
      try {
        await this.$store.dispatch('expedientes/putExpediente', this.formData);
        this.fetching = false;
        Notify.create({
          message: 'Domicilio actualizado correctamente.',
          position: 'bottom',
        });
        return Promise.resolve(true);
      } catch (e) {
        errors(e);
        this.closeForm();
        return Promise.reject(false);
      }
    },
  },
};
</script>
