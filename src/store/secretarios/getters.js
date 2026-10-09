export const getSecretariosAll = state => state.all;

export const getSecretariosPagination = state => state.pagination;

export const filterSecretariosByPonenciaId = (state, getters) => (id) => {
  const items = getters.getSecretariosAll.filter(i => i.ponencia_id === id);
  return items;
};

export const getSecretarioBySecretarioId = (state, getters) => (id) => {
  const item = getters.getSecretariosAll.find(i => i.secretario_id === id);
  return item;
};

export const getSecretarioById = (state, getters) => (id) => {
  const item = getters.getSecretariosAll.find(i => i.id === id);
  return item;
};
