export const getListadosAcuerdosAll = state => state.all;

export const getListadosAcuerdosVisibles = (state, getters) => {
  const visibles = getters.getListadosAcuerdosAll.filter((item) => {
    const states = state.visibles;
    return states.indexOf(item.id) !== -1;
  });
  return visibles;
};

export const getListadosAcuerdosPagination = state => state.pagination;

export const getListadoAcuerdoById = (state, getters) => (id) => {
  const item = getters.getListadosAcuerdosAll.find(i => i.id === id);
  return item;
};

export const getListadoAcuerdoByPF = (state, getters) => (ponenciaId, fecha, actuarioId) => {
  const item = getters.getListadosAcuerdosAll;
  return item.find(i => i.ponencia_id === ponenciaId
    && i.fecha_publicacion === fecha
    && i.actuario_id === actuarioId);
};

export const getListadoReenvio = state => state.reenvio;

export const getListadoEnviado = state => state.listadoEnviado;
