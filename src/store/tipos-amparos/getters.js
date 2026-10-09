export const getTiposAmparosAll = state => state.all;

export const getTiposAmparosPagination = state => state.pagination;

export const getTipoAmparoByTipoAmparoId = (state, getters) => (id) => {
  const item = getters.getTiposAmparosAll.find(i => i.tipo_amparo_id === id);
  return item;
};

export const getTipoAmparoById = (state, getters) => (id) => {
  const item = getters.getTiposAmparosAll.find(i => i.id === id);
  return item;
};
