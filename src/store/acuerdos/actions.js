import sidjbridge from '../../boot/sidjbridge';

export const fetchAllAcuerdos = async ({ state, commit }, params = {}) => {
  commit('setAcuerdosRequest');
  commit('setAcuerdosFilters', params);
  try {
    const response = await sidjbridge.get('v1/acuerdos', {
      params: state.filters,
    });
    commit('setAcuerdos', response.data.data);
    commit('setAcuerdosPagination', response.data.meta.pagination);
    commit('setAcuerdosSuccess');
    return Promise.resolve(response.data.data);
  } catch (err) {
    console.error('fetchAllAcuerdos', err);
    commit('setAcuerdosFail');
    return Promise.reject(err);
  }
};

export const fetchAcuerdo = async ({ commit }, id) => {
  commit('setAcuerdosRequest');
  try {
    const response = await sidjbridge.get('v1/acuerdos', id);
    commit('addAcuerdo', {
      ...response.data.data,
      fetching: false,
      error: false,
    });
    commit('setAcuerdosSuccess');
    return Promise.resolve(response.data.data);
  } catch (err) {
    console.error('fetchAcuerdo', err);
    commit('setAcuerdosFail');
    return Promise.reject(err);
  }
};

export const postAcuerdo = async ({ commit }, object) => {
  commit('setAcuerdosRequest');
  try {
    const response = await sidjbridge.post('v1/acuerdos', object);
    commit('addAcuerdo', {
      ...response.data.data,
      fetching: false,
      error: false,
    });
    commit('setAcuerdosSuccess');
    return Promise.resolve(response.data.data);
  } catch (err) {
    console.error('postAcuerdo', err);
    commit('setAcuerdoFail', object);
    return Promise.reject(err);
  }
};

export const putAcuerdo = async ({ commit }, object) => {
  commit('setAcuerdoRequest', object);
  try {
    const response = await sidjbridge.put(`v1/acuerdos/${object.id}`, object);
    commit('setAcuerdo', response.data.data);
    return Promise.resolve(response.data.data);
  } catch (err) {
    console.error('putAcuerdo', err);
    commit('setAcuerdoFail', object);
    return Promise.reject(err);
  }
};

export const deleteAcuerdo = async ({ commit }, object) => {
  commit('setAcuerdoRequest', object);
  try {
    await sidjbridge.delete(`v1/acuerdos/${object.id}`, object);
    commit('setAcuerdo', object);
    return Promise.resolve(object);
  } catch (err) {
    console.error('deleteAcuerdo', err);
    commit('setAcuerdoFail', object);
    return Promise.reject(err);
  }
};
