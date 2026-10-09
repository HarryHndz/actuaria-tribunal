import updateState from '../utlils';

export const setTribunalesColegiadosCjfFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setTribunalesColegiadosCjfPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setTribunalesColegiadosCjfRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setTribunalesColegiadosCjfSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setTribunalesColegiadosCjfFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setTribunalesColegiadosCjf = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addTribunalColegiado = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setTribunalColegiado = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTribunalColegiadoRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setTribunalColegiadoSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTribunalColegiadoFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTribunalColegiadoDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
