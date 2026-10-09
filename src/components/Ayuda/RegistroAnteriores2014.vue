<template>
  <q-tab-panels
    v-model="selected"
    animated
    transition-prev="jump-up"
    transition-next="jump-up"
  >
  <q-tab-panel name="Anteriores 2014">
    <div class="text-h4 q-ma-md">Registro de juicios anteriores al 2014</div>
      <p class="q-ma-md">
        Formulario registro de Juicios anterior al 2014.<br/>
        <img class="q-ma-md q-ml-md"
          alt="generacion_listado_a"
          src="~assets/img/listado/formulario_2014.png"
          style="width: 70%;"
        />
      </p>
  </q-tab-panel>

    <q-tab-panel name="Registro anteriores 2014">
      <div class="text-h4 q-ma-md">Registro juicios anteriores 2014</div>
        <p class="q-ma-md">
          Para el registro del listado de juicios anteriores del 2014
          es necesario dar clic en el botón
          <q-btn color="red"
            class="q-mb-sm q-mx-sm q-px-xl"
            icon="add"
            label="ANTERIOR 2014"
          /><br/>
          nos saldrá el siguiente formulario para registrar el juicio.
          <br>
          <img class="q-ma-md q-ml-md"
          alt="generacion_listado_a"
          src="~assets/img/listado/formulario_2014.png"
          style="width: 70%;"
          />
          <br>
          Con los siguientes datos:
          <ul>
            <li>Tipo de demanda (Obligatorio) </li>
            <li>No juicio (Obligatorio)</li>
            <li>Proceso (Obligatorio)</li>
            <li>Tipo de acuerdo (Obligatorio)</li>
            <li>Fecha de elaboración (Obligatorio)</li>
            <li>Actor/Razón social (Obligatorio)</li>
            <li>Autoridades (Obligatorio)</li>
            <li>Observaciones</li>
          </ul>
          <br>
          A continuación se muestra un ejemplo:
          <br>
          <img class="q-ma-md q-ml-md"
            alt="generacion_listado_acuerdo"
            src="~assets/gifs/antes2014/agregar_antes2014.gif"
            style="width: 70%;"
          />
        </p>
    </q-tab-panel>

    <q-tab-panel name="Información acuerdo anteriores 2014">
      <div class="text-h4 q-mb-md">Información de acuerdos</div>
        <p class="q-ma-md">
          Para ver más información de acuerdos dar clic en el icono
          <q-icon name="info" color="black" size="1.3em"/>
          nos mostrara la siguiente ventana con la información del acuerdo.
        </p>
      <img class="q-ma-md q-ml-lg"
        alt="info_acuerdo"
        src="~assets/img/listado/info_acuerdo_anterior2014.png"
        style="width: 70%;"
      />
    </q-tab-panel>

    <q-tab-panel name="Borrar acuerdo anteriores 2014">
      <div class="text-h4 q-mb-md">Borrar acuerdo</div>
        <p class="q-ma-md">
          Podemos eliminar el acuerdo dando clic en el icono
          <q-icon name="delete"
            class="q-ma-sm"
            size="1.4em"
            color="black"
          ></q-icon>se borrará de la lista.<br/>
          a continuación se muestra a continuación:
        </p>
      <img class="q-ma-md q-ml-lg"
        alt="info_acuerdo"
        src="~assets/gifs/antes2014/borrar_acuerdo2014.gif"
      />
    </q-tab-panel>

    <q-tab-panel name="Editar anteriores 2014">
      <div class="text-h4 q-mb-md">Editar acuerdo anterior 2014</div>
        <p class="q-ma-md">
          Podemos editar el acuerdo dando clic en el icono
          <q-icon name="edit"
            class="q-ma-sm"
            size="1.4em"
            color="black"
          ></q-icon><br/>
          A continuación se muestra un ejemplo:
        </p>
      <img class="q-ma-md q-ml-lg"
        alt="info_acuerdo"
        src="~assets/gifs/antes2014/editar_acuerdo2014.gif"
      />
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
