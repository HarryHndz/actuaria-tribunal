export const getResolucionesApelacionAll = state => state.all;

export const getResolucionesApelacionPagination = state => state.pagination;

export const getResolucionApelacionById = (state, getters) => (id) => {
  const item = getters.getResolucionesApelacionAll.find(i => i.id === id);
  return item;
};
