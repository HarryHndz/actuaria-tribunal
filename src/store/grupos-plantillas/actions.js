import sidjbridge from '../../boot/sidjbridge';

export const fetchAllGruposPlantillas = ({ state, commit }, params = {}) => {
  commit('setGruposPlantillasRequest');
  commit('setGruposPlantillasFilters', params);
  return sidjbridge.get('v1/grupos-plantillas', {
    params: state.filters,
  })
    .then((response) => {
      commit('setGruposPlantillas', response.data.data);
      commit('setGruposPlantillasPagination', response.data.meta.pagination);
      commit('setGruposPlantillasSuccess');
      return Promise.resolve(response.data.data);
    })
    .catch((response) => {
      console.error('fetchAllGruposPlantillas', response);
      commit('setGruposPlantillasFail');
      return Promise.reject(response);
    });
};

export const fetchGrupoPlantillas = ({ commit }, id) => {
  commit('setGruposPlantillasRequest');
  return sidjbridge.get(`v1/grupos-plantillas/${id.uuid}`)
    .then((response) => {
      commit('addGrupoPlantillas', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setGruposPlantillasSuccess');
    })
    .catch((response) => {
      console.error('fetchGrupoPlantillas', response);
      commit('setGruposPlantillasFail');
    });
};

export const postGrupoPlantillas = ({ commit }, object) => {
  commit('setGruposPlantillasRequest');
  return sidjbridge.post('v1/grupos-plantillas', object)
    .then((response) => {
      commit('addGrupoPlantillas', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setGruposPlantillasSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postGrupoPlantillas', response);
      commit('setGrupoPlantillasFail', object);
      return Promise.reject(response);
    });
};

export const putGrupoPlantillas = ({ commit }, object) => {
  commit('setGrupoPlantillasRequest', object);
  return sidjbridge.put(`v1/grupos-plantillas/${object.id}`, object)
    .then((response) => {
      commit('setGrupoPlantillas', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putGrupoPlantillas', response);
      commit('setGrupoPlantillasFail', object);
      return Promise.reject(response);
    });
};

export const deleteGrupoPlantillas = ({ commit }, object) => {
  commit('setGrupoPlantillasRequest', object);
  return sidjbridge.delete(`v1/grupos-plantillas/${object.id}`, object)
    .then(() => {
      commit('setGrupoPlantillasDelete', object);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('deleteGrupoPlantillas', response);
      commit('setGrupoPlantillasFail', object);
      return Promise.reject(response);
    });
};
