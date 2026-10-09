<template>
    <div>
      <q-splitter
        v-model="splitterModel"
        width="100%"
        style="height: 100%; width: 100%;"
      >
        <template v-slot:before>
          <div class="q-pa-lg" >
            <q-tree
              accordion
              :nodes="simple"
              node-key="label"
              selected-color="primary"
              :selected.sync="selected"
            />
          </div>
          <div class="row q-pa-lg q-ml-md">
            <div class="col-md-12">
              <strong>Descargar manual</strong><br/><br/>
              <a href="#" class="q-mx-md"
                @click.prevent="descargarPdf"
              >
                <q-icon name="fa fa-file-pdf" size="3em" color="black"/>
                <q-tooltip>Descargar manual</q-tooltip>
              </a>
            </div>
          </div>

          <div class="row q-pa-lg q-ml-md">
            <div class="col-md-12">
              <strong>Descargar plantilla</strong><br/><br/>
              <a href="#" class="q-mx-md"
                @click.prevent="descargarPlantilla"
              >
                <q-icon name="fa fa-file-word" size="3em" color="black"/>
                <q-tooltip>Descargar plantilla</q-tooltip>
              </a>
            </div>
          </div>
        </template>

        <template v-slot:after>
          <listado-acuerdos
            :selected="selected"
          ></listado-acuerdos>

          <notificaciones-comparecencia
            :selected="selected"
          ></notificaciones-comparecencia>

          <notificaciones
            :selected="selected"
          ></notificaciones>

          <expediente
            :selected="selected"
          ></expediente>

          <registro-anteriores
            :selected="selected"
          ></registro-anteriores>

          <citas
            :selected="selected"
          ></citas>

          <admon-plantillas
            :selected="selected"
          ></admon-plantillas>

          <generacion-cedulas
            :selected="selected"
          ></generacion-cedulas>
        </template>
      </q-splitter>
    </div>
</template>

<script>
import {
  QSplitter,
  QTree,
} from 'quasar';

import ListadoAcuerdos from '../components/Ayuda/ListadoAcuerdos';
import Notificaciones from '../components/Ayuda/Notificaciones';
import NotificacionesComparecencia from '../components/Ayuda/NotificacionesComparencecia';
import Expediente from '../components/Ayuda/Expediente';
import AdmonPlantillas from '../components/Ayuda/AdmonPlantillas';
import GeneracionCedulas from '../components/Ayuda/GeneracionCedulas';
import Citas from '../components/Ayuda/Citas';
import RegistroAnteriores from '../components/Ayuda/RegistroAnteriores2014';

