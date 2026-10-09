export const getUsuariosAll = state => state.all;

export const getUsuariosPagination = state => state.pagination;

export const getUsuarioByUsuarioId = (state, getters) => (id) => {
  const item = getters.getUsuariosAll.find(i => i.user_id === id);
  return item;
};

export const getUbicacionFisicaById = (state, getters) => (id) => {
  const item = getters.getUsuariosAll.find(i => i.id === id);
  return item;
};
