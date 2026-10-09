import sidjbridge from '../../boot/sidjbridge';

export const fetchAllProcedencias = ({ state, commit }, params = {}) => {
  commit('setProcedenciasRequest');
  commit('setProcedenciasFilters', params);
  return sidjbridge.get('/v1/catalogos/tipos/procedencias', state.filters)
    .then((response) => {
      commit('setProcedencias', response.data.data);
      commit('setProcedenciasPagination', response.data.meta.pagination);
      commit('setProcedenciasSuccess');
    })
    .catch((response) => {
      console.error('fetchAllProcedencias', response);
      commit('setProcedenciasFail');
    });
};

export const fetchProcedencia = ({ commit }, id) => {
  commit('setProcedenciasRequest');
  return sidjbridge.get('/v1/catalogos/tipos/procedencias', id)
    .then((response) => {
      commit('addProcedencia', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setProcedenciasSuccess');
    })
    .catch((response) => {
      console.error('fetchProcedencia', response);
      commit('setProcedenciasFail');
    });
};

export const postProcedencia = ({ commit }, object) => {
  commit('setProcedenciasRequest');
  return sidjbridge.post('/v1/catalogos/tipos/procedencias', object)
    .then((response) => {
      commit('addProcedencia', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setProcedenciasSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postProcedencia', response);
      commit('setProcedenciaFail', object);
    });
};

export const putProcedencia = ({ commit }, object) => {
  commit('setProcedenciaRequest', object);
  return sidjbridge.put(`/v1/catalogos/tipos/procedencias/${object.id}`, object)
    .then((response) => {
      commit('setProcedencia', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putProcedencia', response);
      commit('setProcedenciaFail', object);
    });
};

export const deleteProcedencia = ({ commit }, object) => {
  commit('setProcedenciaRequest', object);
  return sidjbridge.delete(`/v1/catalogos/tipos/procedencias/${object.id}`, object)
    .then(() => {
      commit('setProcedencia', object);
    })
    .catch((response) => {
      console.error('deleteProcedencia', response);
      commit('setProcedenciaFail', object);
    });
};
