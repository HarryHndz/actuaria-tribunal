export const getRolesAll = state => state.all;

export const getRolesPagination = state => state.pagination;

export const getRolByRolId = (state, getters) => (id) => {
  const item = getters.getRolesAll.find(i => i.rol_id === id);
  return item;
};

export const getRolById = (state, getters) => (id) => {
  const item = getters.getRolesAll.find(i => i.id === id);
  return item;
};
