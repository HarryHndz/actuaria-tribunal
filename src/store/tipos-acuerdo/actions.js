import sidjbridge from '../../boot/sidjbridge';

export const fetchAllTiposAcuerdos = ({ state, commit }, params = {}) => {
  commit('setTiposAcuerdosRequest');
  commit('setTiposAcuerdosFilters', params);

  const storage = window.localStorage;
  const data = JSON.parse(storage.getItem('tipos-acuerdo'));

  if (params.cache && data !== null) {
    commit('setTiposAcuerdos', data.data);
    commit('setTiposAcuerdosPagination', data.meta.pagination);
    commit('setTiposAcuerdosSuccess');
    return Promise.resolve(true);
  }

  return sidjbridge.get('v1/catalogos/tipos/acuerdos', {
    params: state.filters,
  })
    .then((response) => {
      commit('setTiposAcuerdos', response.data.data);
      commit('setTiposAcuerdosPagination', response.data.meta.pagination);
      commit('setTiposAcuerdosSuccess');
      if (params.cache) {
        storage.setItem('tipos-acuerdo', JSON.stringify(response.data));
      }
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchAllTiposAcuerdos', response);
      commit('setTiposAcuerdosFail');
      return Promise.reject(false);
    });
};

export const fetchTipoAcuerdo = ({ commit }, id) => {
  commit('setTiposAcuerdosRequest');
  return sidjbridge.get('v1/catalogos/tipos/acuerdos', id)
    .then((response) => {
      commit('addTipoAcuerdo', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposAcuerdosSuccess');
    })
    .catch((response) => {
      console.error('fetchTipoAcuerdo', response);
      commit('setTiposAcuerdosFail');
    });
};

export const postTipoAcuerdo = ({ commit }, object) => {
  commit('setTiposAcuerdosRequest');
  return sidjbridge.post('v1/catalogos/tipos/acuerdos', object)
    .then((response) => {
      commit('addTipoAcuerdo', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposAcuerdosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postTipoAcuerdo', response);
      commit('setTipoAcuerdoFail', object);
    });
};

export const putTipoAcuerdo = ({ commit }, object) => {
  commit('setTipoAcuerdoRequest', object);
  return sidjbridge.put(`v1/catalogos/tipos/acuerdos/${object.id}`, object)
    .then((response) => {
      commit('setTipoAcuerdo', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putTipoAcuerdo', response);
      commit('setTipoAcuerdoFail', object);
    });
};

export const deleteTipoAcuerdo = ({ commit }, object) => {
  commit('setTipoAcuerdoRequest', object);
  return sidjbridge.delete(`v1/catalogos/tipos/acuerdos/${object.id}`, object)
    .then(() => {
      commit('setTipoAcuerdo', object);
    })
    .catch((response) => {
      console.error('deleteTipoAcuerdo', response);
      commit('setTipoAcuerdoFail', object);
    });
};
