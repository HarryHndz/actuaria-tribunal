import updateState from '../utlils';

export const setTiposReportesFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setTiposReportesPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setTiposReportesRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setTiposReportesSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setTiposReportesFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setTiposReportes = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addTipoReporte = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setTipoReporte = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoReporteRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setTipoReporteSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoReporteFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoReporteDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
