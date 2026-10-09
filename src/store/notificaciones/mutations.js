import updateState from '../utlils';

export const setNotificacionesFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setNotificacionesPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setNotificacionesRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setNotificacionesSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setNotificacionesFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setNotificaciones = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addNotificacion = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setNotificacion = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setNotificacionRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setNotificacionSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setNotificacionFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setNotificacionDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
