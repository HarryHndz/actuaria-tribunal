import sidjbridge from '../../boot/sidjbridge';

export const fetchAllExhortos = ({ state, commit }, params = {}) => {
  commit('setExhortosRequest');
  commit('setExhortosFilters', params);
  return sidjbridge.get('v1/exhortos', state.filters)
    .then((response) => {
      commit('setExhortos', response.data.data);
      commit('setExhortosPagination', response.data.meta.pagination);
      commit('setExhortosSuccess');
    })
    .catch((response) => {
      console.error('fetchAllExhortos', response);
      commit('setExhortosFail');
    });
};

export const fetchExhorto = ({ commit }, id) => {
  commit('setExhortosRequest');
  return sidjbridge.get('v1/exhortos', id)
    .then((response) => {
      commit('addExhorto', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setExhortosSuccess');
    })
    .catch((response) => {
      console.error('fetchExhorto', response);
      commit('setExhortosFail');
    });
};

export const postExhorto = ({ commit }, object) => {
  commit('setExhortosRequest');
  return sidjbridge.post('v1/exhortos', object)
    .then((response) => {
      commit('addExhorto', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setExhortosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postExhorto', response);
      commit('setExhortoFail', object);
    });
};

export const putExhorto = ({ commit }, object) => {
  commit('setExhortoRequest', object);
  return sidjbridge.put(`v1/exhortos/${object.id}`, object)
    .then((response) => {
      commit('setExhorto', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putExhorto', response);
      commit('setExhortoFail', object);
    });
};

export const deleteExhorto = ({ commit }, object) => {
  commit('setExhortoRequest', object);
  return sidjbridge.delete(`v1/exhortos/${object.id}`, object)
    .then(() => {
      commit('setExhorto', object);
    })
    .catch((response) => {
      console.error('deleteExhorto', response);
      commit('setExhortoFail', object);
    });
};
