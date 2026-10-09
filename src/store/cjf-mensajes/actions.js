import sidjbridge from '../../boot/sidjbridge';

export const fetchAllCjfMensajes = ({ state, commit }, params = {}) => {
  commit('setCjfMensajesRequest');
  commit('setCjfMensajesFilters', params);
  return sidjbridge.get('v1/cjf-mensajes', state.filters)
    .then((response) => {
      commit('setCjfMensajes', response.data.data);
      commit('setCjfMensajesPagination', response.data.meta.pagination);
      commit('setCjfMensajesSuccess');
    })
    .catch((response) => {
      console.error('fetchAllCjfMensajes', response);
      commit('setCjfMensajesFail');
    });
};

export const fetchCjfMensaje = ({ commit }, id) => {
  commit('setCjfMensajesRequest');
  return sidjbridge.get('v1/cjf-mensajes', id)
    .then((response) => {
      commit('addCjfMensaje', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setCjfMensajesSuccess');
    })
    .catch((response) => {
      console.error('fetchCjfMensaje', response);
      commit('setCjfMensajesFail');
    });
};

export const postCjfMensaje = ({ commit }, object) => {
  commit('setCjfMensajesRequest');
  return sidjbridge.post('v1/cjf-mensajes', object)
    .then((response) => {
      commit('addCjfMensaje', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setCjfMensajesSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postCjfMensaje', response);
      commit('setCjfMensajeFail', object);
    });
};

export const putCjfMensaje = ({ commit }, object) => {
  commit('setCjfMensajeRequest', object);
  return sidjbridge.put(`v1/cjf-mensajes/${object.id}`, object)
    .then((response) => {
      commit('setCjfMensaje', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putCjfMensaje', response);
      commit('setCjfMensajeFail', object);
    });
};

export const deleteCjfMensaje = ({ commit }, object) => {
  commit('setCjfMensajeRequest', object);
  return sidjbridge.delete(`v1/cjf-mensajes/${object.id}`, object)
    .then(() => {
      commit('setCjfMensaje', object);
    })
    .catch((response) => {
      console.error('deleteCjfMensaje', response);
      commit('setCjfMensajeFail', object);
    });
};
