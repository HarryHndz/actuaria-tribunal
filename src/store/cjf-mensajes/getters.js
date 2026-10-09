export const getCjfMensajesAll = state => state.all;

export const getCjfMensajesPagination = state => state.pagination;

export const getCjfMensajeById = (state, getters) => (id) => {
  const item = getters.getCjfMensajesAll.find(i => i.id === id);
  return item;
};
