<template>
  <tr>
    <td>{{tipo.descripcion}}</td>
    <td>{{documento.descripcion}}</td>
    <td>{{anexo.fechaingreso | moment('MMM D YYYY')}}</td>
    <td>{{anexo.cantidad}}</td>
    <td>&nbsp;</td>
  </tr>
</template>

<script>
export default {
  name: 'row-anexo',
  props: {
    anexo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    tipo() {
      return this.$store.getters['tiposAnexos/getTipoAnexoByTipoAnexoId'](this.anexo.tipoanexo_id);
    },
    documento() {
      return this.$store.getters['tiposDocumentos/getTipoDocumentoByTipoDocumentoId'](this.anexo.tipodocumento_id);
    },
  },
};
</script>
