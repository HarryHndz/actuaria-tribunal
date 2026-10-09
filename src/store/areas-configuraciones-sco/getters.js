export const getAreasConfiguracionesScoAll = state => state.all;

export const getAreasConfiguracionesScoPagination = state => state.pagination;

export const getAreaByAreaId = (state, getters) => (id) => {
  const item = getters.getAreasConfiguracionesScoAll.find(i => i.area_id === id);
  return item;
};
