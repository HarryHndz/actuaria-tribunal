export const getAcuerdosAll = state => state.all;

export const getAcuerdosPagination = state => state.pagination;

export const getAcuerdosByActuacionId = (state, getters) => (id) => {
  const item = getters.getAcuerdosAll.filter(i => i.modelo_id === id);
  return item;
};

export const getAcuerdosByNotifiqueseId = (state, getters) => (id) => {
  const items = getters.getAcuerdosAll.filter(i => i.notifiquese_id === id);
  return items;
};

export const getAcuerdoByAcuerdoId = (state, getters) => (id) => {
  const item = getters.getAcuerdosAll.find(i => i.tipo_secretario_id === id);
  return item;
};

export const getAcuerdoById = (state, getters) => (id) => {
  const item = getters.getAcuerdosAll.find(i => i.id === id);
  return item;
};
