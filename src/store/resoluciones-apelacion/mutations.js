import updateState from '../utlils';

export const setResolucionesApelacionFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setResolucionesApelacionPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setResolucionesApelacionRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setResolucionesApelacionSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setResolucionesApelacionFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setResolucionesApelacion = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addResolucionApelacion = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setResolucionApelacion = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setResolucionApelacionRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setResolucionApelacionSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setResolucionApelacionFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setResolucionApelacionDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
