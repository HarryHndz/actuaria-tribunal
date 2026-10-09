import sidjbridge from '../../boot/sidjbridge';

export const fetchAllCjfTiposAsuntos = ({ state, commit }, params = {}) => {
  commit('setCjfTiposAsuntosRequest');
  commit('setCjfTiposAsuntosFilters', params);
  return sidjbridge.get('/v1/catalogos/cjf-tipo-asunto', state.filters)
    .then((response) => {
      commit('setCjfTiposAsuntos', response.data.data);
      commit('setCjfTiposAsuntosPagination', response.data.meta.pagination);
      commit('setCjfTiposAsuntosSuccess');
    })
    .catch((response) => {
      console.error('fetchAllCjfTiposAsuntos', response);
      commit('setCjfTiposAsuntosFail');
    });
};

export const fetchCjfTipoAsunto = ({ commit }, id) => {
  commit('setCjfTiposAsuntosRequest');
  return sidjbridge.get('/v1/catalogos/cjf-tipo-asunto', id)
    .then((response) => {
      commit('addCjfTipoAsunto', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setCjfTiposAsuntosSuccess');
    })
    .catch((response) => {
      console.error('fetchCjfTipoAsunto', response);
      commit('setCjfTiposAsuntosFail');
    });
};

export const postCjfTipoAsunto = ({ commit }, object) => {
  commit('setCjfTiposAsuntosRequest');
  return sidjbridge.post('/v1/catalogos/cjf-tipo-asunto', object)
    .then((response) => {
      commit('addCjfTipoAsunto', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setCjfTiposAsuntosSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postCjfTipoAsunto', response);
      commit('setCjfTipoAsuntoFail', object);
    });
};

export const putCjfTipoAsunto = ({ commit }, object) => {
  commit('setCjfTipoAsuntoRequest', object);
  return sidjbridge.put(`/v1/catalogos/cjf-tipo-asunto/${object.id}`, object)
    .then((response) => {
      commit('setCjfTipoAsunto', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putCjfTipoAsunto', response);
      commit('setCjfTipoAsuntoFail', object);
    });
};

export const deleteCjfTipoAsunto = ({ commit }, object) => {
  commit('setCjfTipoAsuntoRequest', object);
  return sidjbridge.delete(`/v1/catalogos/cjf-tipo-asunto/${object.id}`, object)
    .then(() => {
      commit('setCjfTipoAsunto', object);
    })
    .catch((response) => {
      console.error('deleteCjfTipoAsunto', response);
      commit('setCjfTipoAsuntoFail', object);
    });
};
