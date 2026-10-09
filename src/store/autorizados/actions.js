import sidjbridge from '../../boot/sidjbridge';

export const fetchAllAutorizados = ({ state, commit }, params = {}) => {
  commit('setAutorizadosRequest');
  commit('setAutorizadosFilters', params);
  return sidjbridge.get('v1/autorizados', state.filters)
    .then((response) => {
      commit('setAutorizados', response.data.data);
      commit('setAutorizadosPagination', response.data.meta.pagination);
      commit('setAutorizadosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchAllAutorizados', response);
      commit('setAutorizadosFail');
      return Promise.reject(response);
    });
};

export const fetchAutorizado = ({ commit }, id) => {
  commit('setAutorizadosRequest');
  return sidjbridge.get('v1/autorizados', id)
    .then((response) => {
      commit('addAutorizado', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setAutorizadosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchAutorizado', response);
      commit('setAutorizadosFail');
      return Promise.reject(response);
    });
};

export const postAutorizado = ({ commit }, object) => {
  commit('setAutorizadosRequest');
  return sidjbridge.post('v1/autorizados', object)
    .then((response) => {
      const obj = {
        ...response.data.data,
        fetching: false,
        error: false,
      };
      commit('addAutorizado', obj);
      commit('setAutorizadosSuccess');
      return Promise.resolve(obj);
    })
    .catch((response) => {
      console.error('postAutorizado', response);
      commit('setAutorizadoFail', object);
      return Promise.reject(response);
    });
};

export const putAutorizado = ({ commit }, object) => {
  commit('setAutorizadoRequest', object);
  return sidjbridge.put(`v1/autorizados/${object.id}`, object)
    .then((response) => {
      commit('setAutorizado', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putAutorizado', response);
      commit('setAutorizadoFail', object);
      return Promise.reject(response);
    });
};

export const deleteAutorizado = ({ commit }, object) => {
  commit('setAutorizadoRequest', object);
  return sidjbridge.delete(`v1/autorizados/${object.id}`, object)
    .then(() => {
      commit('setAutorizadoDelete', object);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('deleteAutorizado', response);
      commit('setAutorizadoFail', object);
      return Promise.reject(response);
    });
};
