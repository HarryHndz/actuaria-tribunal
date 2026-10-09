export const getTribunalesColegiadosAll = state => state.all;

export const getTribunalesColegiadosPagination = state => state.pagination;

export const getTribunalColegiadoByTribunalColegiadoId = (state, getters) => (id) => {
  const item = getters.getTribunalesColegiadosAll.find(i => i.tipo_secretario_id === id);
  return item;
};

export const getTribunalColegiadoById = (state, getters) => (id) => {
  const item = getters.getTribunalesColegiadosAll.find(i => i.id === id);
  return item;
};
