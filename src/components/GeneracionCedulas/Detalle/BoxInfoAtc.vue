<template>
  <div class="row justify-center">
    <article class="SIDJ-box col-lg-12 col-md-12 col-sm-12 col-xs-12 q-mx-lg">
      <section class="SIDJ-box-row SIDJ-box-row-header">
        <div class="SIDJ-list SIDJ-list-header SIDJ-list-header-important">
          <div>
            <span>
              <strong>{{areaTrabajoCedulas ? areaTrabajoCedulas.folio : '--'}}</strong>
            </span>
            <span>Folio</span>
          </div>

          <div>
            <span>{{fechaCreacion}}</span>
            <span>Fecha creación</span>
          </div>

          <div>
            <span>{{areaTrabajoCedulas ? areaTrabajoCedulas.lista.length : ''}}</span>
            <span>Cédulas</span>
          </div>
        </div>
      </section>

      <section class="SIDJ-box-row SIDJ-box-row-footer">
        <div class="SIDJ-box-row-footer-nav">
          <ul class="SIDJ-box-row-footer-nav-menu nav navbar-right">
            <li>
              <a href="#"
                @click.prevent="descargarExcel"
              >
                <q-icon name="fa fa-file-excel" color="black" size="1.1em"/>
                <q-tooltip>Importar excel</q-tooltip>
              </a>
            </li>
            <li>
              <a href="#"
                @click.prevent="descargarAtc"
              >
                <q-icon name="fa fa-file-pdf" color="black" size="1.1em"/>
                <q-tooltip>Descargar</q-tooltip>
              </a>
            </li>
            <li>
              <a href="#"
                @click.prevent="borrar"
              >
                <q-icon name="delete" color="black" size="1.3em"/>
                <q-tooltip>Borrar</q-tooltip>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
import { Loading } from 'quasar';

import moment from 'moment';
import errors from 'boot/errors';

export default {
  name: 'box-info-atc',
  props: {
    areaTrabajoCedulas: {
      type: Object,
      required: true,
    },
  },
  computed: {
    fechaCreacion() {
      return this.areaTrabajoCedulas ? moment(this.areaTrabajoCedulas.created_at).format('DD MMM YYYY') : '';
    },
  },
  methods: {
    descargarAtc() {
      window.open(
        `${window.location.protocol}//${window.location.host}/actuaria/imprimir/area-trabajo-cedulas/${this.areaTrabajoCedulas.id}`,
        '_blank',
      );
    },
    descargarExcel() {
      window.open(
        `${window.location.protocol}//${window.location.host}/actuaria/excel/area-trabajo-cedulas/${this.areaTrabajoCedulas.id}`,
        '_blank',
      );
    },
    borrar() {
      this.$swal({
        title: '¿Está seguro de borrar el listado?',
        text: 'Esta cambio no se podrá revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Borrar',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
      }).then(async (resp) => {
        if (resp.value) {
          Loading.show({
            message: 'Borrando...',
          });
          try {
            await this.$store.dispatch('areaTrabajoCedulas/deleteAreaTrabajoCedulas', { id: this.areaTrabajoCedulas.id });
            Loading.hide();
            this.$router.push({
              name: 'busqueda-generacion-cedula',
            });
            return Promise.resolve(true);
          } catch (err) {
            errors(err);
            Loading.hide();
            return Promise.reject(true);
          }
        }
        return Promise.resolve(true);
      });
    },
  },
};
</script>
