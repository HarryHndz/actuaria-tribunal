export const getMagistradosAll = state => state.all;

export const getMagistradosPagination = state => state.pagination;

export const filterMagistradosByPonenciaId = (state, getters) => (id) => {
  const items = getters.getMagistradosAll.filter(i => i.ponencia_id === id);
  return items;
};

export const getMagistradoByMagistradoId = (state, getters) => (id) => {
  const item = getters.getMagistradosAll.find(i => i.magistrado_id === id);
  return item;
};

export const getMagistradoById = (state, getters) => (id) => {
  const item = getters.getMagistradosAll.find(i => i.id === id);
  return item;
};
