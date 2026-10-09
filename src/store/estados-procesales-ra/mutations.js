import updateState from '../utlils';

export const setEstadosProcesalesRaFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setEstadosProcesalesRaPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setEstadosProcesalesRaRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setEstadosProcesalesRaSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setEstadosProcesalesRaFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setEstadosProcesalesRa = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addEstadoProcesalRa = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setEstadoProcesalRa = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setEstadoProcesalRaRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setEstadoProcesalRaSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setEstadoProcesalRaFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setEstadoProcesalRaDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
