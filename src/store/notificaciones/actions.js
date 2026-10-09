import sidjbridge from '../../boot/sidjbridge';

export const fetchAllNotificaciones = async ({ state, commit }, params = {}) => {
  commit('setNotificacionesRequest');
  commit('setNotificacionesFilters', params);
  try {
    const response = await sidjbridge.get('v1/notificaciones', {
      params: state.filters,
    });
    commit('setNotificaciones', response.data.data);
    commit('setNotificacionesPagination', response.data.meta.pagination);
    commit('setNotificacionesSuccess');
    return Promise.resolve(response.data.data);
  } catch (err) {
    console.error('fetchAllNotificaciones', err);
    commit('setNotificacionesFail');
    return Promise.reject(err);
  }
};

export const fetchNotificacion = async ({ commit }, id) => {
  commit('setNotificacionesRequest');
  try {
    const response = await sidjbridge.get('v1/notificaciones', id);
    commit('addNotificacion', {
      ...response.data.data,
      fetching: false,
      error: false,
    });
    commit('setNotificacionesSuccess');
    return Promise.resolve(response.data.data);
  } catch (err) {
    console.error('fetchNotificacion', err);
    commit('setNotificacionesFail');
    return Promise.reject(err);
  }
};

export const postNotificacion = async ({ commit }, object) => {
  commit('setNotificacionesRequest');
  try {
    const response = await sidjbridge.post('v1/notificaciones', object);
    commit('addNotificacion', {
      ...response.data.data,
      fetching: false,
      error: false,
    });
    commit('setNotificacionesSuccess');
    return Promise.resolve({
      ...response.data.data,
      fetching: false,
      error: false,
    });
  } catch (err) {
    console.error('postNotificacion', err);
    commit('setNotificacionFail', object);
    return Promise.reject(err);
  }
};

export const postMultipleNotificacion = async ({ commit }, object) => {
  commit('setNotificacionesRequest');
  try {
    const response = await sidjbridge.post('v1/notificaciones-multiples', object);
    commit('setNotificacionesSuccess');
    return Promise.resolve(response.data.data);
  } catch (err) {
    console.error('postMultipleNotificacion', err);
    commit('setNotificacionFail', object);
    return Promise.reject(err);
  }
};

export const putNotificacion = async ({ commit }, object) => {
  commit('setNotificacionRequest', object);
  try {
    const response = await sidjbridge.put(`v1/notificaciones/${object.id}`, object);
    commit('setNotificacion', response.data.data);
    return Promise.resolve(response.data.data);
  } catch (err) {
    console.error('putNotificacion', err);
    commit('setNotificacionFail', object);
    return Promise.reject(err);
  }
};

export const deleteNotificacion = async ({ commit }, object) => {
  commit('setNotificacionRequest', object);
  try {
    await sidjbridge.delete(`v1/notificaciones/${object.id}`, object);
    commit('setNotificacionDelete', object);
    return Promise.resolve(object);
  } catch (err) {
    console.error('deleteNotificacion', err);
    commit('setNotificacionFail', object);
    return Promise.reject(err);
  }
};
