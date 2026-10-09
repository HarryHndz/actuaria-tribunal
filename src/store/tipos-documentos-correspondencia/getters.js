export const getTiposDocumentosCorrepondenciaAll = state => state.all;

export const getTiposDocumentosCorrepondenciaPagination = state => state.pagination;

// eslint-disable-next-line max-len
export const getTipoDocumentoCorrespondenciaByTipoDocumentoCorrespondenciaId = (state, getters) => (id) => {
  const item = getters.getTiposDocumentosCorrepondenciaAll.find(i => i.tipo_documento_id === id);
  return item;
};

export const getTipoDocumentoCorrespondenciaById = (state, getters) => (id) => {
  const item = getters.getTiposDocumentosCorrepondenciaAll.find(i => i.id === id);
  return item;
};
