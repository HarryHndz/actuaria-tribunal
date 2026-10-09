import sidjbridge from '../../boot/sidjbridge';

export const fetchAllActuarias = ({ state, commit }, params = {}) => {
  commit('setActuariasRequest');
  commit('setActuariasFilters', params);
  return sidjbridge.get('v1/actuarias', state.filters)
    .then((response) => {
      commit('setActuarias', response.data.data);
      commit('setActuariasPagination', response.data.meta.pagination);
      commit('setActuariasSuccess');
    })
    .catch((response) => {
      console.error('fetchAllActuarias', response);
      commit('setActuariasFail');
    });
};

export const fetchActuaria = ({ commit }, id) => {
  commit('setActuariasRequest');
  return sidjbridge.get('v1/actuarias', id)
    .then((response) => {
      commit('addActuaria', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setActuariasSuccess');
    })
    .catch((response) => {
      console.error('fetchActuaria', response);
      commit('setActuariasFail');
    });
};

export const postActuaria = ({ commit }, object) => {
  commit('setActuariasRequest');
  return sidjbridge.post('v1/actuarias', object)
    .then((response) => {
      commit('addActuaria', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setActuariasSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postActuaria', response);
      commit('setActuariaFail', object);
    });
};

export const putActuaria = ({ commit }, object) => {
  commit('setActuariaRequest', object);
  return sidjbridge.put(`v1/actuarias/${object.id}`, object)
    .then((response) => {
      commit('setActuaria', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putActuaria', response);
      commit('setActuariaFail', object);
    });
};

export const deleteActuaria = ({ commit }, object) => {
  commit('setActuariaRequest', object);
  return sidjbridge.delete(`v1/actuarias/${object.id}`, object)
    .then(() => {
      commit('setActuaria', object);
    })
    .catch((response) => {
      console.error('deleteActuaria', response);
      commit('setActuariaFail', object);
    });
};
