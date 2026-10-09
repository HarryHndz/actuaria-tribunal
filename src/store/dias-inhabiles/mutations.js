import updateState from '../utlils';

export const setDiasInhabilesFilters = (state, filters) => {
  state.filters = filters;
};

export const setDiasInhabilesPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setDiasInhabilesRequest = (state) => {
  state.fetching = true;
  state.error = false;
  state.visibles = [];
};

// eslint-disable-next-line no-unused-vars
export const setDiasInhabilesSuccess = (state) => {
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
export const setDiasInhabilesFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setDiasInhabiles = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
    state.visibles = state.visibles.concat([reg.id]);
  });
};

export const addDiaInhabil = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setDiaInhabil = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setDiaInhabilRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setDiaInhabilSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setDiaInhabilFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setDiaInhabilDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};

export const listadoReenvioAdd = (state, listado) => {
  state.reenvio = listado;
};
export const listadoEnviadoAdd = (state, listado) => {
  state.listadoEnviado = updateState(state.listadoEnviado, listado);
};
export const listadoEnviadoReset = (state) => {
  state.listadoEnviado = [];
};
export const deleteListadoEnviado = (state, index) => {
  state.listadoEnviado = state.listadoEnviado.slice(0, index)
    .concat(state.listadoEnviado.slice(index + 1));
};
