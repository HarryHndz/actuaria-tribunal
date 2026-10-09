export const getSentidosRcaAll = state => state.all;

export const getSentidosRcaPagination = state => state.pagination;

export const getSentidoRcaBySentidoRcaId = (state, getters) => (id) => {
  const item = getters.getSentidosRcaAll.find(i => i.rol_id === id);
  return item;
};

export const getSentidoRcaById = (state, getters) => (id) => {
  const item = getters.getSentidosRcaAll.find(i => i.id === id);
  return item;
};
