export const getDependenciasAutoridadesAll = state => state.all;

export const getDependenciasAutoridadesPagination = state => state.pagination;

export const getDepAutoridadByDepAutoridadId = (state, getters) => (id) => {
  const item = getters.getDependenciasAutoridadesAll.find(i => i.dependencia_autoridad_id === id);
  return item;
};

export const getDepAutoridadById = (state, getters) => (id) => {
  const item = getters.getDependenciasAutoridadesAll.find(i => i.id === id);
  return item;
};
