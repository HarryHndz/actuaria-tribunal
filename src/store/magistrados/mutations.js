import updateState from '../utlils';

export const setMagistradosFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setMagistradosPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setMagistradosRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setMagistradosSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setMagistradosFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setMagistrados = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addMagistrado = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setMagistrado = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setMagistradoRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setMagistradoSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setMagistradoFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setMagistradoDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
