import sidjbridge from '../../boot/sidjbridge';

export const fetchAllActosImpugnados = ({ state, commit }, params = {}) => {
  commit('setActosImpugnadosRequest');
  commit('setActosImpugnadosFilters', params);

  if (params.cache && window.localStorage) {
    const data = localStorage.get('estados-procesales-ra');
    if (data) {
      commit('setActosImpugnados', data);
    }
    return Promise.resolve();
  }

  return sidjbridge.get('v1/catalogos/actos-impugnados', state.filters)
    .then((response) => {
      commit('setActosImpugnados', response.data.data);
      commit('setActosImpugnadosPagination', response.data.meta.pagination);
      commit('setActosImpugnadosSuccess');
    })
    .catch((response) => {
      console.error('fetchAllActosImpugnados', response);
      commit('setActosImpugnadosFail');
    });
};

export const fetchActoImpugnado = ({ commit }, id) => {
  commit('setActosImpugnadosRequest');
  return sidjbridge.get(`v1/catalogos/actos-impugnados/${id}`)
    .then((response) => {
      commit('addActoImpugnado', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setActosImpugnadosSuccess');
    })
    .catch((response) => {
      console.error('fetchActoImpugnado', response);
      commit('setActosImpugnadosFail');
    });
};

export const postActoImpugnado = ({ commit }, object) => {
  commit('setActosImpugnadosRequest');
  return sidjbridge.post('v1/catalogos/actos-impugnados', object)
    .then((response) => {
      commit('addActoImpugnado', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setActosImpugnadosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postActoImpugnado', response);
      commit('setActoImpugnadoFail', object);
    });
};

export const putActoImpugnado = ({ commit }, object) => {
  commit('setActoImpugnadoRequest', object);
  return sidjbridge.put(`v1/catalogos/actos-impugnados/${object.id}`, object)
    .then((response) => {
      commit('setActoImpugnado', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putActoImpugnado', response);
      commit('setActoImpugnadoFail', object);
    });
};

export const deleteActoImpugnado = ({ commit }, object) => {
  commit('setActoImpugnadoRequest', object);
  return sidjbridge.delete(`v1/catalogos/actos-impugnados/${object.id}`, object)
    .then(() => {
      commit('setActoImpugnado', object);
    })
    .catch((response) => {
      console.error('deleteActoImpugnado', response);
      commit('setActoImpugnadoFail', object);
    });
};
