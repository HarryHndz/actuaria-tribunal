import updateState from '../utlils';

export const setProcedenciasFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setProcedenciasPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setProcedenciasRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setProcedenciasSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setProcedenciasFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setProcedencias = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addProcedencia = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setProcedencia = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setProcedenciaRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setProcedenciaSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setProcedenciaFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setProcedenciaDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
