export const setPagination = (state, reg) => {
  state.pagination = reg;
};

export const setPaginationRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

export const setPaginationSuccess = (state) => {
  state.fetching = false;
  state.error = false;
};

export const setPaginationFail = (state) => {
  state.fetching = false;
  state.error = true;
};

export const nextPage = (state) => {
  if (state.pagination.currentPage < state.pagination.totalPages) {
    state.pagination.currentPage += 1;
  } else {
    state.pagination.currentPage = state.pagination.totalPages;
  }
};

export const prevPage = (state) => {
  if (state.pagination.currentPage > 1) {
    state.pagination.currentPage -= 1;
  } else {
    state.pagination.currentPage = 1;
  }
};

export const setPage = (state, page) => {
  state.pagination.currentPage = page;
};
