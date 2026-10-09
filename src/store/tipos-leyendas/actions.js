import sidjbridge from '../../boot/sidjbridge';

export const fetchAllTiposLeyendas = ({ state, commit }, params = {}) => {
  commit('setTiposLeyendasRequest');
  commit('setTiposLeyendasFilters', params);

  const storage = window.localStorage;
  const data = JSON.parse(storage.getItem('tipos-leyendas'));

  if (params.cache && data !== null) {
    commit('setTiposLeyendas', data.data);
    commit('setTiposLeyendasPagination', data.meta.pagination);
    commit('setTiposLeyendasSuccess');
    return Promise.resolve(true);
  }

  return sidjbridge.get('v1/catalogos/tipos/leyendas', {
    params: state.filters,
  })
    .then((response) => {
      commit('setTiposLeyendas', response.data.data);
      commit('setTiposLeyendasPagination', response.data.meta.pagination);
      commit('setTiposLeyendasSuccess');
      if (params.cache) {
        storage.setItem('tipos-leyendas', JSON.stringify(response.data));
      }
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchAllTiposLeyendas', response);
      commit('setTiposLeyendasFail');
      return Promise.reject(true);
    });
};

export const fetchTipoLeyenda = ({ commit }, id) => {
  commit('setTiposLeyendasRequest');
  return sidjbridge.get('v1/catalogos/tipos/leyendas', id)
    .then((response) => {
      commit('addTipoLeyenda', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposLeyendasSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchTipoLeyenda', response);
      commit('setTiposLeyendasFail');
      return Promise.reject(true);
    });
};

export const postTipoLeyenda = ({ commit }, object) => {
  commit('setTiposLeyendasRequest');
  return sidjbridge.post('v1/catalogos/tipos/leyendas', object)
    .then((response) => {
      commit('addTipoLeyenda', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposLeyendasSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postTipoLeyenda', response);
      commit('setTipoLeyendaFail', object);
      return Promise.reject(true);
    });
};

export const putTipoLeyenda = ({ commit }, object) => {
  commit('setTipoLeyendaRequest', object);
  return sidjbridge.put(`v1/catalogos/tipos/leyendas/${object.id}`, object)
    .then((response) => {
      commit('setTipoLeyenda', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putTipoLeyenda', response);
      commit('setTipoLeyendaFail', object);
      return Promise.reject(true);
    });
};

export const deleteTipoLeyenda = ({ commit }, object) => {
  commit('setTipoLeyendaRequest', object);
  return sidjbridge.delete(`v1/catalogos/tipos/leyendas/${object.id}`, object)
    .then(() => {
      commit('setTipoLeyendaDelete', object);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('deleteTipoLeyenda', response);
      commit('setTipoLeyendaFail', object);
      return Promise.reject(true);
    });
};
