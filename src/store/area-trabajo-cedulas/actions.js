import sidjbridge from '../../boot/sidjbridge';

export const fetchAllAreasTrabajoCedulas = ({ state, commit }, params = {}) => {
  commit('setAreasTrabajoCedulasRequest');
  commit('setAreasTrabajoCedulasFilters', params);
  return sidjbridge.get('v1/areas-trabajos-cedulas', {
    params: state.filters,
  })
    .then((response) => {
      commit('setAreasTrabajoCedulas', response.data.data);
      commit('setAreasTrabajoCedulasPagination', response.data.meta.pagination);
      commit('setAreasTrabajoCedulasSuccess');
      return Promise.resolve(response.data.data);
    })
    .catch((response) => {
      console.error('fetchAllAreasTrabajoCedulas', response);
      commit('setAreasTrabajoCedulasFail');
      return Promise.reject(response);
    });
};

export const fetchAreaTrabajoCedulas = ({ commit }, id) => {
  commit('setAreasTrabajoCedulasRequest');
  return sidjbridge.get('v1/areas-trabajos-cedulas', id)
    .then((response) => {
      commit('addAreaTrabajoCedulas', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setAreasTrabajoCedulasSuccess');
    })
    .catch((response) => {
      console.error('fetchAreaTrabajoCedulas', response);
      commit('setAreasTrabajoCedulasFail');
    });
};

export const postAreaTrabajoCedulas = ({ commit }, object) => {
  commit('setAreasTrabajoCedulasRequest');
  return sidjbridge.post('v1/areas-trabajos-cedulas', object)
    .then((response) => {
      commit('addAreaTrabajoCedulas', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setAreasTrabajoCedulasSuccess');
      return Promise.resolve({
        ...response.data.data,
        fetching: false,
        error: false,
      });
    })
    .catch((response) => {
      console.error('postAreaTrabajoCedulas', response);
      commit('setAreaTrabajoCedulasFail', object);
      return Promise.reject(response);
    });
};

export const postAreaTrabajoCedulasMultiples = ({ commit }, object) => {
  commit('setAreasTrabajoCedulasRequest');
  return sidjbridge.post('v1/areas-trabajos-cedulas/post-multiples', object)
    .then((response) => {
      commit('addAreaTrabajoCedulas', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setAreasTrabajoCedulasSuccess');
      return Promise.resolve({
        ...response.data.data,
        fetching: false,
        error: false,
      });
    })
    .catch((response) => {
      console.error('postAreaTrabajoCedulas', response);
      commit('setAreaTrabajoCedulasFail', object);
      return Promise.reject(response);
    });
};

export const addUpdateCedula = ({ commit }, object) => {
  commit('setAreasTrabajoCedulasRequest');
  return sidjbridge.post('v1/areas-trabajos-cedulas/add-update-cedula', object)
    .then(response => Promise.resolve({
      ...response,
      fetching: false,
      error: false,
    }))
    .catch((response) => {
      console.error('postAreaTrabajoCedulas', response);
      commit('setAreaTrabajoCedulasFail', object);
      return Promise.reject(response);
    });
};

export const putAreaTrabajoCedulas = ({ commit }, object) => {
  commit('setAreaTrabajoCedulasRequest', object);
  return sidjbridge.put(`v1/areas-trabajos-cedulas/${object.id}`, object)
    .then((response) => {
      commit('setAreaTrabajoCedulas', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putAreaTrabajoCedulas', response);
      commit('setAreaTrabajoCedulasFail', object);
      return Promise.reject(response);
    });
};

export const deleteAreaTrabajoCedulas = ({ commit }, object) => {
  commit('setAreaTrabajoCedulasRequest', object);
  return sidjbridge.delete(`v1/areas-trabajos-cedulas/${object.id}`, object)
    .then(() => {
      commit('setAreaTrabajoCedulasDelete', object);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('deleteAreaTrabajoCedulas', response);
      commit('setAreaTrabajoCedulasFail', object);
      return Promise.reject(response);
    });
};

export const setAreaTrabajoReenvio = ({ commit }, area = []) => {
  commit('AreaTrabajoReenvioAdd', area);
};
export const setAreaTrabajoEnviado = ({ commit }, area = []) => {
  commit('AreaTrabajoEnviadoAdd', area);
};
export const resetAreaTrabajoEnviado = ({ commit }) => {
  commit('AreaTrabajoEnviadoReset');
};
export const deleteAreaTrabajoEnviado = ({ commit }, index) => {
  commit('deleteAreaTrabajoEnviado', index);
};
