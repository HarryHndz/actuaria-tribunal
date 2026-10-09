import sidjbridge from '../../boot/sidjbridge';

export const fetchAllPonencias = ({ state, commit }, params = {}) => {
  commit('setPonenciasRequest');
  commit('setPonenciasFilters', params);
  return sidjbridge.get('v1/ponencias', {
    params: state.filters,
  })
    .then((response) => {
      commit('setPonencias', response.data.data);
      commit('setPonenciasPagination', response.data.meta.pagination);
      commit('setPonenciasSuccess');
    })
    .catch((response) => {
      console.error('fetchAllPonencias', response);
      commit('setPonenciasFail');
    });
};

export const fetchPonencia = ({ commit }, id) => {
  commit('setPonenciasRequest');
  return sidjbridge.get('v1/ponencias', id)
    .then((response) => {
      commit('addPonencia', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setPonenciasSuccess');
    })
    .catch((response) => {
      console.error('fetchPonencia', response);
      commit('setPonenciasFail');
    });
};

export const postPonencia = ({ commit }, object) => {
  commit('setPonenciasRequest');
  return sidjbridge.post('v1/ponencias', object)
    .then((response) => {
      commit('addPonencia', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setPonenciasSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postPonencia', response);
      commit('setPonenciaFail', object);
    });
};

export const putPonencia = ({ commit }, object) => {
  commit('setPonenciaRequest', object);
  return sidjbridge.put(`v1/ponencias/${object.id}`, object)
    .then((response) => {
      commit('setPonencia', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putPonencia', response);
      commit('setPonenciaFail', object);
    });
};

export const deletePonencia = ({ commit }, object) => {
  commit('setPonenciaRequest', object);
  return sidjbridge.delete(`v1/ponencias/${object.id}`, object)
    .then(() => {
      commit('setPonencia', object);
    })
    .catch((response) => {
      console.error('deletePonencia', response);
      commit('setPonenciaFail', object);
    });
};
