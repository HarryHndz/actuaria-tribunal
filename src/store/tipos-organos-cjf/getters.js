export const getTiposOrganosCjfAll = state => state.all;

export const getTiposOrganosCjfPagination = state => state.pagination;

export const getTipoOrganoCjfByTipoOrganoCjfId = (state, getters) => (id) => {
  const item = getters.getTiposOrganosCjfAll.find(i => i.tipo_secretario_id === id);
  return item;
};

export const getTipoOrganoCjfById = (state, getters) => (id) => {
  const item = getters.getTiposOrganosCjfAll.find(i => i.id === id);
  return item;
};
