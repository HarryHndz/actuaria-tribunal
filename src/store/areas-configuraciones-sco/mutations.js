import updateState from '../utlils';

export const setAreasConfiguracionesScoFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setAreasConfiguracionesScoPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setAreasConfiguracionesScoRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setAreasConfiguracionesScoSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setAreasConfiguracionesScoFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setAreasConfiguracionesSco = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addAreaConfiguracionSco = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setAreaConfiguracionSco = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setAreaConfiguracionScoRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setAreaConfiguracionScoSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setAreaConfiguracionScoFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setAreaConfiguracionScoDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
