import updateState from '../utlils';

export const setResolucionesAmparosFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setResolucionesAmparosPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setResolucionesAmparosRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setResolucionesAmparosSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setResolucionesAmparosFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setResolucionesAmparos = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addResolucionAmparo = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setResolucionAmparo = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setResolucionAmparoRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setResolucionAmparoSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setResolucionAmparoFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setResolucionAmparoDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
