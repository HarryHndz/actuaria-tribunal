import sidjbridge from '../../boot/sidjbridge';

export const fetchAllDependenciasAutoridades = ({ state, commit }, params = {}) => {
  commit('setDependenciasAutoridadesRequest');
  commit('setDependenciasAutoridadesFilters', params);

  const storage = window.localStorage;
  const data = JSON.parse(storage.getItem('dependencias-autoridades'));

  if (params.cache && data !== null) {
    commit('setDependenciasAutoridades', data.data);
    commit('setDependenciasAutoridadesPagination', data.meta.pagination);
    commit('setDependenciasAutoridadesSuccess');
    return Promise.resolve(true);
  }

  return sidjbridge.get('v1/dependencias-autoridades', {
    params: state.filters,
  }).then((response) => {
    commit('setDependenciasAutoridades', response.data.data);
    commit('setDependenciasAutoridadesPagination', response.data.meta.pagination);
    commit('setDependenciasAutoridadesSuccess');

    if (params.cache) {
      storage.setItem('dependencias-autoridades', JSON.stringify(response.data));
    }

    return Promise.resolve(true);
  }).catch((response) => {
    console.error('fetchAllDependenciasAutoridades', response);
    commit('setDependenciasAutoridadesFail');

    return Promise.reject(false);
  });
};

export const fetchDependenciaAutoridad = ({ commit }, id) => {
  commit('setDependenciasAutoridadesRequest');
  return sidjbridge.get(`v1/dependencias-autoridades/${id}`)
    .then((response) => {
      commit('addDependenciaAutoridad', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setDependenciasAutoridadesSuccess');
    })
    .catch((response) => {
      console.error('fetchDependenciaAutoridad', response);
      commit('setDependenciasAutoridadesFail');
    });
};

export const postDependenciaAutoridad = ({ commit }, object) => {
  commit('setDependenciasAutoridadesRequest');
  return sidjbridge.post('v1/dependencias-autoridades/', object)
    .then((response) => {
      commit('addDependenciaAutoridad', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setDependenciasAutoridadesSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postDependenciaAutoridad', response);
      commit('setDependenciaAutoridadFail', object);
    });
};

export const putDependenciaAutoridad = ({ commit }, object) => {
  commit('setDependenciaAutoridadRequest', object);
  return sidjbridge.put(`v1/dependencias-autoridades/${object.id}`, object)
    .then((response) => {
      commit('setDependenciaAutoridad', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putDependenciaAutoridad', response);
      commit('setDependenciaAutoridadFail', object);
    });
};

export const deleteDependenciaAutoridad = ({ commit }, object) => {
  commit('setDependenciaAutoridadRequest', object);
  return sidjbridge.delete(`v1/dependencias-autoridades/${object.id}`, object)
    .then(() => {
      commit('setDependenciaAutoridadDelete', object);
    })
    .catch((response) => {
      console.error('deleteDependenciaAutoridad', response);
      commit('setDependenciaAutoridadFail', object);
    });
};
