export const getAllActuaciones = state => state.all;

export const getActuacionesVisibles = (state, getters) => {
  const visibles = getters.getAllActuaciones.filter(item => state.visibles.indexOf(item.id) !== -1);
  return visibles;
};

export const getActuacionesFetching = state => state.fetching;

export const getActuacionesPagination = state => state.pagination;

export const getActuacionById = state => (id) => {
  const item = state.all.find(i => i.id === id);
  return item;
};

export const getActuacionByActuacionId = state => (id) => {
  const item = state.all.find(i => i.actuacion_id === id);
  return item;
};

export const getActuacionesByExpedienteId = state => (id) => {
  const item = state.all.filter(i => i.juicio_id === id);
  return item;
};
