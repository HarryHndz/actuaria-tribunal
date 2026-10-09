import sidjbridge from '../../boot/sidjbridge';

export const fetchAllCjfDocumentos = ({ state, commit }, params = {}) => {
  commit('setCjfDocumentosRequest');
  commit('setCjfDocumentosFilters', params);
  return sidjbridge.get('v1/cjf-documentos', state.filters)
    .then((response) => {
      commit('setCjfDocumentos', response.data.data);
      commit('setCjfDocumentosPagination', response.data.meta.pagination);
      commit('setCjfDocumentosSuccess');
    })
    .catch((response) => {
      console.error('fetchAllCjfDocumentos', response);
      commit('setCjfDocumentosFail');
    });
};

export const fetchCjfDocumento = ({ commit }, id) => {
  commit('setCjfDocumentosRequest');
  return sidjbridge.get('v1/cjf-documentos', id)
    .then((response) => {
      commit('addCjfDocumento', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setCjfDocumentosSuccess');
    })
    .catch((response) => {
      console.error('fetchCjfDocumento', response);
      commit('setCjfDocumentosFail');
    });
};

export const postCjfDocumento = ({ commit }, object) => {
  commit('setCjfDocumentosRequest');
  return sidjbridge.post('v1/cjf-documentos', object)
    .then((response) => {
      commit('addCjfDocumento', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setCjfDocumentosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postCjfDocumento', response);
      commit('setCjfDocumentoFail', object);
    });
};

export const putCjfDocumento = ({ commit }, object) => {
  commit('setCjfDocumentoRequest', object);
  return sidjbridge.put(`v1/cjf-documentos/${object.id}`, object)
    .then((response) => {
      commit('setCjfDocumento', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putCjfDocumento', response);
      commit('setCjfDocumentoFail', object);
    });
};

export const deleteCjfDocumento = ({ commit }, object) => {
  commit('setCjfDocumentoRequest', object);
  return sidjbridge.delete(`v1/cjf-documentos/${object.id}`, object)
    .then(() => {
      commit('setCjfDocumento', object);
    })
    .catch((response) => {
      console.error('deleteCjfDocumento', response);
      commit('setCjfDocumentoFail', object);
    });
};
