import sidjbridge from '../../boot/sidjbridge';

export const fetchAllActuaciones = ({
  state,
  commit,
}, params = {}) => {
  commit('setActuacionesRequest');
  commit('setActuacionesFilters', params);
  return sidjbridge.get('v1/actuaciones', {
    params: state.filters,
  })
    .then((response) => {
      const object = response.data.data;
      commit('setActuaciones', object);
      commit('actores/setActores', object.reduce((prev, next) => prev.concat(next.actor ? next.actor.data : []), []), {
        root: true,
      });
      commit('autoridades/setAutoridades', object.reduce((prev, next) => prev.concat(next.autoridad ? next.autoridad.data : []), []), {
        root: true,
      });
      commit('expedientes/setExpedientes', object.reduce((prev, next) => prev.concat(next.expediente ? next.expediente.data : []), []), {
        root: true,
      });
      commit('terceros/setTerceros', object.reduce((prev, next) => prev.concat(next.terceroperjudicado ? next.terceroperjudicado.data : []), []), {
        root: true,
      });
      commit('setActuacionesPagination', response.data.meta.pagination);
      commit('setActuacionesSuccess');

      return object;
    })
    .catch((response) => {
      console.error('fetchAllActuaciones', response);
      commit('setActuacionesFail');

      return Promise.reject(true);
    });
};

export const fetchActuacion = ({
  commit,
}, id) => {
  commit('setActuacionesRequest');
  return sidjbridge.get('v1/actuaciones', id)
    .then((response) => {
      commit('addActuacion', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setActuacionesSuccess');
    })
    .catch((response) => {
      console.error('fetchActuacion', response);
      commit('setActuacionesFail');
    });
};

export const postActuacion = ({
  commit,
}, object) => {
  commit('setActuacionesRequest');
  return sidjbridge.post('v1/actuaciones', object)
    .then((response) => {
      commit('addActuacion', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setActuacionesSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postActuacion', response);
      commit('setActuacionFail', object);
    });
};

export const putActuacion = ({
  commit,
}, object) => {
  commit('setActuacionRequest', object);
  return sidjbridge.put(`v1/actuaciones/${object.id}`, object)
    .then((response) => {
      commit('setActuacion', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putActuacion', response);
      commit('setActuacionFail', object);
    });
};

export const deleteActuacion = ({
  commit,
}, object) => {
  commit('setActuacionRequest', object);
  return sidjbridge.delete(`v1/actuaciones/${object.id}`, object)
    .then(() => {
      commit('setActuacion', object);
    })
    .catch((response) => {
      console.error('deleteActuacion', response);
      commit('setActuacionFail', object);
    });
};
