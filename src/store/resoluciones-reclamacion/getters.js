export const getResolucionesReclamacionAll = state => state.all;

export const getResolucionesReclamacionPagination = state => state.pagination;

export const getResolucionReclamacionById = (state, getters) => (id) => {
  const item = getters.getResolucionesReclamacionAll.find(i => i.id === id);
  return item;
};
