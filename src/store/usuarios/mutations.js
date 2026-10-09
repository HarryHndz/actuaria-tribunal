import updateState from '../utlils';

export const setUsuariosFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setUsuariosPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setUsuariosRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setUsuariosSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setUsuariosFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setUsuarios = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addUsuario = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setUsuario = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setUsuarioRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setUsuarioSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setUsuarioFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setUsuarioDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
