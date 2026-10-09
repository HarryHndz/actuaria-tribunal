import updateState from '../utlils';

export const setTiposDemandasFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setTiposDemandasPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setTiposDemandasRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setTiposDemandasSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setTiposDemandasFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setTiposDemandas = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addTipoDemanda = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setTipoDemanda = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoDemandaRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setTipoDemandaSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoDemandaFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setTipoDemandaDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
