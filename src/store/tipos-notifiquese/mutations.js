import updateState from '../utlils';

export const setTiposNotifiqueseFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setTiposNotifiquesePagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setTiposNotifiqueseRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setTiposNotifiqueseSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setTiposNotifiqueseFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setTiposNotifiquese = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addTipoNotifiquese = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setTipoNotifiquese = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoNotifiqueseRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setTipoNotifiqueseSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoNotifiqueseFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoNotifiqueseDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
