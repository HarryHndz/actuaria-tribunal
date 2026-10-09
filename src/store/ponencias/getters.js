export const getPonenciasAll = state => state.all;

export const getPonenciasPagination = state => state.pagination;

export const filterPonenciasBySalaId = (state, getters) => (id) => {
  const item = getters.getPonenciasAll.filter(i => i.sala_id === id);
  return item;
};

export const getPonenciaByCjfId = (state, getters) => (id) => {
  const items = getters.getPonenciasAll.find(i => i.cjf_id === id);
  return items;
};

export const getPonenciaByPonenciaId = (state, getters) => (id) => {
  const item = getters.getPonenciasAll.find(i => i.ponencia_id === id);
  return item;
};

export const getPonenciaById = (state, getters) => (id) => {
  const item = getters.getPonenciasAll.find(i => i.id === id);
  return item;
};
