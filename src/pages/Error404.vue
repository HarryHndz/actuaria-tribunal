<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/logo-tribunal-tabasco.png"
        style="width:100vw;max-width:300px;opacity: 0.5;"
      >
    </p>
    <p class="text-faded">
      Página no encontrada...<strong>(404)</strong>
    </p>
    <q-btn
      color="primary"
      style="width:200px;"
      to="/"
      label="Regresar"
    />
  </div>
</template>

<script >
export default {
  name: 'Error404',
};
</script>
