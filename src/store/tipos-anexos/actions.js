import sidjbridge from '../../boot/sidjbridge';

export const fetchAllTiposAnexos = ({ state, commit }, params = {}) => {
  commit('setTiposAnexosRequest');
  commit('setTiposAnexosFilters', params);

  const storage = window.localStorage;
  const data = JSON.parse(storage.getItem('tipos-anexos'));

  if (params.cache && data !== null) {
    commit('setTiposAnexos', data.data);
    commit('setTiposAnexosPagination', data.meta.pagination);
    commit('setTiposAnexosSuccess');
    return Promise.resolve(true);
  }

  return sidjbridge.get('v1/catalogos/tipos/anexos', {
    params: state.filters,
  })
    .then((response) => {
      commit('setTiposAnexos', response.data.data);
      commit('setTiposAnexosPagination', response.data.meta.pagination);
      commit('setTiposAnexosSuccess');
      if (params.cache) {
        storage.setItem('tipos-anexos', JSON.stringify(response.data));
      }
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchAllTiposAnexos', response);
      commit('setTiposAnexosFail');
      return Promise.reject(false);
    });
};

export const fetchTipoAnexo = ({ commit }, id) => {
  commit('setTiposAnexosRequest');
  return sidjbridge.get('v1/catalogos/tipos/anexos', id)
    .then((response) => {
      commit('addTipoAnexo', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposAnexosSuccess');
    })
    .catch((response) => {
      console.error('fetchTipoAnexo', response);
      commit('setTiposAnexosFail');
    });
};

export const postTipoAnexo = ({ commit }, object) => {
  commit('setTiposAnexosRequest');
  return sidjbridge.post('v1/catalogos/tipos/anexos', object)
    .then((response) => {
      commit('addTipoAnexo', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposAnexosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postTipoAnexo', response);
      commit('setTipoAnexoFail', object);
    });
};

export const putTipoAnexo = ({ commit }, object) => {
  commit('setTipoAnexoRequest', object);
  return sidjbridge.put(`v1/catalogos/tipos/anexos/${object.id}`, object)
    .then((response) => {
      commit('setTipoAnexo', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putTipoAnexo', response);
      commit('setTipoAnexoFail', object);
    });
};

export const deleteTipoAnexo = ({ commit }, object) => {
  commit('setTipoAnexoRequest', object);
  return sidjbridge.delete(`v1/catalogos/tipos/anexos/${object.id}`, object)
    .then(() => {
      commit('setTipoAnexo', object);
    })
    .catch((response) => {
      console.error('deleteTipoAnexo', response);
      commit('setTipoAnexoFail', object);
    });
};
