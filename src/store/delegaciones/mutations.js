import updateState from '../utlils';

export const setDelegacionesFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setDelegacionesPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setDelegacionesRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setDelegacionesSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setDelegacionesFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setDelegaciones = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addDelegacion = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setDelegacion = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setDelegacionRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setDelegacionSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setDelegacionFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setDelegacionDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
