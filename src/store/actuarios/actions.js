import sidjbridge from '../../boot/sidjbridge';

export const fetchAllActuarios = ({ state, commit }, params = {}) => {
  commit('setActuariosRequest');
  commit('setActuariosFilters', params);
  return sidjbridge.get('v1/actuarios', {
    params: state.filters,
  })
    .then((response) => {
      commit('setActuarios', response.data.data);
      commit('setActuariosPagination', response.data.meta.pagination);
      commit('setActuariosSuccess');
    })
    .catch((response) => {
      console.error('fetchAllActuarios', response);
      commit('setActuariosFail');
    });
};

export const fetchActuario = ({ commit }, id) => {
  commit('setActuariosRequest');
  return sidjbridge.get('v1/actuarios', id)
    .then((response) => {
      commit('addActuario', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setActuariosSuccess');
    })
    .catch((response) => {
      console.error('fetchActuario', response);
      commit('setActuariosFail');
    });
};

export const postActuario = ({ commit }, object) => {
  commit('setActuariosRequest');
  return sidjbridge.post('v1/actuarios', object)
    .then((response) => {
      commit('addActuario', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setActuariosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postActuario', response);
      commit('setActuarioFail', object);
    });
};

export const putActuario = ({ commit }, object) => {
  commit('setActuarioRequest', object);
  return sidjbridge.put(`v1/actuarios/${object.id}`, object)
    .then((response) => {
      commit('setActuario', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putActuario', response);
      commit('setActuarioFail', object);
    });
};

export const deleteActuario = ({ commit }, object) => {
  commit('setActuarioRequest', object);
  return sidjbridge.delete(`v1/actuarios/${object.id}`, object)
    .then(() => {
      commit('setActuario', object);
    })
    .catch((response) => {
      console.error('deleteActuario', response);
      commit('setActuarioFail', object);
    });
};
