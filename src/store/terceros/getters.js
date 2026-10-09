export const getTercerosAll = state => state.all;

export const getTercerosPagination = state => state.pagination;

export const getTerceroByTerceroId = (state, getters) => (id) => {
  const item = getters.getTercerosAll.find(i => i.tercero_id === id);
  return item;
};

export const getTerceroById = (state, getters) => (id) => {
  const item = getters.getTercerosAll.find(i => i.id === id);
  return item;
};
