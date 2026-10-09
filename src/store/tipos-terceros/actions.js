import sidjbridge from 'boot/sidjbridge';

export const fetchAllTiposTerceros = async ({ state, commit }, params = {}) => {
  commit('setTiposTercerosRequest');
  commit('setTiposTercerosFilters', params);

  const storage = window.sessionStorage;
  const data = JSON.parse(storage.getItem('tipos-terceros'));

  if (params.cache && data !== null) {
    commit('setTiposTerceros', data.data);
    commit('setTiposTercerosPagination', data.meta.pagination);
    commit('setTiposTercerosSuccess');
    return Promise.resolve(true);
  }

  try {
    const response = await sidjbridge.get('v1/catalogos/tipos/terceros', {
      params: state.filters,
    });
    commit('setTiposTerceros', response.data.data);
    commit('setTiposTercerosPagination', response.data.meta.pagination);
    commit('setTiposTercerosSuccess');

    if (params.cache) {
      storage.setItem('tipos-terceros', JSON.stringify(response.data));
    }

    return Promise.resolve(true);
  } catch (err) {
    commit('setTiposTercerosFail');
    return Promise.reject(err);
  }
};

export const fetchTipoTercero = async ({ commit }, id) => {
  commit('setTiposTercerosRequest');
  try {
    const response = await sidjbridge.get('v1/catalogos/tipos/terceros', id);
    commit('addTipoTercero', {
      ...response.data.data,
      fetching: false,
      error: false,
    });
    commit('setTiposTercerosSuccess');
    return Promise.resolve(true);
  } catch (err) {
    commit('setTiposTercerosFail');
    return Promise.reject(err);
  }
};

export const postTipoTercero = async ({ commit }, object) => {
  commit('setTiposTercerosRequest');
  try {
    const response = await sidjbridge.post('v1/catalogos/tipos/terceros', object);
    commit('addTipoTercero', {
      ...response.data.data,
      fetching: false,
      error: false,
    });
    commit('setTiposTercerosSuccess');
    return Promise.resolve(true);
  } catch (err) {
    commit('setTipoTerceroFail', object);
    return Promise.reject(err);
  }
};

export const putTipoTercero = async ({ commit }, object) => {
  commit('setTipoTerceroRequest', object);
  try {
    const response = await sidjbridge.put(`v1/catalogos/tipos/terceros/${object.id}`, object);
    commit('setTipoTercero', response.data.data);
    return Promise.resolve(true);
  } catch (err) {
    commit('setTipoTerceroFail', object);
    return Promise.reject(err);
  }
};

export const deleteTipoTercero = async ({ commit }, object) => {
  commit('setTipoTerceroRequest', object);
  try {
    await sidjbridge.delete(`v1/catalogos/tipos/terceros/${object.id}`, object);
    commit('setTipoTercero', object);
    return Promise.resolve(true);
  } catch (err) {
    commit('setTipoTerceroFail', object);
    return Promise.reject(err);
  }
};
