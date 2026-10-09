export const getTiposSalasAll = state => state.all;

export const getTiposSalasPagination = state => state.pagination;

export const getTipoSalaByTipoSalaId = (state, getters) => (id) => {
  const item = getters.getTiposSalasAll.find(i => i.tipo_persona_id === id);
  return item;
};

export const getTipoSalaById = (state, getters) => (id) => {
  const item = getters.getTiposSalasAll.find(i => i.id === id);
  return item;
};
