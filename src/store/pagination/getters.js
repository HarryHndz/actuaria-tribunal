export const getPagination = (state) => {
  const pagination = state.pagination ? state.pagination : {};
  return pagination;
};
