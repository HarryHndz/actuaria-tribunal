<template>
  <q-date class="q-ma-sm"
    today-btn
    color="pink-10"
    mask="YYYY-MM-DD"
    v-model="fecha"
    :options="dateFn"
    @input="seleccionDate"
  />
</template>

<script>
import {
  QDate,
} from 'quasar';

import moment from 'moment';

export default {
  name: 'component-date',
  props: {
    beforeToday: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      fecha: '',
    };
  },
  components: {
    QDate,
  },
  methods: {
    seleccionDate(date) {
      this.$emit('seleccionDate', date);
    },
    dateFn(date) {
      const dayWeek = moment(new Date(date), 'YYYY-MM-DD').day();
      const dateMoment = moment(new Date(date)).format('YYYY-MM-DD');
      const today = moment().format('YYYY-MM-DD');

      if (!this.beforeToday) {
        return !(dayWeek === 6 || dayWeek === 0);
      }

      return !(dayWeek === 6 || dayWeek === 0)
        && moment(today).isSameOrBefore(moment(dateMoment));
    },
  },
};
</script>
