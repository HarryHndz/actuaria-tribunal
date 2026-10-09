export const getEstadosProcesalesRaAll = state => state.all;

export const getEstadosProcesalesRaPagination = state => state.pagination;

export const getEstadoProcesalRaByEstadoProcesalRaId = (state, getters) => (id) => {
  const item = getters.getEstadosProcesalesRaAll.find(i => i.estadoprocesalra_id === id);
  return item;
};

export const getEstadoProcesalRaById = (state, getters) => (id) => {
  const item = getters.getEstadosProcesalesRaAll.find(i => i.id === id);
  return item;
};
