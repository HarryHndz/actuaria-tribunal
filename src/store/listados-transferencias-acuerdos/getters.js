export const getListadosTransferenciasAcuerdoAll = state => state.all;

export const getListadosTransferenciasAcuerdosPagination = state => state.pagination;

export const getListadosTransferenciasAcuerdosVisibles = (state, getters) => {
  const visibles = getters.getListadosTransferenciasAcuerdoAll.filter((item) => {
    const states = state.visibles;
    return states.indexOf(item.id) !== -1;
  });
  return visibles;
};


export const getListadoTransferenciaAcuerdoById = (state, getters) => (id) => {
  const item = getters.getListadosTransferenciasAcuerdoAll.find(i => i.id === id);
  return item;
};

export const getListadoAcuerdoReenvio = state => state.reenvio;
export const getListadoAcuerdoEnviado = state => state.listadoEnviado;
