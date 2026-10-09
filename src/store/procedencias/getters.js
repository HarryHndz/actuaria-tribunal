export const getProcedenciasAll = state => state.all;

export const getProcedenciasPagination = state => state.pagination;

export const getProcedenciaByProcedenciaId = (state, getters) => (id) => {
  const item = getters.getProcedenciasAll.find(i => i.organo_id === id);
  return item;
};

export const getProcedenciaById = (state, getters) => (id) => {
  const item = getters.getProcedenciasAll.find(i => i.id === id);
  return item;
};
