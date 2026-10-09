import moment from 'moment';
import sidjbridge from 'boot/sidjbridge';

/* eslint camelcase: 0 */
export const addExpediente = (item) => {
  const actores = item.actores ? item.actores.data.map(a => a.id) : [];
  const autoridades = item.autoridades ? item.autoridades.data.map(b => b.id) : [];
  const autorizados = item.autorizados ? item.autorizados.data.map(c => c.id) : [];
  const representantes = item.representantes ? item.representantes.data.map(d => d.id) : [];
  const terceros_perjudicados = item.terceros_perjudicados
    ? item.terceros_perjudicados.data.map(e => e.id) : [];
  return {
    ...item,
    actores,
    autoridades,
    autorizados,
    representantes,
    terceros_perjudicados,
    error: false,
    fetching: false,
  };
};

export const addExpedientes = (items) => {
  if (items.length > 0) {
    return items.map(item => addExpediente(item));
  }
  return [];
};

export const fetchAllExpedientes = ({ state, commit }, params = {}) => {
  commit('setExpedientesRequest');
  commit('setExpedientesFilters', params);
  return sidjbridge.get('v1/expedientes', {
    params: state.filters,
  })
    .then((response) => {
      const expediente = response.data.data;

      commit('setExpedientes', addExpedientes(expediente));
      commit('actores/setActores', expediente.reduce((prev, next) => prev.concat(next.actores ? next.actores.data : []), []),
        { root: true });
      commit('autoridades/setAutoridades', expediente.reduce((prev, next) => prev.concat(next.autoridades ? next.autoridades.data : []), []), {
        root: true,
      });
      commit('terceros/setTerceros', expediente.reduce((prev, next) => prev.concat(next.terceros_perjudicados ? next.terceros_perjudicados.data : []), []),
        { root: true });
      commit('autorizados/setAutorizados', expediente.reduce((prev, next) => prev.concat(next.autorizados ? next.autorizados.data : []), []),
        { root: true });
      commit('representantes/setRepresentantes', expediente.reduce((prev, next) => prev.concat(next.representantes ? next.representantes.data : []), []),
        { root: true });
      commit('setExpedientesPagination', response.data.meta.pagination);
      commit('setExpedientesSuccess');

      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchAllExpedientes', response);
      commit('setExpedientesFail');

      return Promise.reject(response);
    });
};

