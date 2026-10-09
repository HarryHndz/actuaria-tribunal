export const getTiposTercerosAll = state => state.all;

export const getTiposTercerosPagination = state => state.pagination;

export const getTipoTerceroByTipoTerceroId = (state, getters) => (id) => {
  const item = getters.getTiposTercerosAll.find(i => i.tipo_tercero_id === id);
  return item;
};

export const getTipoTerceroById = (state, getters) => (id) => {
  const item = getters.getTiposTercerosAll.find(i => i.id === id);
  return item;
};
