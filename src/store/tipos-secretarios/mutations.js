import updateState from '../utlils';

export const setTiposSecretariosFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setTiposSecretariosPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setTiposSecretariosRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setTiposSecretariosSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setTiposSecretariosFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setTiposSecretarios = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addTipoSecretario = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setTipoSecretario = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoSecretarioRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setTipoSecretarioSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoSecretarioFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoSecretarioDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
