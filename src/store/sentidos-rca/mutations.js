import updateState from '../utlils';

export const setSentidosRcaFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setSentidosRcaPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setSentidosRcaRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setSentidosRcaSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setSentidosRcaFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setSentidosRca = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addSentidoRca = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setSentidoRca = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setSentidoRcaRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setSentidoRcaSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setSentidoRcaFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setSentidoRcaDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
