import updateState from '../utlils';

export const setGruposPlantillasFilters = (state, filters) => {
  state.filters = filters;
};

export const setGruposPlantillasPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setGruposPlantillasRequest = (state) => {
  state.fetching = true;
  state.error = false;
  state.visibles = [];
};

// eslint-disable-next-line no-unused-vars
export const setGruposPlantillasSuccess = (state) => {
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
export const setGruposPlantillasFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setGruposPlantillas = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
    state.visibles = state.visibles.concat([reg.id]);
  });
};

export const addGrupoPlantillas = (state, reg) => {
  state.all = updateState(state.all, reg);
  state.visibles = state.visibles.concat([reg.id]);
};

export const setGrupoPlantillas = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setGrupoPlantillasRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setGrupoPlantillasSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setGrupoPlantillasFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setGrupoPlantillasDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};
