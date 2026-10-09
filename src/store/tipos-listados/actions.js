import sidjbridge from '../../boot/sidjbridge';

export const fetchAllTiposListados = ({ state, commit }, params = {}) => {
  commit('setTiposListadosRequest');
  commit('setTiposListadosFilters', params);

  const storage = window.localStorage;
  const data = JSON.parse(storage.getItem('tipos-listados'));

  if (params.cache && data !== null) {
    commit('setTiposListados', data.data);
    commit('setTiposListadosPagination', data.meta.pagination);
    commit('setTiposListadosSuccess');
    return Promise.resolve(true);
  }

  return sidjbridge.get('v1/catalogos/tipos/listados', {
    params: state.filters,
  })
    .then((response) => {
      commit('setTiposListados', response.data.data);
      commit('setTiposListadosPagination', response.data.meta.pagination);
      commit('setTiposListadosSuccess');
      if (params.cache) {
        storage.setItem('tipos-listados', JSON.stringify(response.data));
      }
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchAllTiposListados', response);
      commit('setTiposListadosFail');
      return Promise.reject(false);
    });
};

export const fetchTipoListado = ({ commit }, id) => {
  commit('setTiposListadosRequest');
  return sidjbridge.get('v1/catalogos/tipos/listados', id)
    .then((response) => {
      commit('addTipoListado', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposListadosSuccess');
    })
    .catch((response) => {
      console.error('fetchTipoListado', response);
      commit('setTiposListadosFail');
    });
};

export const postTipoListado = ({ commit }, object) => {
  commit('setTiposListadosRequest');
  return sidjbridge.post('v1/catalogos/tipos/listados', object)
    .then((response) => {
      commit('addTipoListado', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposListadosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postTipoListado', response);
      commit('setTipoListadoFail', object);
    });
};

export const putTipoListado = ({ commit }, object) => {
  commit('setTipoListadoRequest', object);
  return sidjbridge.put(`v1/catalogos/tipos/listados/${object.id}`, object)
    .then((response) => {
      commit('setTipoListado', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putTipoListado', response);
      commit('setTipoListadoFail', object);
    });
};

export const deleteTipoListado = ({ commit }, object) => {
  commit('setTipoListadoRequest', object);
  return sidjbridge.delete(`v1/catalogos/tipos/listados/${object.id}`, object)
    .then(() => {
      commit('setTipoListado', object);
    })
    .catch((response) => {
      console.error('deleteTipoListado', response);
      commit('setTipoListadoFail', object);
    });
};
