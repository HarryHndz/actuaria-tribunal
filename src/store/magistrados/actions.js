import sidjbridge from '../../boot/sidjbridge';

export const fetchAllMagistrados = ({ state, commit }, params = {}) => {
  commit('setMagistradosRequest');
  commit('setMagistradosFilters', params);

  const storage = window.localStorage;
  const data = JSON.parse(storage.getItem('magistrados'));

  if (params.cache && data !== null) {
    commit('setMagistrados', data.data);
    commit('setMagistradosPagination', data.meta.pagination);
    commit('setMagistradosSuccess');
    return Promise.resolve(true);
  }

  return sidjbridge.get('v1/magistrados', {
    params: state.filters,
  })
    .then((response) => {
      commit('setMagistrados', response.data.data);
      commit('setMagistradosPagination', response.data.meta.pagination);
      commit('setMagistradosSuccess');
      if (params.cache) {
        storage.setItem('magistrados', JSON.stringify(response.data));
      }
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchAllMagistrados', response);
      commit('setMagistradosFail');
    });
};

export const fetchMagistrado = ({ commit }, id) => {
  commit('setMagistradosRequest');
  return sidjbridge.get('v1/magistrados', id)
    .then((response) => {
      commit('addMagistrado', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setMagistradosSuccess');
    })
    .catch((response) => {
      console.error('fetchMagistrado', response);
      commit('setMagistradosFail');
    });
};

export const postMagistrado = ({ commit }, object) => {
  commit('setMagistradosRequest');
  return sidjbridge.post('v1/magistrados', object)
    .then((response) => {
      commit('addMagistrado', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setMagistradosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postMagistrado', response);
      commit('setMagistradoFail', object);
    });
};

export const putMagistrado = ({ commit }, object) => {
  commit('setMagistradoRequest', object);
  return sidjbridge.put(`v1/magistrados/${object.id}`, object)
    .then((response) => {
      commit('setMagistrado', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putMagistrado', response);
      commit('setMagistradoFail', object);
    });
};

export const deleteMagistrado = ({ commit }, object) => {
  commit('setMagistradoRequest', object);
  return sidjbridge.delete(`v1/magistrados/${object.id}`, object)
    .then(() => {
      commit('setMagistrado', object);
    })
    .catch((response) => {
      console.error('deleteMagistrado', response);
      commit('setMagistradoFail', object);
    });
};
