export const getResolucionesAmparosAll = state => state.all;

export const getResolucionesAmparosPagination = state => state.pagination;

export const getResolucionAmparoByResolucionAmparoId = (state, getters) => (id) => {
  const item = getters.getResolucionesAmparosAll.find(i => i.resolucion_id === id);
  return item;
};

export const getResolucionAmparoById = (state, getters) => (id) => {
  const item = getters.getResolucionesAmparosAll.find(i => i.id === id);
  return item;
};
