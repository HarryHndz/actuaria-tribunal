import sidjbridge from '../../boot/sidjbridge';

export const fetchAllTribunalesColegiados = ({ state, commit }, params = {}) => {
  commit('setTribunalesColegiadosRequest');
  commit('setTribunalesColegiadosFilters', params);
  return sidjbridge.get('v1/tribunales-colegiados', state.filters)
    .then((response) => {
      commit('setTribunalesColegiados', response.data.data);
      commit('setTribunalesColegiadosPagination', response.data.meta.pagination);
      commit('setTribunalesColegiadosSuccess');
    })
    .catch((response) => {
      console.error('fetchAllTribunalesColegiados', response);
      commit('setTribunalesColegiadosFail');
    });
};

export const fetchTribunalColegiado = ({ commit }, id) => {
  commit('setTribunalesColegiadosRequest');
  return sidjbridge.get('v1/tribunales-colegiados', id)
    .then((response) => {
      commit('addTribunalColegiado', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTribunalesColegiadosSuccess');
    })
    .catch((response) => {
      console.error('fetchTribunalColegiado', response);
      commit('setTribunalesColegiadosFail');
    });
};

export const postTribunalColegiado = ({ commit }, object) => {
  commit('setTribunalesColegiadosRequest');
  return sidjbridge.post('v1/tribunales-colegiados', object)
    .then((response) => {
      commit('addTribunalColegiado', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTribunalesColegiadosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postTribunalColegiado', response);
      commit('setTribunalColegiadoFail', object);
    });
};

export const putTribunalColegiado = ({ commit }, object) => {
  commit('setTribunalColegiadoRequest', object);
  return sidjbridge.put(`v1/tribunales-colegiados/${object.id}`, object)
    .then((response) => {
      commit('setTribunalColegiado', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putTribunalColegiado', response);
      commit('setTribunalColegiadoFail', object);
    });
};

export const deleteTribunalColegiado = ({ commit }, object) => {
  commit('setTribunalColegiadoRequest', object);
  return sidjbridge.delete(`v1/tribunales-colegiados/${object.id}`, object)
    .then(() => {
      commit('setTribunalColegiado', object);
    })
    .catch((response) => {
      console.error('deleteTribunalColegiado', response);
      commit('setTribunalColegiadoFail', object);
    });
};
