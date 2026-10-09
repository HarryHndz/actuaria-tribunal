import updateState from '../utlils';

export const setListadosTransferenciasAcuerdosFilters = (state, filters) => {
  state.filters = filters;
};

export const setListadosTransferenciasAcuerdosPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setListadosTransferenciasAcuerdosRequest = (state) => {
  state.fetching = true;
  state.error = false;
  state.visibles = [];
};

// eslint-disable-next-line no-unused-vars
export const setListadosTransferenciasAcuerdosSuccess = (state) => {
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
export const setListadoTransferenciasAcuerdosFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setListadosTransferenciasAcuerdos = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
    state.visibles = state.visibles.concat([reg.id]);
  });
};

export const addListadoTransferenciaAcuerdo = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setListadoTransferenciaAcuerdo = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setListadoTransferenciaAcuerdoRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setListadoTransferenciaAcuerdoSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setListadoTransferenciaAcuerdoFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setListadoTransferenciaAcuerdoDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};

export const listadoAcuerdoReenvioAdd = (state, listado) => {
  state.reenvio = listado;
};
export const listadoAcuerdoEnviadoAdd = (state, listado) => {
  state.listadoEnviado = updateState(state.listadoEnviado, listado);
};
export const listadoAcuerdoEnviadoReset = (state) => {
  state.listadoEnviado = [];
};
export const deleteListadoAcuerdoEnviado = (state, index) => {
  state.listadoEnviado = state.listadoEnviado.slice(0, index)
    .concat(state.listadoEnviado.slice(index + 1));
};
