export const getActosImpugnadosAll = state => state.all;

export const getActosImpugnadosPagination = state => state.pagination;

export const filterActosImpugnadosByMateriaId = (state, getters) => (id) => {
  const items = getters.getActosImpugnadosAll.filter(i => i.materia_id === id);
  return items;
};

export const getActoImpugnadoByActoId = (state, getters) => (id) => {
  const item = getters.getActosImpugnadosAll.find(i => i.acto_id === id);
  return item;
};

export const getActoImpugnadoById = (state, getters) => (id) => {
  const item = getters.getActosImpugnadosAll.find(i => i.id === id);
  return item;
};
