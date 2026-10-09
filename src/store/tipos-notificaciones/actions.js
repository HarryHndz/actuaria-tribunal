import sidjbridge from '../../boot/sidjbridge';

export const fetchAllTiposNotificaciones = ({ state, commit }, params = {}) => {
  commit('setTiposNotificacionesRequest');
  commit('setTiposNotificacionesFilters', params);

  const storage = window.localStorage;
  const data = JSON.parse(storage.getItem('tipos-notificaciones'));

  if (params.cache && data !== null) {
    commit('setTiposNotificaciones', data.data);
    commit('setTiposNotificacionesPagination', data.meta.pagination);
    commit('setTiposNotificacionesSuccess');
    return Promise.resolve(true);
  }

  return sidjbridge.get('v1/catalogos/tipos/notificaciones', {
    params: state.filters,
  })
    .then((response) => {
      commit('setTiposNotificaciones', response.data.data);
      commit('setTiposNotificacionesPagination', response.data.meta.pagination);
      commit('setTiposNotificacionesSuccess');
      if (params.cache) {
        storage.setItem('tipos-notificaciones', JSON.stringify(response.data));
      }
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchAllTiposNotificaciones', response);
      commit('setTiposNotificacionesFail');
      return Promise.reject(false);
    });
};

export const fetchTipoNotificacion = ({ commit }, id) => {
  commit('setTiposNotificacionesRequest');
  return sidjbridge.get('v1/catalogos/tipos/notificaciones', id)
    .then((response) => {
      commit('addTipoNotificacion', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposNotificacionesSuccess');
    })
    .catch((response) => {
      console.error('fetchTipoNotificacion', response);
      commit('setTiposNotificacionesFail');
    });
};

export const postTipoNotificacion = ({ commit }, object) => {
  commit('setTiposNotificacionesRequest');
  return sidjbridge.post('v1/catalogos/tipos/notificaciones', object)
    .then((response) => {
      commit('addTipoNotificacion', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposNotificacionesSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postTipoNotificacion', response);
      commit('setTipoNotificacionFail', object);
    });
};

export const putTipoNotificacion = ({ commit }, object) => {
  commit('setTipoNotificacionRequest', object);
  return sidjbridge.put(`v1/catalogos/tipos/notificaciones/${object.id}`, object)
    .then((response) => {
      commit('setTipoNotificacion', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putTipoNotificacion', response);
      commit('setTipoNotificacionFail', object);
    });
};

export const deleteTipoNotificacion = ({ commit }, object) => {
  commit('setTipoNotificacionRequest', object);
  return sidjbridge.delete(`v1/catalogos/tipos/notificaciones/${object.id}`, object)
    .then(() => {
      commit('setTipoNotificacion', object);
    })
    .catch((response) => {
      console.error('deleteTipoNotificacion', response);
      commit('setTipoNotificacionFail', object);
    });
};
