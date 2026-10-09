export const getExpedientesElectronicoAll = state => state.all;

export const getExpedientesElectronicoVisibles = (state, getters) => {
  const visibles = getters.getExpedientesElectronicoAll.filter((item) => {
    const states = state.visibles;
    return states.indexOf(item.id) !== -1;
  });
  return visibles;
};

export const getExpedientesElectronicoPagination = state => state.pagination;

export const getListadoAcuerdoById = (state, getters) => (id) => {
  const item = getters.getExpedientesElectronicoAll.find(i => i.id === id);
  return item;
};
