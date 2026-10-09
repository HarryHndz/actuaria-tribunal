import sidjbridge from '../../boot/sidjbridge';

export const fetchAllEstadosProcesalesRa = ({ state, commit }, params = {}) => {
  commit('setEstadosProcesalesRaRequest');
  commit('setEstadosProcesalesRaFilters', params);
  return sidjbridge.get('/v1/catalogos/estados-procesales-ra', state.filters)
    .then((response) => {
      commit('setEstadosProcesalesRa', response.data.data);
      commit('setEstadosProcesalesRaPagination', response.data.meta.pagination);
      commit('setEstadosProcesalesRaSuccess');
    })
    .catch((response) => {
      console.error('fetchAllEstadosProcesalesRa', response);
      commit('setEstadosProcesalesRaFail');
    });
};

export const fetchEstadoProcesalRa = ({ commit }, id) => {
  commit('setEstadosProcesalesRaRequest');
  return sidjbridge.get('/v1/catalogos/estados-procesales-ra', id)
    .then((response) => {
      commit('addEstadoProcesalRa', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setEstadosProcesalesRaSuccess');
    })
    .catch((response) => {
      console.error('fetchEstadoProcesalRa', response);
      commit('setEstadosProcesalesRaFail');
    });
};

export const postEstadoProcesalRa = ({ commit }, object) => {
  commit('setEstadosProcesalesRaRequest');
  return sidjbridge.post('/v1/catalogos/estados-procesales-ra', object)
    .then((response) => {
      commit('addEstadoProcesalRa', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setEstadosProcesalesRaSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postEstadoProcesalRa', response);
      commit('setEstadoProcesalRaFail', object);
    });
};

export const putEstadoProcesalRa = ({ commit }, object) => {
  commit('setEstadoProcesalRaRequest', object);
  return sidjbridge.put(`/v1/catalogos/estados-procesales-ra/${object.id}`, object)
    .then((response) => {
      commit('setEstadoProcesalRa', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putEstadoProcesalRa', response);
      commit('setEstadoProcesalRaFail', object);
    });
};

export const deleteEstadoProcesalRa = ({ commit }, object) => {
  commit('setEstadoProcesalRaRequest', object);
  return sidjbridge.delete(`/v1/catalogos/estados-procesales-ra/${object.id}`, object)
    .then(() => {
      commit('setEstadoProcesalRa', object);
    })
    .catch((response) => {
      console.error('deleteEstadoProcesalRa', response);
      commit('setEstadoProcesalRaFail', object);
    });
};
