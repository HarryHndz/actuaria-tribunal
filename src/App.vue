<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import {
  Loading,
} from 'quasar';

import axios from 'axios';

import './css/SIDJ-style.css';

export default {
  name: 'App',
  data() {
    return {
    };
  },
  async preFetch({ store }) {
    Loading.show();
    try {
      await axios.all([
        store.dispatch('session/fetchSession'),
      ]);
      Loading.hide();
      return Promise.resolve(true);
    } catch (e) {
      Loading.hide();
      return Promise.reject(true);
    }
  },
};
</script>

<style>
</style>
