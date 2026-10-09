import sidjbridge from '../../boot/sidjbridge';

export const fetchAllSentidosRca = ({ state, commit }, params = {}) => {
  commit('setSentidosRcaRequest');
  commit('setSentidosRcaFilters', params);
  return sidjbridge.get('v1/catalogos/sentidos/recursos-rca', state.filters)
    .then((response) => {
      commit('setSentidosRca', response.data.data);
      commit('setSentidosRcaPagination', response.data.meta.pagination);
      commit('setSentidosRcaSuccess');
    })
    .catch((response) => {
      console.error('fetchAllSentidosRca', response);
      commit('setSentidosRcaFail');
    });
};

export const fetchSentidoRca = ({ commit }, id) => {
  commit('setSentidosRcaRequest');
  return sidjbridge.get('v1/catalogos/sentidos/recursos-rca', id)
    .then((response) => {
      commit('addSentidoRca', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setSentidosRcaSuccess');
    })
    .catch((response) => {
      console.error('fetchSentidoRca', response);
      commit('setSentidosRcaFail');
    });
};

export const postSentidoRca = ({ commit }, object) => {
  commit('setSentidosRcaRequest');
  return sidjbridge.post('v1/catalogos/sentidos/recursos-rca', object)
    .then((response) => {
      commit('addSentidoRca', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setSentidosRcaSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postSentidoRca', response);
      commit('setSentidoRcaFail', object);
    });
};

export const putSentidoRca = ({ commit }, object) => {
  commit('setSentidoRcaRequest', object);
  return sidjbridge.put(`v1/catalogos/sentidos/recursos-rca/${object.id}`, object)
    .then((response) => {
      commit('setSentidoRca', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putSentidoRca', response);
      commit('setSentidoRcaFail', object);
    });
};

export const deleteSentidoRca = ({ commit }, object) => {
  commit('setSentidoRcaRequest', object);
  return sidjbridge.delete(`v1/catalogos/sentidos/recursos-rca/${object.id}`, object)
    .then(() => {
      commit('setSentidoRca', object);
    })
    .catch((response) => {
      console.error('deleteSentidoRca', response);
      commit('setSentidoRcaFail', object);
    });
};
