import sidjbridge from '../../boot/sidjbridge';
// checar
export const fetchAllDocumentos = ({ commit }, params = {}) => {
  commit('setDocumentosRequest');
  commit('setDocumentosFilters', params);

  return sidjbridge.get('v1/documentos', {
    params,
  })
    .then((response) => {
      commit('setDocumentos', response.data.data);
      commit('setDocumentosPagination', response.data.meta.pagination);
      commit('setDocumentosSuccess');
    })
    .catch((response) => {
      console.error('fetchAllDocumentos', response);
      commit('setDocumentosFail');
    });
};

export const fetchDocumento = ({ commit }, id) => {
  commit('setDocumentosRequest');
  return sidjbridge.get('v1/documentos', id)
    .then((response) => {
      commit('addDocumento', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setDocumentosSuccess');
    })
    .catch((response) => {
      console.error('fetchDocumento', response);
      commit('setDocumentosFail');
    });
};

export const postDocumento = ({ commit }, object) => {
  commit('setDocumentosRequest');
  return sidjbridge.post('v1/documentos', object)
    .then((response) => {
      commit('addDocumento', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setDocumentosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postDocumento', response);
      commit('setDocumentoFail', object);
      return Promise.reject(response);
    });
};

export const putDocumento = ({ commit }, object) => {
  commit('setDocumentoRequest', object);
  return sidjbridge.put(`v1/documentos/${object.id}`, object)
    .then((response) => {
      commit('setDocumento', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putDocumento', response);
      commit('setDocumentoFail', object);
    });
};

export const deleteDocumento = ({ commit }, object) => {
  commit('setDocumentoRequest', object);
  return sidjbridge.delete(`v1/documentos/${object.id}`)
    .then(() => {
      commit('setDocumentoDelete', object);
    })
    .catch((response) => {
      console.error('deleteDocumento', response);
      commit('setDocumentoFail', object);
    });
};

export const postDocumentosTemporales = ({ commit }, object, headers) => {
  commit('setDocumentosRequest');
  return sidjbridge.post('v1/documentos-temporales', object, headers)
    .then((response) => {
      commit('setDocumentosSuccess');
      return Promise.resolve(response);
    })
    .catch((response) => {
      console.error('documentos-temporales', response);
      commit('setDocumentoFail', object);
      return Promise.reject(response);
    });
};
