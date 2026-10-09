export const getDiasInhabilesAll = state => state.all;

export const getDiasInhabilesVisibles = (state, getters) => {
  const visibles = getters.getDiasInhabilesAll.filter((item) => {
    const states = state.visibles;
    return states.indexOf(item.id) !== -1;
  });
  return visibles;
};

export const getDiasInhabilesPagination = state => state.pagination;

export const getDiaInhabilById = (state, getters) => (id) => {
  const item = getters.getDiasInhabilesAll.find(i => i.id === id);
  return item;
};
