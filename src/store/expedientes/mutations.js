import updateState from '../utlils';

export const setExpedientesFilters = (state, filters) => {
  state.filters = filters;
};

export const setExpedientesPagination = (state, pagination) => {
  state.pagination = pagination;
};

export const setExpedientesRequest = (state) => {
  state.fetching = true;
  state.error = false;
  state.visibles = [];
};

// eslint-disable-next-line no-unused-vars
export const setExpedientesSuccess = (state) => {
  state = {
    ...state,
    status: 'success',
    filters: {
      page: 1,
      limit: 10,
      expediente: null,
    },
  };
};

// eslint-disable-next-line no-unused-vars
export const setExpedientesFail = (state) => {
  state = { ...state, status: 'failed' };
};

export const setExpedientes = (state, registers) => {
  registers.forEach((reg) => {
    state.all = updateState(state.all, reg);
    state.visibles = state.visibles.concat([reg.id]);
  });
};

export const addExpediente = (state, reg) => {
  state.all = updateState(state.all, reg);
};

export const setExpediente = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setExpedienteRequest = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: false,
    fetching: true,
  }));
};

export const setExpedienteSuccess = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setExpedienteFail = (state, reg) => {
  state.all = updateState(state.all, Object.assign(reg, {
    error: true,
    fetching: false,
  }));
};

export const setExpedienteDelete = (state, reg) => {
  const index = state.all.findIndex(item => item.id === reg.id);
  state.all = state.all.slice(0, index)
    .concat(state.all.slice(index + 1));
};

export const addTerceroExpediente = (state, data) => {
  state.all = state.all.map((item) => {
    if (item.id !== data.principal) {
      return item;
    }
    return Object.assign(item, {
      fetching: false,
      terceros_perjudicados: item.terceros_perjudicados.concat([data.relacionado]),
    });
  });
};

export const deleteTerceroExpediente = (state, data) => {
  state.all = state.all.map((item) => {
    if (item.id !== data.principal) {
      return item;
    }

    const index = item.terceros_perjudicados.indexOf(data.relacionado);

    return Object.assign(item, {
      fetching: false,
      terceros_perjudicados: item.terceros_perjudicados
        .slice(0, index)
        .concat(item.terceros_perjudicados.slice(index + 1)),
    });
  });
};

export const addRepresentanteExpediente = (state, data) => {
  state.all = state.all.map((item) => {
    if (item.id !== data.principal) {
      return item;
    }
    return Object.assign(item, {
      fetching: false,
      representantes: item.representantes.concat([data.relacionado]),
    });
  });
};

export const deleteRepresentanteExpediente = (state, data) => {
  state.all = state.all.map((item) => {
    if (item.id !== data.principal) {
      return item;
    }

    const index = item.representantes.indexOf(data.relacionado);

    return Object.assign(item, {
      fetching: false,
      representantes: item.representantes
        .slice(0, index)
        .concat(item.representantes.slice(index + 1)),
    });
  });
};

export const addAutorizadoExpediente = (state, data) => {
  state.all = state.all.map((item) => {
    if (item.id !== data.principal) {
      return item;
    }
    return Object.assign(item, {
      fetching: false,
      autorizados: item.autorizados.concat([data.relacionado]),
    });
  });
};

export const deleteAutorizadoExpediente = (state, data) => {
  state.all = state.all.map((item) => {
    if (item.id !== data.principal) {
      return item;
    }

    const index = item.autorizados.indexOf(data.relacionado);

    return Object.assign(item, {
      fetching: false,
      autorizados: item.autorizados
        .slice(0, index)
        .concat(item.autorizados.slice(index + 1)),
    });
  });
};

export const addActorExpediente = (state, data) => {
  state.all = state.all.map((item) => {
    if (item.id !== data.principal) {
      return item;
    }
    return Object.assign(item, {
      fetching: false,
      actores: item.actores.concat([data.relacionado]),
    });
  });
};

export const deleteActorExpediente = (state, data) => {
  state.all = state.all.map((item) => {
    if (item.id !== data.principal) {
      return item;
    }

    const index = item.actores.indexOf(data.relacionado);

    return Object.assign(item, {
      fetching: false,
      actores: item.actores
        .slice(0, index)
        .concat(item.actores.slice(index + 1)),
    });
  });
};

export const addAutoridadExpediente = (state, data) => {
  state.all = state.all.map((item) => {
    if (item.id !== data.principal) {
      return item;
    }
    return Object.assign(item, {
      fetching: false,
      autoridades: item.autoridades.concat([data.relacionado]),
    });
  });
};

export const deleteAutoridadExpediente = (state, data) => {
  state.all = state.all.map((item) => {
    if (item.id !== data.principal) {
      return item;
    }

    const index = item.autoridades.indexOf(data.relacionado);

    return Object.assign(item, {
      fetching: false,
      autoridades: item.autoridades
        .slice(0, index)
        .concat(item.autoridades.slice(index + 1)),
    });
  });
};

export const setHistoryExpediente = (state, reg) => {
  state.history = updateState(state.history, {
    id: reg.id,
    nojuicio: reg.nojuicio,
    visited_at: reg.visited_at,
  });
};

export const clearHistoryExpediente = (state) => {
  state.history = [];
};
