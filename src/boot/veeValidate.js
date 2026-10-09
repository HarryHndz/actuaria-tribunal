import VeeValidate from 'vee-validate';
import es from './lang/es';

export default ({ Vue }) => {
  Vue.use(VeeValidate, {
    validity: true,
    locale: 'es',
    dictionary: {
      es: {
        messages: es.messages,
      },
    },
  });
};
