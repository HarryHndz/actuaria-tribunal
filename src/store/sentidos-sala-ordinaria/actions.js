import sidjbridge from '../../boot/sidjbridge';

export const fetchAllSentidosSalaOrdinaria = ({ state, commit }, params = {}) => {
  commit('setSentidosSalaOrdinariaRequest');
  commit('setSentidosSalaOrdinariaFilters', params);
  return sidjbridge.get('v1/catalogos/sentidos/sala-ordinaria', state.filters)
    .then((response) => {
      commit('setSentidosSalaOrdinaria', response.data.data);
      commit('setSentidosSalaOrdinariaPagination', response.data.meta.pagination);
      commit('setSentidosSalaOrdinariaSuccess');
    })
    .catch((response) => {
      console.error('fetchAllSentidosSalaOrdinaria', response);
      commit('setSentidosSalaOrdinariaFail');
    });
};

export const fetchSentidoSalaOrdinaria = ({ commit }, id) => {
  commit('setSentidosSalaOrdinariaRequest');
  return sidjbridge.get('v1/catalogos/sentidos/sala-ordinaria', id)
    .then((response) => {
      commit('addSentidoSalaOrdinaria', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setSentidosSalaOrdinariaSuccess');
    })
    .catch((response) => {
      console.error('fetchSentidoSalaOrdinaria', response);
      commit('setSentidosSalaOrdinariaFail');
    });
};

export const postSentidoSalaOrdinaria = ({ commit }, object) => {
  commit('setSentidosSalaOrdinariaRequest');
  return sidjbridge.post('v1/catalogos/sentidos/sala-ordinaria', object)
    .then((response) => {
      commit('addSentidoSalaOrdinaria', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setSentidosSalaOrdinariaSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postSentidoSalaOrdinaria', response);
      commit('setSentidoSalaOrdinariaFail', object);
    });
};

export const putSentidoSalaOrdinaria = ({ commit }, object) => {
  commit('setSentidoSalaOrdinariaRequest', object);
  return sidjbridge.put(`v1/catalogos/sentidos/sala-ordinaria/${object.id}`, object)
    .then((response) => {
      commit('setSentidoSalaOrdinaria', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putSentidoSalaOrdinaria', response);
      commit('setSentidoSalaOrdinariaFail', object);
    });
};

export const deleteSentidoSalaOrdinaria = ({ commit }, object) => {
  commit('setSentidoSalaOrdinariaRequest', object);
  return sidjbridge.delete(`v1/catalogos/sentidos/sala-ordinaria/${object.id}`, object)
    .then(() => {
      commit('setSentidoSalaOrdinaria', object);
    })
    .catch((response) => {
      console.error('deleteSentidoSalaOrdinaria', response);
      commit('setSentidoSalaOrdinariaFail', object);
    });
};
