import sidjbridge from '../../boot/sidjbridge';

export const fetchAllTiposSecretarios = ({ state, commit }, params = {}) => {
  commit('setTiposSecretariosRequest');
  commit('setTiposSecretariosFilters', params);
  return sidjbridge.get('v1/catalogos/tipos/secretarios', state.filters)
    .then((response) => {
      commit('setTiposSecretarios', response.data.data);
      commit('setTiposSecretariosPagination', response.data.meta.pagination);
      commit('setTiposSecretariosSuccess');
    })
    .catch((response) => {
      console.error('fetchAllTiposSecretarios', response);
      commit('setTiposSecretariosFail');
    });
};

export const fetchTipoSecretario = ({ commit }, id) => {
  commit('setTiposSecretariosRequest');
  return sidjbridge.get('v1/catalogos/tipos/secretarios', id)
    .then((response) => {
      commit('addTipoSecretario', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposSecretariosSuccess');
    })
    .catch((response) => {
      console.error('fetchTipoSecretario', response);
      commit('setTiposSecretariosFail');
    });
};

export const postTipoSecretario = ({ commit }, object) => {
  commit('setTiposSecretariosRequest');
  return sidjbridge.post('v1/catalogos/tipos/secretarios', object)
    .then((response) => {
      commit('addTipoSecretario', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposSecretariosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postTipoSecretario', response);
      commit('setTipoSecretarioFail', object);
    });
};

export const putTipoSecretario = ({ commit }, object) => {
  commit('setTipoSecretarioRequest', object);
  return sidjbridge.put(`v1/catalogos/tipos/secretarios/${object.id}`, object)
    .then((response) => {
      commit('setTipoSecretario', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putTipoSecretario', response);
      commit('setTipoSecretarioFail', object);
    });
};

export const deleteTipoSecretario = ({ commit }, object) => {
  commit('setTipoSecretarioRequest', object);
  return sidjbridge.delete(`v1/catalogos/tipos/secretarios/${object.id}`, object)
    .then(() => {
      commit('setTipoSecretario', object);
    })
    .catch((response) => {
      console.error('deleteTipoSecretario', response);
      commit('setTipoSecretarioFail', object);
    });
};
