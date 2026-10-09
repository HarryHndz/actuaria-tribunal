import {
  Notify,
} from 'quasar';

export default (error) => {
  if (error.name === 'CanceledError') {
    console.log('Solicitud cancelada por el usuario');
    return Promise.reject(true);
  }

  if (error.code === 'ECONNABORTED') {
    Notify.create({
      message: `Error ${error.message}`,
      position: 'bottom',
      type: 'negative',
      timeout: 5000,
    });
    return Promise.reject(true);
  }

  if (error.response) {
    if (Array.isArray(error.response.data.errors) && error.response.data.errors.length > 0) {
      Object.keys(error.response.data.errors).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(error.response.data.errors, key)) {
          Notify.create({
            message: `Error ${error.response.status}: ${error.response.data.errors[key]}`,
            position: 'bottom',
            type: 'negative',
            timeout: 2500,
          });
        }
      });
      return Promise.reject(true);
    }

    if (error.response.data.message) {
      Notify.create({
        message: `Error ${error.response.data.code}: ${error.response.data.message}`,
        position: 'bottom',
        type: 'negative',
        timeout: 5000,
      });
      return Promise.reject(true);
    }

    return Promise.reject(true);
  }

  if (error.data) {
    Notify.create({
      message: `Error ${error.data.code}: ${error.data.errors}`,
      position: 'bottom',
      type: 'negative',
      time: 3000,
    });
    return Promise.reject(true);
  }

  if (error.message) {
    Notify.create({
      message: `Error: ${error.message}`,
      position: 'bottom',
      type: 'negative',
      time: 3000,
    });
    return Promise.reject(true);
  }

  Notify.create({
    message: 'Ha ocurrido un error...',
    position: 'bottom',
    type: 'negative',
    timeout: 5000,
  });
  return Promise.reject(error);
};
