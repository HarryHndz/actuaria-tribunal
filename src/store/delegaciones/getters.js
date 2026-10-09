export const getDelegacionesAll = state => state.all;

export const getDelegacionesPagination = state => state.pagination;

export const getDelegacionByDelegacionId = (state, getters) => (id) => {
  const item = getters.getDelegacionesAll.find(i => i.cjf_tipo_asunto_id === id);
  return item;
};

export const getDelegacionById = (state, getters) => (id) => {
  const item = getters.getDelegacionesAll.find(i => i.id === id);
  return item;
};
