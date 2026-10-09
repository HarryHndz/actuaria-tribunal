export const getTiposContribucionesAll = state => state.all;

export const getTiposContribucionesPagination = state => state.pagination;

export const getTipoContribucionByTipoContribucionId = (state, getters) => (id) => {
  const item = getters.getTiposContribucionesAll.find(i => i.contribucion_id === id);
  return item;
};

export const getTipoContribucionById = (state, getters) => (id) => {
  const item = getters.getTiposContribucionesAll.find(i => i.id === id);
  return item;
};
