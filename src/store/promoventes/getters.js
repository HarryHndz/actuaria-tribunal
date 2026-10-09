export const getPromoventesAll = state => state.all;

export const getPromoventesPagination = state => state.pagination;

export const getPromoventeByPromoventeId = (state, getters) => (id) => {
  const item = getters.getPromoventesAll.find(i => i.promovente_id === id);
  return item;
};

export const getPromoventeById = (state, getters) => (id) => {
  const item = getters.getPromoventesAll.find(i => i.id === id);
  return item;
};
