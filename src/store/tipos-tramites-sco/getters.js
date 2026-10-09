export const getTiposTramitesScoAll = state => state.all;

export const getTiposTramitesScoPagination = state => state.pagination;

export const getTipoTramiteScoByTipoTramiteScoId = (state, getters) => (id) => {
  const item = getters.getTiposTramitesScoAll.find(i => i.tipo_id === id);
  return item;
};

export const getTipoTramiteScoById = (state, getters) => (id) => {
  const item = getters.getTiposTramitesScoAll.find(i => i.id === id);
  return item;
};
