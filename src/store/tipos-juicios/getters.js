export const getTiposJuiciosAll = state => state.all;

export const getTiposJuiciosPagination = state => state.pagination;

export const getTipoJuicioByTipoJuicioId = (state, getters) => (id) => {
  const item = getters.getTiposJuiciosAll.find(i => i.tipo_juicio_id === id);
  return item;
};

export const getTipoJuicioById = (state, getters) => (id) => {
  const item = getters.getTiposJuiciosAll.find(i => i.id === id);
  return item;
};
