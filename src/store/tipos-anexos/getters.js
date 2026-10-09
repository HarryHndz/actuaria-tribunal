export const getTiposAnexosAll = state => state.all;

export const getTiposAnexosPagination = state => state.pagination;

export const getTipoAnexoByTipoAnexoId = (state, getters) => (id) => {
  const item = getters.getTiposAnexosAll.find(i => i.tipo_anexo_id === id);
  return item;
};

export const getTipoAnexoById = (state, getters) => (id) => {
  const item = getters.getTiposAnexosAll.find(i => i.id === id);
  return item;
};
