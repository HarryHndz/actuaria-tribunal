<template>
  <article class="SIDJ-box col-lg-12 col-md-12 col-sm-12 col-xs-12 q-ma-md">
    <section class="SIDJ-box-row SIDJ-box-row-header">
      <div class="SIDJ-list SIDJ-list-header SIDJ-list-header-important">
        <div>
          <span>{{grupo.nombre}}</span>
          <span>{{grupo.created_at | moment('MMM D YYYY, h:mm:ss a')}}</span>
        </div>

        <div>
          <span>{{clasificacion.label.toUpperCase()}}</span>
          <span>Clasificación</span>
        </div>

        <div>
          <span>{{usuario.nombre_completo.toUpperCase()}}</span>
          <span>Propietario</span>
        </div>
      </div>
    </section>

    <section class="SIDJ-box-row SIDJ-box-row-footer">
      <div class="SIDJ-box-row-footer-nav">
        <ul class="SIDJ-box-row-footer-nav-menu nav navbar-right">
          <li v-if="isOwner">
            <a href="#"
              @click.prevent="$emit('editar')"
            >
              <q-icon name="edit" color="black" size="1.4em"/>
              <q-tooltip>Editar</q-tooltip>
            </a>
          </li>
          <li v-if="isOwner">
            <a href="#"
              @click.prevent="$emit('eliminar')"
            >
              <q-icon name="delete" color="black" size="1.4em"/>
              <q-tooltip>Eliminar</q-tooltip>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </article>
</template>

<script>
import {
  QIcon,
  QTooltip,
} from 'quasar';

export default {
  name: 'box-info-grupo',
  props: {
    grupo: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      clasificaciones: [
        {
          label: 'Acuerdos',
          value: 'acuerdos',
        },
        {
          label: 'Cédula de notificaciones',
          value: 'cedula',
        },
      ],
    };
  },
  components: {
    QIcon,
    QTooltip,
  },
  computed: {
    clasificacion() {
      return this.clasificaciones.find(i => i.value === this.grupo.clasificacion_id);
    },
    isOwner() {
      return this.grupo.user_id === this.session.user_id
        || this.session.permisos.roles.id.indexOf(1) !== -1;
    },
    session() {
      return this.$store.getters['session/getUsuario'];
    },
    usuario() {
      return this.$store.getters['usuarios/getUsuarioByUsuarioId'](this.grupo.user_id);
    },
  },
};
</script>
