<template>
  <q-tab-panels
    v-model="selected"
    animated
    transition-prev="jump-up"
    transition-next="jump-up"
  >
    <q-tab-panel name="Generación de cédulas">
      <div class="text-h4 q-ma-md">Generación de cédulas</div>
      <p class="q-ma-md">En este módulo podrás realizar
        las siguientes actividades:<br/><br/>
        <ul>
          <li>Generar cédulas de notificación.</li>
          <li>Registrar listado de acuerdo como área de trabajo.</li>
          <li>Imprimir cédulas de notificación de acuerdo a un rango.</li>
        </ul>
      </p>
    </q-tab-panel>

    <q-tab-panel name="Generar cédula de notificación">
      <div class="text-h4 q-mb-md">Generar cédula de notificación</div>
      <p class="q-ma-md">
        Para generar una nueva cédula es necesario escanear
        Folio de acuerdo o Folio área trabajo cédula
        <img class="q-ma-md q-ml-lg"
        alt="barra_busqueda_actuacion"
        src="~assets/img/generacion_cedulas/barra_folio_generacion_ced.png"
        style="width: 70%;"
      /><br/>
      Seleccionar tipo de notificación<br/>
       <img class="q-ma-md q-ml-lg"
        alt="tipo_notificacion"
        src="~assets/img/generacion_cedulas/seleccionar_tipo_notif.png"
        style="width: 70%;"
      /><br/>
      seleccionado el tipo de notificación, dar clic en
      <q-btn class="q-mx-lg q-mb-sm"
          color="pink-10"
          icon="forward"
          label="Siguiente"
        />
        , nos mostrara un nuevo formulario, con los siguientes datos:
        <ul>
          <li>Opción de elegir plantilla</li>
          <li>Grupo de plantilla</li>
          <li>La plantilla a elegir</li>
          <li>Actuario</li>
          <li>Notificados</li>
          <li>Fecha de elaboración</li>
          <li>Observaciones</li>
        </ul>
      </p>
      <img class="q-ma-md q-ml-lg"
        alt="form_cedula"
        src="~assets/img/generacion_cedulas/modal_cedulas.png"
        style="width: 70%;"
      />
      <p class="q-ma-md">
        Tendremos la opción de subir una plantilla temporal que no se
        encuentre en alguna carpeta de plantillas
      </p>
      <img class="q-ma-md q-ml-lg"
        alt="form_cedula_2"
        src="~assets/img/generacion_cedulas/form_cedula_2.png"
        style="width: 70%;"
      />
      <p class="q-ma-md">
        Llenar el formulario y le dar clic en el botón
        <q-btn class="q-mx-lg q-mb-sm"
          color="pink-10"
          icon="forward"
          label="Siguiente"
        />, nos mostrara la cédula de notificación registrada como en muestra <br>
            en la siguiente pantalla.<br/>
        <img class="q-ma-md q-ml-lg"
        alt="form_cedula_2"
        src="~assets/img/generacion_cedulas/tabla_cedulas_notif.png"
        style="width: 70%;"
      />
      </p>
    </q-tab-panel>

    <q-tab-panel name="Iconos cédulas">
      <div class="text-h4 q-mb-md">Descripción de acciones de los iconos</div>
      <p class="q-ma-md">
        Acciones iconos:
        <ul>
          <li>Visualizar cédula <q-icon name="visibility" color="black" size="1.3em"/></li>
          <li>Descargar cédula <q-icon name="fa fa-file-word" color="black" size="1.3em"/></li>
          <li>Información acuerdo <q-icon name="info" color="black" size="1.3em"/></li>
          <li>Editar cédula <q-icon name="edit" color="black" size="1.3em"/></li>
          <li>Borrar cédula <q-icon name="delete" color="black" size="1.3em"/></li>
        </ul>
      </p>
    </q-tab-panel>

    <q-tab-panel name="Visualizar/Descargar cédula">
      <div class="text-h4 q-mb-md">Visualización de cédula</div>
      <p class="q-ma-md">
        La visualización sé podra realizar dando clic en el icono
        <q-icon name="visibility"
          class="q-ma-sm"
          size="1.4em"
          color="black"
        ></q-icon>, nos abrirá nueva ventana con el acuerdo<br/>
        como se muestra a continuación<br>
        <img class="q-ma-md q-ml-lg"
          alt="acuerdo_visualizador"
          src="~assets/img/generacion_cedulas/visualizacion_cedula_notif.png"
        />
      </p>

      <p class="q-ma-md">
        También podremos descargar el archivo dando clic en el icono de Descarga
        <q-icon name="get_app"
          class="q-ma-sm"
          size="1.4em"
          color="black"
        ></q-icon>.<br/>
        Otra manera de descargar cédula de notificación es dando clic en el siguiente
        icono <q-icon name="fa fa-file-word" color="black" size="1.3em"/> comenzara en automático
        la descarga y la mostrara en la barra de Google Chrome.
        </p>
        <img class="q-ma-md q-ml-lg"
        alt="info_acuerdo"
        src="~assets/img/generacion_cedulas/barra_descarga_cedula.png"
      />
      </q-tab-panel>

      <q-tab-panel name="Información cédula">
       <div class="text-h4 q-mb-md">Información de notificación</div>
       <p class="q-ma-md">
        Para ver más información de la notificación dar clic en el icono
        <q-icon name="info" color="black" size="1.3em"/>
        nos mostrara la siguiente ventana
      </p>
      <img class="q-ma-md q-ml-lg"
        alt="info_acuerdo"
        src="~assets/img/generacion_cedulas/info_acuerdo_notif.png"
      />
    </q-tab-panel>

    <q-tab-panel name="Borrar cédula">
      <div class="text-h4 q-mb-md">Borrar cédula</div>
      <p class="q-ma-md">
        Podemos eliminar la cédula dando clic en el icono
        <q-icon name="delete"
          class="q-ma-sm"
          size="1.4em"
          color="black"
        ></q-icon>se borrará de la lista.<br/>
        a continuación se muestra a continuación:
      </p>
      <img class="q-ma-md q-ml-lg"
        alt="info_acuerdo"
        src="~assets/gifs/cedulas/eliminar_y_agregar_cedula.gif"
      />
    </q-tab-panel>

    <q-tab-panel name="Editar cédula">
      <div class="text-h4 q-mb-md">Editar cédula</div>
      <p class="q-ma-md">
        Podemos editar la cédula dando clic en el icono
        <q-icon name="edit"
          class="q-ma-sm"
          size="1.4em"
          color="black"
        ></q-icon>se mostrara la siguiente ventana.<br/>
        A continuación se muestra a continuación:
      </p>
      <img class="q-ma-md q-ml-lg"
        alt="info_acuerdo"
        src="~assets/gifs/cedulas/editar_cedula.gif"
      />
    </q-tab-panel>

    <q-tab-panel name="Guardar area de trabajo">
      <div class="text-h4 q-mb-md">Guardar área de trabajo</div>
      <p class="q-ma-md">
        Podemos guardar la lista como una área de trabajo el cual nos genera
        un folio para poder consultarlo posteriormente, <br/>
        una vez que escaneemos los folios del acuerdo, le daremos clic en el botón
        <q-btn class="q-ma-sm"
          icon="save"
          label="Guardar"
          color="red"
        /> <br/>
        nos mandara a una nueva pantalla con la información del área de trabajo como:
        <ul>
          <li>Folio</li>
          <li>Fecha creación</li>
          <li>Cantidad de acuerdos</li>
        </ul>
        A continuación se muestra:
      </p>
      <img class="q-ma-md q-ml-lg"
        alt="pantalla_atc"
        src="~assets/gifs/cedulas/guardar_listado_cedula.gif"
      />
      <p class="q-ma-md">
        Siempre se podrá actualizar el área agregando o quitando los acuerdos,
        los cambios se guardaran automáticamente.
        <br/>
      </p>
    </q-tab-panel>

    <q-tab-panel name="Imprimir multiples cédulas">
      <div class="text-h4 q-mb-md">Imprimir múltiples cédulas</div>
      <p class="q-ma-md">
        Podremos imprimir múltiples cédulas de todos los acuerdos que se encuentren  <br/>
        registrados en el área de trabajo. Le daremos clic en el botón <q-btn class="q-ma-sm"
          icon="print"
          label="Imprimir cédulas"
          color="blue"
        /> <br/><br/>
        Automaticamente iniciara la descarga en la barra de descargas de Google Chrome<br/>
      </p>
      <img class="q-ma-md q-ml-lg"
        alt="imprimir_multiples"
        src="~assets/img/generacion_cedulas/descarga_multiples_cedulas.png"
      /><br/>
    </q-tab-panel>

    <q-tab-panel name="Consulta de cédulas por acuerdo">
      <div class="text-h4 q-mb-md">Consulta de cédulas por acuerdo</div>
        <p class="q-ma-md">
          Aqui nos saldra en la cabeera la información del acuerdo con:
            <ul>
              <li>Tipo de acuerdo</li>
              <li>Promoción</li>
              <li>No. juicio</li>
              <li>Folio acuerdo</li>
              <li>Fecha de elaboracion</li>
            </ul>
            Y una tabla con todas las cedulas de notificacion registradas en dicho acuerdo
            con la siguiente información:
            <ul>
              <li>Folio de cedula de notificación</li>
              <li>Tipo de notificación</li>
              <li>Fecha de elaboración</li>
              <li>Observaciones</li>
            </ul>
        </p>
      <img class="q-ma-md q-ml-lg"
        alt="consulta_cedulas"
        src="~assets/img/generacion_cedulas/consulta_cedulas.png"
      />
    </q-tab-panel>

    <q-tab-panel name="Consulta de cédulas">
      <div class="text-h4 q-ma-md">Consulta de cédulas</div>
        <p class="q-ma-md">
          Pantalla Consulta de cédulas. <br/>
          En la parte superior la cabecera nos muestra información general
          del listado de acuerdo como:
          <ul>
            <li>Folio de listado</li>
            <li>Fecha creación</li>
            <li>Numero de acuerdos</li>
          </ul>
        </p>
      <img class="q-ma-md q-ml-lg"
        alt="consulta_pantalla"
        src="~assets/img/generacion_cedulas/pantalla_consultar_cedula.png"
        style="width: 70%;"
      />
      <br/>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script>
import {
  QTabPanel,
  QTabPanels,
} from 'quasar';

export default {
  name: 'Generacion-cedulas',
  props: {
    selected: null,
  },
  components: {
    QTabPanel,
    QTabPanels,
  },
};
</script>

<style scoped>
ul li {
  font-weight: 500px;
}
img {
  width: 70%;
}
</style>
