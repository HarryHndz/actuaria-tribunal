import updateState from '../utlils';

export const setExpedientesElectronicosFilters = (state, filters) => {
  state.filters = filters;
};

export const setExpedientesElectronicosPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setExpedientesElectronicosRequest = (state) => {
  state.fetching = true;
  state.error = false;
  state.visibles = [];
};

// eslint-disable-next-line no-unused-vars
export const setExpedientesElectronicosSuccess = (state) => {
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
export const setExpedientesElectronicosFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setExpedientesElectronicos = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
    state.visibles = state.visibles.concat([reg.id]);
  });
};

export const addExpedienteElectronico = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setExpedienteElectronico = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, Object.assign(reg, {
      error: true,
      fetching: false,
    }));
  });
};

export const setExpedienteElectronicoRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setExpedienteElectronicoSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setExpedienteElectronicoFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setExpedienteElectronicoDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
