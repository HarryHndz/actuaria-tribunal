export const getAnexosAll = state => state.all;

export const getAnexosPagination = state => state.pagination;

export const getAnexosByActuacionId = (state, getters) => (id) => {
  const item = getters.getAnexosAll.filter(i => i.actuacion_id === id);
  return item;
};

export const getAnexosByExhortoId = (state, getters) => (id) => {
  const item = getters.getAnexosAll.filter(i => i.exhorto_id === id);
  return item;
};

export const getAnexosByTipoAnexoId = (state, getters) => (id) => {
  const item = getters.getAnexosAll.filter(i => i.tipoanexo_id === id);
  return item;
};

export const getAnexosByTipoDocumentoId = (state, getters) => (id) => {
  const item = getters.getAnexosAll.filter(i => i.tipodocumento_id === id);
  return item;
};

export const getAnexoByAnexoId = (state, getters) => (id) => {
  const item = getters.getAnexosAll.find(i => i.tipo_secretario_id === id);
  return item;
};

export const getAnexoById = (state, getters) => (id) => {
  const item = getters.getAnexosAll.find(i => i.id === id);
  return item;
};
