import sidjbridge from '../../boot/sidjbridge';

export const fetchAllResolucionesApelacion = ({ state, commit }, params = {}) => {
  commit('setResolucionesApelacionRequest');
  commit('setResolucionesApelacionFilters', params);
  return sidjbridge.get('/v1/catalogos/resoluciones/recursos-de-apelacion', state.filters)
    .then((response) => {
      commit('setResolucionesApelacion', response.data.data);
      commit('setResolucionesApelacionPagination', response.data.meta.pagination);
      commit('setResolucionesApelacionSuccess');
    })
    .catch((response) => {
      console.error('fetchAllResolucionesApelacion', response);
      commit('setResolucionesApelacionFail');
    });
};

export const fetchResolucionApelacion = ({ commit }, id) => {
  commit('setResolucionesApelacionRequest');
  return sidjbridge.get('/v1/catalogos/resoluciones/recursos-de-apelacion', id)
    .then((response) => {
      commit('addResolucionApelacion', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setResolucionesApelacionSuccess');
    })
    .catch((response) => {
      console.error('fetchResolucionApelacion', response);
      commit('setResolucionesApelacionFail');
    });
};

export const postResolucionApelacion = ({ commit }, object) => {
  commit('setResolucionesApelacionRequest');
  return sidjbridge.post('/v1/catalogos/resoluciones/recursos-de-apelacion', object)
    .then((response) => {
      commit('addResolucionApelacion', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setResolucionesApelacionSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postResolucionApelacion', response);
      commit('setResolucionApelacionFail', object);
    });
};

export const putResolucionApelacion = ({ commit }, object) => {
  commit('setResolucionApelacionRequest', object);
  return sidjbridge.put(`/v1/catalogos/resoluciones/recursos-de-apelacion/${object.id}`, object)
    .then((response) => {
      commit('setResolucionApelacion', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putResolucionApelacion', response);
      commit('setResolucionApelacionFail', object);
    });
};

export const deleteResolucionApelacion = ({ commit }, object) => {
  commit('setResolucionApelacionRequest', object);
  return sidjbridge.delete(`/v1/catalogos/resoluciones/recursos-de-apelacion/${object.id}`, object)
    .then(() => {
      commit('setResolucionApelacion', object);
    })
    .catch((response) => {
      console.error('deleteResolucionApelacion', response);
      commit('setResolucionApelacionFail', object);
    });
};
