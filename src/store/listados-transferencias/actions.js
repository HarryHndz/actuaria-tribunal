import sidjbridge from '../../boot/sidjbridge';

export const fetchAllListadosTransferencias = ({ state, commit }, params = {}) => {
  commit('setListadosTransferenciasRequest');
  commit('setListadosTransferenciasFilters', params);
  return sidjbridge.get('v1/listados-transferencias', {
    params: state.filters,
  })
    .then((response) => {
      commit('setListadosTransferencias', response.data.data);
      commit('setListadosTransferenciasPagination', response.data.meta.pagination);
      commit('setListadosTransferenciasSuccess');
    })
    .catch((response) => {
      console.error('fetchAllListadosTransferencias', response);
      commit('setListadosTransferenciasFail');
    });
};

export const fetchListadoTransferencia = ({ commit }, id) => {
  commit('setListadosTransferenciasRequest');
  return sidjbridge.get('v1/listados-transferencias', id)
    .then((response) => {
      commit('addListadoTransferencia', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setListadosTransferenciasSuccess');
    })
    .catch((response) => {
      console.error('fetchListadoTransferencia', response);
      commit('setListadosTransferenciasFail');
    });
};

export const postListadoTransferencia = ({ commit }, object) => {
  commit('setListadosTransferenciasRequest');
  return sidjbridge.post('v1/listados-transferencias', object)
    .then((response) => {
      commit('addListadoTransferencia', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setListadosTransferenciasSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postListadoTransferencia', response);
      commit('setListadoTransferenciaFail', object);
    });
};

export const putListadoTransferencia = ({ commit }, object) => {
  commit('setListadoTransferenciaRequest', object);
  return sidjbridge.put(`v1/listados-transferencias/${object.id}`, object)
    .then((response) => {
      commit('setListadoTransferencia', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putListadoTransferencia', response);
      commit('setListadoTransferenciaFail', object);
    });
};

export const deleteListadoTransferencia = ({ commit }, object) => {
  commit('setListadoTransferenciaRequest', object);
  return sidjbridge.delete(`v1/listados-transferencias/${object.id}`, object)
    .then(() => {
      commit('setListadoTransferencia', object);
    })
    .catch((response) => {
      console.error('deleteListadoTransferencia', response);
      commit('setListadoTransferenciaFail', object);
    });
};
