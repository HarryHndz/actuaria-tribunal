export const getCjfDocumentosAll = state => state.all;

export const getCjfDocumentosPagination = state => state.pagination;

export const getCjfDocumentoByCjfMensajeId = (state, getters) => (id) => {
  const item = getters.getCjfDocumentosAll.find(i => i.mensaje_id === id);
  return item;
};

export const getCjfDocumentoById = (state, getters) => (id) => {
  const item = getters.getCjfDocumentosAll.find(i => i.id === id);
  return item;
};
