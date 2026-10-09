import updateState from '../utlils';

export const setEstadosListadosFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setEstadosListadosPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setEstadosListadosRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setEstadosListadosSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setEstadosListadosFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setEstadosListados = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addEstadoProcesalListado = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setEstadoProcesalListado = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setEstadoProcesalListadoRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setEstadoProcesalListadoSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setEstadoProcesalListadoFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setEstadoProcesalListadoDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
