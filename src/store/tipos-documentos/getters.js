export const getTiposDocumentosAll = state => state.all;

export const getTiposDocumentosPagination = state => state.pagination;

export const getTipoDocumentoByTipoDocumentoId = (state, getters) => (id) => {
  const item = getters.getTiposDocumentosAll.find(i => i.tipo_documento_id === id);
  return item;
};

export const getTipoDocumentoById = (state, getters) => (id) => {
  const item = getters.getTiposDocumentosAll.find(i => i.id === id);
  return item;
};
