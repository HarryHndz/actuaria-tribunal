export const setSession = (state, reg) => {
  state.usuario = reg;
};

export const setSessionTime = (state, reg) => {
  state.time_server = reg;
};

export const setSessionRequest = (state) => {
  state.fetching = true;
  state.error = false;
};

export const setSessionSuccess = (state) => {
  state.fetching = false;
  state.error = false;
};

export const setSessionFail = (state) => {
  state.fetching = false;
  state.error = true;
};
