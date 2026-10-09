export const getOficialiaCitasAll = state => state.all;

export const getOficialiaCitasVisibles = (state, getters) => {
  const visibles = getters.getOficialiaCitasAll.filter((item) => {
    const states = state.visibles;
    return states.indexOf(item.id) !== -1;
  });
  return visibles;
};

export const getOficialiaCitasPagination = state => state.pagination;

export const getOficialiaCitaById = (state, getters) => (id) => {
  const item = getters.getOficialiaCitasAll.find(i => i.id === id);
  return item;
};
