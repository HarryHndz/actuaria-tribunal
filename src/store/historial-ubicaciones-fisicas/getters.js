export const getHistorialUbicacionesFisicasAll = state => state.all;

export const getHistorialUbicacionesFisicasPagination = state => state.pagination;

export const getHistorialUbicacionFisicaByHistorialUbicacionFisicaId = (state, getters) => (id) => {
  const item = getters.getHistorialUbicacionesFisicasAll.find(i => i.expediente_id === id);
  return item;
};

export const getHistorialUbicacionFisicaById = (state, getters) => (id) => {
  const item = getters.getHistorialUbicacionesFisicasAll.find(i => i.id === id);
  return item;
};
