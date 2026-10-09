import updateState from '../utlils';

export const setPromoventesFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setPromoventesPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setPromoventesRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setPromoventesSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setPromoventesFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setPromoventes = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addPromovente = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setPromovente = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setPromoventeRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setPromoventeSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setPromoventeFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setPromoventeDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
