export const getAutoridadesAll = state => state.all;

export const getAutoridadesPagination = state => state.pagination;

export const getAutoridadesVisibles = (state, getters) => {
  const visibles = getters.getAutoridadesAll.filter(item => state.visibles.indexOf(item.id) !== -1);
  return visibles;
};

export const getAutoridadByAutoridadId = (state, getters) => (id) => {
  const item = getters.getAutoridadesAll.find(i => i.autoridad_id === id);
  return item;
};

export const getAutoridadId = (state, getters) => (id) => {
  const item = getters.getAutoridadesAll.find(i => i.id === id);
  return item;
};
