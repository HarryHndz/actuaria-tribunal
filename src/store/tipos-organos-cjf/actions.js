import sidjbridge from '../../boot/sidjbridge';

export const fetchAllTiposOrganosCjf = ({ state, commit }, params = {}) => {
  commit('setTiposOrganosCjfRequest');
  commit('setTiposOrganosCjfFilters', params);
  return sidjbridge.get('v1/catalogos/tipos/organos-cjf', state.filters)
    .then((response) => {
      commit('setTiposOrganosCjf', response.data.data);
      commit('setTiposOrganosCjfPagination', response.data.meta.pagination);
      commit('setTiposOrganosCjfSuccess');
    })
    .catch((response) => {
      console.error('fetchAllTiposOrganosCjf', response);
      commit('setTiposOrganosCjfFail');
    });
};

export const fetchTipoOrganoCjf = ({ commit }, id) => {
  commit('setTiposOrganosCjfRequest');
  return sidjbridge.get('v1/catalogos/tipos/organos-cjf', id)
    .then((response) => {
      commit('addTipoOrganoCjf', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposOrganosCjfSuccess');
    })
    .catch((response) => {
      console.error('fetchTipoOrganoCjf', response);
      commit('setTiposOrganosCjfFail');
    });
};

export const postTipoOrganoCjf = ({ commit }, object) => {
  commit('setTiposOrganosCjfRequest');
  return sidjbridge.post('v1/catalogos/tipos/organos-cjf', object)
    .then((response) => {
      commit('addTipoOrganoCjf', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposOrganosCjfSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postTipoOrganoCjf', response);
      commit('setTipoOrganoCjfFail', object);
    });
};

export const putTipoOrganoCjf = ({ commit }, object) => {
  commit('setTipoOrganoCjfRequest', object);
  return sidjbridge.put(`v1/catalogos/tipos/organos-cjf/${object.id}`, object)
    .then((response) => {
      commit('setTipoOrganoCjf', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putTipoOrganoCjf', response);
      commit('setTipoOrganoCjfFail', object);
    });
};

export const deleteTipoOrganoCjf = ({ commit }, object) => {
  commit('setTipoOrganoCjfRequest', object);
  return sidjbridge.delete(`v1/catalogos/tipos/organos-cjf/${object.id}`, object)
    .then(() => {
      commit('setTipoOrganoCjf', object);
    })
    .catch((response) => {
      console.error('deleteTipoOrganoCjf', response);
      commit('setTipoOrganoCjfFail', object);
    });
};
