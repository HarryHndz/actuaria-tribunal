import updateState from '../utlils';

export const setCjfDocumentosFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setCjfDocumentosPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setCjfDocumentosRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setCjfDocumentosSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setCjfDocumentosFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setCjfDocumentos = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addCjfDocumento = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setCjfDocumento = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setCjfDocumentoRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setCjfDocumentoSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setCjfDocumentoFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setCjfDocumentoDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