export const fetchExpediente = ({ commit }, id) => {
  commit('setExpedientesRequest');
  return sidjbridge.get('v1/expedientes', id)
    .then((response) => {
      commit('addExpediente', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setExpedientesSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchExpediente', response);
      commit('setExpedientesFail');
      return Promise.reject(response);
    });
};

export const postExpediente = ({ commit }, object) => {
  commit('setExpedientesRequest');
  return sidjbridge.post('v1/expedientes', object)
    .then((response) => {
      commit('addExpediente', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setExpedientesSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postExpediente', response);
      commit('setExpedienteFail', object);
      return Promise.reject(response);
    });
};

export const putExpediente = ({ commit }, object) => {
  commit('setExpedienteRequest', object);
  return sidjbridge.put(`v1/expedientes/${object.id}`, object)
    .then((response) => {
      commit('setExpediente', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putExpediente', response);
      commit('setExpedienteFail', object);
      return Promise.reject(response);
    });
};

export const deleteExpediente = ({ commit }, object) => {
  commit('setExpedienteRequest', object);
  return sidjbridge.delete(`v1/expedientes/${object.id}`, object)
    .then(() => {
      commit('setExpediente', object);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('deleteExpediente', response);
      commit('setExpedienteFail', object);
      return Promise.reject(response);
    });
};

export const addExpedienteTercero = ({ commit }, object) => {
  commit('setExpedienteRequest', object);
  return sidjbridge.post(`/v1/expedientes/${object.principal}/terceros-perjudicados/${object.relacionado}`)
    .then(() => {
      commit('addTerceroExpediente', {
        principal: object.principal,
        relacionado: object.relacionado,
      });
      return Promise.resolve(true);
    }).catch((response) => {
      console.error('setExpedienteFail', response);
      commit('setExpedienteFail', object);
      return Promise.reject(response);
    });
};

export const deleteExpedienteTercero = ({
  commit,
}, object) => {
  commit('setExpedienteRequest', object);
  return sidjbridge.delete(`/v1/expedientes/${object.principal}/terceros-perjudicados/${object.relacionado}`)
    .then(() => {
      commit('deleteTerceroExpediente', {
        principal: object.principal,
        relacionado: object.relacionado,
      });
      return Promise.resolve(true);
    }).catch((response) => {
      console.error('deleteExpedienteTercero', response);
      commit('setExpedienteFail', object);
      return Promise.reject(true);
    });
};

export const addExpedienteRepresentante = ({
  commit,
}, object) => {
  commit('setExpedienteRequest', object);
  return sidjbridge.post(`/v1/expedientes/${object.principal}/representantes/${object.relacionado}`)
    .then(() => {
      commit('addRepresentanteExpediente', {
        principal: object.principal,
        relacionado: object.relacionado,
      });
      return Promise.resolve(true);
    }).catch((response) => {
      console.error('setExpedienteFail', response);
      commit('setExpedienteFail', object);
      return Promise.reject(response);
    });
};

export const deleteExpedienteRepresentante = ({
  commit,
}, object) => {
  commit('setExpedienteRequest', object);
  return sidjbridge.delete(`/v1/expedientes/${object.principal}/representantes/${object.relacionado}`)
    .then(() => {
      commit('deleteRepresentanteExpediente', {
        principal: object.principal,
        relacionado: object.relacionado,
      });
      return Promise.resolve(true);
    }).catch((response) => {
      console.error('deleteExpedienteRepresentante', response);
      commit('setExpedienteFail', object);
      return Promise.reject(true);
    });
};

export const addExpedienteAutorizado = ({
  commit,
}, object) => {
  commit('setExpedienteRequest', object);
  return sidjbridge.post(`/v1/expedientes/${object.principal}/autorizados/${object.relacionado}`)
    .then(() => {
      commit('addAutorizadoExpediente', {
        principal: object.principal,
        relacionado: object.relacionado,
      });
      return Promise.resolve(true);
    }).catch((response) => {
      console.error('addExpedienteAutorizado', response);
      commit('setExpedienteFail', object);
      return Promise.reject(response);
    });
};

export const deleteExpedienteAutorizado = ({
  commit,
}, object) => {
  commit('setExpedienteRequest', object);
  return sidjbridge.delete(`/v1/expedientes/${object.principal}/autorizados/${object.relacionado}`)
    .then(() => {
      commit('deleteAutorizadoExpediente', {
        principal: object.principal,
        relacionado: object.relacionado,
      });
      return Promise.resolve(true);
    }).catch((response) => {
      console.error('deleteExpedienteAutorizado', response);
      commit('setExpedienteFail', object);
      return Promise.reject(true);
    });
};

export const addExpedienteActor = ({
  commit,
}, object) => {
  commit('setExpedienteRequest', object);
  return sidjbridge.post(`/v1/expedientes/${object.principal}/actores/${object.relacionado}`)
    .then(() => {
      commit('addActorExpediente', {
        principal: object.principal,
        relacionado: object.relacionado,
      });
      return Promise.resolve(true);
    }).catch((response) => {
      console.error('addExpedienteActor', response);
      commit('setExpedienteFail', object);
      return Promise.reject(response);
    });
};

export const deleteExpedienteActor = ({
  commit,
}, object) => {
  commit('setExpedienteRequest', object);
  return sidjbridge.delete(`/v1/expedientes/${object.principal}/actores/${object.relacionado}`)
    .then(() => {
      commit('deleteActorExpediente', {
        principal: object.principal,
        relacionado: object.relacionado,
      });
      return Promise.resolve(true);
    }).catch((response) => {
      console.error('deleteExpedienteActor', response);
      commit('setExpedienteFail', object);
      return Promise.reject(true);
    });
};

export const addExpedienteAutoridad = ({
  commit,
}, object) => {
  commit('setExpedienteRequest', object);
  return sidjbridge.post(`/v1/expedientes/${object.principal}/autoridades/${object.relacionado}`)
    .then(() => {
      commit('addAutoridadExpediente', {
        principal: object.principal,
        relacionado: object.relacionado,
      });
      return Promise.resolve(true);
    }).catch((response) => {
      console.error('addExpedienteAutoridad', response);
      commit('setExpedienteFail', object);
      return Promise.reject(response);
    });
};

export const deleteExpedienteAutoridad = ({
  commit,
}, object) => {
  commit('setExpedienteRequest', object);
  return sidjbridge.delete(`/v1/expedientes/${object.principal}/autoridades/${object.relacionado}`)
    .then(() => {
      commit('deleteAutoridadExpediente', {
        principal: object.principal,
        relacionado: object.relacionado,
      });
      return Promise.resolve(true);
    }).catch((response) => {
      console.error('deleteExpedienteAutoridad', response);
      commit('setExpedienteFail', object);
      return Promise.reject(true);
    });
};

export const putHistory = ({
  commit,
}, object) => {
  commit('setHistoryExpediente', {
    id: object.id,
    nojuicio: object.nojuicio,
    visited_at: moment(),
  });
};

export const clearHistory = ({
  commit,
}) => {
  commit('clearHistoryExpediente');
};
