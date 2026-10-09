import scobridge from '../../boot/scobridge';

export const fetchAllAreasConfiguracionesSco = ({ commit, state }, params = {}) => {
  commit('setAreasConfiguracionesScoRequest');
  commit('setAreasConfiguracionesScoFilters', params);

  return scobridge.get('v1/areas-configuraciones', {
    params: state.filters,
  })
    .then((response) => {
      commit('setAreasConfiguracionesSco', response.data.data);
      commit('setAreasConfiguracionesScoPagination', response.data.meta.pagination);
      commit('setAreasConfiguracionesScoSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchAllAreasConfiguracionesSco', response);
      commit('setAreasConfiguracionesScoFail');
      return Promise.reject(response);
    });
};

export const fetchArea = ({ commit }, id) => {
  commit('setAreasConfiguracionesScoRequest');
  return scobridge.get('v1/areas-configuraciones', id)
    .then((response) => {
      commit('addAreaConfiguracionSco', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setAreasConfiguracionesScoSuccess');
    })
    .catch((response) => {
      console.error('fetchArea', response);
      commit('setAreasConfiguracionesScoFail');
      return Promise.reject(response);
    });
};

export const postAreaConfiguracionSco = ({ commit }, object) => {
  commit('setAreasConfiguracionesScoRequest');
  return scobridge.post('v1/areas-configuraciones', object)
    .then((response) => {
      commit('addAreaConfiguracionSco', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setAreasConfiguracionesScoSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postAreaConfiguracionSco', response);
      commit('setAreaConfiguracionScoFail', object);
      return Promise.reject(response);
    });
};

export const putAreaConfiguracionSco = ({ commit }, object) => {
  commit('setAreaConfiguracionScoRequest', object);
  return scobridge.put(`v1/areas-configuraciones/${object.id}`, object)
    .then((response) => {
      commit('setAreaConfiguracionSco', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putAreaConfiguracionSco', response);
      commit('setAreaConfiguracionScoFail', object);
      return Promise.reject(response);
    });
};

export const deleteAreaConfiguracionSco = ({ commit }, object) => {
  commit('setAreaConfiguracionScoRequest', object);
  return scobridge.delete(`v1/areas-configuraciones/${object.id}`, object)
    .then(() => {
      commit('setAreaConfiguracionScoDelete', object);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('deleteAreaConfiguracionSco', response);
      commit('setAreaConfiguracionScoFail', object);
      return Promise.reject(response);
    });
};
