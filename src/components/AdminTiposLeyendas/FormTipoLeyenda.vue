<template>
  <q-card style="width: 1000px; max-width: 110vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Leyenda</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="leyendas" label="Leyenda" />
        <q-tab name="areas" label="Áreas"/>
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="leyendas">
          <div class="q-pt-sm">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  label="Descripcion"
                  class="q-my-md q-px-sm"
                  v-model="formData.descripcion"
                  @blur="$v.formData.descripcion.$touch"
                  :error="$v.formData.descripcion.$error"
                  :error-message="errorDescripcion"
                />
              </div>
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  type="number"
                  label="Margen"
                  class="q-my-md q-px-sm"
                  v-model.number="formData.margin_header"
                  @blur="$v.formData.margin_header.$touch"
                  :error="$v.formData.margin_header.$error"
                  error-message="Margin header es una opción obligatoria"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-select
                  outlined
                  label="Tipo de listado"
                  class="q-ma-sm"
                  :options="tiposListados"
                  v-model="tipoListadoObject"
                  @blur="$v.formData.tipo_listado_id.$touch"
                  :error="$v.formData.tipo_listado_id.$error"
                  error-message="Tipo de listado es una opción obligatorio"
                />
              </div>
              <div class="col-md-6 col-xs-12">
                <q-select
                  outlined
                  clearable
                  emit-value
                  map-options
                  label="Formato"
                  class="q-ma-sm"
                  :options="formatos"
                  v-model="formData.formato"
                  @blur="$v.formData.formato.$touch"
                  :error="$v.formData.formato.$error"
                  error-message="Formato es una opción obligatorio"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 col-xs-12">
                <q-editor
                  min-height="5rem"
                  placeholder="Leyenda"
                  class="q-my-md q-mx-sm"
                  v-model="formData.leyenda"
                  @blur="$v.formData.leyenda.$touch"
                  :error="$v.formData.leyenda.$error"
                  error-message="Leyenda es una opción obligatoria"
                  :toolbar="[
                    ['bold', 'italic', 'underline'],
                    ['removeFormat'],
                    ['undo', 'redo']
                  ]"
                />
              </div>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="areas">
          <div class="q-mt-sm">
            <div class="row">
              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  autofocus
                  label="Buscar área"
                  class="q-ma-sm q-mx-md"
                  v-model="filter"
                  v-on:keyup.enter="buscarArea"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                  <template v-slot:append>
                    <q-btn class="q-ma-sm"
                      icon="search"
                      label="Buscar área"
                      color="warning"
                      @click.prevent="buscarArea"
                    />
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-xs-12">
                <table class="q-table bordered striped-odd q-px-lg q-py-md" v-if="showTableSearch">
                  <thead>
                    <tr>
                      <th>ÁREAS</th>
                      <th width="10%"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="aFiltered.length == 0">
                      <tr>
                        <td class="text-center" colspan="8">No hay coincidencias.</td>
                      </tr>
                    </template>
                    <template v-if="aFiltered.length > 0">
                      <tr v-for="item in aFiltered"
                        :key="item.id"
                      >
                        <td>{{item.label}}</td>
                        <td>
                          <a href="#"
                            @click.prevent="addArea(item)"
                          >
                            <q-icon name="add_box"
                              size="1.4em"
                              color="black"
                            ></q-icon>
                          </a>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>

                <table class="q-table bordered striped-odd q-px-lg q-py-md"
                  v-if="showTableSelected"
                >
                  <thead>
                    <tr>
                      <th>ÁREAS SELECCIONADAS</th>
                      <th width="10%"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="areasSelected.length == 0">
                      <tr>
                        <td class="text-center" colspan="8">No hay áreas seleccionadas.</td>
                      </tr>
                    </template>
                    <template v-if="areasSelected.length > 0">
                      <tr v-for="item in areasSelected"
                        :key="item.id"
                      >
                        <td>{{item.label}}</td>
                        <td>
                          <a href="#"
                            @click.prevent="deleteArea(item)"
                          >
                            <q-icon name="delete"
                              size="1.4em"
                              color="black"
                            ></q-icon>
                          </a>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>

    <q-separator/>

    <q-card-actions align="right">
      <q-btn class="q-ma-md"
        icon="save"
        color="pink-10"
        :loading="fetchingSave"
        :label="formData.created_at ? 'Actualizar' : 'Registrar'"
        @click.prevent="save"
      />
    </q-card-actions>

  </q-card>
</template>

<script>
import {
  QBtn,
  QTab,
  QTabs,
  QCard,
  Notify,
  QSpace,
  QInput,
  QEditor,
  QSelect,
  QTabPanel,
  QTabPanels,
  ClosePopup,
  QSeparator,
  QCardActions,
  QCardSection,
} from 'quasar';

import {
  required, minLength, maxLength,
} from 'vuelidate/lib/validators';

import _ from 'lodash';
import errors from '../../boot/errors';

