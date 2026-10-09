export const getActoresAll = state => state.all;

export const getActoresPagination = state => state.pagination;

export const getActorByActorId = (state, getters) => (id) => {
  const item = getters.getActoresAll.find(i => i.actor_id === id);
  return item;
};

export const getActorById = (state, getters) => (id) => {
  const item = getters.getAllActores.find(i => i.id === id);
  return item;
};
