import updateState from '../utlils';

export const setAreasTrabajoCedulasFilters = (state, filters) => {
  state.filters = filters;
};

export const setAreasTrabajoCedulasPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setAreasTrabajoCedulasRequest = (state) => {
  state.fetching = true;
  state.error = false;
  state.visibles = [];
};

// eslint-disable-next-line no-unused-vars
export const setAreasTrabajoCedulasSuccess = (state) => {
  state = {
    ...state,
    status: 'success',
    filters: {
      page: 1,
      limit: 10,
    },
  };
};

// eslint-disable-next-line no-unused-vars
export const setAreasTrabajoCedulasFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setAreasTrabajoCedulas = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
    state.visibles = state.visibles.concat([reg.id]);
  });
};

export const addAreaTrabajoCedulas = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setAreaTrabajoCedulas = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setAreaTrabajoCedulasRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setAreaTrabajoCedulasSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setAreaTrabajoCedulasFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setAreaTrabajoCedulasDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};

export const AreaTrabajoReenvioAdd = (state, areaTrabajo) => {
  state.reenvio = areaTrabajo;
};
export const AreaTrabajoEnviadoAdd = (state, areaTrabajo) => {
  state.areaTrabajoEnviado = updateState(state.areaTrabajoEnviado, areaTrabajo);
};
export const AreaTrabajoEnviadoReset = (state) => {
  state.areaTrabajoEnviado = [];
};
export const deleteAreaTrabajoEnviado = (state, index) => {
  state.areaTrabajoEnviado = state.areaTrabajoEnviado.slice(0, index)
    .concat(state.areaTrabajoEnviado.slice(index + 1));
};
