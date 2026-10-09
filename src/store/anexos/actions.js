import sidjbridge from '../../boot/sidjbridge';

export const fetchAllAnexos = ({ state, commit }, params = {}) => {
  commit('setAnexosRequest');
  commit('setAnexosFilters', params);
  return sidjbridge.get('v1/anexos', {
    params: state.filters,
  })
    .then((response) => {
      commit('setAnexos', response.data.data);
      commit('setAnexosPagination', response.data.meta.pagination);
      commit('setAnexosSuccess');
    })
    .catch((response) => {
      console.error('fetchAllAnexos', response);
      commit('setAnexosFail');
    });
};

export const fetchAnexo = ({ commit }, id) => {
  commit('setAnexosRequest');
  return sidjbridge.get('v1/anexos', id)
    .then((response) => {
      commit('addAnexo', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setAnexosSuccess');
    })
    .catch((response) => {
      console.error('fetchAnexo', response);
      commit('setAnexosFail');
    });
};

export const postAnexo = ({ commit }, object) => {
  commit('setAnexosRequest');
  return sidjbridge.post('v1/anexos', object)
    .then((response) => {
      commit('addAnexo', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setAnexosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postAnexo', response);
      commit('setAnexoFail', object);
    });
};

export const putAnexo = ({ commit }, object) => {
  commit('setAnexoRequest', object);
  return sidjbridge.put(`v1/anexos/${object.id}`, object)
    .then((response) => {
      commit('setAnexo', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putAnexo', response);
      commit('setAnexoFail', object);
    });
};

export const deleteAnexo = ({ commit }, object) => {
  commit('setAnexoRequest', object);
  return sidjbridge.delete(`v1/anexos/${object.id}`, object)
    .then(() => {
      commit('setAnexo', object);
    })
    .catch((response) => {
      console.error('deleteAnexo', response);
      commit('setAnexoFail', object);
    });
};
