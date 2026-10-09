import sidjbridge from '../../boot/sidjbridge';

export const fetchAllAreas = ({ commit, state }, params = {}) => {
  commit('setAreasRequest');
  commit('setAreasFilters', params);
  return sidjbridge.get('v1/areas', {
    params: state.filters,
  })
    .then((response) => {
      commit('setAreas', response.data.data);
      commit('setAreasPagination', response.data.meta.pagination);
      commit('setAreasSuccess');
    })
    .catch((response) => {
      console.error('fetchAllAreas', response);
      commit('setAreasFail');
    });
};

export const fetchArea = ({ commit }, id) => {
  commit('setAreasRequest');
  return sidjbridge.get('v1/areas', id)
    .then((response) => {
      commit('addArea', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setAreasSuccess');
    })
    .catch((response) => {
      console.error('fetchArea', response);
      commit('setAreasFail');
    });
};

export const postArea = ({ commit }, object) => {
  commit('setAreasRequest');
  return sidjbridge.post('v1/areas', object)
    .then((response) => {
      commit('addArea', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setAreasSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postArea', response);
      commit('setAreaFail', object);
    });
};

export const putArea = ({ commit }, object) => {
  commit('setAreaRequest', object);
  return sidjbridge.put(`v1/areas/${object.id}`, object)
    .then((response) => {
      commit('setArea', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putArea', response);
      commit('setAreaFail', object);
    });
};

export const deleteArea = ({ commit }, object) => {
  commit('setAreaRequest', object);
  return sidjbridge.delete(`v1/areas/${object.id}`, object)
    .then(() => {
      commit('setArea', object);
    })
    .catch((response) => {
      console.error('deleteArea', response);
      commit('setAreaFail', object);
    });
};
