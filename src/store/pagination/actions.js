import sidjbridge from '../../boot/sidjbridge';

export const getPaginationDocumentosPdf = async ({ commit }, params = {}) => {
  commit('setPaginationRequest');
  try {
    const response = await sidjbridge.get(`/descargas/documentosB64/${params.id}/${params.page ? params.page : 1}`);
    commit('setPaginationSuccess');
    commit('setPagination', {
      ...response.data,
      base64: null,
      id: params.id,
      nombreDocumento: params.nombreDocumento,
    });
    return Promise.resolve(response.data);
  } catch (error) {
    commit('setPaginationFail');
    return Promise.reject(error);
  }
};

export const nextPage = ({ commit }) => {
  commit('setPaginationRequest');
  commit('nextPage');
  commit('setPaginationSuccess');
};
export const prevPage = ({ commit }) => {
  commit('setPaginationRequest');
  commit('prevPage');
  commit('setPaginationSuccess');
};
export const setPage = ({ commit }, page = 1) => {
  commit('setPaginationRequest');
  commit('setPage', page);
  commit('setPaginationSuccess');
};
