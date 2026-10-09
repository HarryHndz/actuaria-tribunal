import updateState from '../utlils';

export const setListadosAcuerdosFilters = (state, filters) => {
  state.filters = filters;
};

export const setListadosAcuerdosPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setListadosAcuerdosRequest = (state) => {
  state.fetching = true;
  state.error = false;
  state.visibles = [];
};

// eslint-disable-next-line no-unused-vars
export const setListadosAcuerdosSuccess = (state) => {
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
export const setListadosAcuerdosFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setListadosAcuerdos = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
    state.visibles = state.visibles.concat([reg.id]);
  });
};

export const addListadoAcuerdo = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setListadoAcuerdo = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setListadoAcuerdoRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setListadoAcuerdoSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setListadoAcuerdoFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setListadoAcuerdoDelete = (state, reg) => {
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
