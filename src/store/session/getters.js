export const getUsuario = (state) => {
  const usuario = state.usuario ? state.usuario : {};
  return usuario;
};

export const getPerfil = (state, getters) => {
  const perfil = getters.getUsuario.perfil ? getters.getUsuario.perfil : {};
  return perfil;
};

export const getLocalizacion = (state, getters) => {
  const localizacion = getters.getUsuario.localizacion ? getters.getUsuario.localizacion : null;
  return localizacion;
};

export const getPermisos = (state, getters) => {
  const permisos = getters.getUsuario.permisos ? getters.getUsuario.permisos : {};
  return permisos;
};

export const getPermisosByPonencias = (state, getters) => {
  const ponencias = getters.getPermisos.ponencias ? getters.getPermisos.ponencias : [];
  return ponencias;
};

export const getRoles = (state, getters) => {
  const roles = getters.getUsuario.permisos.roles ? getters.getUsuario.permisos.roles : {};
  return roles;
};

export const getRolesByName = (state, getters) => {
  const roles = getters.getRoles.name ? getters.getRoles.name : [];
  return roles;
};

export const getRolesById = (state, getters) => {
  const roles = getters.getRoles.id ? getters.getRoles.id : [];
  return roles;
};

export const getPermisosBySalas = (state, getters) => {
  const salas = getters.getPermisos.salas ? getters.getPermisos.salas : [];
  return salas;
};

export const getTimeServer = (state) => {
  const time = state.time_server ? state.time_server : null;
  return time;
};
