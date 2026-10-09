import updateState from '../utlils';

export const setDocumentosFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setDocumentosPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setDocumentosRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setDocumentosSuccess = (state) => {
  state = {
    ...state,
    status: 'success',
    fetching: false,
    filters: {
      page: 1,
      limit: 10,
    },
  };
};

// eslint-disable-next-line no-unused-vars
export const setDocumentosFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setDocumentos = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addDocumento = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setDocumento = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setDocumentoRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setDocumentoSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setDocumentoFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setDocumentoDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
