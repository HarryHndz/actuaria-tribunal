export const getGruposPlantillasAll = state => state.all;

export const getGruposPlantillasVisibles = (state, getters) => {
  const visibles = getters.getGruposPlantillasAll.filter((item) => {
    const states = state.visibles;
    return states.indexOf(item.id) !== -1;
  });
  return visibles;
};

export const getGruposPlantillasPagination = state => state.pagination;

export const getGrupoPlantillasById = (state, getters) => (id) => {
  const item = getters.getGruposPlantillasAll.find(i => i.id === id);
  return item;
};
