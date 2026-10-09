export const getTiposListadosAll = state => state.all;

export const getTiposListadosPagination = state => state.pagination;

export const getTipoListadoByTipoListadoId = (state, getters) => (id) => {
  const item = getters.getTiposListadosAll.find(i => i.tipo_listado_id === id);
  return item;
};

export const getTipoListadoById = (state, getters) => (id) => {
  const item = getters.getTiposListadosAll.find(i => i.id === id);
  return item;
};
