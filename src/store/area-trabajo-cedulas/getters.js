export const getAreasTrabajoCedulasAll = state => state.all;

export const getAreasTrabajoCedulasVisibles = (state, getters) => {
  const visibles = getters.getAreasTrabajoCedulasAll.filter((item) => {
    const states = state.visibles;
    return states.indexOf(item.id) !== -1;
  });
  return visibles;
};

export const getAreasTrabajoCedulasPagination = state => state.pagination;

export const getAreaTrabajoCedulasById = (state, getters) => (id) => {
  const item = getters.getAreasTrabajoCedulasAll.find(i => i.id === id);
  return item;
};

export const getAreaTrabajoCedulaReenvio = state => state.reenvio;

export const getAreaTrabajoCedulaEnviado = state => state.areaTrabajoEnviado;
