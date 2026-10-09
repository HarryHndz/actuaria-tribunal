export const getDependenciasAll = state => state.all;

export const getDependenciasPagination = state => state.pagination;

export const getDependenciaByDependenciaId = (state, getters) => (id) => {
  const item = getters.getDependenciasAll.find(i => i.dependencia_id === id);
  return item;
};

export const getDependenciaById = (state, getters) => (id) => {
  const item = getters.getDependenciasAll.find(i => i.id === id);
  return item;
};
