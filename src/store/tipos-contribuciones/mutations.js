import updateState from '../utlils';

export const setTiposContribucionesFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setTiposContribucionesPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setTiposContribucionesRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setTiposContribucionesSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setTiposContribucionesFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setTiposContribuciones = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addTipoContribucion = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setTipoContribucion = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoContribucionRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setTipoContribucionSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoContribucionFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoContribucionDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
