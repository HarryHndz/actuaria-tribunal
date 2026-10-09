import sidjbridge from '../../boot/sidjbridge';

export const fetchAllTiposDocumentosCorrespondencia = ({ state, commit }, params = {}) => {
  commit('setTiposDocumentosCorrespondenciaRequest');
  commit('setTiposDocumentosCorrespondenciaFilters', params);
  return sidjbridge.get('v1/catalogos/tipos/documentos-correspondencia', state.filters)
    .then((response) => {
      commit('setTiposDocumentosCorrespondencia', response.data.data);
      commit('setTiposDocumentosCorrespondenciaPagination', response.data.meta.pagination);
      commit('setTiposDocumentosCorrespondenciaSuccess');
    })
    .catch((response) => {
      console.error('fetchAllTiposDocumentosCorrespondencia', response);
      commit('setTiposDocumentosCorrespondenciaFail');
    });
};

export const fetchTipoDocumentoCorrespondencia = ({ commit }, id) => {
  commit('setTiposDocumentosCorrespondenciaRequest');
  return sidjbridge.get('v1/catalogos/tipos/documentos-correspondencia', id)
    .then((response) => {
      commit('addTipoDocumentoCorrespondencia', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposDocumentosCorrespondenciaSuccess');
    })
    .catch((response) => {
      console.error('fetchTipoDocumentoCorrespondencia', response);
      commit('setTiposDocumentosCorrespondenciaFail');
    });
};

export const postTipoDocumentoCorrespondencia = ({ commit }, object) => {
  commit('setTiposDocumentosCorrespondenciaRequest');
  return sidjbridge.post('v1/catalogos/tipos/documentos-correspondencia', object)
    .then((response) => {
      commit('addTipoDocumentoCorrespondencia', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposDocumentosCorrespondenciaSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postTipoDocumentoCorrespondencia', response);
      commit('setTipoDocumentoCorrespondenciaFail', object);
    });
};

export const putTipoDocumentoCorrespondencia = ({ commit }, object) => {
  commit('setTipoDocumentoCorrespondenciaRequest', object);
  return sidjbridge.put(`v1/catalogos/tipos/documentos-correspondencia/${object.id}`, object)
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
  return sidjbridge.delete(`v1/catalogos/tipos/documentos-correspondencia/${object.id}`, object)
    .then(() => {
      commit('setTipoDocumentoCorrespondencia', object);
    })
    .catch((response) => {
      console.error('deleteTipoDocumentoCorrespondencia', response);
      commit('setTipoDocumentoCorrespondenciaFail', object);
    });
};
