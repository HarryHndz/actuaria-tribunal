import updateState from '../utlils';

export const setTiposSalasFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setTiposSalasPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setTiposSalasRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setTiposSalasSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setTiposSalasFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setTiposSalas = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addTipoSala = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setTipoSala = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoSalaRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setTipoSalaSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoSalaFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoSalaDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
