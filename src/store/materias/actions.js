import sidjbridge from '../../boot/sidjbridge';

export const fetchAllMaterias = ({ state, commit }, params = {}) => {
  commit('setMateriasRequest');
  commit('setMateriasFilters', params);

  const storage = window.localStorage;
  const data = JSON.parse(storage.getItem('materias'));

  if (params.cache && data !== null) {
    commit('setMaterias', data.data);
    commit('setMateriasPagination', data.meta.pagination);
    commit('setMateriasSuccess');
    return Promise.resolve(true);
  }

  return sidjbridge.get('/v1/materias', {
    params: state.filters,
  })
    .then((response) => {
      commit('setMaterias', response.data.data);
      commit('setMateriasPagination', response.data.meta.pagination);
      commit('setMateriasSuccess');
      if (params.cache) {
        storage.setItem('materias', JSON.stringify(response.data));
      }
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchAllMaterias', response);
      commit('setMateriasFail');
      return Promise.reject(false);
    });
};

export const fetchMateria = ({ commit }, id) => {
  commit('setMateriasRequest');
  return sidjbridge.get('/v1/materias', id)
    .then((response) => {
      commit('addMateria', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setMateriasSuccess');
    })
    .catch((response) => {
      console.error('fetchMateria', response);
      commit('setMateriasFail');
    });
};

export const postMateria = ({ commit }, object) => {
  commit('setMateriasRequest');
  return sidjbridge.post('/v1/materias', object)
    .then((response) => {
      commit('addMateria', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setMateriasSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postMateria', response);
      commit('setMateriaFail', object);
    });
};

export const putMateria = ({ commit }, object) => {
  commit('setMateriaRequest', object);
  return sidjbridge.put(`/v1/materias/${object.id}`, object)
    .then((response) => {
      commit('setMateria', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putMateria', response);
      commit('setMateriaFail', object);
    });
};

export const deleteMateria = ({ commit }, object) => {
  commit('setMateriaRequest', object);
  return sidjbridge.delete(`/v1/materias/${object.id}`, object)
    .then(() => {
      commit('setMateria', object);
    })
    .catch((response) => {
      console.error('deleteMateria', response);
      commit('setMateriaFail', object);
    });
};
