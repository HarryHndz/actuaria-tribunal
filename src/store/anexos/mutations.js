import updateState from '../utlils';

export const setAnexosFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setAnexosPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setAnexosRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setAnexosSuccess = (state) => {
  state = { ...state, status: 'success', fetching: false };
};

// eslint-disable-next-line no-unused-vars
export const setAnexosFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setAnexos = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addAnexo = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setAnexo = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setAnexoRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setAnexoSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setAnexoFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setAnexoDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
