import sidjbridge from '../../boot/sidjbridge';

export const fetchAllRoles = ({ state, commit }, params = {}) => {
  commit('setRolesRequest');
  commit('setRolesFilters', params);
  return sidjbridge.get('v1/roles', state.filters)
    .then((response) => {
      commit('setRoles', response.data.data);
      commit('setRolesPagination', response.data.meta.pagination);
      commit('setRolesSuccess');
    })
    .catch((response) => {
      console.error('fetchAllRoles', response);
      commit('setRolesFail');
    });
};

export const fetchRol = ({ commit }, id) => {
  commit('setRolesRequest');
  return sidjbridge.get('v1/roles', id)
    .then((response) => {
      commit('addRol', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setRolesSuccess');
    })
    .catch((response) => {
      console.error('fetchRol', response);
      commit('setRolesFail');
    });
};

export const postRol = ({ commit }, object) => {
  commit('setRolesRequest');
  return sidjbridge.post('v1/roles', object)
    .then((response) => {
      commit('addRol', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setRolesSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postRol', response);
      commit('setRolFail', object);
    });
};

export const putRol = ({ commit }, object) => {
  commit('setRolRequest', object);
  return sidjbridge.put(`v1/roles/${object.id}`, object)
    .then((response) => {
      commit('setRol', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putRol', response);
      commit('setRolFail', object);
    });
};

export const deleteRol = ({ commit }, object) => {
  commit('setRolRequest', object);
  return sidjbridge.delete(`v1/roles/${object.id}`, object)
    .then(() => {
      commit('setRol', object);
    })
    .catch((response) => {
      console.error('deleteRol', response);
      commit('setRolFail', object);
    });
};
