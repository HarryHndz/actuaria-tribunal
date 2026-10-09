import vueMoment from 'vue-moment';

require('moment/locale/es');
const moment = require('moment');

export default ({ Vue }) => {
  Vue.use(vueMoment, {
    moment,
  });
};
