import sidjbridge from '../../boot/sidjbridge';

export const fetchAllHistorialAudiencias = ({ state, commit }, params = {}) => {
  commit('setHistorialAudienciasRequest');
  commit('setHistorialAudienciasFilters', params);
  return sidjbridge.get('v1/expedientes', state.filters)
    .then((response) => {
      commit('setHistorialAudiencias', response.data.data);
      commit('setHistorialAudienciasPagination', response.data.meta.pagination);
      commit('setHistorialAudienciasSuccess');
    })
    .catch((response) => {
      console.error('fetchAllHistorialAudiencias', response);
      commit('setHistorialAudienciasFail');
    });
};

export const fetchHistorialAudiencia = ({ commit }, id) => {
  commit('setHistorialAudienciasRequest');
  return sidjbridge.get('v1/expedientes', id)
    .then((response) => {
      commit('addHistorialAudiencia', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setHistorialAudienciasSuccess');
    })
    .catch((response) => {
      console.error('fetchHistorialAudiencia', response);
      commit('setHistorialAudienciasFail');
    });
};

export const postHistorialAudiencia = ({ commit }, object) => {
  commit('setHistorialAudienciasRequest');
  return sidjbridge.post('v1/expedientes', object)
    .then((response) => {
      commit('addHistorialAudiencia', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setHistorialAudienciasSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postHistorialAudiencia', response);
      commit('setHistorialAudienciaFail', object);
    });
};

export const putHistorialAudiencia = ({ commit }, object) => {
  commit('setHistorialAudienciaRequest', object);
  return sidjbridge.put(`v1/expedientes/${object.id}`, object)
    .then((response) => {
      commit('setHistorialAudiencia', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putHistorialAudiencia', response);
      commit('setHistorialAudienciaFail', object);
    });
};

export const deleteHistorialAudiencia = ({ commit }, object) => {
  commit('setHistorialAudienciaRequest', object);
  return sidjbridge.delete(`v1/expedientes/${object.id}`, object)
    .then(() => {
      commit('setHistorialAudiencia', object);
    })
    .catch((response) => {
      console.error('deleteHistorialAudiencia', response);
      commit('setHistorialAudienciaFail', object);
    });
};
