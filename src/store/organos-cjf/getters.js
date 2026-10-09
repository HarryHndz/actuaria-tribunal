export const getOrganosCjfAll = state => state.all;

export const getOrganosCjfPagination = state => state.pagination;

export const getOrganoCjfByOrganoCjfId = (state, getters) => (id) => {
  const item = getters.getOrganosCjfAll.find(i => i.organo_id === id);
  return item;
};

export const getOrganoCjfById = (state, getters) => (id) => {
  const item = getters.getOrganosCjfAll.find(i => i.id === id);
  return item;
};
