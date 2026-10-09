import bridge from '../../boot/scobridge';

/* eslint camelcase: 0 */
export const addCita = item => ({
  ...item,
  error: false,
  fetching: false,
});

export const addCitas = (items) => {
  if (items.length > 0) {
    return items.map(item => addCita(item));
  }
  return [];
};

export const fetchAllOficialiaCitas = ({ state, commit }, params = {}) => {
  commit('setOficialiaCitasRequest');
  commit('setOficialiaCitasFilters', params);
  return bridge.get('v1/oficialia-citas', {
    params: state.filters,
  })
    .then((response) => {
      const tramite = response.data.data;
      commit('setOficialiaCitas', addCitas(tramite));
      commit('setOficialiaCitasPagination', response.data.meta.pagination);
      commit('setOficialiaCitasSuccess');
      return Promise.resolve(tramite);
    })
    .catch((response) => {
      console.error('fetchAllOficialiaCitas', response);
      commit('setOficialiaCitasFail');
      return Promise.reject(response);
    });
};

export const fetchOficialiaCitas = ({ state, commit }, params = {}) => {
  commit('setOficialiaCitasRequest');
  commit('setOficialiaCitasFilters', params);
  return bridge.get(`v1/oficialia-citas/${params.id}`, {
    params: state.filters,
  })
    .then((response) => {
      const tramite = response.data.data;
      commit('addOficialiaCita', addCita(tramite));
      commit('setOficialiaCitasSuccess');
      return Promise.resolve(tramite);
    })
    .catch((response) => {
      console.error('fetchOficialiaCitas', response);
      commit('setOficialiaCitasFail');
      return Promise.reject(response);
    });
};

export const putOficialiaCita = ({ commit }, object) => {
  commit('setOficialiaCitaRequest', object);
  return bridge.put(`/v1/oficialia-citas/${object.id}`, object)
    .then((response) => {
      commit('setOficialiaCita', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putOficialiaCita', response);
      commit('setOficialiaCitaFail', object);
      return Promise.reject(response);
    });
};

export const deleteOficialiaCita = ({ commit }, object) => {
  commit('setOficialiaCitaRequest', object);
  return bridge.delete(`/v1/oficialia-citas/${object.id}`, object)
    .then(() => {
      commit('setOficialiaCitaDelete', object);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('deleteOficialiaCita', response);
      commit('setOficialiaCitaFail', object);
      return Promise.reject(response);
    });
};
