import sidjbridge from '../../boot/sidjbridge';

export const fetchAllTiposJuicios = ({ state, commit }, params = {}) => {
  commit('setTiposJuiciosRequest');
  commit('setTiposJuiciosFilters', params);

  const storage = window.localStorage;
  const data = JSON.parse(storage.getItem('tipos-juicios'));

  if (params.cache && data !== null) {
    commit('setTiposJuicios', data.data);
    commit('setTiposJuiciosPagination', data.meta.pagination);
    commit('setTiposJuiciosSuccess');
    return Promise.resolve(true);
  }

  return sidjbridge.get('v1/catalogos/tipos/juicios', {
    params: state.filters,
  })
    .then((response) => {
      commit('setTiposJuicios', response.data.data);
      commit('setTiposJuiciosPagination', response.data.meta.pagination);
      commit('setTiposJuiciosSuccess');
      if (params.cache) {
        storage.setItem('tipos-juicios', JSON.stringify(response.data));
      }
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchAllTiposJuicios', response);
      commit('setTiposJuiciosFail');
    });
};

export const fetchTipoJuicio = ({ commit }, id) => {
  commit('setTiposJuiciosRequest');
  return sidjbridge.get('v1/catalogos/tipos/juicios', id)
    .then((response) => {
      commit('addTipoJuicio', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposJuiciosSuccess');
    })
    .catch((response) => {
      console.error('fetchTipoJuicio', response);
      commit('setTiposJuiciosFail');
    });
};

export const postTipoJuicio = ({ commit }, object) => {
  commit('setTiposJuiciosRequest');
  return sidjbridge.post('v1/catalogos/tipos/juicios', object)
    .then((response) => {
      commit('addTipoJuicio', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposJuiciosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postTipoJuicio', response);
      commit('setTipoJuicioFail', object);
    });
};

export const putTipoJuicio = ({ commit }, object) => {
  commit('setTipoJuicioRequest', object);
  return sidjbridge.put(`v1/catalogos/tipos/juicios/${object.id}`, object)
    .then((response) => {
      commit('setTipoJuicio', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putTipoJuicio', response);
      commit('setTipoJuicioFail', object);
    });
};

export const deleteTipoJuicio = ({ commit }, object) => {
  commit('setTipoJuicioRequest', object);
  return sidjbridge.delete(`v1/catalogos/tipos/juicios/${object.id}`, object)
    .then(() => {
      commit('setTipoJuicio', object);
    })
    .catch((response) => {
      console.error('deleteTipoJuicio', response);
      commit('setTipoJuicioFail', object);
    });
};
