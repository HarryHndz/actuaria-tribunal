import sidjbridge from '../../boot/sidjbridge';

export const fetchAllSecretarios = ({ state, commit }, params = {}) => {
  commit('setSecretariosRequest');
  commit('setSecretariosFilters', params);

  const storage = window.localStorage;
  const data = JSON.parse(storage.getItem('secretarios'));

  if (params.cache && data !== null) {
    commit('setSecretarios', data.data);
    commit('setSecretariosPagination', data.meta.pagination);
    commit('setSecretariosSuccess');
    return Promise.resolve(true);
  }

  return sidjbridge.get('v1/secretarios', {
    params: state.filters,
  })
    .then((response) => {
      commit('setSecretarios', response.data.data);
      commit('setSecretariosPagination', response.data.meta.pagination);
      commit('setSecretariosSuccess');
      if (params.cache) {
        storage.setItem('secretarios', JSON.stringify(response.data));
      }
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchAllSecretarios', response);
      commit('setSecretariosFail');
    });
};

export const fetchSecretario = ({ commit }, id) => {
  commit('setSecretariosRequest');
  return sidjbridge.get('v1/secretarios', id)
    .then((response) => {
      commit('addSecretario', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setSecretariosSuccess');
    })
    .catch((response) => {
      console.error('fetchSecretario', response);
      commit('setSecretariosFail');
    });
};

export const postSecretario = ({ commit }, object) => {
  commit('setSecretariosRequest');
  return sidjbridge.post('v1/secretarios', object)
    .then((response) => {
      commit('addSecretario', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setSecretariosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postSecretario', response);
      commit('setSecretarioFail', object);
    });
};

export const putSecretario = ({ commit }, object) => {
  commit('setSecretarioRequest', object);
  return sidjbridge.put(`v1/secretarios/${object.id}`, object)
    .then((response) => {
      commit('setSecretario', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putSecretario', response);
      commit('setSecretarioFail', object);
    });
};

export const deleteSecretario = ({ commit }, object) => {
  commit('setSecretarioRequest', object);
  return sidjbridge.delete(`v1/secretarios/${object.id}`, object)
    .then(() => {
      commit('setSecretario', object);
    })
    .catch((response) => {
      console.error('deleteSecretario', response);
      commit('setSecretarioFail', object);
    });
};
