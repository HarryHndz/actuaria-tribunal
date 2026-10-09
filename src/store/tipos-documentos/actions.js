import sidjbridge from '../../boot/sidjbridge';

export const fetchAllTiposDocumentos = ({ state, commit }, params = {}) => {
  commit('setTiposDocumentosRequest');
  commit('setTiposDocumentosFilters', params);

  const storage = window.localStorage;
  const data = JSON.parse(storage.getItem('tipos-documentos'));

  if (params.cache && data !== null) {
    commit('setTiposDocumentos', data.data);
    commit('setTiposDocumentosPagination', data.meta.pagination);
    commit('setTiposDocumentosSuccess');
    return Promise.resolve(true);
  }

  return sidjbridge.get('v1/catalogos/tipos/documentos', {
    params: state.filters,
  })
    .then((response) => {
      commit('setTiposDocumentos', response.data.data);
      commit('setTiposDocumentosPagination', response.data.meta.pagination);
      commit('setTiposDocumentosSuccess');
      if (params.cache) {
        storage.setItem('tipos-documentos', JSON.stringify(response.data));
      }
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchAllTiposDocumentos', response);
      commit('setTiposDocumentosFail');
      return Promise.reject(false);
    });
};

export const fetchTipoDocumentoCorrespondencia = ({ commit }, id) => {
  commit('setTiposDocumentosRequest');
  return sidjbridge.get('v1/catalogos/tipos/documentos', id)
    .then((response) => {
      commit('addTipoDocumentoCorrespondencia', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposDocumentosSuccess');
    })
    .catch((response) => {
      console.error('fetchTipoDocumentoCorrespondencia', response);
      commit('setTiposDocumentosFail');
    });
};

export const postTipoDocumentoCorrespondencia = ({ commit }, object) => {
  commit('setTiposDocumentosRequest');
  return sidjbridge.post('v1/catalogos/tipos/documentos', object)
    .then((response) => {
      commit('addTipoDocumentoCorrespondencia', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposDocumentosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postTipoDocumentoCorrespondencia', response);
      commit('setTipoDocumentoCorrespondenciaFail', object);
    });
};

export const putTipoDocumentoCorrespondencia = ({ commit }, object) => {
  commit('setTipoDocumentoCorrespondenciaRequest', object);
  return sidjbridge.put(`v1/catalogos/tipos/documentos/${object.id}`, object)
    .then((response) => {
      commit('setTipoDocumentoCorrespondencia', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putTipoDocumentoCorrespondencia', response);
      commit('setTipoDocumentoCorrespondenciaFail', object);
    });
};

export const deleteTipoDocumentoCorrespondencia = ({ commit }, object) => {
  commit('setTipoDocumentoCorrespondenciaRequest', object);
  return sidjbridge.delete(`v1/catalogos/tipos/documentos/${object.id}`, object)
    .then(() => {
      commit('setTipoDocumentoCorrespondencia', object);
    })
    .catch((response) => {
      console.error('deleteTipoDocumentoCorrespondencia', response);
      commit('setTipoDocumentoCorrespondenciaFail', object);
    });
};
