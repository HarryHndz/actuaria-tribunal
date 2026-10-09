<template>
  <q-tab-panels
    v-model="selected"
    animated
    transition-prev="jump-up"
    transition-next="jump-up"
  >
    <q-tab-panel name="Citas SCO">
      <div class="text-h4 q-mb-md">Citas SCO</div>
        <p class="q-ma-md">
            En este módulo podrás realizar las siguientes actividades.
            <ul>
              <li>Buscar cita SCO <q-icon name="search" size="1.5em" color="black"></q-icon></li>
              <li>Información cita <q-icon name="info" size="1.5em" color="black" /></li>
              <li>Imprimir acuses <q-icon name="print" size="1.5em" color="black" /></li>
              <li>Descargar acuses <q-icon name="get_app" size="1.5em" color="black" /></li>
              <li>Cancelar cita <q-icon name="cancel" size="1.5em" color="black" /></li>
              <li>Reporte PDF <q-icon name="fa fa-file-pdf" size="1.5em" color="black" /></li>
              <li>Reporte EXCEL<q-icon name="fa fa-file-excel" size="1.5em" color="black" /></li>
            </ul>
        </p>
    </q-tab-panel>

    <q-tab-panel name="Búsqueda citas">
      <div class="text-h4 q-ma-md">Buscar citas</div>
        <p class="q-ma-md">
          Para poder realizar una búsqueda es necesario
          contar con los siguientes datos que sé enlistan:
           <br/>
            <ul>
              <li>Número de folio de citas</li>
            </ul>
        <img class="q-ma-md q-ml-md"
          alt="busqueda_cita"
          src="~assets/gifs/citas/busqueda_cita.gif"
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
              <li>Horarios</li>
            </ul>
            <img class="q-ma-md q-ml-md"
              alt="busqueda_listado"
              src="~assets/img/citas/busqueda_avanzada.png"
              style="width: 70%;"
            >
        </p>
        <p class="q-ma-md">
          Después de seleccionar la opción a buscar dar clic en
          <q-btn class="q-ma-sm q-mt-md"
            color="warning"
            icon="search"
            label="Buscar"
          />
          para que muestre los resultados obtenidos por la búsqueda.
        </p>
    </q-tab-panel>
    <q-tab-panel name="Información cita">
      <div class="text-h4 q-mb-md">Información de cita</div>
        <p class="q-ma-md">
          Para ver información de la cita podemos dar clic en el icono de
          <q-icon name="info"
            size="1.4em"
            color="black"
          ></q-icon>
           Información.
            <img class="q-ma-md q-ml-lg"
              alt="info_carpeta"
              src="~assets/img/citas/tabla_cita.png"
            /><br/>
          donde nos mostrara la siguiente información:
          <ul>
            <li>No. folio</li>
            <li>Tramite</li>
            <li>Promovente</li>
            <li>Correo</li>
            <li>Teléfono</li>
            <li>Referencia</li>
            <li>Observaciones</li>
          </ul>
        </p>
        <img class="q-ma-md q-ml-lg"
          alt="info_carpeta"
          src="~assets/img/citas/info_cita.png"
        />
    </q-tab-panel>
    <q-tab-panel name="Imprimir acuses">
      <div class="text-h4 q-ma-md">Imprimir acuses</div>
        <p class="q-ma-md">
          Para imprimir acuses de la cita podemos dar clic en el icono de
           <q-icon name="print"
            size="1.4em"
            color="black"
          ></q-icon>
            imprimir
            donde nos mandara directo a la pantalla de imprimir.
          <img class="q-ma-md q-ml-lg"
          alt="info_carpeta"
          src="~assets/img/citas/tabla_cita.png"
          /><br/>
        </p>
        Mostrara la siguiente venta para mandar a imprimir.
        <img class="q-ma-md q-ml-lg"
          alt="info_carpeta"
          src="~assets/img/citas/imprimir_acuse.png"
        /><br/><br/>
        le damos clic en el botón <q-btn no-caps color="primary" label="Imprimir"/>
    </q-tab-panel>
    <q-tab-panel name="Descargar acuses">
      <div class="text-h4 q-ma-md">Descargar acuses</div>
        <p class="q-ma-md">
          Para descargar acuses de la cita podemos dar clic en el icono de
          <q-icon name="get_app"
            size="1.4em"
            color="black"
          ></q-icon>
           imprimir,
          empezara en automático la descarga del acuse.
          <img class="q-ma-md q-ml-lg"
          alt="info_carpeta"
          src="~assets/img/citas/tabla_cita.png"
          /><br/>
          Mostrara la descarga en la barra de descargas de Google Chrome
          <img class="q-ma-md q-ml-lg"
            alt="info_carpeta"
            src="~assets/img/citas/Barra_descarga_cita.png"
          /><br/>
        </p>
    </q-tab-panel>
    <q-tab-panel name="Reportes">
      <div class="text-h4 q-ma-md">Reportes de citas</div>
        <p class="q-ma-md">
          Para poder generar reporte de citas podemos dar clic en el icono de
          <q-btn
            push
            round
            icon="more"
            color="primary"
            class="q-mx-md"
          />
          Nos mostrar dos opciones generar en tipo:
          <ul>
            <li>Reporte PDF</li>
            <li>Reporte EXCEL</li>
          </ul>
          <img class="q-ma-md q-ml-lg"
          alt="info_carpeta"
          src="~assets/img/citas/pantalla_principal_citas.png"
          /><br/>
          Seleccionar tipo de reporte para que la descarga comience automáticamente
          y lo mostrara en la barra de descargas de Google Chrome
          <br/><br/>
          <ul>
            <li>Descarga en PDF</li>
          </ul>
          <img class="q-ma-md q-ml-lg"
          alt="info_carpeta"
          src="~assets/img/citas/descarga_reporte_pdf.png"
          /><br/><br/>
          <ul>
            <li>Descarga en EXCEL</li>
          </ul>
          <img class="q-ma-md q-ml-lg"
          alt="info_carpeta"
          src="~assets/img/citas/descarga_reporte_excel.png"
          /><br/>
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
<style scoped>
ul li {
  font-weight: 500px;
}
img {
  width: 70%;
}
</style>
