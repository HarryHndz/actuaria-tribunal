import sidjbridge from '../../boot/sidjbridge';

export const fetchAllTiposAmparos = ({ state, commit }, params = {}) => {
  commit('setTiposAmparosRequest');
  commit('setTiposAmparosFilters', params);
  return sidjbridge.get('v1/catalogos/tipos/amparos', state.filters)
    .then((response) => {
      commit('setTiposAmparos', response.data.data);
      commit('setTiposAmparosPagination', response.data.meta.pagination);
      commit('setTiposAmparosSuccess');
    })
    .catch((response) => {
      console.error('fetchAllTiposAmparos', response);
      commit('setTiposAmparosFail');
    });
};

export const fetchTipoAmparo = ({ commit }, id) => {
  commit('setTiposAmparosRequest');
  return sidjbridge.get('v1/catalogos/tipos/amparos', id)
    .then((response) => {
      commit('addTipoAmparo', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposAmparosSuccess');
    })
    .catch((response) => {
      console.error('fetchTipoAmparo', response);
      commit('setTiposAmparosFail');
    });
};

export const postTipoAmparo = ({ commit }, object) => {
  commit('setTiposAmparosRequest');
  return sidjbridge.post('v1/catalogos/tipos/amparos', object)
    .then((response) => {
      commit('addTipoAmparo', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposAmparosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postTipoAmparo', response);
      commit('setTipoAmparoFail', object);
    });
};

export const putTipoAmparo = ({ commit }, object) => {
  commit('setTipoAmparoRequest', object);
  return sidjbridge.put(`v1/catalogos/tipos/amparos/${object.id}`, object)
    .then((response) => {
      commit('setTipoAmparo', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putTipoAmparo', response);
      commit('setTipoAmparoFail', object);
    });
};

export const deleteTipoAmparo = ({ commit }, object) => {
  commit('setTipoAmparoRequest', object);
  return sidjbridge.delete(`v1/catalogos/tipos/amparos/${object.id}`, object)
    .then(() => {
      commit('setTipoAmparo', object);
    })
    .catch((response) => {
      console.error('deleteTipoAmparo', response);
      commit('setTipoAmparoFail', object);
    });
};
