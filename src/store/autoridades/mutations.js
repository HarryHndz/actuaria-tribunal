import updateState from '../utlils';

export const setAutoridadesFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setAutoridadesPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setAutoridadesRequest = (state) => {
  state.fetching = true;
  state.error = false;
  state.visibles = [];
};

// eslint-disable-next-line no-unused-vars
export const setAutoridadesSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setAutoridadesFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setAutoridades = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
    state.visibles = state.visibles.concat([reg.id]);
  });
};

export const addAutoridad = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setAutoridad = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setAutoridadRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setAutoridadSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setAutoridadFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setAutoridadDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
