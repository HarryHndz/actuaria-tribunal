export const getListadosTransferenciasAll = state => state.all;

export const getListadosTransferenciasPagination = state => state.pagination;

export const getListadoTransferenciaById = (state, getters) => (id) => {
  const item = getters.getListadosTransferenciasAll.find(i => i.id === id);
  return item;
};
