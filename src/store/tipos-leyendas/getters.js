export const getTiposLeyendasAll = state => state.all;

export const getTiposLeyendasPagination = state => state.pagination;

export const getTipoLeyendaByTipoLeyendaId = (state, getters) => (id) => {
  const item = getters.getTiposLeyendasAll.find(i => i.tipo_leyenda_id === id);
  return item;
};

export const getTipoLeyendaById = (state, getters) => (id) => {
  const item = getters.getTiposLeyendasAll.find(i => i.id === id);
  return item;
};
