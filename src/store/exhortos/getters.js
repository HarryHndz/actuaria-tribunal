export const getExhortosAll = state => state.all;

export const getExhortosPagination = state => state.pagination;

export const getExhortoByExhortoId = (state, getters) => (id) => {
  const item = getters.getExhortosAll.find(i => i.documento_id === id);
  return item;
};

export const getExhortoById = (state, getters) => (id) => {
  const item = getters.getExhortosAll.find(i => i.id === id);
  return item;
};
