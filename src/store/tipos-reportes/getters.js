export const getTiposReportesAll = state => state.all;

export const getTiposReportesPagination = state => state.pagination;

export const getTipoReporteByTipoReporteId = (state, getters) => (id) => {
  const item = getters.getTiposReportesAll.find(i => i.tipo_secretario_id === id);
  return item;
};

export const getTipoReporteById = (state, getters) => (id) => {
  const item = getters.getTiposReportesAll.find(i => i.id === id);
  return item;
};
