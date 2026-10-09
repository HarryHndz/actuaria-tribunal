export const getResolucionesQuejasAll = state => state.all;

export const getResolucionesQuejasPagination = state => state.pagination;

export const getResolucionQuejaByResolucionQuejaId = (state, getters) => (id) => {
  const item = getters.getResolucionesQuejasAll.find(i => i.resolucion_id === id);
  return item;
};

export const getResolucionQuejaById = (state, getters) => (id) => {
  const item = getters.getResolucionesQuejasAll.find(i => i.id === id);
  return item;
};
