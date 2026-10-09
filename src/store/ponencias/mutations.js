import updateState from '../utlils';

export const setPonenciasFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setPonenciasPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setPonenciasRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setPonenciasSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setPonenciasFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setPonencias = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addPonencia = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setPonencia = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setPonenciaRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setPonenciaSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setPonenciaFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setPonenciaDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
