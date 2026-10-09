import sidjbridge from '../../boot/sidjbridge';

export const fetchToken = ({ commit }, params = {}) => {
  commit('setSessionRequest');
  return sidjbridge.post('login', params)
    .then((response) => {
      localStorage.setItem('token', response.data.access_token);
      sidjbridge.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
      commit('setSessionSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchToken', response);
      commit('setSessionFail');
      return Promise.reject(response.response);
    });
};

export const fetchSession = ({ commit }, params = {}) => {
  commit('setSessionRequest');
  return sidjbridge.get('/v1/session-data', params)
    .then((response) => {
      commit('setSession', response.data);
      commit('setSessionSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchSession', response);
      commit('setSessionFail');
      return Promise.reject(true);
    });
};

export const putSession = ({ commit }, object) => {
  commit('setSessionRequest');
  return sidjbridge.put('/v1/session-data/', object)
    .then((response) => {
      commit('setSession', response.data.data);
      commit('setSessionSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('putSession', response);
      commit('setSessionFail');
      return Promise.reject(true);
    });
};

export const fetchTimeServer = ({ commit }) => {
  commit('setSessionRequest');
  return sidjbridge.get('server/time')
    .then((response) => {
      commit('setSessionTime', response.data.time);
      commit('setSessionSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchTimeServer', response);
      commit('setSessionFail');
      return Promise.reject(true);
    });
};

export const logOut = ({ commit }, params = {}) => {
  commit('setSessionRequest');
  return sidjbridge.post('logout', params)
    .then(() => {
      localStorage.removeItem('token');
      commit('setSessionSuccess');
      return Promise.resolve(true);
    })
    .catch((response) => {
      console.error('fetchToken', response);
      commit('setSessionFail');
      return Promise.reject(true);
    });
};
