<template>
  <q-tab-panels
    v-model="selected"
    animated
    transition-prev="jump-up"
    transition-next="jump-up"
  >
  <q-tab-panel name="Notificaciones comparecencia">
    <div class="text-h4 q-mb-md">Notificaciones comparecencia</div>
      <p class="q-ma-md"> En este módulo
        podrás realizar las siguientes actividades.<br/>
        <ul>
          <li>Registro de listados</li>
          <li>Escaneo de acuerdos</li>
          <li>Consulta de notificaciones comparecencia</li>
          <li>Editar listado de notificaciones de comparecencia</li>
        </ul>
      </p>
  </q-tab-panel>
    <q-tab-panel name="Generación ">
      <div class="text-h4 q-ma-md">Generación</div>
        <p class="q-ma-md">
          Pantalla de Generación de listado de notificaciones de comparecencia. <br/>
        </p>
      <img class="q-ma-md q-ml-lg"
        alt="generacion_pantalla"
        src="~assets/img/notificacion_comparecencia/Notificaciones_comparecencia.png"
        style="width: 70%;"
      />
    </q-tab-panel>

    <q-tab-panel name="Registro de notificacion comparecencia">
      <div class="text-h4 q-ma-md">Registro de notificaciones de comparecencia</div>
        <p class="q-ma-md">
          Para iniciar el registro del listado de notificaciones de comparecencia
          es necesario dar clic en el botón
          <q-btn color="red"
            class="q-mb-sm q-mx-sm q-px-xl"
            icon="arrow_forward"
            label="Comenzar"
          /><br/>
          nos mostrara el siguiente formulario para registrar.
          <br>
          <img class="q-ma-md q-ml-md"
          alt="generacion_listado"
          src="~assets/img/notificacion_comparecencia/nuevo_listado_notificacion_comparecencia.png"
          style="width: 70%;"
          />
          <br>
          Para que seleccionar los siguientes campos:
          <ul>
            <li>Área(Obligatorio) </li>
            <li>Ponencia</li>
            <li>Actuario</li>
            <li>Fecha (Del día que será publicada la lista de notificación de comparecencia)</li>
          </ul>
          <br>
          A continuación se muestra un ejemplo:
          <br>
          <img class="q-ma-md q-ml-md"
            alt="generacion_listado_selec"
            src=
            "~assets/gifs/notificacion_comparecencia/generar_listado_notificacion_comparecencia.gif"
            style="width: 70%;"
          />
          <br><br>
          Mostrara un mensaje de
          <strong>"A continuación escaneé el código de barras de los acuerdos"</strong>
        </p>
      <img class="q-ma-md q-ml-md"
        alt="generacion_listado_msj"
        src=
        "~assets/gifs/notificacion_comparecencia/generar_listado_notificacion_comparecencia_esc.gif"
        style="width: 70%;"
      />
      <p class="q-ma-md">
        A continuación se muestra un ejemplo completo de la generación de un listado de
        notificaciones de comparecencia.
        <img class="q-ma-md q-ml-md"
        alt="generacion_listado_completo"
        src=
        "~assets/gifs/notificacion_comparecencia/generar_listado_completo_notificacion.gif"
        style="width: 70%;"
        />
      </p>
    </q-tab-panel>

    <q-tab-panel name="Escaneo de acuerdos ">
      <div class="text-h4 q-ma-md">Escaneo de acuerdos</div>
        <p class="q-ma-md">
          Para ingresar acuerdos en el listado se podrá escanear el folio que
          se encuentra en la parte
          inferior del acuerdo <br/> generado por el Sistema Digital de Juicios.
        </p>
      <img class="q-ml-md"
        alt="generacion_escaneo_acuerdos"
        src="~assets/img/listado/codigo_barras_acuerdo.png"
        style="width: 30%;"
      />
      <p class="q-ma-md">
        En el contenedor nos muestra el listado de los acuerdos con la
        siguiente información:
        <ul>
          <li>Promoción</li>
          <li>Tipo de acuerdo</li>
          <li>Fecha de elaboración</li>
          <li>Folio del acuerdo</li>
          <li>No juicio</li>
        </ul>
        <br>
        Se podrá eliminar un acuerdo del listado dando clic en el icono
        <q-icon color="black" name="delete" size="2em"/>.<br/>
        Se podrá reiniciar el listado dando clic en el botón
        <q-btn color="warning"
          class="q-mb-sm q-mx-sm q-px-xl"
          icon="refresh"
          label="Reiniciar"
        />. <br><br>
        Para finalizar el registro dar clic en el botón
        <q-btn color="primary"
          class="q-mb-sm q-mx-sm q-px-xl"
          icon="save"
          label="Guardar"
        /> <br/><br/>nos saldrá un mensaje de confirmación
        de guardado y nos redirigirá hacia una pantalla de consulta del listado.<br/>
        <br/> A continuación se muestra un ejemplo:
      </p>
      <img class="q-ma-md q-ml-md"
        alt="generacion_escaneo_acuerdos"
        src="~assets/gifs/notificacion_comparecencia/escaneo_acuerdos.gif"
        style="width: 70%;"
      />
    </q-tab-panel>

    <q-tab-panel name="Consulta ">
      <div class="text-h4 q-ma-md">Consulta de listado de notificaciones comparecencia</div>
        <p class="q-ma-md">
          Pantalla de consulta de listado de notificaciones comparecencia. <br/>
        </p>
        <img class="q-ma-md q-ml-lg"
          alt="consulta_pantalla"
          src="~assets/img/notificacion_comparecencia/Inicio_consul_notif_compa.png"
          style="width: 70%;"
        />
    </q-tab-panel>

    <q-tab-panel name="Editar listado ">
      <div class="text-h4 q-ma-md">Editar listado de notificaciones comparecencia</div>
        <p class="q-ma-md">
          Para editar el listado de notificaciones comparecencia es necesario dar clic en el
          icono de consultar
          <q-icon name="search" color="black" size="1.4em"/> <br/>
          <img class="q-ma-md q-ml-lg"
            alt="consulta_notif_compa"
            src="~assets/img/notificacion_comparecencia/info_listado_consulta_notif_com.png"
            style="width: 95%;"
          />
        </p>
      <p class="q-ma-md">
        mostrara listado de notificaciones comparecencia. <br/>
        <img class="q-ma-md q-ml-lg"
          alt="editar_listado_notif_c"
          src="~assets/img/notificacion_comparecencia/Pantalla_editar_listado_notificaciones_c.png"
          style="width: 70%;"
        /><br/>
        Para editar el listado de notificaciones de comparecencia es necesario dar clic en el botón
        <q-btn color="warning"
          class="q-mb-sm q-mx-sm q-px-xl"
          icon="edit"
          label="Editar"
        /><br/> nos saldrá un mensaje  <strong> "Recuerda dar clic en
        <q-btn color="primary"
          class="q-mb-sm q-mx-sm q-px-xl"
          icon="save"
          label="Guardar"
        /> para salvar los cambios"</strong>
        y se habilitara <br/>una barra de búsqueda donde se podrá escanear folio de acuerdos
        para al listado.<br/><br/>
        A continuación se muestra un ejemplo:<br/>
        <img class="q-ma-md q-ml-md"
        alt="consulta_editar_listado"
        src="~assets/gifs/notificacion_comparecencia/editar_listado_notif_compare.gif"
        style="width: 70%;"
        />
      </p>
    </q-tab-panel>

    <q-tab-panel name="Editar fecha, actuario y ponencia ">
      <div class="text-h4 q-ma-md">Editar listado fecha,actuario y ponencia</div>
        <p class="q-ma-md">
          Para poder editar algunas de las siguientes opciones
          <ul>
            <li>Ponencia</li>
            <li>Actuario</li>
            <li>Fecha de publicación</li>
          </ul>
          es necesario hacer clic en <q-icon name="edit" color="black"/>
          que se encuentra en el contenedor que se muestra a continuación.
          <img class="q-ma-md q-ml-md"
            alt="consulta_editar_fech_act_pon"
            src="~assets/img/notificacion_comparecencia/info_listado_editar_notif_comp.png"
            style="width: 70%;"
          >
        </p>
      <p class="q-ma-md">
        Después mostrara el siguiente formulario, para que modifiques los siguientes datos.
          <ul>
            <li> Ponencia </li>
            <li> Actuario </li>
            <li> Fecha publicación </li>
          </ul>
      </p>
      <img class="q-ma-md q-ml-md"
        alt="consulta_editar_notificacion"
        src="~assets/img/notificacion_comparecencia/modal_editar_listado_comp_pon_act_fech.png"
        style="width: 70%;"
      >
      <p class="q-ma-md"><strong>Recuerda que días inhábiles no podrás seleccionar,
        ni días anteriores te aparecerán como el 16 de marzo.</strong>
      </p>
      <img class="q-ma-md q-ml-md"
        alt="consulta_editar_notificacion_com"
        src="~assets/img/listado/dias_inhabiles.png"
        style="width: 70%;"
      >
      <p class="q-ma-md">
        A continuación se muestra un ejemplo:
      </p>
      <img class="q-ma-md q-ml-md"
        alt="ejemplo_edit_listado"
        src="~assets/gifs/notificacion_comparecencia/editar_fech_act_pon_notif_comp.gif"
        style="width: 70%;"
      >
    </q-tab-panel>

    <q-tab-panel name="Búsqueda ">
      <div class="text-h4 q-ma-md">Búsqueda de listado de notificaciones comparecencia</div>
        <p class="q-ma-md">
          Pantalla búsqueda de listado de notificaciones comparecencia. <br/>
        </p>
      <img class="q-ma-md q-ml-lg"
        alt="busqueda_listado_pantalla"
        src="~assets/img/notificacion_comparecencia/pantalla_inicial_busqueda.png"
        style="width: 70%;"
      >
    </q-tab-panel>

    <q-tab-panel name="Búscar ">
      <div class="text-h4 q-ma-md">Buscar listado</div>
        <p class="q-ma-md">
          Para poder realizar una búsqueda más precisa es necesario
          contar al menos con 1 de los siguientes datos que sé enlistan:
          <br/>
          <ul>
            <li>Número de listado</li>
            <li>Número de folio de acuerdo</li>
          </ul>
          <img class="q-ma-md q-ml-md"
            alt="busqueda_listado_notificacion_comparecencia"
            src="~assets/gifs/notificacion_comparecencia/busqueda_notificacion_com.gif"
            style="width: 70%;"
          >
      <p class="q-ma-md">
        Después de poner el dato a buscar dar clic en
        <q-btn class="q-ma-sm q-mt-md"
          color="warning"
          icon="search"
          label="Buscar"
        />
        para que muestre los resultados obtenidos por la búsqueda.<br/>
         Acciones de iconos:<br/>
        <ul>
          <li> Consultar <q-icon name="search" color="black"/></li>
          <li> Imprimir <q-icon name="print" color="black"/></li>
          <li> Exportar <q-icon name="far fa-file-excel" color="black"/></li>
          <li> Borrar   <q-icon name="delete" color="black"/></li>
        </ul>
      </p>
      </q-tab-panel>
      <q-tab-panel name="Búsqueda avanzada">
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
              <li>Fecha inicio</li>
              <li>Fecha final</li>
              <li>Sala</li>
              <li>Ponencia</li>
            </ul>
            <img class="q-ma-md q-ml-md"
              alt="busqueda_listado"
              src=
              "~assets/img/notificacion_comparecencia/pantalla_busqueda_avanzada_notificaciones.png"
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
  </q-tab-panels>
</template>

<script>
import {
  QTabPanel,
  QTabPanels,
} from 'quasar';

export default {
  name: 'notificaciones-comparecencias',
  props: {
    selected: null,
  },
  components: {
    QTabPanel,
    QTabPanels,
  },
};
</script>
