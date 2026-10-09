import sidjbridge from '../../boot/sidjbridge';

export const fetchAllPromoventes = ({ state, commit }, params = {}) => {
  commit('setPromoventesRequest');
  commit('setPromoventesFilters', params);

  const storage = window.localStorage;
  const data = JSON.parse(storage.getItem('promoventes'));

  if (params.cache && data !== null) {
    commit('setPromoventes', data.data);
    commit('setPromoventesPagination', data.meta.pagination);
    commit('setPromoventesSuccess');
    return Promise.resolve(true);
  }

  return sidjbridge.get('/v1/promoventes', {
    params: state.filters,
  })
    .then((response) => {
      commit('setPromoventes', response.data.data);
      commit('setPromoventesPagination', response.data.meta.pagination);
      commit('setPromoventesSuccess');
      if (params.cache) {
        storage.setItem('promoventes', JSON.stringify(response.data));
      }
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchAllPromoventes', response);
      commit('setPromoventesFail');
      return Promise.reject(false);
    });
};

export const fetchPromovente = ({ commit }, id) => {
  commit('setPromoventesRequest');
  return sidjbridge.get('/v1/promoventes', id)
    .then((response) => {
      commit('addPromovente', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setPromoventesSuccess');
    })
    .catch((response) => {
      console.error('fetchPromovente', response);
      commit('setPromoventesFail');
    });
};

export const postPromovente = ({ commit }, object) => {
  commit('setPromoventesRequest');
  return sidjbridge.post('/v1/promoventes', object)
    .then((response) => {
      commit('addPromovente', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setPromoventesSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postPromovente', response);
      commit('setPromoventeFail', object);
    });
};

export const putPromovente = ({ commit }, object) => {
  commit('setPromoventeRequest', object);
  return sidjbridge.put(`/v1/promoventes/${object.id}`, object)
    .then((response) => {
      commit('setPromovente', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putPromovente', response);
      commit('setPromoventeFail', object);
    });
};

export const deletePromovente = ({ commit }, object) => {
  commit('setPromoventeRequest', object);
  return sidjbridge.delete(`/v1/promoventes/${object.id}`, object)
    .then(() => {
      commit('setPromovente', object);
    })
    .catch((response) => {
      console.error('deletePromovente', response);
      commit('setPromoventeFail', object);
    });
};
