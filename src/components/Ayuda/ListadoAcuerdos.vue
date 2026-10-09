<template>
  <q-tab-panels
    v-model="selected"
    animated
    transition-prev="jump-up"
    transition-next="jump-up"
  >
    <q-tab-panel name="Lista de estrados y boletín electrónico">
      <div class="text-h4 q-mb-md">Lista de estrados y boletín electrónico</div>
        <p class="q-ma-md">Modulo de listado de estrados y
          boletín electrónico en el cual podrás realizar
          generación de listados y consulta de listados.<br/><br/>
          <strong>Actividades:</strong>
            <ul>
              <li>Registro de listados</li>
              <li>Escaneo de acuerdos</li>
              <li>Consultar listados</li>
              <li>Editar listado</li>
            </ul>
        </p>
    </q-tab-panel>

    <q-tab-panel name="Generación">
      <div class="text-h4 q-ma-md">Generación</div>
        <p class="q-ma-md">
          Pantalla de Generación. <br/>
        </p>
        <img class="q-ma-md q-ml-lg"
          alt="generacion_pantalla"
          src="~assets/img/listado/generacion_pantalla.png"
          style="width: 70%;"
        />
    </q-tab-panel>

    <q-tab-panel name="Registro de listado">
      <div class="text-h4 q-ma-md">Registro de listado de acuerdos</div>
        <p class="q-ma-md">
          Para iniciar el registro del listado de acuerdos es necesario dar clic en el botón
            <q-btn color="red"
              class="q-mb-sm q-mx-sm q-px-xl"
              icon="arrow_forward"
              label="Comenzar"
            /><br/>
            nos saldrá un formulario para registrar.
            <br>
            <img class="q-ma-md q-ml-md"
            alt="generacion_listado_a"
            src="~assets/img/listado/generacion_listado_a.png"
            style="width: 70%;"
            />
            <br>
            Para que selecciones los siguientes datos:
            <ul>
              <li>Ponencia (Obligatorio) </li>
              <li>Actuario (Obligatorio)</li>
              <li>Leyenda (Obligatorio)</li>
              <li>Fecha (Del día que será publicada la lista)</li>
            </ul>
            Cuando selecciones la leyenda mostrará el  texto que contiene.<br>
            <img class="q-ma-md q-ml-md"
              alt="leyenda_texto"
              src="~assets/img/listado/leyenda_texto.png"
              style="width: 70%;"
            />
            <br>
            A continuación se muestra un ejemplo:
            <br>
            <img class="q-ma-md q-ml-md"
              alt="generacion_listado_acuerdo"
              src="~assets/gifs/listado/generacion_listado_nuevo.gif"
              style="width: 70%;"
            />
            <br><br>
            Después de seleccionar la fecha,
            nos saldrá un mensaje de
            <strong>"A continuación escaneé el código de barras de los acuerdos"</strong>
          </p>
          <img class="q-ma-md q-ml-md"
            alt="generacion_listado_acuerdo"
            src="~assets/gifs/listado/mensaje_confirmar_listado.gif"
            style="width: 70%;"
          />
          <p class="q-ma-md">
            A continuación se pone un ejemplo completo de la generación de un listado.
              <img class="q-ma-md q-ml-md"
            alt="generacion_listado_acuerdo"
            src="~assets/gifs/listado/Generacion_listado_completo.gif"
            style="width: 70%;"
          />
          </p>
    </q-tab-panel>

    <q-tab-panel name="Escaneo de acuerdos">
      <div class="text-h4 q-ma-md">Escaneo de acuerdos</div>
        <p class="q-ma-md">
          Pantalla escaneo de acuerdos. <br/>
          Para ingresar acuerdos en el listado se podrá escanear el folio que se encuentra
          en la parte
          inferior del acuerdo <br/> generado por el sistema digital de juicios.
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
          /> nos saldrá un mensaje de confirmación <br>
          de guardado y nos redirigirá hacia una pantalla de consulta del listado.
        </p>
      <img class="q-ma-md q-ml-md"
        alt="generacion_escaneo_acuerdos"
        src="~assets/gifs/listado/generacion_escaneo_acuerdos.gif"
        style="width: 70%;"
      />
    </q-tab-panel>

    <q-tab-panel name="Consulta">
      <div class="text-h4 q-ma-md">Consulta de listado de acuerdos</div>
        <p class="q-ma-md">
          Pantalla Consulta de listado de acuerdos. <br/>
          En la parte superior la cabecera nos muestra información general
          del listado de acuerdo como:
          <ul>
            <li>Ponencia</li>
            <li>Actuario</li>
            <li>Folio del listado</li>
            <li>Numero de acuerdos</li>
            <li>Fecha de publicación</li>
          </ul>
        </p>
        <img class="q-ma-md q-ml-lg"
          alt="consulta_pantalla"
          src="~assets/img/listado/Consulta_listados.png"
          style="width: 70%;"
        />
    </q-tab-panel>

    <q-tab-panel name="Editar listado">
      <div class="text-h4 q-ma-md">Editar listado de acuerdos</div>
        <p class="q-ma-md">
          Pantalla editar listado de acuerdos. <br/>
          Para editar el listado de acuerdos es necesario dar clic en el botón
          <q-btn color="warning"
          class="q-mb-sm q-mx-sm q-px-xl"
          icon="edit"
          label="Editar"
          /> nos saldrá un mensaje <br> "Recuerda dar clic en
          <q-btn color="primary"
          class="q-mb-sm q-mx-sm q-px-xl"
          icon="save"
          label="Guardar"
          /> para salvar los cambios"
          y se habilitara una barra de búsqueda donde podremos <br> escanear folio de acuerdos
          para agregar más acuerdos al listado.<br/>
          <img class="q-ma-md q-ml-md"
            alt="consulta_editar_listado"
            src="~assets/gifs/listado/Eliminar_listado.gif"
            style="width: 70%;"
          />
        </p>
        <div class="text-h4 q-ma-md">Editar ¿Se deja a disposición? </div>
        <p class="q-ma-md">
          Para la editar la opción ¿Se deja a disposición? dar clic en
          <q-icon name="edit" color="black" size="1.3em"/> del acuerdo.<br>
          <img class="q-ma-md q-ml-lg"
            alt="consulta_pantalla"
            src="~assets/img/listado/contenedor_acuerdo.png"
            style="width: 70%;"
          /><br/>
          Mostrará el siguiente formulario.<br/>
          <img class="q-ma-md q-ml-lg"
            alt="consulta_pantalla"
            src="~assets/img/listado/observacion.png"
            style="width: 70%;"
          /><br/>
          dar clic en
          <q-btn color="pink-10"
          class="q-mb-sm q-mx-sm q-px-xl"
          icon="save"
          label="Guardar"
          />Posteriormente
          <strong>dar clic en</strong>
          <q-btn color="primary"
          class="q-mb-sm q-mx-sm q-px-xl"
          icon="save"
          label="Guardar"
          />.<br/><br/>
          A continuación se muestra un ejemplo:
          <img class="q-ma-md q-ml-lg"
            alt="consulta_pantalla"
            src="~assets/gifs/listado/se_deja_disposicion.gif"
            style="width: 70%;"
          /><br/>
        </p>

    </q-tab-panel>

    <q-tab-panel name="Editar fecha, actuario y ponencia">
      <div class="text-h4 q-ma-md">Editar actuario del listado</div>
        <p class="q-ma-md">
          Edición de los siguientes datos:
          <ul>
            <li>Ponencia</li>
            <li>Actuario</li>
            <li>Fecha de publicación</li>
          </ul>
            Para poder editar algunas de las opciones antes
            mencionadas es necesario darle clic en <q-icon name="edit" color="black"/>
             que se encuentra en el contenedor que se muestra a continuación.</p>
          <img class="q-ma-md q-ml-md"
            alt="consulta_editar_actuario"
            src="~assets/img/listado/contenedor_listado.png"
            style="width: 70%;"
          >
          <p class="q-ma-md">
            Después mostrara el siguiente formulario, para que modifiques los datos.
          </p>
          <img class="q-ma-md q-ml-md"
            alt="consulta_editar_actuario"
            src="~assets/img/listado/formulario_editar_listado.png"
            style="width: 70%;"
          >
          <p class="q-ma-md"><strong>Recuerda que días inhábiles no podrás seleccionar,
            te aparecerán como el 16 de marzo.</strong></p>
          <img class="q-ma-md q-ml-md"
            alt="consulta_editar_actuario"
            src="~assets/img/listado/dias_inhabiles.png"
            style="width: 70%;"
          >
          <p class="q-ma-md">
            A continuación se muestra un ejemplo:
          </p>
          <img class="q-ma-md q-ml-md"
            alt="consulta_editar_actuario"
            src="~assets/gifs/listado/editar_actuario_fecha_ponencia.gif"
            style="width: 70%;"
          >
    </q-tab-panel>

    <q-tab-panel name="Búsqueda">
      <div class="text-h4 q-ma-md">Búsqueda de listado de acuerdos</div>
        <p class="q-ma-md">
          Pantalla búsqueda de listado de acuerdos. <br/>
        </p>
        <img class="q-ma-md q-ml-lg"
          alt="busqueda_listado_pantalla"
          src="~assets/img/listado/busqueda_listado_pantalla.png"
          style="width: 70%;"
        >
    </q-tab-panel>

    <q-tab-panel name="Buscar listado">
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
            alt="busqueda_listado"
            src="~assets/gifs/listado/busqueda_listado.gif"
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
              para que muestre el siguiente formulario, donde podrás realizar
              la búsqueda con al menos
              un dato de los en listados a continuación.
              <ul>
                <li>Fecha inicio</li>
                <li>Fecha final</li>
                <li>Sala</li>
                <li>Ponencia</li>
              </ul>
              <img class="q-ma-md q-ml-md"
                alt="busqueda_listado"
                src="~assets/img/listado/pantalla_busqueda_avanzada_acuerdos.png"
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
