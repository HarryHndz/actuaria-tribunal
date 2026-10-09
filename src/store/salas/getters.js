export const getSalasAll = state => state.all;

export const getSalasPagination = state => state.pagination;

export const filterSalasByMateriaId = (state, getters) => (id) => {
  const items = getters.getSalasAll.filter(i => i.materia_id === id);
  return items;
};

export const getSalaBySalaId = (state, getters) => (id) => {
  const item = getters.getSalasAll.find(i => i.sala_id === id);
  return item;
};

export const getSalaById = (state, getters) => (id) => {
  const item = getters.getSalasAll.find(i => i.id === id);
  return item;
};
