<template>
  <q-card style="width: 1200px; max-width: 120vw;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-md">Autoridad</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="row">
        <div class="col-md-10 col-xs-12">
          <q-input
            outlined
            class="q-ma-sm"
            label="Buscar autoridad"
            v-model="filtro.query"
            v-on:keyup.enter="busqueda"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <div class="col-md-2 col-xs-12">
          <q-btn class="q-ma-md"
            color="pink-10"
            icon="search"
            label="Buscar"
            :loading="fetching"
            @click.prevent="busqueda"
          />
        </div>
      </div>

      <q-separator class="q-my-sm"/>

      <div v-show="fetching"
        class="x_content text-center"
      >
        <q-spinner
          color="black"
          size="4em"
          :thickness="5"
        />
      </div>

      <div class="row" v-if="!fetching">
        <div class="col-md-12 col-xs-12 q-px-sm">
          <q-table flat dense
            class="q-ma-sm"
            :data="autoridades"
            :columns="columns"
            :hide-pagination="true"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="autoridad" :props="props">
                  {{ props.row.autoridad }}
                </q-td>
                <q-td key="accion" :props="props">
                  <a href="#"
                    class="q-ml-sm"
                    @click.prevent="save(props.row)"
                  >
                    <q-icon name="add_box" color="black" size="1.5em"/>
                    <q-tooltip>Agregar autoridad</q-tooltip>
                  </a>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </q-card-section>

  </q-card>
</template>

<script>
import {
  ClosePopup,
  QCard,
  QCardSection,
  QSeparator,
  QInput,
  QSpace,
  Notify,
  QTooltip,
  QSpinner,
} from 'quasar';
import errors from 'boot/errors';

export default {
  name: 'form-autoridad',
  data() {
    return {
      fetching: false,
      showModal: true,
      filtro: {
        query: '',
      },
      columns: [
        {
          name: 'autoridad', label: 'Nombre de autoridad', field: 'autoridad', sortable: false, align: 'left', style: 'width: 95%',
        },
        {
          name: 'accion', label: '', field: 'accion', sortable: false, align: 'center', style: 'width: 4%',
        },
      ],
    };
  },
  directives: {
    ClosePopup,
  },
  plugins: {
    Notify,
  },
  components: {
    QCard,
    QCardSection,
    QSeparator,
    QInput,
    QSpace,
    QTooltip,
    QSpinner,
  },
  beforeMount() {
    this.busqueda();
  },
  computed: {
    autoridades() {
      return this.$store.getters['autoridades/getAutoridadesVisibles'];
    },
  },
  methods: {
    async busqueda() {
      this.fetching = true;

      try {
        await this.$store.dispatch('autoridades/fetchAllAutoridades', this.filtro);
        this.fetching = false;
        return Promise.resolve(true);
      } catch (e) {
        this.fetching = false;
        errors(e);
        this.$emit('close');
        return Promise.reject(false);
      }
    },
    save(autoridad) {
      this.$emit('registrar', autoridad);
    },
  },
};
</script>
