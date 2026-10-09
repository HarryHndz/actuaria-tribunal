import sidjbridge from '../../boot/sidjbridge';

export const fetchAllTiposContribuciones = ({ state, commit }, params = {}) => {
  commit('setTiposContribucionesRequest');
  commit('setTiposContribucionesFilters', params);
  return sidjbridge.get('v1/catalogos/tipos/contribuciones', state.filters)
    .then((response) => {
      commit('setTiposContribuciones', response.data.data);
      commit('setTiposContribucionesPagination', response.data.meta.pagination);
      commit('setTiposContribucionesSuccess');
    })
    .catch((response) => {
      console.error('fetchAllTiposContribuciones', response);
      commit('setTiposContribucionesFail');
    });
};

export const fetchTipoContribucion = ({ commit }, id) => {
  commit('setTiposContribucionesRequest');
  return sidjbridge.get('v1/catalogos/tipos/contribuciones', id)
    .then((response) => {
      commit('addTipoContribucion', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposContribucionesSuccess');
    })
    .catch((response) => {
      console.error('fetchTipoContribucion', response);
      commit('setTiposContribucionesFail');
    });
};

export const postTipoContribucion = ({ commit }, object) => {
  commit('setTiposContribucionesRequest');
  return sidjbridge.post('v1/catalogos/tipos/contribuciones', object)
    .then((response) => {
      commit('addTipoContribucion', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposContribucionesSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postTipoContribucion', response);
      commit('setTipoContribucionFail', object);
    });
};

export const putTipoContribucion = ({ commit }, object) => {
  commit('setTipoContribucionRequest', object);
  return sidjbridge.put(`v1/catalogos/tipos/contribuciones/${object.id}`, object)
    .then((response) => {
      commit('setTipoContribucion', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putTipoContribucion', response);
      commit('setTipoContribucionFail', object);
    });
};

export const deleteTipoContribucion = ({ commit }, object) => {
  commit('setTipoContribucionRequest', object);
  return sidjbridge.delete(`v1/catalogos/tipos/contribuciones/${object.id}`, object)
    .then(() => {
      commit('setTipoContribucion', object);
    })
    .catch((response) => {
      console.error('deleteTipoContribucion', response);
      commit('setTipoContribucionFail', object);
    });
};