export default {
  name: 'ayuda',
  data() {
    return {
      splitterModel: 50,
      selected: 'Consulta expediente',
      simple: [
        {
          label: 'Consulta expediente',
          children: [
            {
              label: 'Búsqueda expediente',
              icon: 'view_quilt',
            },
            {
              label: 'Notificaciónes',
              icon: 'view_quilt',
              children: [
                {
                  label: 'Consultar notificación',
                  icon: 'live_help',
                },
                {
                  label: 'Subir notificación',
                  icon: 'live_help',
                },
                {
                  label: 'Subir multiples notificaciones',
                  icon: 'live_help',
                },
                {
                  label: 'Visualizador notificación/acuerdo',
                  icon: 'live_help',
                },
                {
                  label: 'Editar notificación',
                  icon: 'live_help',
                },
                {
                  label: 'Eliminar notificación',
                  icon: 'live_help',
                },
              ],
            },
          ],
        },
        {
          label: 'Lista de estrados y boletín electrónico',
          children: [
            {
              label: 'Generación',
              icon: 'view_quilt',
              children: [
                {
                  label: 'Registro de listado',
                  icon: 'live_help',
                },
                {
                  label: 'Escaneo de acuerdos',
                  icon: 'live_help',
                },
              ],
            },
            {
              label: 'Consulta',
              icon: 'view_quilt',
              children: [
                {
                  label: 'Editar listado',
                  icon: 'live_help',
                },
                {
                  label: 'Editar fecha, actuario y ponencia',
                  icon: 'live_help',
                },
              ],
            },
            {
              label: 'Búsqueda',
              icon: 'view_quilt',
              children: [
                {
                  label: 'Buscar listado',
                  icon: 'live_help',
                },
              ],
            },
            {
              label: 'Anteriores 2014',
              icon: 'view_quilt',
              children: [
                {
                  label: 'Registro anteriores 2014',
                  icon: 'live_help',
                },
                {
                  label: 'Información acuerdo anteriores 2014',
                  icon: 'live_help',
                },
                {
                  label: 'Editar anteriores 2014',
                  icon: 'live_help',
                },
                {
                  label: 'Borrar acuerdo anteriores 2014',
                  icon: 'live_help',
                },
              ],
            },
          ],
        },
        {
          label: 'Notificaciones comparecencia',
          children: [
            {
              label: 'Generación ',
              icon: 'view_quilt',
              children: [
                {
                  label: 'Registro de notificacion comparecencia',
                  icon: 'live_help',
                },
                {
                  label: 'Escaneo de acuerdos ',
                  icon: 'live_help',
                },
              ],
            },
            {
              label: 'Consulta ',
              icon: 'view_quilt',
              children: [
                {
                  label: 'Editar listado ',
                  icon: 'live_help',
                },
                {
                  label: 'Editar fecha, actuario y ponencia ',
                  icon: 'live_help',
                },
              ],
            },
            {
              label: 'Búsqueda ',
              icon: 'view_quilt',
              children: [
                {
                  label: 'Búscar ',
                  icon: 'live_help',
                },
                {
                  label: 'Búsqueda avanzada',
                  icon: 'live_help',
                },
              ],
            },
          ],
        },
        {
          label: 'Generación de cédulas',
          children: [
            {
              label: 'Generar cédula de notificación',
              icon: 'view_quilt',
            },
            {
              label: 'Iconos cédulas',
              icon: 'view_quilt',
              children: [
                {
                  label: 'Visualizar/Descargar cédula',
                  icon: 'visibility',
                },
                {
                  label: 'Información cédula',
                  icon: 'info',
                },
                {
                  label: 'Borrar cédula',
                  icon: 'delete',
                },
                {
                  label: 'Editar cédula',
                  icon: 'edit',
                },
              ],
            },
            {
              label: 'Guardar area de trabajo',
              icon: 'view_quilt',
              children: [
                {
                  label: 'Imprimir multiples cédulas',
                  icon: 'view_quilt',
                },
              ],
            },
            {
              label: 'Consulta de cédulas',
              icon: 'view_quilt',
            },
          ],
        },
        {
          label: 'Citas SCO',
          children: [
            {
              label: 'Búsqueda citas',
              icon: 'search',
            },
            {
              label: 'Información cita',
              icon: 'info',
            },
            {
              label: 'Imprimir acuses',
              icon: 'print',
            },
            {
              label: 'Descargar acuses',
              icon: 'get_app',
            },
            {
              label: 'Reportes',
              icon: 'fa fa-file-pdf',
            },
          ],
        },
        {
          label: 'Administración de plantillas',
          children: [
            {
              label: 'Registrar carpeta',
              icon: 'add',
            },
            {
              label: 'Agregar permisos',
              icon: 'fa fa-user-lock',
            },
            {
              label: 'Editar carpeta',
              icon: 'edit',
            },
            {
              label: 'Informacion carpeta',
              icon: 'info',
            },
            {
              label: 'Borrar carpeta',
              icon: 'delete',
            },
            {
              label: 'Consultar carpeta',
              icon: 'search',
              children: [
                {
                  label: 'Registrar plantilla',
                  icon: 'view_quilt',
                },
                {
                  label: 'Editar plantilla',
                  icon: 'edit',
                },
                {
                  label: 'Borrar plantilla',
                  icon: 'delete',
                },
                {
                  label: 'Visualizar/Descargar plantilla',
                  icon: 'visibility',
                },
                {
                  label: 'Agregar/Borrar procesos',
                  icon: 'view_quilt',
                },
              ],
            },
          ],
        },
      ],
    };
  },
  beforeCreate() {
    this.$emit('leftDrawerOpen', false);
  },
  components: {
    QTree,
    Citas,
    QSplitter,
    Expediente,
    ListadoAcuerdos,
    NotificacionesComparecencia,
    Notificaciones,
    AdmonPlantillas,
    GeneracionCedulas,
    RegistroAnteriores,
  },
  methods: {
    descargarPdf() {
      window.open(
        `${window.location.protocol}//${window.location.host}/descargas/manuales/actuaria/pdf`,
        '_blank',
      );
    },
    descargarWord() {
      window.open(
        `${window.location.protocol}//${window.location.host}/descargas/manuales/actuaria/word`,
        '_blank',
      );
    },
    descargarPlantilla() {
      window.open(
        `${window.location.protocol}//${window.location.host}/descargas/plantillas/actuaria/cedulas/word`,
        '_blank',
      );
    },
  },
};
</script>

<style>
.q-splitter__before{
  width: 30% !important;
}
.q-splitter__after{
  width: 65% !important;
}
.info{
  font-size: 16px;
}
</style>
