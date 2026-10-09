export const getTiposSecretariosAll = state => state.all;

export const getTiposSecretariosPagination = state => state.pagination;

export const getTipoSecretarioByTipoSecretarioId = (state, getters) => (id) => {
  const item = getters.getTiposSecretariosAll.find(i => i.tipo_secretario_id === id);
  return item;
};

export const getTipoSecretarioById = (state, getters) => (id) => {
  const item = getters.getTiposSecretariosAll.find(i => i.id === id);
  return item;
};
