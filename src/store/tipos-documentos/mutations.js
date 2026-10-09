import updateState from '../utlils';

export const setTiposDocumentosFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setTiposDocumentosPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setTiposDocumentosRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setTiposDocumentosSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setTiposDocumentosFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setTiposDocumentos = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addTipoDocumento = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setTipoDocumento = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoDocumentoRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setTipoDocumentoSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoDocumentoFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoDocumentoDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
