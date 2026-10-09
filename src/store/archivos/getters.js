export const getArchivosAll = state => state.all;

export const getArchivosPagination = state => state.pagination;

export const filterArchivosByArchivableId = (state, getters) => (o) => {
  // eslint-disable-next-line arrow-parens
  const items = getters.getArchivosAll.filter((i) => {
    const con = i.archivable_id === o.id && i.archivable_type === o.type;
    return con;
  });
  return items;
};

export const getArchivoByArchivoId = (state, getters) => (id) => {
  const item = getters.getArchivosAll.find(i => i.area_id === id);
  return item;
};

export const getArchivoById = (state, getters) => (id) => {
  const item = getters.getArchivosAll.find(i => i.id === id);
  return item;
};
