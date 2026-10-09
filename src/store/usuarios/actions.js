import sidjbridge from '../../boot/sidjbridge';

export const fetchAllUsuarios = ({ state, commit }, params = {}) => {
  commit('setUsuariosRequest');
  commit('setUsuariosFilters', params);
  return sidjbridge.get('v1/usuarios', {
    params: state.filters,
  })
    .then((response) => {
      commit('setUsuarios', response.data.data);
      commit('setUsuariosPagination', response.data.meta.pagination);
      commit('setUsuariosSuccess');
    })
    .catch((response) => {
      console.error('fetchAllUsuarios', response);
      commit('setUsuariosFail');
    });
};

export const fetchUsuario = ({ commit }, id) => {
  commit('setUsuariosRequest');
  return sidjbridge.get('v1/usuarios', id)
    .then((response) => {
      commit('addUsuario', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setUsuariosSuccess');
    })
    .catch((response) => {
      console.error('fetchUsuario', response);
      commit('setUsuariosFail');
    });
};

export const postUsuario = ({ commit }, object) => {
  commit('setUsuariosRequest');
  return sidjbridge.post('v1/usuarios', object)
    .then((response) => {
      commit('addUsuario', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setUsuariosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postUsuario', response);
      commit('setUsuarioFail', object);
    });
};

export const putUsuario = ({ commit }, object) => {
  commit('setUsuarioRequest', object);
  return sidjbridge.put(`v1/usuarios/${object.id}`, object)
    .then((response) => {
      commit('setUsuario', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putUsuario', response);
      commit('setUsuarioFail', object);
    });
};

export const deleteUsuario = ({ commit }, object) => {
  commit('setUsuarioRequest', object);
  return sidjbridge.delete(`v1/usuarios/${object.id}`, object)
    .then(() => {
      commit('setUsuario', object);
    })
    .catch((response) => {
      console.error('deleteUsuario', response);
      commit('setUsuarioFail', object);
    });
};
