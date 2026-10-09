import sidjbridge from '../../boot/sidjbridge';

export const fetchAllTiposSalas = ({ state, commit }, params = {}) => {
  commit('setTiposSalasRequest');
  commit('setTiposSalasFilters', params);
  return sidjbridge.get('v1/catalogos/tipos/salas', state.filters)
    .then((response) => {
      commit('setTiposSalas', response.data.data);
      commit('setTiposSalasPagination', response.data.meta.pagination);
      commit('setTiposSalasSuccess');
    })
    .catch((response) => {
      console.error('fetchAllTiposSalas', response);
      commit('setTiposSalasFail');
    });
};

export const fetchTipoSala = ({ commit }, id) => {
  commit('setTiposSalasRequest');
  return sidjbridge.get('v1/catalogos/tipos/salas', id)
    .then((response) => {
      commit('addTipoSala', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposSalasSuccess');
    })
    .catch((response) => {
      console.error('fetchTipoSala', response);
      commit('setTiposSalasFail');
    });
};

export const postTipoSala = ({ commit }, object) => {
  commit('setTiposSalasRequest');
  return sidjbridge.post('v1/catalogos/tipos/salas', object)
    .then((response) => {
      commit('addTipoSala', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposSalasSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postTipoSala', response);
      commit('setTipoSalaFail', object);
    });
};

export const putTipoSala = ({ commit }, object) => {
  commit('setTipoSalaRequest', object);
  return sidjbridge.put(`v1/catalogos/tipos/salas/${object.id}`, object)
    .then((response) => {
      commit('setTipoSala', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putTipoSala', response);
      commit('setTipoSalaFail', object);
    });
};

export const deleteTipoSala = ({ commit }, object) => {
  commit('setTipoSalaRequest', object);
  return sidjbridge.delete(`v1/catalogos/tipos/salas/${object.id}`, object)
    .then(() => {
      commit('setTipoSala', object);
    })
    .catch((response) => {
      console.error('deleteTipoSala', response);
      commit('setTipoSalaFail', object);
    });
};
