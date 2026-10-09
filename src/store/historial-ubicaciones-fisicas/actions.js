import sidjbridge from '../../boot/sidjbridge';

export const fetchAllHistorialUbicacionesFisicas = ({ state, commit }, params = {}) => {
  commit('setHistorialUbicacionesFisicasRequest');
  commit('setHistorialUbicacionesFisicasFilters', params);
  return sidjbridge.get('v1/historial-ubicacion-fisica', state.filters)
    .then((response) => {
      commit('setHistorialUbicacionesFisicas', response.data.data);
      commit('setHistorialUbicacionesFisicasPagination', response.data.meta.pagination);
      commit('setHistorialUbicacionesFisicasSuccess');
    })
    .catch((response) => {
      console.error('fetchAllHistorialUbicacionesFisicas', response);
      commit('setHistorialUbicacionesFisicasFail');
    });
};

export const fetchHistorialUbucacionFisica = ({ commit }, id) => {
  commit('setHistorialUbicacionesFisicasRequest');
  return sidjbridge.get('v1/historial-ubicacion-fisica', id)
    .then((response) => {
      commit('addHistorialUbucacionFisica', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setHistorialUbicacionesFisicasSuccess');
    })
    .catch((response) => {
      console.error('fetchHistorialUbucacionFisica', response);
      commit('setHistorialUbicacionesFisicasFail');
    });
};

export const postHistorialUbucacionFisica = ({ commit }, object) => {
  commit('setHistorialUbicacionesFisicasRequest');
  return sidjbridge.get('v1/historial-ubicacion-fisica', object)
    .then((response) => {
      commit('addHistorialUbucacionFisica', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setHistorialUbicacionesFisicasSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postHistorialUbucacionFisica', response);
      commit('setHistorialUbucacionFisicaFail', object);
    });
};

export const putHistorialUbucacionFisica = ({ commit }, object) => {
  commit('setHistorialUbucacionFisicaRequest', object);
  return sidjbridge.put(`v1/historial-ubicacion-fisica/${object.id}`, object)
    .then((response) => {
      commit('setHistorialUbucacionFisica', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putHistorialUbucacionFisica', response);
      commit('setHistorialUbucacionFisicaFail', object);
    });
};

export const deleteHistorialUbucacionFisica = ({ commit }, object) => {
  commit('setHistorialUbucacionFisicaRequest', object);
  return sidjbridge.delete(`v1/historial-ubicacion-fisica/${object.id}`, object)
    .then(() => {
      commit('setHistorialUbucacionFisica', object);
    })
    .catch((response) => {
      console.error('deleteHistorialUbucacionFisica', response);
      commit('setHistorialUbucacionFisicaFail', object);
    });
};
