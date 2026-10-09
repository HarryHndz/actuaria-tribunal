export const getExpedientesAll = state => state.all;

export const getExpedienteHistory = state => state.history;

export const getExpedientesPagination = state => state.pagination;

export const getExpedientesVisibles = (state, getters) => {
  const get = getters.getExpedientesAll;
  return get.filter((item) => {
    const visibles = state.visibles.indexOf(item.id) !== -1;
    return visibles;
  });
};

export const getExpedienteByExpedienteId = (state, getters) => (id) => {
  const item = getters.getExpedientesAll.find(i => i.expediente_id === id);
  return item;
};

export const getExpedienteById = (state, getters) => (id) => {
  const item = getters.getExpedientesAll.find(i => i.id === id);
  return item;
};
