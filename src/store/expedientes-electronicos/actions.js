import sidjbridge from 'boot/sidjbridge';

export const fetchAllExpedientesElectronicos = async ({ commit }, params = {}) => {
  commit('setExpedientesElectronicosRequest');
  commit('setExpedientesElectronicosFilters', params);
  try {
    const response = await sidjbridge.get('v1/expediente-electronico/acuerdos', {
      params,
    });
    commit('setExpedientesElectronicos', response.data.data);
    commit('setExpedientesElectronicosPagination', {
      count: response.data.total ?? 0,
      current_page: response.data.current_page ?? 0,
      links: {},
      per_page: response.data.per_page ?? 0,
      total: response.data.total ?? 0,
      total_pages: response.data.last_page ?? 0,
    });
    commit('setExpedientesElectronicosSuccess');
    return Promise.resolve(response.data.data);
  } catch (e) {
    console.error('fetchAllExpedientesElectronicos', e);
    commit('setExpedientesElectronicosFail');
    return Promise.reject(e);
  }
};

export const postExpedienteElectronico = async ({ commit }, object) => {
  commit('setExpedienteElectronicosRequest');
  try {
    const response = await sidjbridge.post('v1/expediente-electronico/acuerdos', object);
    commit('addExpedienteElectronico', {
      ...response.data.data,
      fetching: false,
      error: false,
    });
    commit('setExpedienteElectronicosSuccess');
    return Promise.resolve(true);
  } catch (e) {
    console.error('postExpedienteElectronico', e);
    commit('setExpedienteElectronicoFail', object);
    return Promise.reject(e);
  }
};

export const putExpedienteElectronico = async ({ commit }, object) => {
  commit('setExpedienteElectronicoRequest', object);
  try {
    const response = await sidjbridge.put(`v1/expediente-electronico/acuerdos/${object.id}`, object);
    commit('setExpedienteElectronico', response.data.data);
    return Promise.resolve(true);
  } catch (e) {
    console.error('putExpedienteElectronico', e);
    commit('setExpedienteElectronicoFail', object);
    return Promise.reject(e);
  }
};

export const deleteExpedienteElectronico = async ({ commit }, object) => {
  commit('setExpedienteElectronicoRequest', object);
  try {
    await sidjbridge.delete(`v1/acuerdos/${object.id}`, object);
    commit('setExpedienteElectronicoDelete', object);
    return Promise.resolve(true);
  } catch (e) {
    console.error('deleteExpedienteElectronico', e);
    commit('setExpedienteElectronicoFail', object);
    return Promise.reject(e);
  }
};
