export const getCjfTiposAsuntosAll = state => state.all;

export const getCjfTiposAsuntosPagination = state => state.pagination;

export const getCjfTipoAsuntoByCjfTipoAsuntoId = (state, getters) => (id) => {
  const item = getters.getCjfTiposAsuntosAll.find(i => i.cjf_tipo_asunto_id === id);
  return item;
};

export const getCjfTipoAsuntoById = (state, getters) => (id) => {
  const item = getters.getCjfTiposAsuntosAll.find(i => i.id === id);
  return item;
};
