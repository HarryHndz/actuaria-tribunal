export const getTiposDemandasAll = state => state.all;

export const getTiposDemandasPagination = state => state.pagination;

export const getTipoDemandaByTipoDemandaId = (state, getters) => (id) => {
  const item = getters.getTiposDemandasAll.find(i => i.tipo_demanda_id === id);
  return item;
};

export const getTipoDemandaById = (state, getters) => (id) => {
  const item = getters.getTiposDemandasAll.find(i => i.id === id);
  return item;
};
