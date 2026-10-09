import sidjbridge from '../../boot/sidjbridge';

export const fetchAllSalas = ({ state, commit }, params = {}) => {
  commit('setSalasRequest');
  commit('setSalasFilters', params);
  return sidjbridge.get('v1/salas', {
    params: state.filters,
  })
    .then((response) => {
      commit('setSalas', response.data.data);
      commit('setSalasPagination', response.data.meta.pagination);
      commit('setSalasSuccess');
    })
    .catch((response) => {
      console.error('fetchAllSalas', response);
      commit('setSalasFail');
    });
};

export const fetchPonencia = ({ commit }, id) => {
  commit('setSalasRequest');
  return sidjbridge.get('v1/salas', id)
    .then((response) => {
      commit('addPonencia', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setSalasSuccess');
    })
    .catch((response) => {
      console.error('fetchPonencia', response);
      commit('setSalasFail');
    });
};

export const postPonencia = ({ commit }, object) => {
  commit('setSalasRequest');
  return sidjbridge.post('v1/salas', object)
    .then((response) => {
      commit('addPonencia', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setSalasSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postPonencia', response);
      commit('setPonenciaFail', object);
    });
};

export const putPonencia = ({ commit }, object) => {
  commit('setPonenciaRequest', object);
  return sidjbridge.put(`v1/salas/${object.id}`, object)
    .then((response) => {
      commit('setPonencia', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putPonencia', response);
      commit('setPonenciaFail', object);
    });
};

export const deletePonencia = ({ commit }, object) => {
  commit('setPonenciaRequest', object);
  return sidjbridge.delete(`v1/salas/${object.id}`, object)
    .then(() => {
      commit('setPonencia', object);
    })
    .catch((response) => {
      console.error('deletePonencia', response);
      commit('setPonenciaFail', object);
    });
};
