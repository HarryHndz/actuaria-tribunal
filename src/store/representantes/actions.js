import sidjbridge from '../../boot/sidjbridge';

export const fetchAllRepresentantes = ({ state, commit }, params = {}) => {
  commit('setRepresentantesRequest');
  commit('setRepresentantesFilters', params);
  return sidjbridge.get('v1/representantes', {
    params: state.filters,
  }).then((response) => {
    commit('setRepresentantes', response.data.data);
    commit('setRepresentantesPagination', response.data.meta.pagination);
    commit('setRepresentantesSuccess');

    return Promise.resolve(true);
  }).catch((response) => {
    console.error('fetchAllRepresentantes', response);
    commit('setRepresentantesFail');

    return Promise.reject(response);
  });
};

export const fetchRepresentante = ({ commit }, id) => {
  commit('setRepresentantesRequest');
  return sidjbridge.get(`v1/representantes/${id}`)
    .then((response) => {
      commit('addRepresentante', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setRepresentantesSuccess');
    })
    .catch((response) => {
      console.error('fetchRepresentante', response);
      commit('setRepresentantesFail');
    });
};

export const postRepresentante = ({ commit }, object) => {
  commit('setRepresentantesRequest');
  return sidjbridge.post('v1/representantes/', object)
    .then((response) => {
      const obj = {
        ...response.data.data,
        fetching: false,
        error: false,
      };
      commit('addRepresentante', obj);
      commit('setRepresentantesSuccess');
      return Promise.resolve(obj);
    })
    .catch((response) => {
      console.error('postRepresentante', response);
      commit('setRepresentanteFail', object);
    });
};

export const putRepresentante = ({ commit }, object) => {
  commit('setRepresentanteRequest', object);
  return sidjbridge.put(`v1/representantes/${object.id}`, object)
    .then((response) => {
      commit('setRepresentante', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putRepresentante', response);
      commit('setRepresentanteFail', object);
      return Promise.resolve(response);
    });
};

export const deleteRepresentante = ({ commit }, object) => {
  commit('setRepresentanteRequest', object);
  return sidjbridge.delete(`v1/representantes/${object.id}`, object)
    .then(() => {
      commit('setRepresentanteDelete', object);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('deleteRepresentante', response);
      commit('setRepresentanteFail', object);
      return Promise.resolve(response);
    });
};
