import updateState from '../utlils';

export const setSentidosRaFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setSentidosRaPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setSentidosRaRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setSentidosRaSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setSentidosRaFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setSentidosRa = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addSentidoRa = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setSentidoRa = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setSentidoRaRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setSentidoRaSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setSentidoRaFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setSentidoRaDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
