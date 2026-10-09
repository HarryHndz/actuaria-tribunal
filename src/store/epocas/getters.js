export const getEpocasAll = state => state.all;

export const getEpocasPagination = state => state.pagination;

export const getEpocaByEpocaId = (state, getters) => (id) => {
  const item = getters.getEpocasAll.find(i => i.epoca_id === id);
  return item;
};

export const getEpocaById = (state, getters) => (id) => {
  const item = getters.getEpocasAll.find(i => i.id === id);
  return item;
};
