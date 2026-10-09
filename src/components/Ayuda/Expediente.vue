<template>
  <q-tab-panels
    v-model="selected"
    animated
    transition-prev="jump-up"
    transition-next="jump-up"
  >
    <q-tab-panel name="Consulta expediente">
      <div class="text-h4 q-mb-md">Consulta de expediente</div>
        <p class="q-ma-md">
          En este modulo podrás realizar las siguientes acciones.
          <ul>
            <li>Buscar expediente</li>
            <li>Consulta de notificación</li>
            <li>Subir notificación</li>
            <li>Visualizar notificación</li>
            <li>Editar notificación</li>
            <li>Eliminar notificación</li>
            <li>Buscar notificación</li>
          </ul>
        </p>
      <img class="q-ma-md q-ml-lg"
        alt="generacion_pantalla"
        src="~assets/img/expediente/buscador_expedientes.png"
        style="width: 70%;"
      >
    </q-tab-panel>

    <q-tab-panel name="Búsqueda expediente">
      <div class="text-h4 q-ma-md">Buscar listado</div>
        <p class="q-ma-md">
          Para poder realizar una búsqueda más precisa es necesario
          contar al menos con 1 de los siguientes datos que sé enlistan:
          <br/>
          <ul>
            <li>Número de juicio</li>
          </ul>
        <img class="q-ma-md q-ml-md"
          alt="busqueda_listado"
          src="~assets/gifs/expedientes/buscar_expediente.gif"
          style="width: 70%;"
        >
      <p class="q-ma-md">
        Después de poner el dato a buscar dar clic en
        <q-btn class="q-ma-sm q-mt-md"
          color="warning"
          icon="search"
          label="Buscar"
        />
        para que muestre los resultados obtenidos por la búsqueda.
      </p>
       <div class="text-h4 q-ma-md">Búsqueda avanzada</div>
        <p class="q-ma-md">
          Para obtener una búsqueda más precisa se requiere dar clic en
          <q-btn class="q-ma-sm q-mt-md"
           color="warning"
           icon="expand_more"
          />
          para que muestre el siguiente formulario, donde podrás realizar la búsqueda con al menos
          un dato de los en listados a continuación.
          <ul>
            <li>Sala</li>
            <li>Ponencia</li>
            <li>Actor</li>
            <li>Autoridad</li>
            <li>Fecha inicio</li>
            <li>Fecha final</li>
          </ul>
          <img class="q-ma-md q-ml-md"
          alt="busqueda_listado"
          src="~assets/img/expediente/pantalla_busqueda_avanzada_expedientes.png"
          style="width: 70%;"
          >
        </p>
        <p class="q-ma-md">
          Después de poner el dato a buscar dar clic en
          <q-btn class="q-ma-sm q-mt-md"
            color="warning"
            icon="search"
            label="Buscar"
          />
          para que muestre los resultados obtenidos por la búsqueda.
      </p>
    </q-tab-panel>
    <q-tab-panel name="Consulta de expediente">
      <div class="text-h4 q-ma-md">Consultar expediente</div>
      <p></p>
      <img class="q-ma-md q-ml-lg"
        alt="generacion_pantalla"
        src="~assets/img/expediente/buscador_expedientes.png"
        style="width: 70%;"
      >
    </q-tab-panel>
  </q-tab-panels>
</template>

<script>
import {
  QTabPanel,
  QTabPanels,
} from 'quasar';

export default {
  name: 'listado-acuerdos',
  props: {
    selected: null,
  },
  components: {
    QTabPanel,
    QTabPanels,
  },
};
</script>
