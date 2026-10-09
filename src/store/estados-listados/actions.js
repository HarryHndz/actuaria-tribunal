import sidjbridge from '../../boot/sidjbridge';

export const fetchAllEstadosListados = ({ state, commit }, params = {}) => {
  commit('setEstadosListadosRequest');
  commit('setEstadosListadosFilters', params);
  return sidjbridge.get('/v1/catalogos/estados-listados', state.filters)
    .then((response) => {
      commit('setEstadosListados', response.data.data);
      commit('setEstadosListadosPagination', response.data.meta.pagination);
      commit('setEstadosListadosSuccess');
    })
    .catch((response) => {
      console.error('fetchAllEstadosListados', response);
      commit('setEstadosListadosFail');
    });
};

export const fetchEpoca = ({ commit }, id) => {
  commit('setEstadosListadosRequest');
  return sidjbridge.get('/v1/catalogos/estados-listados', id)
    .then((response) => {
      commit('addEpoca', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setEstadosListadosSuccess');
    })
    .catch((response) => {
      console.error('fetchEpoca', response);
      commit('setEstadosListadosFail');
    });
};

export const postEpoca = ({ commit }, object) => {
  commit('setEstadosListadosRequest');
  return sidjbridge.post('/v1/catalogos/estados-listados', object)
    .then((response) => {
      commit('addEpoca', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setEstadosListadosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postEpoca', response);
      commit('setEpocaFail', object);
    });
};

export const putEpoca = ({ commit }, object) => {
  commit('setEpocaRequest', object);
  return sidjbridge.put(`/v1/catalogos/estados-listados/${object.id}`, object)
    .then((response) => {
      commit('setEpoca', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putEpoca', response);
      commit('setEpocaFail', object);
    });
};

export const deleteEpoca = ({ commit }, object) => {
  commit('setEpocaRequest', object);
  return sidjbridge.delete(`/v1/catalogos/estados-listados/${object.id}`, object)
    .then(() => {
      commit('setEpoca', object);
    })
    .catch((response) => {
      console.error('deleteEpoca', response);
      commit('setEpocaFail', object);
    });
};
