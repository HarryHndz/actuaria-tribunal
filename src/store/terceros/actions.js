import sidjbridge from '../../boot/sidjbridge';

export const fetchAllTerceros = ({ state, commit }, params = {}) => {
  commit('setTercerosRequest');
  commit('setTercerosFilters', params);
  return sidjbridge.get('v1/terceros-perjudicados', {
    params: state.filters,
  }).then((response) => {
    console.log(response);
    commit('setTerceros', response.data.data);
    commit('setTercerosPagination', response.data.meta.pagination);
    commit('setTercerosSuccess');
  }).catch((response) => {
    console.error('fetchAllTerceros', response);
    commit('setTercerosFail');
  });
};

export const fetchTercero = ({ commit }, id) => {
  commit('setTercerosRequest');
  return sidjbridge.get(`v1/terceros-perjudicados/${id}`)
    .then((response) => {
      commit('addTercero', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTercerosSuccess');
    })
    .catch((response) => {
      console.error('fetchTercero', response);
      commit('setTercerosFail');
    });
};

export const postTercero = ({ commit }, object) => {
  commit('setTercerosRequest');
  return sidjbridge.post('v1/terceros-perjudicados/', object)
    .then((response) => {
      const obj = {
        ...response.data.data,
        fetching: false,
        error: false,
      };
      commit('addTercero', obj);
      commit('setTercerosSuccess');
      return Promise.resolve(obj);
    })
    .catch((response) => {
      console.error('postTercero', response);
      commit('setTerceroFail', object);
    });
};

export const putTercero = ({ commit }, object) => {
  commit('setTerceroRequest', object);
  return sidjbridge.put(`v1/terceros-perjudicados/${object.id}`, object)
    .then((response) => {
      commit('setTercero', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putTercero', response);
      commit('setTerceroFail', object);
    });
};

export const deleteTercero = ({ commit }, object) => {
  commit('setTerceroRequest', object);
  return sidjbridge.delete(`v1/terceros-perjudicados/${object.id}`, object)
    .then(() => {
      commit('setTerceroDelete', object);
    })
    .catch((response) => {
      console.error('deleteTercero', response);
      commit('setTerceroFail', object);
    });
};
