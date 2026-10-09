export const getTiposNotifiqueseAll = state => state.all;

export const getTiposNotifiquesePagination = state => state.pagination;

export const getTipoNotifiqueseByTipoNotifiqueseId = (state, getters) => (id) => {
  const item = getters.getTiposNotifiqueseAll.find(i => i.tipo_id === id);
  return item;
};

export const getTipoNotifiqueseById = (state, getters) => (id) => {
  const item = getters.getTiposNotifiqueseAll.find(i => i.id === id);
  return item;
};
