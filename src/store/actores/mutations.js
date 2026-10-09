import updateState from '../utlils';

export const setActoresFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setActoresPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setActoresRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setActoresSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setActoresFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setActores = (state, data) => {
  data.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addActor = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setActor = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setActorRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setActorSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setActorFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setActorDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
