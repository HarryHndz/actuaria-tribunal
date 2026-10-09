import updateState from '../utlils';

export const setSalasFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setSalasPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setSalasRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setSalasSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setSalasFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setSalas = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addSala = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setSala = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setSalaRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setSalaSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setSalaFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setSalaDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
