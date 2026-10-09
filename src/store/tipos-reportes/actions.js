import sidjbridge from '../../boot/sidjbridge';

export const fetchAllTiposReportes = ({ state, commit }, params = {}) => {
  commit('setTiposReportesRequest');
  commit('setTiposReportesFilters', params);
  return sidjbridge.get('/v1/catalogos/tipos/reportes', state.filters)
    .then((response) => {
      commit('setTiposReportes', response.data.data);
      commit('setTiposReportesPagination', response.data.meta.pagination);
      commit('setTiposReportesSuccess');
    })
    .catch((response) => {
      console.error('fetchAllTiposReportes', response);
      commit('setTiposReportesFail');
    });
};

export const fetchTipoReporte = ({ commit }, id) => {
  commit('setTiposReportesRequest');
  return sidjbridge.get('/v1/catalogos/tipos/reportes', id)
    .then((response) => {
      commit('addTipoReporte', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposReportesSuccess');
    })
    .catch((response) => {
      console.error('fetchTipoReporte', response);
      commit('setTiposReportesFail');
    });
};

export const postTipoReporte = ({ commit }, object) => {
  commit('setTiposReportesRequest');
  return sidjbridge.post('/v1/catalogos/tipos/reportes', object)
    .then((response) => {
      commit('addTipoReporte', {
        ...response.data.data,
        fetching: false,
        error: false,
      });
      commit('setTiposReportesSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('postTipoReporte', response);
      commit('setTipoReporteFail', object);
    });
};

export const putTipoReporte = ({ commit }, object) => {
  commit('setTipoReporteRequest', object);
  return sidjbridge.put(`/v1/catalogos/tipos/reportes/${object.id}`, object)
    .then((response) => {
      commit('setTipoReporte', response.data.data);
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putTipoReporte', response);
      commit('setTipoReporteFail', object);
    });
};

export const deleteTipoReporte = ({ commit }, object) => {
  commit('setTipoReporteRequest', object);
  return sidjbridge.delete(`/v1/catalogos/tipos/reportes/${object.id}`, object)
    .then(() => {
      commit('setTipoReporte', object);
    })
    .catch((response) => {
      console.error('deleteTipoReporte', response);
      commit('setTipoReporteFail', object);
    });
};
