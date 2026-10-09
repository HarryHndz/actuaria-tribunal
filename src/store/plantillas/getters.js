export const getPlantillasAll = state => state.all;

export const getPlantillasVisibles = (state, getters) => {
  const visibles = getters.getPlantillasAll.filter((item) => {
    const states = state.visibles;
    return states.indexOf(item.id) !== -1;
  });
  return visibles;
};

export const getPlantillasPagination = state => state.pagination;

export const getGrupoPlantillasById = (state, getters) => (id) => {
  const item = getters.getPlantillasAll.find(i => i.id === id);
  return item;
};
export const getGrupoPlantillasByGrupoId = (state, getters) => (id) => {
  const item = getters.getPlantillasAll.filter(i => i.grupo_id === id);
  return item;
};
