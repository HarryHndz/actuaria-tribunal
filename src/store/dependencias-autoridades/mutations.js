import updateState from '../utlils';

export const setDependenciasAutoridadesFilters = (state, filters) => {
  state.filters = Object.assign({}, state.filters, filters);
};

export const setDependenciasAutoridadesPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setDependenciasAutoridadesRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

// eslint-disable-next-line no-unused-vars
export const setDependenciasAutoridadesSuccess = (state) => {
  state = { ...state, status: 'success' };
};

// eslint-disable-next-line no-unused-vars
export const setDependenciasAutoridadesFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setDependenciasAutoridades = (state, data) => {
  data.forEach((reg) => {
    state.all = updateState(state.all, reg);
  });
};

export const addDependenciaAutoridad = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setDependenciaAutoridad = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setDependenciaAutoridadRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setDependenciaAutoridadSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setDependenciaAutoridadFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setDependenciaAutoridadDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
