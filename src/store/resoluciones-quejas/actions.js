import sidjbridge from '../../boot/sidjbridge';

export const fetchAllResolucionesQuejas = ({ state, commit }, params = {}) => {
  commit('setResolucionesQuejasRequest');
  commit('setResolucionesQuejasFilters', params);
  return sidjbridge.get('/v1/catalogos/resoluciones/queja', state.filters)
    .then((response) => {
      commit('setResolucionesQuejas', response.data.data);
      commit('setResolucionesQuejasPagination', response.data.meta.pagination);
      commit('setResolucionesQuejasSuccess');
    })
    .catch((response) => {
      console.error('fetchAllResolucionesQuejas', response);
      commit('setResolucionesQuejasFail');
    });
};

export const fetchResolucionQueja = ({ commit }, id) => {
  commit('setResolucionesQuejasRequest');
  return sidjbridge.get('/v1/catalogos/resoluciones/queja', id)
    .then((response) => {
      commit('addResolucionQueja', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setResolucionesQuejasSuccess');
    })
    .catch((response) => {
      console.error('fetchResolucionQueja', response);
      commit('setResolucionesQuejasFail');
    });
};

export const postResolucionQueja = ({ commit }, object) => {
  commit('setResolucionesQuejasRequest');
  return sidjbridge.post('/v1/catalogos/resoluciones/queja', object)
    .then((response) => {
      commit('addResolucionQueja', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setResolucionesQuejasSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postResolucionQueja', response);
      commit('setResolucionQuejaFail', object);
    });
};

export const putResolucionQueja = ({ commit }, object) => {
  commit('setResolucionQuejaRequest', object);
  return sidjbridge.put(`/v1/catalogos/resoluciones/queja/${object.id}`, object)
    .then((response) => {
      commit('setResolucionQueja', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putResolucionQueja', response);
      commit('setResolucionQuejaFail', object);
    });
};

export const deleteResolucionQueja = ({ commit }, object) => {
  commit('setResolucionQuejaRequest', object);
  return sidjbridge.delete(`/v1/catalogos/resoluciones/queja/${object.id}`, object)
    .then(() => {
      commit('setResolucionQueja', object);
    })
    .catch((response) => {
      console.error('deleteResolucionQueja', response);
      commit('setResolucionQuejaFail', object);
    });
};
