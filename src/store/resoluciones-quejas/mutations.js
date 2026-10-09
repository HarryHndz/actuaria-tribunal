import updateState from '../utlils';

export const setResolucionesQuejasFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setResolucionesQuejasPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setResolucionesQuejasRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setResolucionesQuejasSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setResolucionesQuejasFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setResolucionesQuejas = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addResolucionQueja = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setResolucionQueja = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setResolucionQuejaRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setResolucionQuejaSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setResolucionQuejaFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setResolucionQuejaDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
