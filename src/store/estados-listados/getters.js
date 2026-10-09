export const getEstadosListadosAll = state => state.all;

export const getEstadosListadosPagination = state => state.pagination;

export const getEstadoListadoByEstadoListadoId = (state, getters) => (id) => {
  const item = getters.getEstadosListadosAll.find(i => i.estado_id === id);
  return item;
};

export const getEstadoListadoById = (state, getters) => (id) => {
  const item = getters.getEstadosListadosAll.find(i => i.id === id);
  return item;
};
