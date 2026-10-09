export const getNotificacionesAll = state => state.all;

export const getNotificacionesPagination = state => state.pagination;

export const getNotificacionesByAcuerdoId = (state, getters) => (id) => {
  const item = getters.getNotificacionesAll.filter(i => i.acuerdo_id === id);
  return item;
};

export const getNotificacionesByTipoId = (state, getters) => (id) => {
  const item = getters.getNotificacionesAll.filter(i => i.tipo_id === id);
  return item;
};

export const getNotificacionByNotificacionId = (state, getters) => (id) => {
  const item = getters.getNotificacionesAll.find(i => i.notificacion_id === id);
  return item;
};

export const getNotificacionById = (state, getters) => (id) => {
  const item = getters.getNotificacionesAll.find(i => i.id === id);
  return item;
};
