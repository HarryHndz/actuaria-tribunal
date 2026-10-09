import updateState from '../utlils';

export const setTiposAmparosFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setTiposAmparosPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setTiposAmparosRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setTiposAmparosSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setTiposAmparosFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setTiposAmparos = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addTipoAmparo = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setTipoAmparo = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoAmparoRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setTipoAmparoSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoAmparoFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoAmparoDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
