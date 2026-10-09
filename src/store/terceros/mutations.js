import updateState from '../utlils';

export const setTercerosFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setTercerosPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setTercerosRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setTercerosSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setTercerosFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setTerceros = (state, data) => {
  data.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addTercero = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setTercero = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTerceroRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setTerceroSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTerceroFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTerceroDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
