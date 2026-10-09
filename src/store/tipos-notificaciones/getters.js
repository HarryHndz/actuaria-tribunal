export const getTiposNotificacionesAll = state => state.all;

export const getTiposNotificacionesPagination = state => state.pagination;

export const getTipoNotificacionByTipoNotificacionId = (state, getters) => (id) => {
  const item = getters.getTiposNotificacionesAll.find(i => i.tipo_notificacion_id === id);
  return item;
};

export const getTipoNotificacionById = (state, getters) => (id) => {
  const item = getters.getTiposNotificacionesAll.find(i => i.id === id);
  return item;
};
