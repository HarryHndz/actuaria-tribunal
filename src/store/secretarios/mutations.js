import updateState from '../utlils';

export const setSecretariosFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setSecretariosPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setSecretariosRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setSecretariosSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setSecretariosFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setSecretarios = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addSecretario = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setSecretario = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setSecretarioRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setSecretarioSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setSecretarioFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setSecretarioDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
