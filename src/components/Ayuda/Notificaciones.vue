<template>
  <q-tab-panels
    v-model="selected"
    animated
    transition-prev="jump-up"
    transition-next="jump-up"
  >
    <q-tab-panel name="Notificaciónes">
      <div class="text-h4 q-mb-md">Notificaciones</div>
        <p>Modulo de Notificaciones V2.0.</p>
          <img class="q-ma-md q-ml-lg"
            alt="consulta_notificaciones"
            src="~assets/img/notificaciones/consulta_notificacion.png"
            style="width: 70%;"
          >
    </q-tab-panel>

    <q-tab-panel name="Consultar notificación">
      <div class="text-h4 q-ma-md">Consulta notificación</div>
        <p class="q-ma-md">
          Una vez que se realice la  búsqueda, te arrojaran los  resultados
          y debes de seleccionar el siguiente icono
          <q-icon name="search" color="black" size="1.4em"/> <br/>
          <img class="q-ma-md q-ml-lg"
            alt="consulta_notificaciones"
            src="~assets/img/expediente/consulta_expediente.png"
            style="width: 70%;"
          >
      <p class="q-ma-md">Después de consultar el expediente. Volver a dar clic en
         <q-icon name="search" color="black" size="1.4em"/> <br/>
      </p>
      <img class="q-ma-md q-ml-lg"
        alt="consulta_notificaciones"
        src="~assets/img/notificaciones/consultar_expedientes.png"
        style="width: 70%;"
      >
      <p class="q-ma-md">Para que nos muestre la siguiente interfaz donde nos
        muestra los siguientes datos:
        <ul>
          <li>Número de folio de acuerdo</li>
          <li>Número de Notificaciones</li>
          <li>Número de copias</li>
          <li>Número de Folio</li>
          <li>Fecha de ingreso</li>
        </ul>
      </p>
      <img class="q-ma-md q-ml-lg"
        alt="consulta_notificaciones"
        src="~assets/img/notificaciones/consulta_notificacion.png"
        style="width: 70%;"
      >
      <p class="q-ma-md">
        Para revisar todas las notificaciones dar clic
        <q-icon name="assignment" color="black" size="1.3em"/>
        y nos mostrar la siguiente ventana.
        <img class="q-ma-md q-ml-lg"
          alt="consulta_notificaciones"
          src="~assets/img/notificaciones/mostrar_notificaciones.png"
          style="width: 70%;"
        ><br>En donde nos mostrara los siguientes datos:
        <ul>
          <li>Tipo de notificación</li>
          <li>Fecha de elaboración</li>
          <li>Notificados</li>
          <li>Observaciones</li>
        </ul>
        El cual también se podrá realizar una descarga de la notificación
        <q-icon name="get_app" color="black" size="1.3em"/>,
        visualización previa de la notificación
        <q-icon name="visibility" color="black" size="1.3em"/>,
        así mismo editarla&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <q-icon name="editar" color="black" size="1.3em"/>,
        <br>
         y eliminarla
         <q-icon name="delete" color="black" size="1.3em"/>.
        <br><br>
        También podrás realizar las siguientes actividades.
        <ul>
          <li>Información de la notificación
            <q-icon name="info" color="black" size="1.3em"/>
          </li>
          <li>Agregar listado
             <q-icon name="far fa-plus-square" color="black" size="1.3em"/>
          </li>
          <li>Notificaciones
             <q-icon name="assignment" color="black" size="1.3em"/>
          </li>
          <li>Visualizar acuerdo
            <q-icon name="visibility" color="black" size="1.3em"/>
          </li>
          <li>Descargar acuerdo
             <q-icon name="get_app" color="black" size="1.3em"/>
          </li>
        </ul>
      </p>
    </q-tab-panel>

    <q-tab-panel name="Subir notificación">
      <div class="text-h4 q-ma-md">Subir notificación</div>
        <p class="q-ma-md">
          Para subir una notificación es necesario dar clic
          <q-icon name="add_box" color="black" size="1.3em"/>
          y nos mostrara una ventana para que selecciones el archivo a subir.<br><br>
          Una vez seleccionado el archivo deberas de llenar un
          formulario con los siguientes datos:<br>
            <ul>
              <li>Archivo con las siguientes extensiones .pdf y .doc</li>
              <li>Fecha de elaboración</li>
              <li>Fecha de notificación</li>
              <li>Tipo de notificaciones</li>
              <li>Notificados</li>
              <li>Observaciones</li>
            </ul>
          A continuación se muestra un ejemplo:
        </p>
      <img class="q-ma-md q-ml-lg"
        alt="subir_notificacion"
        src="~assets/gifs/notificaciones/subir_notificacion.gif"
        style="width: 70%;"
      >
    </q-tab-panel>

    <q-tab-panel name="Subir multiples notificaciones">
      <div class="text-h4 q-ma-md">Subir múltiples notificaciones</div>
        <p class="q-ma-md">
          Para subir una notificación es necesario dar clic
          <q-icon name="add_box" color="black" size="1.3em"/>
          y nos mostrara una ventana para que selecciones el archivo a subir el cual
          podrás seleccionar más de un archivo y subirlos al mismo tiempo.<br><br>
          Una vez seleccionado el archivo deberá de llenar un
          formulario con los siguientes datos:<br>
          <ul>
            <li>Archivo con las siguientes extensiones .PDF y .DOCX</li>
            <li>Fecha de elaboración</li>
            <li>Fecha de notificación</li>
            <li>Tipo de notificaciones</li>
            <li>Notificados</li>
            <li>Observaciones</li>
          </ul>
          A continuación se muestra un ejemplo:
        </p>
      <img class="q-ma-md q-ml-lg"
        alt="subir_notificacion"
        src="~assets/gifs/notificaciones/subir_multiple_notificaciones.gif"
        style="width: 70%;"
      >
    </q-tab-panel>

    <q-tab-panel name="Visualizador notificación/acuerdo">
      <div class="text-h4 q-ma-md">Visualizador notificación/acuerdo</div>
        <p class="q-ma-md">
          Pantalla para visualizar notificación/acuerdo dar clic
           <q-icon name="visibility" color="black" size="1.3em"/>
           para que nos muestre el documento, y se puede descargar el archivo
           <q-icon name="get_app" color="black" size="1.3em"/><br><br>
          A continuación se muestra un ejemplo:
        </p>
      <img class="q-ma-md q-ml-lg"
        alt="subir_notificacion"
        src="~assets/gifs/notificaciones/visualizar_notificacion.gif"
        style="width: 70%;"
      >
    </q-tab-panel>

    <q-tab-panel name="Editar notificación">
      <div class="text-h4 q-ma-md">Editar notificación</div>
        <p class="q-ma-md">
          Pantalla para visualizar notificación/acuerdo dar clic&nbsp;&nbsp;&nbsp;&nbsp;
           <q-icon name="editar" color="black" size="1.3em"/><br><br>
          Mostrara los siguientes datos para realizar la edición:
          <ul>
            <li>Fecha de elaboración</li>
            <li>Fecha de notificación</li>
            <li>Tipo de notificación</li>
            <li>Notificados</li>
            <li>Seleccionar archivo</li>
            <li>Observaciones</li>
          </ul>
        </p>
      <img class="q-ma-md q-ml-lg"
        alt="subir_notificacion"
        src="~assets/gifs/notificaciones/editar_notificacion.gif"
        style="width: 70%;"
      >
    </q-tab-panel>

    <q-tab-panel name="Eliminar notificación">
      <div class="text-h4 q-ma-md">Eliminar notificación</div>
        <p class="q-ma-md">
          Pantalla para visualizar notificación/acuerdo dar clic
          <q-icon name="delete" color="black" size="1.3em"/>, y te mostrara una
          advertencia si está seguro de eliminar la notificación y confirmar.<br><br>
          A continuación se muestra un ejemplo:
        </p>
      <img class="q-ma-md q-ml-lg"
        alt="subir_notificacion"
        src="~assets/gifs/notificaciones/eliminar_notificacion.gif"
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
