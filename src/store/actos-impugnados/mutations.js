import updateState from '../utlils';

export const setActosImpugnadosFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setActosImpugnadosPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setActosImpugnadosRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setActosImpugnadosSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setActosImpugnadosFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setActosImpugnados = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addActoImpugnado = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setActoImpugnado = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setActoImpugnadoRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setActoImpugnadoSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setActoImpugnadoFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setActoImpugnadoDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
