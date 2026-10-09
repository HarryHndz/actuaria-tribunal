import sidjbridge from './sidjbridge';

export default ({ Vue }) => {
  Vue.prototype.$axios = sidjbridge;
};
