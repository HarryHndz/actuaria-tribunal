export const getAutorizadosAll = state => state.all;

export const getAutorizadosPagination = state => state.pagination;

export const getAutorizadoByAutorizadoId = (state, getters) => (id) => {
  const item = getters.getAutorizadosAll.find(i => i.autorizado_id === id);
  return item;
};

export const getAutorizadoById = (state, getters) => (id) => {
  const item = getters.getAutorizadosAll.find(i => i.id === id);
  return item;
};
