import sidjbridge from '../../boot/sidjbridge';

/* eslint camelcase: 0 */
export const addProceso = (item) => {
  const tipos_acuerdos = item.tipos_acuerdos ? item.tipos_acuerdos.data.map(a => a.id) : [];
  return {
    ...item,
    tipos_acuerdos,
    error: false,
    fetching: false,
  };
};

export const addProcesos = (items) => {
  if (items.length > 0) {
    return items.map(item => addProceso(item));
  }
  return [];
};

export const fetchAllProcesos = ({ state, commit }, params = {}) => {
  commit('setProcesosRequest');
  commit('setProcesosFilters', params);

  const storage = window.localStorage;
  const data = JSON.parse(storage.getItem('estados-procesales'));

  if (params.cache && data !== null) {
    commit('setProcesos', addProcesos(data.data));
    commit('setProcesosPagination', data.meta.pagination);
    commit('setProcesosSuccess');
    return Promise.resolve(true);
  }

  return sidjbridge.get('/v1/catalogos/estados-procesales', {
    params: state.filters,
  })
    .then((response) => {
      commit('setProcesos', addProcesos(response.data.data));
      commit('setProcesosPagination', response.data.meta.pagination);
      commit('setProcesosSuccess');
      if (params.cache) {
        storage.setItem('estados-procesales', JSON.stringify(response.data));
      }
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchAllProcesos', response);
      commit('setProcesosFail');
      return Promise.reject(false);
    });
};

export const fetchProceso = ({ commit }, id) => {
  commit('setProcesosRequest');
  return sidjbridge.get('/v1/catalogos/estados-procesales', id)
    .then((response) => {
      commit('addProceso', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setProcesosSuccess');
    })
    .catch((response) => {
      console.error('fetchProceso', response);
      commit('setProcesosFail');
    });
};

export const postProceso = ({ commit }, object) => {
  commit('setProcesosRequest');
  return sidjbridge.post('/v1/catalogos/estados-procesales', object)
    .then((response) => {
      commit('addProceso', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setProcesosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postProceso', response);
      commit('setProcesoFail', object);
    });
};

export const putProceso = ({ commit }, object) => {
  commit('setProcesoRequest', object);
  return sidjbridge.put(`/v1/catalogos/estados-procesales/${object.id}`, object)
    .then((response) => {
      commit('setProceso', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putProceso', response);
      commit('setProcesoFail', object);
    });
};

export const deleteProceso = ({ commit }, object) => {
  commit('setProcesoRequest', object);
  return sidjbridge.delete(`/v1/catalogos/estados-procesales/${object.id}`, object)
    .then(() => {
      commit('setProceso', object);
    })
    .catch((response) => {
      console.error('deleteProceso', response);
      commit('setProcesoFail', object);
    });
};
