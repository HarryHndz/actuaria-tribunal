export const getSentidosSalaOrdinariaAll = state => state.all;

export const getSentidosSalaOrdinariaPagination = state => state.pagination;

export const getSentidoSalaOrdinariaBySentidoSalaOrdinariaId = (state, getters) => (id) => {
  const item = getters.getSentidosSalaOrdinariaAll.find(i => i.rol_id === id);
  return item;
};

export const getSentidoSalaOrdinariaById = (state, getters) => (id) => {
  const item = getters.getSentidosSalaOrdinariaAll.find(i => i.id === id);
  return item;
};
