export const getHistorialAudienciasAll = state => state.all;

export const getHistorialAudienciasPagination = state => state.pagination;

export const getHistorialAudienciaByHistorialAudienciaId = (state, getters) => (id) => {
  const item = getters.getHistorialAudienciasAll.find(i => i.expediente_id === id);
  return item;
};

export const getHistorialAudienciaById = (state, getters) => (id) => {
  const item = getters.getHistorialAudienciasAll.find(i => i.id === id);
  return item;
};
