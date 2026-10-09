import updateState from '../utlils';

export const setAcuerdosFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setAcuerdosPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setAcuerdosRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setAcuerdosSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setAcuerdosFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setAcuerdos = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addAcuerdo = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setAcuerdo = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setAcuerdoRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setAcuerdoSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setAcuerdoFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setAcuerdoDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
