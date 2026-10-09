export const getRepresentantesAll = state => state.all;

export const getRepresentantesPagination = state => state.pagination;

export const getRepresentanteByRepresentanteId = (state, getters) => (id) => {
  const item = getters.getRepresentantesAll.find(i => i.representante_id === id);
  return item;
};

export const getRepresentanteById = (state, getters) => (id) => {
  const item = getters.getRepresentantesAll.find(i => i.id === id);
  return item;
};
