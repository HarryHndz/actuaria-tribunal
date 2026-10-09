import sidjbridge from '../../boot/sidjbridge';

export const fetchAllDiasInhabiles = ({ state, commit }, params = {}) => {
  commit('setDiasInhabilesRequest');
  commit('setDiasInhabilesFilters', params);
  return sidjbridge.get('v1/dias-inhabiles', {
    params: state.filters,
  })
    .then((response) => {
      commit('setDiasInhabiles', response.data.data);
      commit('setDiasInhabilesPagination', response.data.meta.pagination);
      commit('setDiasInhabilesSuccess');
      return Promise.resolve(response.data.data);
    })
    .catch((response) => {
      console.error('fetchAllDiasInhabiles', response);
      commit('setDiasInhabilesFail');
      return Promise.reject(response);
    });
};

export const fetchDiaInhabil = ({ commit }, id) => {
  commit('setDiasInhabilesRequest');
  return sidjbridge.get('v1/dias-inhabiles', id)
    .then((response) => {
      commit('addDiaInhabil', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setDiasInhabilesSuccess');
    })
    .catch((response) => {
      console.error('fetchDiaInhabil', response);
      commit('setDiasInhabilesFail');
    });
};

export const postDiaInhabil = ({ commit }, object) => {
  commit('setDiasInhabilesRequest');
  return sidjbridge.post('v1/dias-inhabiles', object)
    .then((response) => {
      commit('addDiaInhabil', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setDiasInhabilesSuccess');
      return Promise.resolve({
        ...response.data.data,
        fetching: false,
        error: false,
      });
    })
    .catch((response) => {
      console.error('postDiaInhabil', response);
      commit('setDiaInhabilFail', object);
      return Promise.reject(response);
    });
};

export const putDiaInhabil = ({ commit }, object) => {
  commit('setDiaInhabilRequest', object);
  return sidjbridge.put(`v1/dias-inhabiles/${object.id}`, object)
    .then((response) => {
      commit('setDiaInhabil', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putDiaInhabil', response);
      commit('setDiaInhabilFail', object);
      return Promise.reject(response);
    });
};

export const deleteDiaInhabil = ({ commit }, object) => {
  commit('setDiaInhabilRequest', object);
  return sidjbridge.delete(`v1/dias-inhabiles/${object.id}`, object)
    .then(() => {
      commit('setDiaInhabilDelete', object);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('deleteDiaInhabil', response);
      commit('setDiaInhabilFail', object);
      return Promise.reject(response);
    });
};
