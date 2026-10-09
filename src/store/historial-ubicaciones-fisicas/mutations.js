import updateState from '../utlils';

export const setHistorialUbicacionesFisicasFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setHistorialUbicacionesFisicasPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setHistorialUbicacionesFisicasRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setHistorialUbicacionesFisicasSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setHistorialUbicacionesFisicasFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setHistorialUbicacionesFisicas = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addHistorialUbicacionFisica = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setHistorialUbicacionFisica = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setHistorialUbicacionFisicaRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setHistorialUbicacionFisicaSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setHistorialUbicacionFisicaFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setHistorialUbicacionFisicaDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
