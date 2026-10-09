import sidjbridge from '../../boot/sidjbridge';

export const fetchAllSentidosRa = ({ state, commit }, params = {}) => {
  commit('setSentidosRaRequest');
  commit('setSentidosRaFilters', params);
  return sidjbridge.get('v1/catalogos/sentidos/recursos-de-apelacion', state.filters)
    .then((response) => {
      commit('setSentidosRa', response.data.data);
      commit('setSentidosRaPagination', response.data.meta.pagination);
      commit('setSentidosRaSuccess');
    })
    .catch((response) => {
      console.error('fetchAllSentidosRa', response);
      commit('setSentidosRaFail');
    });
};

export const fetchSentidoRa = ({ commit }, id) => {
  commit('setSentidosRaRequest');
  return sidjbridge.get('v1/catalogos/sentidos/recursos-de-apelacion', id)
    .then((response) => {
      commit('addSentidoRa', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setSentidosRaSuccess');
    })
    .catch((response) => {
      console.error('fetchSentidoRa', response);
      commit('setSentidosRaFail');
    });
};

export const postSentidoRa = ({ commit }, object) => {
  commit('setSentidosRaRequest');
  return sidjbridge.post('v1/catalogos/sentidos/recursos-de-apelacion', object)
    .then((response) => {
      commit('addSentidoRa', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setSentidosRaSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postSentidoRa', response);
      commit('setSentidoRaFail', object);
    });
};

export const putSentidoRa = ({ commit }, object) => {
  commit('setSentidoRaRequest', object);
  return sidjbridge.put(`v1/catalogos/sentidos/recursos-de-apelacion/${object.id}`, object)
    .then((response) => {
      commit('setSentidoRa', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putSentidoRa', response);
      commit('setSentidoRaFail', object);
    });
};

export const deleteSentidoRa = ({ commit }, object) => {
  commit('setSentidoRaRequest', object);
  return sidjbridge.delete(`v1/catalogos/sentidos/recursos-de-apelacion/${object.id}`, object)
    .then(() => {
      commit('setSentidoRa', object);
    })
    .catch((response) => {
      console.error('deleteSentidoRa', response);
      commit('setSentidoRaFail', object);
    });
};
