import sidjbridge from '../../boot/sidjbridge';

export const fetchAllArchivos = ({ state, commit }, params = {}) => {
  commit('setArchivosRequest');
  commit('setArchivosFilters', params);
  return sidjbridge.get('v1/archivos', state.filters)
    .then((response) => {
      commit('setArchivos', response.data.data);
      commit('setArchivosPagination', response.data.meta.pagination);
      commit('setArchivosSuccess');
    })
    .catch((response) => {
      console.error('fetchAllArchivos', response);
      commit('setArchivosFail');
    });
};

export const fetchArchivo = ({ commit }, id) => {
  commit('setArchivosRequest');
  return sidjbridge.get('v1/archivos', id)
    .then((response) => {
      commit('addArchivo', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setArchivosSuccess');
    })
    .catch((response) => {
      console.error('fetchArchivo', response);
      commit('setArchivosFail');
    });
};

export const postArchivo = ({ commit }, object) => {
  commit('setArchivosRequest');
  return sidjbridge.post('v1/archivos', object)
    .then((response) => {
      commit('addArchivo', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setArchivosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postArchivo', response);
      commit('setArchivoFail', object);
    });
};

export const putArchivo = ({ commit }, object) => {
  commit('setArchivoRequest', object);
  return sidjbridge.put(`v1/archivos/${object.id}`, object)
    .then((response) => {
      commit('setArchivo', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putArchivo', response);
      commit('setArchivoFail', object);
    });
};

export const deleteArchivo = ({ commit }, object) => {
  commit('setArchivoRequest', object);
  return sidjbridge.delete(`v1/archivos/${object.id}`, object)
    .then(() => {
      commit('setArchivo', object);
    })
    .catch((response) => {
      console.error('deleteArchivo', response);
      commit('setArchivoFail', object);
    });
};

export const postArchivosTemporales = ({
  commit,
}, object) => {
  commit('setArchivosRequest');
  return sidjbridge.post('v1/archivos-temporales', object)
    .then((response) => {
      commit('setArchivosSuccess');
      return Promise.resolve(response);
    })
    .catch((response) => {
      console.error('archivos-temporales', response);
      commit('setArchivoFail', object);
      return Promise.reject(response);
    });
};

export const postArchivosPlantillasTemporales = ({
  commit,
}, object) => {
  commit('setArchivosRequest');
  return sidjbridge.post('v1/archivos-plantillas-temporales', object)
    .then((response) => {
      commit('setArchivosSuccess');
      return Promise.resolve(response);
    })
    .catch((response) => {
      console.error('archivos-temporales', response);
      commit('setArchivoFail', object);
      return Promise.reject(response);
    });
};
