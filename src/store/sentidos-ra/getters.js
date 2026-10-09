export const geSentidosRaAll = state => state.all;

export const geSentidosRaPagination = state => state.pagination;

export const getSentidoRaBySentidoRaId = (state, getters) => (id) => {
  const item = getters.geSentidosRaAll.find(i => i.rol_id === id);
  return item;
};

export const getSentdidoRaById = (state, getters) => (id) => {
  const item = getters.geSentidosRaAll.find(i => i.id === id);
  return item;
};
