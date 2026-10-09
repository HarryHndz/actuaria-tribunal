import sidjbridge from '../../boot/sidjbridge';

export const fetchAllDependencias = ({ state, commit }, params = {}) => {
  commit('setDependenciasRequest');
  commit('setDependenciasFilters', params);
  return sidjbridge.get('/v1/dependencias', state.filters)
    .then((response) => {
      commit('setDependencias', response.data.data);
      commit('setDependenciasPagination', response.data.meta.pagination);
      commit('setDependenciasSuccess');
    })
    .catch((response) => {
      console.error('fetchAllDependencias', response);
      commit('setDependenciasFail');
    });
};

export const fetchDependencia = ({ commit }, id) => {
  commit('setDependenciasRequest');
  return sidjbridge.get('/v1/dependencias', id)
    .then((response) => {
      commit('addDependencia', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setDependenciasSuccess');
    })
    .catch((response) => {
      console.error('fetchDependencia', response);
      commit('setDependenciasFail');
    });
};

export const postDependencia = ({ commit }, object) => {
  commit('setDependenciasRequest');
  return sidjbridge.post('/v1/dependencias', object)
    .then((response) => {
      commit('addDependencia', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setDependenciasSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postDependencia', response);
      commit('setDependenciaFail', object);
    });
};

export const putDependencia = ({ commit }, object) => {
  commit('setDependenciaRequest', object);
  return sidjbridge.put(`/v1/dependencias/${object.id}`, object)
    .then((response) => {
      commit('setDependencia', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putDependencia', response);
      commit('setDependenciaFail', object);
    });
};

export const deleteDependencia = ({ commit }, object) => {
  commit('setDependenciaRequest', object);
  return sidjbridge.delete(`/v1/dependencias/${object.id}`, object)
    .then(() => {
      commit('setDependencia', object);
    })
    .catch((response) => {
      console.error('deleteDependencia', response);
      commit('setDependenciaFail', object);
    });
};
