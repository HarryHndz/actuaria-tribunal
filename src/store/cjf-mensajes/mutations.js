import updateState from '../utlils';

export const setCjfMensajesFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setCjfMensajesPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setCjfMensajesRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setCjfMensajesSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setCjfMensajesFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setCjfMensajes = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addCjfMensaje = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setCjfMensaje = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setCjfMensajeRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setCjfMensajeSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setCjfMensajeFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setCjfMensajeDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
