<template>
  <q-tab-panels
    v-model="selected"
    animated
    transition-prev="jump-up"
    transition-next="jump-up"
  >
    <q-tab-panel name="Administración de plantillas">
      <div class="text-h4 q-mb-md">Administración de plantillas</div>
        <p class="q-ma-md">En este módulo podrás realizar
          las siguientes actividades:<br/>
          <ul>
            <li>Consultar plantillas <q-icon name="search" size="1.5em" color="black"></q-icon></li>
            <li>Añadir plantilla <q-icon name="add" size="1.5em" color="black"></q-icon></li>
            <li>Agregar permisos
                <q-icon name="fa fa-user-lock" size="1.2em" color="black"></q-icon></li>
            <li>Información <q-icon name="info" size="1.5em" color="black" /></li>
            <li>Editar <q-icon name="edit" size="1.5em" color="black" /></li>
            <li>Eliminar <q-icon name="delete" color="black" size="1.5em" /></li>
            <li>Registro de carpeta de plantillas
              <q-btn class="q-mr-sm q-mt-none"
                color="yellow-9"
                icon="add"
                label="Nuevo"/>
            </li>
          </ul>
        </p>
    </q-tab-panel>

    <q-tab-panel name="Registrar carpeta">
      <div class="text-h4 q-mb-md">Registro de carpeta de plantillas</div>
        <p class="q-ma-md">
          Registro de carpeta de plantillas sé podra registrar nueva carpeta, <br/>
          dar clic en el botón
            <q-btn class="q-mx-sm"
              color="yellow-9"
              icon="add"
              label="Nuevo"
            />, abrirá una nueva ventana para registrar
          los siguientes datos:<br/>
          <ul>
            <li>Nombre de la carpeta.</li>
            <li>Descripción de la carpeta.</li>
            <li>Clasificación de la carpeta (Acuerdos o Cedula de notificaciones).</li>
          </ul>
        </p>
        <img class="q-ma-md q-ml-lg"
          alt="form_carpeta"
          src="~assets/img/admon_plantillas/form_carpeta.png"
        />
      <p class="q-ma-md">
        <ul>
          <strong><li>Nombre de la carpeta.(Campo obligatorio).</li></strong>
          <strong><li>Clasificación de la carpeta (Campo obligatorio).</li></strong>
        </ul>
        Llenaremos el formulario y le daremos en el botón
        <q-btn class="q-mx-sm"
          color="pink-10"
          icon="save"
          label="guardar"
        /><br/>
      </p>
    </q-tab-panel>

    <q-tab-panel name="Agregar permisos">
      <div class="text-h4 q-mb-md">Agregar permisos a carpeta de plantillas</div>
        <p class="q-ma-md">
          Agregar permisos a carpeta de plantillas
          al darle clic al icono
          <q-icon name="fa fa-user-lock"
            class="q-mx-sm"
            size="1.2em"
            color="black"
          ></q-icon> nos abrirá una nueva ventana
          para buscar a un usuario que podremos <br/>
          dar permiso de acceso a la dicha carpeta.<br/>
      </p>
      <img class="q-ma-md q-ml-lg"
        alt="form_permisos"
        src="~assets/img/admon_plantillas/form_permisos.png"
      />
      <p class="q-ma-md">
        Podras buscar al usuario y dar clic en el icono
          <q-icon name="add_box"
            size="1.4em"
            color="black"
          ></q-icon> para agregar permiso.
      </p>
        <div class="text-h4 q-mb-md">Agregar permisos</div>
        <p class="q-ma-md">
          Agregar permisos a carpeta de plantillas dar clic en el siguiente botón
          <q-btn
            class="q-mx-sm"
            color="yellow-9"
            icon="add"
            label="AGREGAR"
          />
          <img
            class="q-ma-md q-ml-lg"
            alt="consulta_carpeta"
            src="~assets/img/admon_plantillas/add_permisos_admin.png"
          /><br/>
          abrirá una nueva ventana
          para buscar a un usuario que podremos
          dar permiso de acceso a la dicha carpeta.
          <img
            class="q-ma-md q-ml-lg"
            alt="consulta_carpeta"
            src="~assets/img/admon_plantillas/form_add_permiso_admin.png"
          /><br/>
        <p class="q-ma-md">
          Podremos buscar al usuario y enseguida damos clic en el icono
          <q-icon
            name="add_box"
            size="1.4em"
            color="black"
          ></q-icon> para agregar permiso, los cambios se guardaran en automático.
          <img
            class="q-ma-md q-ml-lg"
            alt="consulta_carpeta"
            src="~assets/img/admon_plantillas/add_permiso_admin.png"
          />
        </p>
    </q-tab-panel>

    <q-tab-panel name="Editar carpeta">
      <div class="text-h4 q-mb-md">Editar carpeta de plantillas</div>
        <p class="q-ma-md">
          Dar clic en el icono
          <q-icon
            name="more"
            size="1.4em"
            color="black"
          ></q-icon> donde se nos desplegara un menú con más opciones.<br/>
          <img class="q-ma-md q-ml-lg"
            alt="info_carpeta"
            src="~assets/img/admon_plantillas/menu_mas_info.png"
          /><br/> dar clic en
          <q-icon
            name="edit"
            size="1.5em"
            color="black"
          />Editar.
          Se abrirá una ventana con la información de la carpeta que vamos a editar.
      </p>
        <img class="q-ma-md q-ml-lg"
          alt="form_editar"
          src="~assets/img/admon_plantillas/form_editar.png"
        />
      <p class="q-ma-md">
        Editamos la información que deseemos y luego damos clic en el botón
          <q-btn class="q-mx-sm"
            color="pink-10"
            icon="save"
            label="guardar"
          />
      </p>
    </q-tab-panel>
    <q-tab-panel name="Informacion carpeta">
      <div class="text-h4 q-mb-md">Información de carpeta</div>
        <p class="q-ma-md">
          Para ver información y ver los permisos de la carpeta podemos dar clic en el icono de
          <q-icon name="more"
            size="1.4em"
            color="black"
          ></q-icon> se desplegara un menú con más opciones,
          <br/> dar clic en
          <q-icon name="info"
            size="1.5em"
            color="black"
          />Información
          donde mostrara la siguiente información:
          <ul>
            <li>Nombre de carpeta</li>
            <li>Propietario de la carpeta</li>
            <li>Fecha de última modificación</li>
            <li>Clasificación</li>
            <li>Descripción</li>
            <li>Lista de los permisos</li>
          </ul>
        </p>
      <img class="q-ma-md q-ml-lg"
        alt="info_carpeta"
        src="~assets/img/admon_plantillas/info_carpeta.png"
      />
    </q-tab-panel>

    <q-tab-panel name="Borrar carpeta">
      <div class="text-h4 q-mb-md">Borrar carpeta de plantillas</div>
        <p class="q-ma-md">
          Dar clic en el icono
            <q-icon name="more"
              class="q-ma-sm"
              size="1.4em"
              color="black"
            ></q-icon> se desplegara un menú con más opciones, dar clic en el icono
            <q-icon name="delete"
              class="q-ma-sm"
              size="1.5em"
              color="black"
            /> Eliminar <br/>
            <img class="q-ma-md q-ml-lg"
              alt="info_carpeta"
              src="~assets/img/admon_plantillas/menu_mas_info.png"
            />
            <br/>
            nos mostrara una advertencia, si estamos seguros,
            dar clic en el botón <q-btn color="primary">Borrar</q-btn>.
            <img class="q-ma-md q-ml-lg"
              alt="info_carpeta"
              src="~assets/img/admon_plantillas/delete_grupo.png"
              style="width: 50%;"
            /><br/>
        </p>
    </q-tab-panel>

    <q-tab-panel name="Consultar carpeta">
      <div class="text-h4 q-mb-md">Consultar carpeta de plantillas</div>
        <p class="q-ma-md">
          Dar clic en el icono
          <q-icon name="search"
            class="q-ma-sm"
            size="1.4em"
            color="black"
          ></q-icon> para consultar dicha carpeta<br/>
          <img class="q-ma-md q-ml-lg"
            alt="info_carpeta"
            src="~assets/img/admon_plantillas/tabla_plantillas.png"
          />
        </p>
        <p class="q-ma-md">
          Nos saldrá una pantalla con la siguiente información
            <ul>
              <li>Nombre de la carpeta</li>
              <li>Clasificación</li>
              <li>Propietario (Creador de la carpeta)</li>
              <li>Fecha de creación</li>
              <li>Listado de las plantillas creadas</li>
            </ul>
        </p>
        <img class="q-ma-md q-ml-lg"
          alt="consulta_carpeta"
          src="~assets/img/admon_plantillas/consulta_carpeta_plantillas.png"
        />
    </q-tab-panel>

    <q-tab-panel name="Registrar plantilla">
      <div class="text-h4 q-mb-md">Registro de plantilla</div>
        <p class="q-ma-md">
          Para registrar una nueva plantilla, dar clic en el icono ubicado en la área derecha
          <q-icon name="add_box"
            size="1.4em"
            color="black"
          ></q-icon>.
          <img class="q-ma-md q-ml-lg"
          alt="consulta_carpeta"
          src="~assets/img/admon_plantillas/subir_plantilla.png"
          style="width: 50%;"
          />
        </p>
        <p class="q-ma-md">
          Mostrara  el siguiente formulario para subir el archivo Word de la plantilla
          <strong>(DOCX)</strong>. <br/>A continuación sé muestra el formulario
          para completar la información de la plantilla:
          <ul>
            <li>Nombre de la plantilla</li>
            <li>Comentarios</li>
          </ul>
        </p>
        <img class="q-ma-md q-ml-lg"
          border="1"
          alt="form_plantilla"
          src="~assets/img/admon_plantillas/form_plantilla.png"
        /><br/>
        <p class="q-ma-md">
          Llenaremos el formulario y le daremos clic en el botón
          <q-btn class="q-mx-sm"
            color="pink-10"
            icon="save"
            label="guardar"
          /> y saldrá registrada en la tabla de plantillas de la carpeta.
        </p><br/>
        <p class="q-ma-md">
          <strong>
            Es importante mencionar que los datos que se requieran auto llenar
            por el sistema se tiene que poner entre signo de pesos <br>
            y en mayúsculas como en el ejemplo $PONENCIA$.
          </strong><br/><br/>
          A continuación se enlistan las variables disponibles:
          <ul>
              <li>$AUTORIDADES$</li>
              <li>$TERCEROS$</li>
              <li>$ACTORES$</li>
              <li>$SALA$</li>
              <li>$PONENCIA$</li>
              <li>$NOJUICIO$</li>
              <li>$ACTOR$</li>
              <li>$RA$</li>
              <li>$RRC$</li>
              <li>$FECHA_ELABORACION_CEDULA$</li>
              <li>$ACTUARIO$</li>
              <li>$AUTORIZADOS$</li>
              <li>$DOMICILIO_NOTIFICACIONES$</li>
              <li>$ACTUACION$</li>
              <li>$TIPO_ACUERDO$</li>
              <li>$FECHA_ACUERDO$</li>
              <li>$NOTIFICACION_OBSERVACIONES$</li>
            </ul>
          El formato definido en el texto que compone la variable, será respetado
          por el sistema; por ejemplo:
          <ul>
            <li>Negritas</li>
            <li>Cursiva</li>
            <li>Subrayado</li>
          </ul>
        </p>
        <img class="q-ma-md q-ml-lg"
          border="1"
          alt="plantilla_word.png"
          src="~assets/img/admon_plantillas/plantilla_completa.png"
        />
    </q-tab-panel>

    <q-tab-panel name="Editar plantilla">
      <div class="text-h4 q-mb-md">Editar plantilla</div>
        <p class="q-ma-md">
          Dar clic en el icono
          <q-icon name="more"
            size="1.4em"
            color="black"
          ></q-icon> se desplegara un menú con más opciones<br/>
          <img class="q-ma-md q-ml-lg"
          alt="consulta_carpeta"
          src="~assets/img/admon_plantillas/mas_opciones_plantilla.png"
          />
        <br/>dar clic en
        <q-icon name="edit"
          size="1.5em"
          color="black"
        /> Editar.<br/>
        Se abrirá un formulario con la información de la plantilla que vamos a editar.
      </p>
      <img class="q-ma-md q-ml-lg"
        alt="form_editar_plantilla"
        src="~assets/img/admon_plantillas/form_editar_plantilla.png"
      />
      <p class="q-ma-md">
        Editamos la información que deseemos y luego damos clic en el botón
        <q-btn class="q-mx-sm"
          color="pink-10"
          icon="save"
          label="guardar"
        />
      </p>
    </q-tab-panel>

    <q-tab-panel name="Borrar plantilla">
      <div class="text-h4 q-mb-md">Borrar plantilla</div>
        <p class="q-ma-md">
          Dar clic en el icono
          <q-icon name="more"
            class="q-ma-sm"
            size="1.4em"
            color="black"
          ></q-icon> se desplegara un menú con más opciones<br/>
          <img class="q-ma-md q-ml-lg"
            alt="consulta_carpeta"
            src="~assets/img/admon_plantillas/mas_opciones_plantilla.png"
          />
          <br/> dar clic en el icono
          <q-icon name="delete"
            class="q-ma-sm"
            size="1.5em"
            color="black"
          /> Eliminar, mostrara la siguiente advertencia,
          <img class="q-ma-md q-ml-lg"
            alt="consulta_carpeta"
            src="~assets/img/admon_plantillas/alert_eliminar_plantilla.png"
            style="width: 50%;"
          /><br/><br/>
          dar clic en el botón <q-btn color="primary">Borrar</q-btn> para confirmar.
        </p>
    </q-tab-panel>

    <q-tab-panel name="Visualizar/Descargar plantilla">
      <div class="text-h4 q-mb-md">Visualizar/Descargar plantilla</div>
        <p class="q-ma-md">
          Para visualizar una plantilla dar clic en el icono
          <q-icon name="visibility"
            class="q-ma-sm"
            size="1.4em"
            color="black"
          ></q-icon>
          mostrara una nueva ventana con la plantilla.
        </p>
        <img class="q-ma-md q-ml-lg"
          alt="consulta_carpeta"
          src="~assets/img/admon_plantillas/visualizacion_plantilla.png"
        />
        <p class="q-ma-md">
          Para descargar tenemos 2 opciones: <br/>
          <ul>
            <li>Dar clic en el icono
              <q-icon name="get_app"
                class="q-ma-sm"
                size="1.5em"
                color="black"
              /></li>
            <li>Dar clic<q-icon name="more"
            class="q-ma-sm"
            size="1.4em"
            color="black"
          ></q-icon>desplegara un menú con más opciones,
          <img class="q-ma-md q-ml-lg"
            alt="consulta_carpeta"
            src="~assets/img/admon_plantillas/mas_opciones_plantilla.png"
          />
          <br/>dar clic en el icono
            <q-icon name="get_app"
              class="q-ma-sm"
              size="1.5em"
              color="black"
            />
         Descargar.</li>
        </ul>
      </p>
    </q-tab-panel>
    <q-tab-panel name="Agregar/Borrar procesos">
      <div class="text-h4 q-mb-md">Agregar procesos</div>
        <p class="q-ma-md">
          Dar clic en PROCESOS como se muestra a continuación<br/>
          <img class="q-ma-md q-ml-lg"
              alt="consulta_carpeta"
              src="~assets/img/admon_plantillas/procesos_inicial.png"
          /><br/>
          dar clic en el siguiente botón para que muestre la siguiente pantalla
          <q-btn class="q-mx-sm"
            color="yellow-9"
            icon="add"
            label="AGREGAR"
          />
          <img class="q-ma-md q-ml-lg"
            alt="consulta_carpeta"
            src="~assets/img/admon_plantillas/opciones_proceso.png"
          />
          <br/>dar clic en el icono
          <q-icon name="add"
            class="q-ma-sm"
            size="1.5em"
            color="black"
          /> para que los agregue y automáticamente guarda los procesos agregados y los muestra.
          <img class="q-ma-md q-ml-lg"
            alt="consulta_carpeta"
            src="~assets/img/admon_plantillas/add_proceso.png"
          /><br/>
          </p>
          <div class="text-h4 q-mb-md">Borrar procesos</div>
          <p class="q-ma-md">
            Para borrar un proceso dar clic en el icono
              <q-icon name="delete" color="black" size="1.5em" />
          <img class="q-ma-md q-ml-lg"
            alt="consulta_carpeta"
            src="~assets/img/admon_plantillas/add_proceso.png"
          /><br/>
          Mostrara la siguiente alerta indicando si estamos seguros de eliminar el proceso.
          <img class="q-ma-md q-ml-lg"
            alt="consulta_carpeta"
            src="~assets/img/admon_plantillas/borrar_proceso.png"
          /><br/>
           dar clic en el botón <q-btn color="primary">Borrar</q-btn> para confirmar.
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
  name: 'admon-plantillas',
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
