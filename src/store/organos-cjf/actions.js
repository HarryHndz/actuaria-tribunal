import sidjbridge from '../../boot/sidjbridge';

export const fetchAllOrganosCjf = ({ state, commit }, params = {}) => {
  commit('setOrganosCjfRequest');
  commit('setOrganosCjfFilters', params);
  return sidjbridge.get('/v1/organos-cjf', state.filters)
    .then((response) => {
      commit('setOrganosCjf', response.data.data);
      commit('setOrganosCjfPagination', response.data.meta.pagination);
      commit('setOrganosCjfSuccess');
    })
    .catch((response) => {
      console.error('fetchAllOrganosCjf', response);
      commit('setOrganosCjfFail');
    });
};

export const fetchOrganoCjf = ({ commit }, id) => {
  commit('setOrganosCjfRequest');
  return sidjbridge.get('/v1/organos-cjf', id)
    .then((response) => {
      commit('addOrganoCjf', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setOrganosCjfSuccess');
    })
    .catch((response) => {
      console.error('fetchOrganoCjf', response);
      commit('setOrganosCjfFail');
    });
};

export const postOrganoCjf = ({ commit }, object) => {
  commit('setOrganosCjfRequest');
  return sidjbridge.post('/v1/organos-cjf', object)
    .then((response) => {
      commit('addOrganoCjf', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setOrganosCjfSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postOrganoCjf', response);
      commit('setOrganoCjfFail', object);
    });
};

export const putOrganoCjf = ({ commit }, object) => {
  commit('setOrganoCjfRequest', object);
  return sidjbridge.put(`/v1/organos-cjf/${object.id}`, object)
    .then((response) => {
      commit('setOrganoCjf', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putOrganoCjf', response);
      commit('setOrganoCjfFail', object);
    });
};

export const deleteOrganoCjf = ({ commit }, object) => {
  commit('setOrganoCjfRequest', object);
  return sidjbridge.delete(`/v1/organos-cjf/${object.id}`, object)
    .then(() => {
      commit('setOrganoCjf', object);
    })
    .catch((response) => {
      console.error('deleteOrganoCjf', response);
      commit('setOrganoCjfFail', object);
    });
};
