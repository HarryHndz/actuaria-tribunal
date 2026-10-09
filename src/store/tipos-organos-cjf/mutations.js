import updateState from '../utlils';

export const setTiposOrganosCjfFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setTiposOrganosCjfPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setTiposOrganosCjfRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setTiposOrganosCjfSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setTiposOrganosCjfFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setTiposOrganosCjf = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addTipoOrganoCjf = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setTipoOrganoCjf = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoOrganoCjfRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setTipoOrganoCjfSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoOrganoCjfFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoOrganoCjfDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
