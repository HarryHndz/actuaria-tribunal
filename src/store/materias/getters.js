export const getMateriasAll = state => state.all;

export const getMateriasPagination = state => state.pagination;

export const getMateriaByMateriaId = (state, getters) => (id) => {
  const item = getters.getMateriasAll.find(i => i.materia_id === id);
  return item;
};

export const getMateriaById = (state, getters) => (id) => {
  const item = getters.getMateriasAll.find(i => i.id === id);
  return item;
};
