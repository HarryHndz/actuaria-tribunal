export const getTiposAcuerdosAll = state => state.all;

export const getTiposAcuerdosPagination = state => state.pagination;

export const getTipoAcuerdoByTipoAcuerdoId = (state, getters) => (id) => {
  const item = getters.getTiposAcuerdosAll.find(i => i.tipo_acuerdo_id === id);
  return item;
};

export const getTipoAcuerdoById = (state, getters) => (id) => {
  const item = getters.getTiposAcuerdosAll.find(i => i.id === id);
  return item;
};
