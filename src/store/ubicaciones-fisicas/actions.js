import sidjbridge from '../../boot/sidjbridge';

export const fetchAllUbicacionesFisicas = ({ state, commit }, params = {}) => {
  commit('setUbicacionesFisicasRequest');
  commit('setUbicacionesFisicasFilters', params);
  return sidjbridge.get('v1/ubicacion-fisica', {
    params: state.filters,
  })
    .then((response) => {
      commit('setUbicacionesFisicas', response.data.data);
      commit('setUbicacionesFisicasPagination', response.data.meta.pagination);
      commit('setUbicacionesFisicasSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchAllUbicacionesFisicas', response);
      commit('setUbicacionesFisicasFail');
    });
};

export const fetchUbicacionFisica = ({ commit }, id) => {
  commit('setUbicacionesFisicasRequest');
  return sidjbridge.get('v1/ubicacion-fisica', id)
    .then((response) => {
      commit('addUbicacionFisica', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setUbicacionesFisicasSuccess');
    })
    .catch((response) => {
      console.error('fetchUbicacionFisica', response);
      commit('setUbicacionesFisicasFail');
    });
};

export const postUbicacionFisica = ({ commit }, object) => {
  commit('setUbicacionesFisicasRequest');
  return sidjbridge.post('v1/ubicacion-fisica', object)
    .then((response) => {
      commit('addUbicacionFisica', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setUbicacionesFisicasSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postUbicacionFisica', response);
      commit('setUbicacionFisicaFail', object);
    });
};

export const putUbicacionFisica = ({ commit }, object) => {
  commit('setUbicacionFisicaRequest', object);
  return sidjbridge.put(`v1/ubicacion-fisica/${object.id}`, object)
    .then((response) => {
      commit('setUbicacionFisica', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putUbicacionFisica', response);
      commit('setUbicacionFisicaFail', object);
    });
};

export const deleteUbicacionFisica = ({ commit }, object) => {
  commit('setUbicacionFisicaRequest', object);
  return sidjbridge.delete(`v1/ubicacion-fisica/${object.id}`, object)
    .then(() => {
      commit('setUbicacionFisica', object);
    })
    .catch((response) => {
      console.error('deleteUbicacionFisica', response);
      commit('setUbicacionFisicaFail', object);
    });
};
