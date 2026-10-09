import sidjbridge from '../../boot/sidjbridge';

export const fetchAllResolucionesReclamacion = ({ state, commit }, params = {}) => {
  commit('setResolucionesReclamacionRequest');
  commit('setResolucionesReclamacionFilters', params);
  return sidjbridge.get('/v1/catalogos/resoluciones/recursos-de-apelacion', state.filters)
    .then((response) => {
      commit('setResolucionesReclamacion', response.data.data);
      commit('setResolucionesReclamacionPagination', response.data.meta.pagination);
      commit('setResolucionesReclamacionSuccess');
    })
    .catch((response) => {
      console.error('fetchAllResolucionesReclamacion', response);
      commit('setResolucionesReclamacionFail');
    });
};

export const fetchResolucionReclamacion = ({ commit }, id) => {
  commit('setResolucionesReclamacionRequest');
  return sidjbridge.get('/v1/catalogos/resoluciones/recursos-de-apelacion', id)
    .then((response) => {
      commit('addResolucionReclamacion', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setResolucionesReclamacionSuccess');
    })
    .catch((response) => {
      console.error('fetchResolucionReclamacion', response);
      commit('setResolucionesReclamacionFail');
    });
};

export const postResolucionReclamacion = ({ commit }, object) => {
  commit('setResolucionesReclamacionRequest');
  return sidjbridge.post('/v1/catalogos/resoluciones/recursos-de-apelacion', object)
    .then((response) => {
      commit('addResolucionReclamacion', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setResolucionesReclamacionSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postResolucionReclamacion', response);
      commit('setResolucionReclamacionFail', object);
    });
};

export const putResolucionReclamacion = ({ commit }, object) => {
  commit('setResolucionReclamacionRequest', object);
  return sidjbridge.put(`/v1/catalogos/resoluciones/recursos-de-apelacion/${object.id}`, object)
    .then((response) => {
      commit('setResolucionReclamacion', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putResolucionReclamacion', response);
      commit('setResolucionReclamacionFail', object);
    });
};

export const deleteResolucionReclamacion = ({ commit }, object) => {
  commit('setResolucionReclamacionRequest', object);
  return sidjbridge.delete(`/v1/catalogos/resoluciones/recursos-de-apelacion/${object.id}`, object)
    .then(() => {
      commit('setResolucionReclamacion', object);
    })
    .catch((response) => {
      console.error('deleteResolucionReclamacion', response);
      commit('setResolucionReclamacionFail', object);
    });
};
