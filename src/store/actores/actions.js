import sidjbridge from '../../boot/sidjbridge';

export const fetchAllActores = ({ state, commit }, params = {}) => {
  commit('setActoresRequest');
  commit('setActoresFilters', params);
  return sidjbridge.get('v1/actores', {
    params: state.filters,
  }).then((response) => {
    console.log(response);
    commit('setActores', response.data.data);
    commit('setActoresPagination', response.data.meta.pagination);
    commit('setActoresSuccess');
  }).catch((response) => {
    console.error('fetchAllActores', response);
    commit('setActoresFail');
    return Promise.reject(response);
  });
};

export const fetchActor = ({ commit }, id) => {
  commit('setActoresRequest');
  return sidjbridge.get(`v1/actores/${id}`)
    .then((response) => {
      commit('addActor', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setActoresSuccess');
    })
    .catch((response) => {
      console.error('fetchActor', response);
      commit('setActoresFail');
      return Promise.reject(response);
    });
};

export const postActor = ({ commit }, object) => {
  commit('setActoresRequest');
  return sidjbridge.post('v1/actores/', object)
    .then((response) => {
      const obj = {
        ...response.data.data,
        fetching: false,
        error: false,
      };
      commit('addActor', obj);
      commit('setActoresSuccess');
      return Promise.resolve(obj);
    })
    .catch((response) => {
      console.error('postActor', response);
      commit('setActorFail', object);
      return Promise.reject(response);
    });
};

export const putActor = ({ commit }, object) => {
  commit('setActorRequest', object);
  return sidjbridge.put(`v1/actores/${object.id}`, object)
    .then((response) => {
      commit('setActor', response.data.data);
      return Promise.resolve(response.data.data);
    })
    .catch((response) => {
      console.error('putActor', response);
      commit('setActorFail', object);
      return Promise.reject(response);
    });
};

export const deleteActor = ({ commit }, object) => {
  commit('setActorRequest', object);
  return sidjbridge.delete(`v1/actores/${object.id}`, object)
    .then(() => {
      commit('setActorDelete', object);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('deleteActor', response);
      commit('setActorFail', object);
      return Promise.reject(response);
    });
};
