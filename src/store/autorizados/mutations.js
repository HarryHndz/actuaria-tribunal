import updateState from '../utlils';

export const setAutorizadosFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setAutorizadosPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setAutorizadosRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setAutorizadosSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setAutorizadosFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setAutorizados = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addAutorizado = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setAutorizado = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setAutorizadoRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setAutorizadoSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setAutorizadoFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setAutorizadoDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
