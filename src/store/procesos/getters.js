export const getProcesosAll = state => state.all;

export const getProcesosPagination = state => state.pagination;

export const filterProcesosByMateriaId = (state, getters) => (id) => {
  const items = getters.getProcesosAll.filter(i => i.materia_id === id);
  return items;
};

export const filterProcesosBySalaId = (state, getters) => (id) => {
  const items = getters.getProcesosAll.filter(i => i.sala_id === id);
  return items;
};

export const filterProcesosByTipoDemadaId = (state, getters) => (id) => {
  const items = getters.getProcesosAll.filter(i => i.tipos_demandas.indexOf(id) !== -1);
  return items;
};

export const getProcesoByProcesoId = (state, getters) => (id) => {
  const item = getters.getProcesosAll.find(i => i.proceso_id === id);
  return item;
};

export const getProcesoById = (state, getters) => (id) => {
  const item = getters.getProcesosAll.find(i => i.id === id);
  return item;
};
