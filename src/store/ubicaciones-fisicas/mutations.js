import updateState from '../utlils';

export const setUbicacionesFisicasFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setUbicacionesFisicasPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setUbicacionesFisicasRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setUbicacionesFisicasSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setUbicacionesFisicasFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setUbicacionesFisicas = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addUbicacionFisica = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setUbicacionFisica = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setUbicacionFisicaRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setUbicacionFisicaSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setUbicacionFisicaFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setUbicacionFisicaDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
