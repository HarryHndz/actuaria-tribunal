export const getDocumentosAll = state => state.all;

export const getDocumentosPagination = state => state.pagination;

export const getDocumentoByDocumentoId = (state, getters) => (id) => {
  const item = getters.getDocumentosAll.find(i => i.documento_id === id);
  return item;
};

export const getDocumentoByAnexoId = (state, getters) => (id) => {
  const item = getters.getDocumentosAll.filter(i => i.anexo_id === id);
  return item;
};


export const getDocumentoById = (state, getters) => (id) => {
  const item = getters.getDocumentosAll.find(i => i.id === id);
  return item;
};
