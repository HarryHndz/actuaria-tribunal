export const getTiposPersonasAll = state => state.all;

export const getTiposPersonasPagination = state => state.pagination;

export const getTipoPersonaByTipoPersonaId = (state, getters) => (id) => {
  const item = getters.getTiposPersonasAll.find(i => i.tipo_persona_id === id);
  return item;
};

export const getTipoPersonaById = (state, getters) => (id) => {
  const item = getters.getTiposPersonasAll.find(i => i.id === id);
  return item;
};
