import sidjbridge from '../../boot/sidjbridge';

export const fetchAllListadosAcuerdos = ({ state, commit }, params = {}) => {
  commit('setListadosAcuerdosRequest');
  commit('setListadosAcuerdosFilters', params);
  return sidjbridge.get('v1/listados-acuerdos', {
    params: state.filters,
  })
    .then((response) => {
      commit('setListadosAcuerdos', response.data.data);
      commit('setListadosAcuerdosPagination', response.data.meta.pagination);
      commit('setListadosAcuerdosSuccess');
      return Promise.resolve(response.data.data);
    })
    .catch((response) => {
      console.error('fetchAllListadosAcuerdos', response);
      commit('setListadosAcuerdosFail');
      return Promise.reject(response);
    });
};

export const fetchListadoAcuerdo = ({ commit }, id) => {
  commit('setListadosAcuerdosRequest');
  return sidjbridge.get('v1/listados-acuerdos', id)
    .then((response) => {
      commit('addListadoAcuerdo', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setListadosAcuerdosSuccess');
    })
    .catch((response) => {
      console.error('fetchListadoAcuerdo', response);
      commit('setListadosAcuerdosFail');
    });
};

export const postListadoAcuerdo = ({ commit }, object) => {
  commit('setListadosAcuerdosRequest');
  return sidjbridge.post('v1/listados-acuerdos', object)
    .then((response) => {
      commit('addListadoAcuerdo', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setListadosAcuerdosSuccess');
      return Promise.resolve({
        ...response.data.data,
        fetching: false,
        error: false,
      });
    })
    .catch((response) => {
      console.error('postListadoAcuerdo', response);
      commit('setListadoAcuerdoFail', object);
      return Promise.reject(response);
    });
};

export const putListadoAcuerdo = ({ commit }, object) => {
  commit('setListadoAcuerdoRequest', object);
  return sidjbridge.put(`v1/listados-acuerdos/${object.id}`, object)
    .then((response) => {
      commit('setListadoAcuerdo', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putListadoAcuerdo', response);
      commit('setListadoAcuerdoFail', object);
      return Promise.reject(response);
    });
};

export const deleteListadoAcuerdo = ({ commit }, object) => {
  commit('setListadoAcuerdoRequest', object);
  return sidjbridge.delete(`v1/listados-acuerdos/${object.id}`, object)
    .then(() => {
      commit('setListadoAcuerdoDelete', object);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('deleteListadoAcuerdo', response);
      commit('setListadoAcuerdoFail', object);
      return Promise.reject(response);
    });
};

export const setListadoReenvio = ({ commit }, listado = []) => {
  commit('listadoReenvioAdd', listado);
};
export const setListadoEnviado = ({ commit }, listado = []) => {
  commit('listadoEnviadoAdd', listado);
};
export const resetListadoEnviado = ({ commit }) => {
  commit('listadoEnviadoReset');
};
export const deleteListadoEnviado = ({ commit }, index) => {
  commit('deleteListadoEnviado', index);
};
