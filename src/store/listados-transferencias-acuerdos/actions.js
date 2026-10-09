import sidjbridge from '../../boot/sidjbridge';

export const fetchAllListadosTransferenciasAcuerdos = ({ state, commit }, params = {}) => {
  commit('setListadosTransferenciasAcuerdosRequest');
  commit('setListadosTransferenciasAcuerdosFilters', params);
  return sidjbridge.get('v1/listados-transferencias-acuerdos', {
    params: state.filters,
  })
    .then((response) => {
      commit('setListadosTransferenciasAcuerdos', response.data.data);
      commit('setListadosTransferenciasAcuerdosPagination', response.data.meta.pagination);
      commit('setListadosTransferenciasAcuerdosSuccess');
      return Promise.resolve(response.data.data);
    })
    .catch((response) => {
      console.error('fetchAllListadosTransferenciasAcuerdos', response);
      commit('setListadoTransferenciaAcuerdoFail');
      return Promise.reject(response);
    });
};

export const fetchListadoTransferenciaAcuerdo = ({ commit }, id) => {
  commit('setListadosTransferenciasAcuerdosRequest');
  return sidjbridge.get('v1/listados-transferencias-acuerdos', id)
    .then((response) => {
      commit('addListadoTransferenciaAcuerdo', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setListadosTransferenciasAcuerdosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchListadoTransferenciaAcuerdo', response);
      commit('setListadoTransferenciasAcuerdosFail');
      return Promise.reject(true);
    });
};

export const postListadoTransferenciaAcuerdo = ({ commit }, object) => {
  commit('setListadosTransferenciasAcuerdosRequest');
  return sidjbridge.post('v1/listados-transferencias-acuerdos', object)
    .then((response) => {
      commit('addListadoTransferenciaAcuerdo', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setListadosTransferenciasAcuerdosSuccess');
      return Promise.resolve({
        ...response.data.data,
        fetching: false,
        error: false,
      });
    })
    .catch((response) => {
      console.error('postListadoTransferenciaAcuerdo', response);
      commit('setListadoTransferenciasAcuerdosFail', object);
      return Promise.reject(response);
    });
};

export const putListadoTransferenciaAcuerdo = ({ commit }, object) => {
  commit('setListadoTransferenciaAcuerdoRequest', object);
  return sidjbridge.put(`v1/listados-transferencias-acuerdos/${object.id}`, object)
    .then((response) => {
      commit('setListadoTransferenciaAcuerdo', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putListadoTransferenciaAcuerdo', response);
      commit('setListadoTransferenciasAcuerdosFail', object);
      return Promise.reject(response);
    });
};

export const deleteListadoTransferenciaAcuerdo = ({ commit }, object) => {
  commit('setListadoTransferenciaAcuerdoRequest', object);
  return sidjbridge.delete(`v1/listados-transferencias-acuerdos/${object.id}`, object)
    .then(() => {
      commit('setListadoTransferenciaAcuerdoDelete', object);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('deleteListadoTransferenciaAcuerdo', response);
      commit('setListadoTransferenciasAcuerdosFail', object);
      return Promise.reject(response);
    });
};

export const setListadoAcuerdoReenvio = ({ commit }, listado = []) => {
  commit('listadoAcuerdoReenvioAdd', listado);
};
export const setListadoAcuerdoEnviado = ({ commit }, listado = []) => {
  commit('listadoAcuerdoEnviadoAdd', listado);
};
export const resetListadoAcuerdoEnviado = ({ commit }) => {
  commit('listadoAcuerdoEnviadoReset');
};
export const deleteListadoAcuerdoEnviado = ({ commit }, index) => {
  commit('deleteListadoAcuerdoEnviado', index);
};
