import sidjbridge from '../../boot/sidjbridge';

export const fetchAllTiposDemandas = ({ state, commit }, params = {}) => {
  commit('setTiposDemandasRequest');
  commit('setTiposDemandasFilters', params);

  const storage = window.localStorage;
  const data = JSON.parse(storage.getItem('tipos-demandas'));

  if (params.cache && data !== null) {
    commit('setTiposDemandas', data.data);
    commit('setTiposDemandasPagination', data.meta.pagination);
    commit('setTiposDemandasSuccess');
    return Promise.resolve(true);
  }

  return sidjbridge.get('v1/catalogos/tipos/demandas', {
    params: state.filters,
  })
    .then((response) => {
      commit('setTiposDemandas', response.data.data);
      commit('setTiposDemandasPagination', response.data.meta.pagination);
      commit('setTiposDemandasSuccess');
      if (params.cache) {
        storage.setItem('tipos-demandas', JSON.stringify(response.data));
      }
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchAllTiposDemandas', response);
      commit('setTiposDemandasFail');
      return Promise.reject(false);
    });
};

export const fetchTipoDemanda = ({ commit }, id) => {
  commit('setTiposDemandasRequest');
  return sidjbridge.get('v1/catalogos/tipos/demandas', id)
    .then((response) => {
      commit('addTipoDemanda', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposDemandasSuccess');
    })
    .catch((response) => {
      console.error('fetchTipoDemanda', response);
      commit('setTiposDemandasFail');
    });
};

export const postTipoDemanda = ({ commit }, object) => {
  commit('setTiposDemandasRequest');
  return sidjbridge.post('v1/catalogos/tipos/demandas', object)
    .then((response) => {
      commit('addTipoDemanda', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposDemandasSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postTipoDemanda', response);
      commit('setTipoDemandaFail', object);
    });
};

export const putTipoDemanda = ({ commit }, object) => {
  commit('setTipoDemandaRequest', object);
  return sidjbridge.put(`v1/catalogos/tipos/demandas/${object.id}`, object)
    .then((response) => {
      commit('setTipoDemanda', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putTipoDemanda', response);
      commit('setTipoDemandaFail', object);
    });
};

export const deleteTipoDemanda = ({ commit }, object) => {
  commit('setTipoDemandaRequest', object);
  return sidjbridge.delete(`v1/catalogos/tipos/demandas/${object.id}`, object)
    .then(() => {
      commit('setTipoDemanda', object);
    })
    .catch((response) => {
      console.error('deleteTipoDemanda', response);
      commit('setTipoDemandaFail', object);
    });
};
