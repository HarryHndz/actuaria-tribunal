export const getActuariosAll = state => state.all;

export const getActuariosPagination = state => state.pagination;

export const filterActuariosByPonenciaId = (state, getters) => (id) => {
  const items = getters.getActuariosAll.filter(i => i.ponencia_id === id);
  return items;
};

export const getActuarioByActuarioId = (state, getters) => (id) => {
  const item = getters.getActuariosAll.find(i => i.actuario_id === id);
  return item;
};

export const getActuarioById = (state, getters) => (id) => {
  const item = getters.getActuariosAll.find(i => i.id === id);
  return item;
};
