import sidjbridge from '../../boot/sidjbridge';

export const fetchAllPlantillas = ({ state, commit }, params = {}) => {
  commit('setPlantillasRequest');
  commit('setPlantillasFilters', params);
  return sidjbridge.get('v1/plantillasV2', {
    params: state.filters,
  })
    .then((response) => {
      commit('setPlantillas', response.data.data);
      commit('setPlantillasPagination', response.data.meta.pagination);
      commit('setPlantillasSuccess');
      return Promise.resolve(response.data.data);
    })
    .catch((response) => {
      console.error('fetchAllPlantillas', response);
      commit('setPlantillasFail');
      return Promise.reject(response);
    });
};

export const fetchPlantillas = ({ commit }, id) => {
  commit('setPlantillasRequest');
  return sidjbridge.get(`v1/plantillasV2/${id.uuid}`)
    .then((response) => {
      commit('addPlantillas', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setPlantillasSuccess');
    })
    .catch((response) => {
      console.error('fetchPlantillas', response);
      commit('setPlantillasFail');
    });
};

export const postPlantillas = ({ commit }, object) => {
  commit('setPlantillasRequest');
  return sidjbridge.post('v1/plantillasV2', object)
    .then((response) => {
      commit('addPlantilla', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setPlantillasSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postPlantillas', response);
      commit('setPlantillasFail', object);
      return Promise.reject(response);
    });
};

export const putPlantillas = ({ commit }, object) => {
  commit('setPlantillasRequest', object);
  return sidjbridge.put(`v1/plantillasV2/${object.id}`, object)
    .then((response) => {
      commit('setPlantilla', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putPlantillas', response);
      commit('setPlantillasFail', object);
      return Promise.reject(response);
    });
};

export const deletePlantillas = ({ commit }, object) => {
  commit('setPlantillasRequest', object);
  return sidjbridge.delete(`v1/plantillasV2/${object.id}`, object)
    .then(() => {
      commit('setPlantillaDelete', object);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('deletePlantillas', response);
      commit('setPlantillasFail', object);
      return Promise.reject(response);
    });
};