export default {
  name: 'modal-tipo-leyenda',
  props: {
    leyenda: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      filter: '',
      tab: 'leyendas',
      fetchingSave: false,
      areasObject: [],
      tipoListadoObject: null,
      aFiltered: this.areas,
      showTableSearch: false,
      showTableSelected: true,
      formData: {
        id: this.leyenda ? this.leyenda.id : null,
        areas: this.leyenda ? this.leyenda.areas : [],
        leyenda: this.leyenda ? this.leyenda.leyenda : '<p align="justify"> Leyenda </p>',
        formato: this.leyenda ? this.leyenda.formato : null,
        created_at: this.leyenda ? this.leyenda.created_at : null,
        descripcion: this.leyenda ? this.leyenda.descripcion : null,
        margin_header: this.leyenda ? this.leyenda.margin_header : 90,
        tipo_listado_id: this.leyenda ? this.leyenda.tipo_listado_id : 90,
      },
    };
  },
  validations() {
    return {
      formData: {
        descripcion: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(255),
        },
        margin_header: {
          required,
        },
        leyenda: {
          required,
        },
        tipo_listado_id: {
          required,
        },
        formato: {
          required,
        },
      },
    };
  },
  directives: {
    ClosePopup,
  },
  components: {
    QBtn,
    QTab,
    QTabs,
    QCard,
    QSpace,
    QInput,
    QEditor,
    QSelect,
    QTabPanel,
    QTabPanels,
    QSeparator,
    QCardActions,
    QCardSection,
  },
  beforeMount() {
    if (this.formData.tipo_listado_id) {
      this.tipoListadoObject = this.tiposListados
        .find(item => item.value === this.formData.tipo_listado_id);
    }
  },
  computed: {
    errorDescripcion() {
      if (!this.$v.formData.descripcion.minLength) {
        return 'Descripcion debe tener al menos 3 caracteres';
      }
      if (!this.$v.formData.descripcion.maxLength) {
        return 'Descripcion no debe tener al mas de 255 caracteres';
      }
      return 'Descripcion es una opción obligatoria';
    },
    areas() {
      const areas = this.$store.getters['areas/getAreasAll']
        .filter(i => i.atributos.es_jurisdiccional)
        .map(item => ({
          label: item.area,
          value: item.area_id,
        }));

      return _.sortBy(areas, ['tipo_leyenda_id']);
    },
    areasSelected() {
      const areas = this.$store.getters['areas/getAreasAll']
        .filter(i => i.atributos.es_jurisdiccional)
        .map(item => ({
          label: item.area,
          value: item.area_id,
        })).filter(x => this.formData.areas.includes(x.value));

      return _.orderBy(areas, ['area_id']);
    },
    formatos() {
      return [
        {
          label: 'AMPAROS',
          value: 'amparos',
        },
        {
          label: 'APELACIONES',
          value: 'apelaciones',
        },
        {
          label: 'CONSIGNACIONES',
          value: 'consignaciones',
        },
        {
          label: 'EXHORTOS',
          value: 'exhortos',
        },
        {
          label: 'SALAS ORDINARIAS',
          value: 'ordinarias',
        },
      ];
    },
    tiposListados() {
      return _.orderBy(this.$store.getters['tiposListados/getTiposListadosAll'].map(item => ({
        label: item.descripcion,
        value: item.tipo_listado_id,
      })), ['value']);
    },
  },
  methods: {
    addArea(area) {
      this.showTableSearch = false;
      this.showTableSelected = true;

      this.formData.areas.push(area.value);
    },
    deleteArea(area) {
      this.showTableSearch = false;
      this.showTableSelected = true;

      const index = this.formData.areas.indexOf(area.value);
      this.formData.areas.splice(index, 1);
    },
    buscarArea() {
      this.showTableSearch = true;
      this.showTableSelected = false;
      this.aFiltered = this.areas
        .filter(i => i.label.toUpperCase().includes(this.filter.toUpperCase()));
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.fetchingSave = true;
        const msj = this.formData.created_at ? 'actualizada' : 'registrada';
        const method = this.formData.created_at ? 'putTipoLeyenda' : 'postTipoLeyenda';

        return this.$store.dispatch(`tiposLeyendas/${method}`, this.formData)
          .then(() => {
            this.fetchingSave = false;
            Notify.create({
              message: `Tipo leyenda ${msj} exitosamente.`,
              position: 'bottom',
            });
            this.$emit('close');
            return Promise.resolve(true);
          }).catch((error) => {
            this.fetchingSave = false;
            errors(error);
          });
      }
      return Promise.resolve(true);
    },
  },
  watch: {
    tipoListadoObject(val) {
      /* eslint no-unused-expressions: [2, { allowTernary: true }] */
      val != null ? this.formData.tipo_listado_id = val.value : this.formData.tipo_listado_id = '';
    },
  },
};
</script>
