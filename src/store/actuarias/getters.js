export const getActuariasAll = state => state.all;

export const getActuariasPagination = state => state.pagination;

export const filterActuariasByPonenciaId = (state, getters) => (id) => {
  const items = getters.getActuariasAll.filter(i => i.ponencia_id === id);
  return items;
};

export const getActuariaByActuariaId = (state, getters) => (id) => {
  const item = getters.getActuariasAll.find(i => i.actuaria_id === id);
  return item;
};

export const getActuariaById = (state, getters) => (id) => {
  const item = getters.getActuariasAll.find(i => i.id === id);
  return item;
};
