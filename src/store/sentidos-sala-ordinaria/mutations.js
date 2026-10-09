import updateState from '../utlils';

export const setSentidosSalaOrdinariaFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setSentidosSalaOrdinariaPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setSentidosSalaOrdinariaRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setSentidosSalaOrdinariaSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setSentidosSalaOrdinariaFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setSentidosSalaOrdinaria = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addSentidoSalaOrdinaria = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setSentidoSalaOrdinaria = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setSentidoSalaOrdinariaRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setSentidoSalaOrdinariaSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setSentidoSalaOrdinariaFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setSentidoSalaOrdinariaDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
