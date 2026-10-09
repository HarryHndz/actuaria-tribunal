import sidjbridge from '../../boot/sidjbridge';

export const fetchAllTiposPersonas = ({ state, commit }, params = {}) => {
  commit('setTiposPersonasRequest');
  commit('setTiposPersonasFilters', params);

  const storage = window.localStorage;
  const data = JSON.parse(storage.getItem('tipos-personas'));

  if (params.cache && data !== null) {
    commit('setTiposPersonas', data.data);
    commit('setTiposPersonasPagination', data.meta.pagination);
    commit('setTiposPersonasSuccess');
    return Promise.resolve(true);
  }

  return sidjbridge.get('v1/catalogos/tipos/personas', {
    params: state.filters,
  })
    .then((response) => {
      commit('setTiposPersonas', response.data.data);
      commit('setTiposPersonasPagination', response.data.meta.pagination);
      commit('setTiposPersonasSuccess');
      if (params.cache) {
        storage.setItem('tipos-personas', JSON.stringify(response.data));
      }
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchAllTiposPersonas', response);
      commit('setTiposPersonasFail');
      return Promise.reject(false);
    });
};

export const fetchTipoPersona = ({ commit }, id) => {
  commit('setTiposPersonasRequest');
  return sidjbridge.get('v1/catalogos/tipos/personas', id)
    .then((response) => {
      commit('addTipoPersona', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposPersonasSuccess');
    })
    .catch((response) => {
      console.error('fetchTipoPersona', response);
      commit('setTiposPersonasFail');
    });
};

export const postTipoPersona = ({ commit }, object) => {
  commit('setTiposPersonasRequest');
  return sidjbridge.post('v1/catalogos/tipos/personas', object)
    .then((response) => {
      commit('addTipoPersona', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposPersonasSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postTipoPersona', response);
      commit('setTipoPersonaFail', object);
    });
};

export const putTipoPersona = ({ commit }, object) => {
  commit('setTipoPersonaRequest', object);
  return sidjbridge.put(`v1/catalogos/tipos/personas/${object.id}`, object)
    .then((response) => {
      commit('setTipoPersona', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putTipoPersona', response);
      commit('setTipoPersonaFail', object);
    });
};

export const deleteTipoPersona = ({ commit }, object) => {
  commit('setTipoPersonaRequest', object);
  return sidjbridge.delete(`v1/catalogos/tipos/personas/${object.id}`, object)
    .then(() => {
      commit('setTipoPersona', object);
    })
    .catch((response) => {
      console.error('deleteTipoPersona', response);
      commit('setTipoPersonaFail', object);
    });
};
