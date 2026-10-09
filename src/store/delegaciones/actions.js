import sidjbridge from '../../boot/sidjbridge';

export const fetchAllDelegaciones = ({ state, commit }, params = {}) => {
  commit('setDelegacionesRequest');
  commit('setDelegacionesFilters', params);

  const storage = window.localStorage;
  const data = JSON.parse(storage.getItem('delegaciones'));

  if (params.cache && data !== null) {
    commit('setDelegaciones', data.data);
    commit('setDelegacionesPagination', data.meta.pagination);
    commit('setDelegacionesSuccess');
    return Promise.resolve(true);
  }

  return sidjbridge.get('/v1/delegaciones', {
    params: state.filters,
  })
    .then((response) => {
      commit('setDelegaciones', response.data.data);
      commit('setDelegacionesPagination', response.data.meta.pagination);
      commit('setDelegacionesSuccess');

      if (params.cache) {
        storage.setItem('delegaciones', JSON.stringify(response.data));
      }
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchAllDelegaciones', response);
      commit('setDelegacionesFail');
      return Promise.reject(false);
    });
};

export const fetchDelegacion = ({ commit }, id) => {
  commit('setDelegacionesRequest');
  return sidjbridge.get('/v1/delegaciones', id)
    .then((response) => {
      commit('addDelegacion', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setDelegacionesSuccess');
    })
    .catch((response) => {
      console.error('fetchDelegacion', response);
      commit('setDelegacionesFail');
    });
};

export const postDelegacion = ({ commit }, object) => {
  commit('setDelegacionesRequest');
  return sidjbridge.post('/v1/delegaciones', object)
    .then((response) => {
      commit('addDelegacion', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setDelegacionesSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postDelegacion', response);
      commit('setDelegacionFail', object);
    });
};

export const putDelegacion = ({ commit }, object) => {
  commit('setDelegacionRequest', object);
  return sidjbridge.put(`/v1/delegaciones/${object.id}`, object)
    .then((response) => {
      commit('setDelegacion', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putDelegacion', response);
      commit('setDelegacionFail', object);
    });
};

export const deleteDelegacion = ({ commit }, object) => {
  commit('setDelegacionRequest', object);
  return sidjbridge.delete(`/v1/delegaciones/${object.id}`, object)
    .then(() => {
      commit('setDelegacion', object);
    })
    .catch((response) => {
      console.error('deleteDelegacion', response);
      commit('setDelegacionFail', object);
    });
};
