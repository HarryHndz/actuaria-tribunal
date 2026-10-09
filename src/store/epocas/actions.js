import sidjbridge from '../../boot/sidjbridge';

export const fetchAllEpocas = ({ state, commit }, params = {}) => {
  commit('setEpocasRequest');
  commit('setEpocasFilters', params);
  return sidjbridge.get('/v1/catalogos/epocas', state.filters)
    .then((response) => {
      commit('setEpocas', response.data.data);
      commit('setEpocasPagination', response.data.meta.pagination);
      commit('setEpocasSuccess');
    })
    .catch((response) => {
      console.error('fetchAllEpocas', response);
      commit('setEpocasFail');
    });
};

export const fetchEpoca = ({ commit }, id) => {
  commit('setEpocasRequest');
  return sidjbridge.get('/v1/catalogos/epocas', id)
    .then((response) => {
      commit('addEpoca', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setEpocasSuccess');
    })
    .catch((response) => {
      console.error('fetchEpoca', response);
      commit('setEpocasFail');
    });
};

export const postEpoca = ({ commit }, object) => {
  commit('setEpocasRequest');
  return sidjbridge.post('/v1/catalogos/epocas', object)
    .then((response) => {
      commit('addEpoca', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setEpocasSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postEpoca', response);
      commit('setEpocaFail', object);
    });
};

export const putEpoca = ({ commit }, object) => {
  commit('setEpocaRequest', object);
  return sidjbridge.put(`/v1/catalogos/epocas/${object.id}`, object)
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
  return sidjbridge.delete(`/v1/catalogos/epocas/${object.id}`, object)
    .then(() => {
      commit('setEpoca', object);
    })
    .catch((response) => {
      console.error('deleteEpoca', response);
      commit('setEpocaFail', object);
    });
};
