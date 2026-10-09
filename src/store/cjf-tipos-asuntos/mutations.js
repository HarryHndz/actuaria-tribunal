import updateState from '../utlils';

export const setCjfTiposAsuntosFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setCjfTiposAsuntosPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setCjfTiposAsuntosRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setCjfTiposAsuntosSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setCjfTiposAsuntosFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setCjfTiposAsuntos = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addCjfTipoAsunto = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setCjfTipoAsunto = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setCjfTipoAsuntoRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setCjfTipoAsuntoSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setCjfTipoAsuntoFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setCjfTipoAsuntoDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
