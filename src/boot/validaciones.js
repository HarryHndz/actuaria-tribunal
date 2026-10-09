import moment from 'moment';

export const validaciones = {
  validateDate: (date) => {
    const dateValidate = moment(date, 'YYYY-MM-DD', true);
    return dateValidate.isValid();
  },
  validateDateNullable: (date) => {
    if (date) {
      const dateValidate = moment(date, 'YYYY-MM-DD', true);
      return dateValidate.isValid();
    }
    return true;
  },
};

export const mensajes = (validacion, campo) => {
  if (validacion.required === false) {
    return `El campo ${campo} requerido`;
  }
  if (validacion.requiredIf === false) {
    return `El campo ${campo} requerido`;
  }
  if (validacion.email === false) {
    return `El campo ${campo} deber ser un correo valido`;
  }
  if (validacion.minLength === false) {
    return `El campo ${campo} debe tener al menos ${validacion.$params.minLength.min} caracteres`;
  }
  if (validacion.rfc === false) {
    return `El campo ${campo} debe de ser un RFC valido`;
  }
  if (validacion.curp === false) {
    return `El campo ${campo} debe de ser un CURP valido`;
  }
  if (validacion.validateDate === false) {
    return `El campo ${campo} debe de ser una fecha valida`;
  }
  if (validacion.validateDateNullable === false) {
    return `El campo ${campo} debe de ser una fecha valida`;
  }
  if (validacion.numeric === false) {
    return `El campo ${campo} debe de ser un numero`;
  }
  return '';
};
