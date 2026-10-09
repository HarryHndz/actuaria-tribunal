import updateState from '../utlils';

export const setTiposLeyendasFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setTiposLeyendasPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setTiposLeyendasRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setTiposLeyendasSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setTiposLeyendasFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setTiposLeyendas = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addTipoLeyenda = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setTipoLeyenda = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoLeyendaRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setTipoLeyendaSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoLeyendaFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoLeyendaDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
