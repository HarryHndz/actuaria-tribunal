import scobridge from '../../boot/scobridge';

export const fetchAllTiposTramitesSco = ({ commit }, params = {}) => {
  commit('setTiposTramitesScoRequest');
  commit('setTiposTramitesScoFilters', params);
  return scobridge.get('v1/tipos-tramites', {
    params,
  })
    .then((response) => {
      commit('setTiposTramitesSco', response.data.data);
      commit('setTiposTramitesScoPagination', response.data.meta.pagination);
      commit('setTiposTramitesScoSuccess');
    })
    .catch((response) => {
      console.error('fetchAllTiposTramitesSco', response);
      commit('setTiposTramitesScoFail');
    });
};

export const fetchTipoTramiteSco = ({ commit }, id) => {
  commit('setTiposTramitesScoRequest');
  return scobridge.get('v1/tipos-tramites', id)
    .then((response) => {
      commit('addTipoTramiteSco', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposTramitesScoSuccess');
    })
    .catch((response) => {
      console.error('fetchTipoTramiteSco', response);
      commit('setTiposTramitesScoFail');
    });
};
