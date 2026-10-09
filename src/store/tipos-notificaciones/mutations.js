import updateState from '../utlils';

export const setTiposNotificacionesFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setTiposNotificacionesPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setTiposNotificacionesRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setTiposNotificacionesSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setTiposNotificacionesFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setTiposNotificaciones = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addTipoNotificacion = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setTipoNotificacion = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoNotificacionRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setTipoNotificacionSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoNotificacionFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoNotificacionDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
