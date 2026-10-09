import sidjbridge from '../../boot/sidjbridge';

export const fetchAllTiposNotifiquese = ({ state, commit }, params = {}) => {
  commit('setTiposNotifiqueseRequest');
  commit('setTiposNotifiqueseFilters', params);

  const storage = window.localStorage;
  const data = JSON.parse(storage.getItem('tipos-notifiquese'));

  if (params.cache && data !== null) {
    commit('setTiposNotifiquese', data.data);
    commit('setTiposNotifiquesePagination', data.meta.pagination);
    commit('setTiposNotifiqueseSuccess');
    return Promise.resolve(true);
  }

  return sidjbridge.get('v1/catalogos/tipos/notifiquese', {
    params: state.filters,
  })
    .then((response) => {
      commit('setTiposNotifiquese', response.data.data);
      commit('setTiposNotifiquesePagination', response.data.meta.pagination);
      commit('setTiposNotifiqueseSuccess');
      if (params.cache) {
        storage.setItem('tipos-notifiquese', JSON.stringify(response.data));
      }
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchAllTiposNotifiquese', response);
      commit('setTiposNotifiqueseFail');
      return Promise.reject(false);
    });
};

export const fetchTipoNotifiquese = ({ commit }, id) => {
  commit('setTiposNotifiqueseRequest');
  return sidjbridge.get('v1/catalogos/tipos/notifiquese', id)
    .then((response) => {
      commit('addTipoNotifiquese', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposNotifiqueseSuccess');
    })
    .catch((response) => {
      console.error('fetchTipoNotifiquese', response);
      commit('setTiposNotifiqueseFail');
    });
};

export const postTipoNotifiquese = ({ commit }, object) => {
  commit('setTiposNotifiqueseRequest');
  return sidjbridge.post('v1/catalogos/tipos/notifiquese', object)
    .then((response) => {
      commit('addTipoNotifiquese', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposNotifiqueseSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postTipoNotifiquese', response);
      commit('setTipoNotifiqueseFail', object);
    });
};

export const putTipoNotifiquese = ({ commit }, object) => {
  commit('setTipoNotifiqueseRequest', object);
  return sidjbridge.put(`v1/catalogos/tipos/notifiquese/${object.id}`, object)
    .then((response) => {
      commit('setTipoNotifiquese', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putTipoNotifiquese', response);
      commit('setTipoNotifiqueseFail', object);
    });
};

export const deleteTipoNotifiquese = ({ commit }, object) => {
  commit('setTipoNotifiqueseRequest', object);
  return sidjbridge.delete(`v1/catalogos/tipos/notifiquese/${object.id}`, object)
    .then(() => {
      commit('setTipoNotifiquese', object);
    })
    .catch((response) => {
      console.error('deleteTipoNotifiquese', response);
      commit('setTipoNotifiqueseFail', object);
    });
};
