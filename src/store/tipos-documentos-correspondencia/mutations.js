import updateState from '../utlils';

export const setTiposDocumentosCorrespondenciaFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setTiposDocumentosCorrespondenciaPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setTiposDocumentosCorrespondenciaRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setTiposDocumentosCorrespondenciaSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setTiposDocumentosCorrespondenciaFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setTiposDocumentosCorrespondencia = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addTipoDocumentoCorrespondencia = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setTipoDocumentoCorrespondencia = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoDocumentoCorrespondenciaRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setTipoDocumentoCorrespondenciaSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoDocumentoCorrespondenciaFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoDocumentoCorrespondenciaDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
