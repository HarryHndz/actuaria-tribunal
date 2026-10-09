import updateState from '../utlils';

export const setDependenciasFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setDependenciasPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setDependenciasRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setDependenciasSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setDependenciasFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setDependencias = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addDependencia = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setDependencia = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setDependenciaRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setDependenciaSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setDependenciaFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setDependenciaDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
