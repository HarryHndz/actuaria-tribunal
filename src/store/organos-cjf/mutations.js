import updateState from '../utlils';

export const setOrganosCjfFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setOrganosCjfPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setOrganosCjfRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setOrganosCjfSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setOrganosCjfFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setOrganosCjf = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addEpoca = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setEpoca = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setEpocaRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setEpocaSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setEpocaFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setEpocaDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
