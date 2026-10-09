export const getAreasAll = state => state.all;

export const getAreasPagination = state => state.pagination;

export const filterAreasByPonenciaId = (state, getters) => (id) => {
  const items = getters.getAreasAll.filter(i => i.ponencia_id === id);
  return items;
};

export const getAreaByAreaId = (state, getters) => (id) => {
  const item = getters.getAreasAll.find(i => i.area_id === id);
  return item;
};

export const getAreaById = (state, getters) => (id) => {
  const item = getters.getAreasAll.find(i => i.id === id);
  return item;
};
