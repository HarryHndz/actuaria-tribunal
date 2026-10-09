import sidjbridge from '../../boot/sidjbridge';

export const fetchAllAutoridades = async ({ commit }, params = {}) => {
  commit('setAutoridadesRequest');
  commit('setAutoridadesFilters', params);
  try {
    const response = await sidjbridge.get('v1/autoridades', {
      params,
    });
    commit('setAutoridades', response.data.data);
    commit('setAutoridadesPagination', response.data.meta.pagination);
    commit('setAutoridadesSuccess');
    return Promise.resolve(true);
  } catch (err) {
    console.error('fetchAllAutoridades', err);
    commit('setAutoridadesFail');
    return Promise.reject(err);
  }
};

export const fetchAutoridad = async ({ commit }, id) => {
  commit('setAutoridadesRequest');
  try {
    const response = await sidjbridge.get('v1/autoridades', id);
    commit('addAutoridad', {
      ...response.data.data,
      fetching: false,
      error: false,
    });
    commit('setAutoridadesSuccess');
    return Promise.resolve(true);
  } catch (err) {
    console.error('fetchAutoridad', err);
    commit('setAutoridadesFail');
    return Promise.reject(err);
  }
};

export const postAutoridad = async ({ commit }, object) => {
  commit('setAutoridadesRequest');
  try {
    const response = await sidjbridge.post('v1/autoridades', object);
    commit('addAutoridad', {
      ...response.data.data,
      fetching: false,
      error: false,
    });
    commit('setAutoridadesSuccess');
    return Promise.resolve(true);
  } catch (err) {
    console.error('postAutoridad', err);
    commit('setAutoridadFail', object);
    return Promise.reject(err);
  }
};

export const putAutoridad = async ({ commit }, object) => {
  commit('setAutoridadRequest', object);
  try {
    const response = await sidjbridge.put(`v1/autoridades/${object.id}`, object);
    commit('setAutoridad', response.data.data);
    return Promise.resolve(true);
  } catch (err) {
    console.error('putAutoridad', err);
    commit('setAutoridadFail', object);
    return Promise.reject(err);
  }
};

export const deleteAutoridad = async ({ commit }, object) => {
  commit('setAutoridadRequest', object);
  try {
    await sidjbridge.delete(`v1/autoridades/${object.id}`, object);
    commit('setAutoridadDelete', object);
    return Promise.resolve(true);
  } catch (err) {
    console.error('deleteAutoridad', err);
    commit('setAutoridadFail', object);
    return Promise.reject(err);
  }
};
