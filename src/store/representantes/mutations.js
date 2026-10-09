import updateState from '../utlils';

export const setRepresentantesFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setRepresentantesPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setRepresentantesRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setRepresentantesSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setRepresentantesFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setRepresentantes = (state, data) => {
  data.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addRepresentante = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setRepresentante = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setRepresentanteRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setRepresentanteSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setRepresentanteFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setRepresentanteDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
