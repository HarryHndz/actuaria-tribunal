import updateState from '../utlils';

export const setHistorialAudienciasFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setHistorialAudienciasPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setHistorialAudienciasRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setHistorialAudienciasSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setHistorialAudienciasFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setHistorialAudiencias = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addHistorialAudiencia = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setHistorialAudiencia = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setHistorialAudienciaRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setHistorialAudienciaSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setHistorialAudienciaFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setHistorialAudienciaDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
