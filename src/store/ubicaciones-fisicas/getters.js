export const getUbicacionesFisicasAll = state => state.all;

export const getUbicacionesFisicasPagination = state => state.pagination;

export const getUbicacionFisicaByUbicacionFisicaId = (state, getters) => (id) => {
  const item = getters.getUbicacionesFisicasAll.find(i => i.ubicacion_fisica_id === id);
  return item;
};

export const getUbicacionFisicaById = (state, getters) => (id) => {
  const item = getters.getUbicacionesFisicasAll.find(i => i.id === id);
  return item;
};

export const getUbicacionFisicaByAreaId = (state, getters) => (id) => {
  const item = getters.getUbicacionesFisicasAll.filter(i => i.area_id === id);
  return item;
};
