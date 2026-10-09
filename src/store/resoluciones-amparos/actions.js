import sidjbridge from '../../boot/sidjbridge';

export const fetchAllResolucionesAmparos = ({ state, commit }, params = {}) => {
  commit('setResolucionesAmparosRequest');
  commit('setResolucionesAmparosFilters', params);
  return sidjbridge.get('/v1/catalogos/resoluciones/amparos', state.filters)
    .then((response) => {
      commit('setResolucionesAmparos', response.data.data);
      commit('setResolucionesAmparosPagination', response.data.meta.pagination);
      commit('setResolucionesAmparosSuccess');
    })
    .catch((response) => {
      console.error('fetchAllResolucionesAmparos', response);
      commit('setResolucionesAmparosFail');
    });
};

export const fetchResolucionAmparo = ({ commit }, id) => {
  commit('setResolucionesAmparosRequest');
  return sidjbridge.get('/v1/catalogos/resoluciones/amparos', id)
    .then((response) => {
      commit('addResolucionAmparo', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setResolucionesAmparosSuccess');
    })
    .catch((response) => {
      console.error('fetchResolucionAmparo', response);
      commit('setResolucionesAmparosFail');
    });
};

export const postResolucionAmparo = ({ commit }, object) => {
  commit('setResolucionesAmparosRequest');
  return sidjbridge.post('/v1/catalogos/resoluciones/amparos', object)
    .then((response) => {
      commit('addResolucionAmparo', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setResolucionesAmparosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postResolucionAmparo', response);
      commit('setResolucionAmparoFail', object);
    });
};

export const putResolucionAmparo = ({ commit }, object) => {
  commit('setResolucionAmparoRequest', object);
  return sidjbridge.put(`/v1/catalogos/resoluciones/amparos/${object.id}`, object)
    .then((response) => {
      commit('setResolucionAmparo', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putResolucionAmparo', response);
      commit('setResolucionAmparoFail', object);
    });
};

export const deleteResolucionAmparo = ({ commit }, object) => {
  commit('setResolucionAmparoRequest', object);
  return sidjbridge.delete(`/v1/catalogos/resoluciones/amparos/${object.id}`, object)
    .then(() => {
      commit('setResolucionAmparo', object);
    })
    .catch((response) => {
      console.error('deleteResolucionAmparo', response);
      commit('setResolucionAmparoFail', object);
    });
};
