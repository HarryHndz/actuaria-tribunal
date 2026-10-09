<template>
  <q-card style="width: 900px; max-width: 950px;">
    <q-card-section class="row items-center">
      <div class="text-h6 q-ml-sm">{{titulo}}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator/>

    <template v-if="!fetchingDocumento && base64">
      <div class="row q-ma-md" v-show="loadedRatio">
        <div class="col-md-4">
          <input v-if="paginado"
            :value="currentPage"
            min="1"
            step="1"
            type="number"
            class="q-pa-sm"
            oninput="validity.valid||(value='');"
            style="width: 5em; text-align:center;"
            @change="setPageModal"
          >
          <input v-else
            v-model.number="page"
            min="1"
            step="1"
            type="number"
            class="q-pa-sm"
            oninput="validity.valid||(value='');"
            style="width: 5em; text-align:center;"
          >
          <span>&nbsp;&nbsp;/&nbsp;&nbsp;{{paginado ? totalPages : pageCount}}</span>
        </div>

        <div class="col-md-4" align="center">
          <q-btn icon="arrow_back" flat round
            @click.prevent="prevPageModal"
          />

          <q-btn icon="arrow_forward" flat round
            @click.prevent="nextPageModal"
          />
        </div>

        <div class="col-md-4" align="right">
          <q-btn icon="print" flat round
            @click.prevent="imprimirArchivo"
          />
          <q-btn icon="get_app" flat round
            @click.prevent="descargarArchivo"
          />
        </div>
      </div>
      <div class="row q-ma-md">
        <div class="col-md-12 hoja" v-show="loadedRatio">
          <pdf style="width: 100%; border: 1px solid black;"
            ref="pdf"
            :src="base64Url"
            :page="paginado || !page ? 1 : page"
            @progress="loadedRatio = $event"
            @num-pages="pageCount = $event"
            @loaded="loaded = $event"
            @error="error"
          ></pdf>
        </div>
      </div>
      <div v-show="!loadedRatio"
        class="x_content text-center"
        style="margin-top: 30%;"
      >
        <q-spinner
          color="black"
          size="4em"
          :thickness="5"
        />
        <br/>
        <span>Cargando vista previa</span>
      </div>
    </template>

    <div v-if="fetchingDocumento"
      class="x_content text-center"
      style="margin-top: 30%;"
    >
      <q-spinner
        color="black"
        size="4em"
        :thickness="5"
      />
      <br/>
      <span>Cargando archivo</span>
    </div>

    <div v-if="!fetchingDocumento && !base64"
      style="margin-top: 20%;"
    >
      <div class="x_content text-center ">
        <q-icon name="error" color="red" style="font-size: 6em;"/>
        <h5>Error</h5>
        <p>No se encuentró el archivo</p>
        <p v-if="errorB64Texto">{{errorB64Texto}}</p>
        <p v-if="errorPdf">{{errorPdf}}</p>
      </div>
    </div>

  </q-card>
</template>

<script>
import {
  ClosePopup,
  QCard,
  QCardSection,
  QSpinner,
  QSpace,
  QSeparator,
  QBtn,
} from 'quasar';

import errors from 'boot/errors';

import pdf from 'vue-pdf';
import printJS from 'print-js';

export default {
  name: 'modal-pdf',
  props: {
    base64: {
      required: true,
      default: '',
    },
    nombreDocumento: {
      required: false,
      default: '',
    },
    // Si se recibe, el modal pagina contra el servidor (store pagination):
    // base64 contiene solo la pagina actual y se emite changePage al navegar.
    documentoId: {
      required: false,
      default: undefined,
    },
    fetchingDocumento: {
      required: true,
    },
    errorB64: {
      required: false,
    },
  },
  components: {
    pdf,
    QCard,
    QCardSection,
    QSpinner,
    QSpace,
    QSeparator,
    QBtn,
  },
  directives: {
    ClosePopup,
  },
  data() {
    return {
      page: 1,
      loaded: 0,
      pageCount: '',
      errorPdf: null,
      loadedRatio: 0,
      fetching: false,
    };
  },
  computed: {
    base64Url() {
      return `data:application/pdf;base64, ${this.base64}`;
    },
    nombreArchivo() {
      return (this.titulo || '').replace(' ', '_');
    },
    paginado() {
      return this.documentoId !== undefined;
    },
    pagination() {
      return this.$store.getters['pagination/getPagination'];
    },
    currentPage() {
      return this.pagination.currentPage || 1;
    },
    totalPages() {
      return this.pagination.totalPages || 1;
    },
    titulo() {
      return this.paginado ? this.pagination.nombreDocumento : this.nombreDocumento;
    },
    errorB64Texto() {
      if (this.errorB64 && typeof this.errorB64 === 'object') {
        return this.errorB64.errors || this.errorB64.message || '';
      }
      return this.errorB64;
    },
  },
  methods: {
    error(error) {
      this.errorPdf = error;
      console.log(error);
    },
    base64ToArrayBuffer(data) {
      const binaryString = window.atob(data);
      const binaryLen = binaryString.length;
      const bytes = new Uint8Array(binaryLen);
      for (let i = 0; i < binaryLen; i += 1) {
        const ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      return bytes;
    },
    emitChangePage() {
      this.$emit('changePage', {
        page: this.currentPage,
        id: this.documentoId,
        nombreDocumento: this.titulo,
      });
    },
    prevPageModal() {
      if (!this.paginado) {
        if (this.page > 1) this.page -= 1;
        return;
      }
      if (this.currentPage > 1) {
        this.$store.dispatch('pagination/prevPage');
        this.emitChangePage();
      }
    },
    nextPageModal() {
      if (!this.paginado) {
        if (this.page < this.pageCount) this.page += 1;
        return;
      }
      if (this.currentPage < this.totalPages) {
        this.$store.dispatch('pagination/nextPage');
        this.emitChangePage();
      }
    },
    setPageModal(event) {
      const input = event.target;
      const page = parseInt(input.value, 10);
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.$store.dispatch('pagination/setPage', page);
        this.emitChangePage();
      } else {
        input.value = this.currentPage;
      }
    },
    descargarArchivo() {
      if (this.paginado) {
        this.$emit('downloadDocumento', { id: this.documentoId, nombrearchivo: this.titulo });
        return;
      }

      const arrBuffer = this.base64ToArrayBuffer(this.base64);
      const newBlob = new Blob([arrBuffer], { type: 'application/pdf' });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      const data = window.URL.createObjectURL(newBlob);
      const link = document.createElement('a');
      document.body.appendChild(link);
      link.href = data;
      link.download = this.nombreArchivo;
      link.click();
      window.URL.revokeObjectURL(data);
      link.remove();
    },
    async imprimirArchivo() {
      if (this.paginado) {
        this.$emit('imprimir', { id: this.documentoId, nombrearchivo: this.titulo });
        return;
      }

      try {
        if (this.base64) {
          printJS({ printable: this.base64, type: 'pdf', base64: true });
        } else {
          this.$swal({
            icon: 'error',
            title: 'Error',
            text: 'Archivo no encontrado',
          });
        }
      } catch (err) {
        errors(err);
      }
    },
  },
  watch: {
    page(val) {
      if (val > this.pageCount) this.page = this.pageCount;
    },
  },
};
</script>

<style scoped>
.paginas{
  text-align: left;
  font-size: 15px;
}
.hoja{
  background-color: gray;
  padding: 10px 10px;
}
.outer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
